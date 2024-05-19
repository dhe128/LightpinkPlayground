import {type Mesh, Object3D} from 'three'
import type {GLTF} from 'three/addons/loaders/GLTFLoader.js'

export const extractMeshes = (gltf: GLTF): Mesh[] => {
  const meshes: Mesh[] = []
  gltf.scene.traverse((node: Object3D) => {
    if (node instanceof Mesh) {
      meshes.push(node)
    }
  })
  return meshes
}
