import {persist} from 'zustand/middleware'
import {create} from 'zustand'
import {immer} from 'zustand/middleware/immer'
import {devtools} from 'zustand/middleware'
import {createUiSlice, type UiSlice} from '@/state/UiSlice'
import {createContextSlice, type ContextSlice} from '@/state/ContextSlice'
import {createSceneSlice, type SceneSlice} from '@/state/SceneSlice'
import {PartializePredicate, partializeByPredicate} from './ZustandPersist'
import {asyncStorage} from './AsyncStorage'

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
        ...createSceneSlice(...a),
        ...createUiSlice(...a),
      })),
    ),
    {
      name: 'AssetHubStore',
      storage: asyncStorage,
      partialize: partializeByPredicate(partializePredicate),
      version: 2,
      migrate(persistedState, version) {
        if (version < 2) {
          return {}
        }
        return persistedState
      },
      skipHydration: true,
    },
  ),
)
