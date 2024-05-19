import {Group, WebGLRenderer} from 'three'
import type {StateCreator} from 'zustand'

export type LightpinkRefs = {
  meshGroup?: Group
  canvas?: HTMLCanvasElement
  renderer?: WebGLRenderer
}
export type ContextSlice = {
  refs: LightpinkRefs

  setRefs: (refs: Partial<LightpinkRefs>) => void
}

export const createContextSlice: StateCreator<
  ContextSlice,
  [['zustand/immer', never], never],
  [],
  ContextSlice
> = set => {
  return {
    refs: {},

    setRefs(refs) {
      set(state => {
        Object.assign(state.refs, refs)
      })
    },
  }
}
