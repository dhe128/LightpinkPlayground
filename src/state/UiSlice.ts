import {Group} from 'three'
import type {StateCreator} from 'zustand'

export type LightpinkInstance = {
  timeline: number
  iteration: number
}

export type UiState = {}

export type UiSlice = {
  instance: LightpinkInstance
  ui: UiState

  setInstance: (Ui: Partial<LightpinkInstance>) => void
  setUi: (Ui: Partial<UiState>) => void
  initializeApp(instance: LightpinkInstance)
  advanceIteration: () => void
}

export const createUiSlice: StateCreator<
  UiSlice,
  [['zustand/immer', never], never],
  [],
  UiSlice
> = (set, get) => {
  return {
    instance: {
      timeline: 0,
      iteration: 0,
    },
    ui: {},

    setInstance(instance) {
      set(state => {
        Object.assign(state.instance, instance)
      })
    },

    setUi(ui) {
      set(state => {
        Object.assign(state.ui, ui)
      })
    },

    advanceIteration() {
      set(state => {
        state.instance.iteration += 1
      })
    },
  }
}
