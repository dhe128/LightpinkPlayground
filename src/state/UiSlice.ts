import {Group} from 'three'
import type {StateCreator} from 'zustand'

export type UiState = {
  timeline: number
  iteration: number
}
export type UiSlice = {
  ui: UiState

  setUi: (Ui: Partial<UiState>) => void
}

export const createUiSlice: StateCreator<
  UiSlice,
  [['zustand/immer', never], never],
  [],
  UiSlice
> = set => {
  return {
    ui: {
      timeline: 0,
      iteration: 0,
    },

    setUi(ui) {
      set(state => {
        Object.assign(state.ui, ui)
      })
    },
  }
}
