import {
  setStoreItem,
  deleteStoreItem,
  getStoreItem,
} from '@/serverAction/StorePersistence'
import {LightpinkState, useLightpinkStore} from '@/state/LightpinkStore'
import {PersistStorage, StorageValue} from 'zustand/middleware'

export const asyncStorage: PersistStorage<LightpinkState> = {
  getItem: async (name: string): Promise<StorageValue<LightpinkState>> => {
    const {instance} = useLightpinkStore.getState()
    return (await getStoreItem(instance, name)) as StorageValue<LightpinkState>
  },

  setItem: async (
    name: string,
    value: StorageValue<LightpinkState>,
  ): Promise<void> => {
    const {instance} = useLightpinkStore.getState()
    await setStoreItem(instance, name, value)
  },

  removeItem: async (name: string): Promise<void> => {
    const {instance} = useLightpinkStore.getState()
    await deleteStoreItem(instance, name)
  },
}
