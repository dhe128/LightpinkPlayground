import {
  textToInstructions,
  textToInstructions2,
} from '@/serverAction/textToInstructions'
import {placeMeshInScene} from './Action'
import {promptToMesh} from './ApiCall'
import {imageToCaption} from '@/serverAction/imageToCaption'

export const testMeshGen = async () => {
  const prompt =
    'A sturdy wooden dining table with matching chairs, seating up to 6 people for alfresco dining'
  const prompt2 = 'tree'
  const mesh = await promptToMesh(prompt2)
  placeMeshInScene(mesh)
}

const testB123 =
  'You are a large language model named OpenChat. Write a poem to describe yourself'
export const testInstructionGen = async () => {
  await textToInstructions2('Why is the sky blue?')
}

export const testCaptionGen = async () => {
  const url =
    'https://i.pinimg.com/originals/5e/77/6a/5e776a475b4022ee6cb6f64036ae6496.jpg'
  console.log(await imageToCaption(url))
}
