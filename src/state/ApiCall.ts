import {assetHubApi} from '@/api/AssetHubApi'
import {Mesh} from 'three'
import Replicate from 'replicate'
import {fetchMeshByUrl} from './Fetch'
import {promptToMeshUrl} from '@/serverAction/promptToMeshUrl'
import {RunpodRunsyncResponse, runpodApi} from '@/api/RunpodApi'

export type StartDraftsProps = {
  images: File[]
  mock: boolean
  model?: string
  ownerId: string
}

export type StartDraftsResult = {
  meshGenIds: string[]
}

export const startDraftMesh = async ({
  images,
  mock,
  ownerId,
}: StartDraftsProps) => {
  const formData = new FormData()
  formData.set('mock', String(+mock))
  formData.set('owner_id', ownerId)
  images.forEach(image => formData.append('image', image))
  return await assetHubApi
    .post<StartDraftsResult>('/api/generate_mesh/draft', formData)
    .then(response => response.data)
}

export type StartConvertResult = {
  meshGenId: string
}

export const startConvert = async (props: StartDraftsProps) => {
  return await assetHubApi
    .post<StartConvertResult>('/api/generate_mesh/convert', props)
    .then(response => response.data)
}

export const promptToMesh = async (prompt: string): Promise<Mesh> => {
  const url = await promptToMeshUrl(prompt)
  console.log(url)
  return await fetchMeshByUrl(url)
}
