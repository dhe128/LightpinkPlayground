'use server'
import {LightpinkInstance} from '@/state/UiSlice'
import {knex} from '@api/Knex'

export const getStoreItem = async (
  instance: LightpinkInstance,
  name: string,
): Promise<unknown | null> => {
  const record = await knex('instance_state')
    .where('timeline', instance.timeline)
    .where('iteration', instance.iteration)
    .where('name', name)
    .first()
  return record?.value
}

export const setStoreItem = async (
  instance: LightpinkInstance,
  name: string,
  value: unknown,
): Promise<undefined> => {
  await knex('instance_state')
    .insert({
      ...instance,
      name,
      value,
    })
    .onConflict(['timeline', 'iteration'])
    .merge()
}

export const deleteStoreItem = async (
  instance: LightpinkInstance,
  name: string,
): Promise<void> => {
  await knex('instance_state')
    .where('timeline', instance.timeline)
    .where('iteration', instance.iteration)
    .where('name', name)
    .delete()
}
