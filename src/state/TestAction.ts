import {textToInstructionsRunpod} from '@/serverAction/textToInstructions'
import {promptToMesh} from './ApiCall'
import {imageToCaption} from '@/serverAction/imageToCaption'
import {useLightpinkStore} from './LightpinkStore'
import {triggerDownload} from '@/util/triggerDownload'
import {Vector3} from 'three'

export const testMeshGen = async () => {
  const prompt =
    'A sturdy wooden dining table with matching chairs, seating up to 6 people for alfresco dining'
  const prompt2 = 'tree'
  const {meshGenId} = await promptToMesh(prompt2)
  const {addMesh} = useLightpinkStore.getState()
  addMesh({
    meshId: meshGenId,
    position: new Vector3(),
    scale: new Vector3(1, 1, 1),
  })
}

const testB100 =
  'You are a large language model named OpenChat. Write a poem to describe yourself'
const testB101 = 'Why is the sky blue?'
const testB200 =
  'I have a cube canvas of size 10x10x10 with axes xyz. I want to build a nice backyard. Please give me a list of the objects I should place along with their coordinates, sizes and detailed description. Please use the following format:\n 1. Object 1 with description. Location: (x, y, z). Area: (x, y, z) \n 2. Object 2 ...'
export const testInstructionGen = async () => {
  const instance = useLightpinkStore.getState().instance
  await textToInstructionsRunpod(instance, testB200)
}

const testImageUrl =
  'https://i.pinimg.com/originals/5e/77/6a/5e776a475b4022ee6cb6f64036ae6496.jpg'
export const testCaptionGen = async () => {
  const instance = useLightpinkStore.getState().instance
  const {canvas} = useLightpinkStore.getState().refs
  const dataUrl = canvas.toDataURL('image/png')
  console.log(await imageToCaption(instance, dataUrl))
}

export const saveScreenshot = () => {
  const {canvas} = useLightpinkStore.getState().refs
  const dataUrl = canvas.toDataURL('image/png')
  triggerDownload(dataUrl, 'screenshot.png')
  URL.revokeObjectURL(dataUrl)
}
