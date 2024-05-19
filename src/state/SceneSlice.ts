import {Group, Vector3} from 'three'
import type {StateCreator} from 'zustand'
export type MeshSpec = {

  meshId: number
  position: Vector3
  scale: Vector3
}

export type SceneState = {
  meshSpecs: MeshSpec[]
}
export type SceneSlice = {
  scene: SceneState

  setScene: (scene: Partial<SceneState>) => void
  addMesh: (meshSpec: MeshSpec) => void
}

export const createSceneSlice: StateCreator<
  SceneSlice,
  [['zustand/immer', never], never],
  [],
  SceneSlice
> = set => {
  return {
    scene: {
      meshSpecs: [],
    },

    setScene(scene) {
      set(state => {
        Object.assign(state.scene, scene)
      })
    },

    addMesh(meshSpec: MeshSpec) {
      set(state => {
        state.scene.meshSpecs.push(meshSpec)
      })
    },
  }
}
