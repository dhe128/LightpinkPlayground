'use server'
import {LightpinkInstance} from '@/state/UiSlice'
import {knex} from '@api/Knex'

export const getCaption = async (
  instance: LightpinkInstance,
): Promise<string | undefined> => {
  const record = await knex('caption_gen')
    .where('timeline', instance.timeline)
    .where('iteration', instance.iteration)
    .first()
  return record?.caption
}

export const getInstructionsText = async (
  instance: LightpinkInstance,
): Promise<string | undefined> => {
  const record = await knex('instruction_gen')
    .where('timeline', instance.timeline)
    .where('iteration', instance.iteration)
    .first()
  return record?.instruction
}
