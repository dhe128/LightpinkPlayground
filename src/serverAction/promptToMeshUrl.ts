'use server'

import {useLightpinkStore} from '@/state/LightpinkStore'
import knex from 'knex'
import Replicate from 'replicate'

const defaultNegativePrompt =
  'ugly, bad anatomy, blurry, pixelated obscure, unnatural colors, poor lighting, dull, and unclear, cropped, lowres, low quality, artifacts, duplicate, morbid, mutilated, poorly drawn face, deformed, dehydrated, bad proportions'
export const promptToMeshUrl = async (prompt: string): Promise<string> => {
  const replicate = new Replicate()
  const {
    ui: {timeline, iteration},
  } = useLightpinkStore.getState()

  const input = {
    prompt,
    max_steps: 500,
    //negative_prompt: defaultNegativePrompt,
  }

  const [meshGenId] = await knex('mesh_gen')
    .insert({
      prompt,
      max_steps: input.max_steps,
      negative_prompt: input.negative_prompt,
      timeline,
      iteration,
    })
    .returning('id')

  const {output: url} = await replicate.run(
    'adirik/mvdream:35d1d515da2f04c3f150ae9a8d646619f31c69a2767f2502b5941e08866703c9',
    {input},
  )
  await knex('mesh_gen').where('id', meshGenId).update({
    url,
  })
  return url
}
