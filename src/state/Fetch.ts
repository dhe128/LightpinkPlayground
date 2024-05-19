import {GLTFLoader} from 'three/addons/loaders/GLTFLoader.js'
import {extractMeshes} from '@util/MeshUtil'
import {makePromise} from '@util/ThreeUtil'
import {MeshSpec} from './SceneSlice'
import {getMeshGenById} from '@/serverAction/getMeshGenById'

export const fetchMeshByUrl = async (url: string) => {
  const gltf = await makePromise(GLTFLoader, url)
  const meshes = extractMeshes(gltf)
  return meshes[0].clone()
}

export const loadMeshFromSpec = async (meshSpec: MeshSpec) => {
  const meshGen = await getMeshGenById(meshSpec.id)
  const mesh = await fetchMeshByUrl(meshGen.mesh_url)

  mesh.position.copy(meshGen.position)
  if (meshSpec.scale) {
    const {geometry} = mesh
    geometry.computeBoundingBox()
    mesh.scale.multiply(meshSpec.scale).divide(geometry.boundingBox.max)
  }

  return mesh
}
