'use server'
import {RunpodRunsyncResponse, runpodApi} from '@/api/RunpodApi'
import {useLightpinkStore} from '@/state/LightpinkStore'
import axios from 'axios'
import knex from 'knex'

export const textToInstructions = async (text: string): Promise<string> => {
  const {data} = await runpodApi.post<RunpodRunsyncResponse>(
    'vllm-5dbph8dsh7z6wn/runsync',
    {
      inputs: {
        text,
      },
    },
  )
  console.log('textToInstructions', data)
}

export const textToInstructions2 = async (text: string): Promise<string> => {
  const {
    ui: {timeline, iteration},
  } = useLightpinkStore.getState()

  const [instructionGenId] = await knex('instruction_gen')
    .insert({
      input_text: text,
      timeline,
      iteration,
    })
    .returning('id')

  const {choices} = await axios.post<RunpodRunsyncResponse>(
    'https://xtw641etkc9fcc-18888.proxy.runpod.net/v1/chat/completions',
    {
      model: 'openchat_3.5',
      maxtokens: 2048,
      messages: [
        {
          role: 'user',
          content:
            'I have a cube canvas of size 10x10x10 with axes xyz. I want to build a nice backyard. Please give me a list of the objects I should place along with their coordinates, sizes and detailed description. Please use the following format:\n 1. Object 1 with description. Location: (x, y, z). Area: (x, y, z) \n 2. Object 2 ...',
        },
      ],
    },
  )
  const instruction = choices[0].message
  await knex('instruction_gen').where('id', instructionGenId).update({
    instruction,
  })
  return instruction
}
