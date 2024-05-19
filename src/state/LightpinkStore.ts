import {StateStorage, createJSONStorage, persist} from 'zustand/middleware'
import {create} from 'zustand'
import {immer} from 'zustand/middleware/immer'
import {devtools} from 'zustand/middleware'
import {createUiSlice, type UiSlice} from '@/state/UiSlice'
import {createContextSlice, type ContextSlice} from '@/state/ContextSlice'
import {createSceneSlice, type SceneSlice} from '@/state/SceneSlice'
import {PartializePredicate, partializeByPredicate} from './ZustandPersist'
import knex from 'knex'

export type LightpinkState = ContextSlice & SceneSlice & UiSlice

const includedKeys = ['meshSpecs']

export const partializePredicate: PartializePredicate<LightpinkState> = (
  key,
  value,
) => includedKeys.includes(key)

export const useLightpinkStore = create<LightpinkState>()(
  persist(
    immer(
      devtools((...a) => ({
        ...createContextSlice(...a),
        ...createUiSlice(...a),
        ...createSceneSlice(...a),
      })),
    ),
    {
      name: 'AssetHubStore',
      storage: createJSONStorage(() => storage),
      partialize: partializeByPredicate(partializePredicate),
      version: 2,
      migrate(persistedState, version) {
        if (version < 2) {
          return {}
        }
        return persistedState
      },
    },
  ),
)

const storage: StateStorage = {
  getItem: async (name: string): Promise<string | null> => {
    const {
      ui: {timeline, iteration},
    } = useLightpinkStore.getState()
    const {value} = await knex('scene_state')
      .where('timeline', timeline)
      .where('iteration', iteration)
      .where('name', name)
      .first()
    return JSON.stringify(value)
  },
  setItem: async (name: string, value: string): Promise<void> => {
    const {
      ui: {timeline, iteration},
    } = useLightpinkStore.getState()
    await knex('caption_gen').insert({
      timeline,
      iteration,
      name,
      value: JSON.parse(value),
    })
  },
  removeItem: async (name: string): Promise<void> => {
    const {
      ui: {timeline, iteration},
    } = useLightpinkStore.getState()
    await knex('scene_state')
      .where('timeline', timeline)
      .where('iteration', iteration)
      .where('name', name)
      .delete()
  },
}
