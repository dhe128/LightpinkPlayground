import {GLTFLoader} from 'three/addons/loaders/GLTFLoader.js'
import {extractMeshes} from '@util/MeshUtil'
import {makePromise} from '@util/ThreeUtil'
import {MeshSpec} from './SceneSlice'
import knex from 'knex'

export const fetchMeshByUrl = async (url: string) => {
  const gltf = await makePromise(GLTFLoader, url)
  const meshes = extractMeshes(gltf)
  return meshes[0].clone()
}

export const loadMeshFromSpec = async (meshSpec: MeshSpec) => {
  const meshGen = await knex('mesh_gen').where('id', meshSpec.id).first()
  const mesh = fetchMeshByUrl(meshGen.mesh_url)

  mesh.position.copy(meshGen.position)
  if (meshSpec.scale) {
    const {geometry} = mesh
    geometry.computeBoundingBox()
    mesh.scale.multiply(size).divide(geometry.boundingBox.max)
  }

  return mesh
}
