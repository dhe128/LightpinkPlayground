'use server'
import {RunpodRunsyncResponse, runpodApi} from '@/api/RunpodApi'
import axios from 'axios'
import {knex} from '@api/Knex'
import {LightpinkInstance} from '@/state/UiSlice'

export const textToInstructionsServerless = async (
  instance: LightpinkInstance,
  text: string,
): Promise<string> => {
  const {data} = await runpodApi.post<RunpodRunsyncResponse>(
    'vllm-5dbph8dsh7z6wn/runsync',
    {
      inputs: {
        text,
      },
    },
  )
  return data.output.choices[0].message.content
}

export const textToInstructionsRunpod = async (
  instance: LightpinkInstance,
  text: string,
): Promise<string> => {
  const [{id: instructionGenId}] = await knex('instruction_gen')
    .insert({
      ...instance,
      input_text: text,
    })
    .returning('id')

  const {
    data: {choices},
  } = await axios.post<RunpodRunsyncResponse>(
    'https://xtw641etkc9fcc-18888.proxy.runpod.net/v1/chat/completions',
    {
      model: 'openchat_3.5',
      maxtokens: 2048,
      messages: [
        {
          role: 'user',
          content: text,
        },
      ],
    },
  )
  const instruction = choices[0].message.content
  await knex('instruction_gen').where('id', instructionGenId).update({
    instruction,
  })
  return instruction
}
