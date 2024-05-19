import {useLightpinkStore} from './LightpinkStore'
import {promptToMesh} from './ApiCall'
import {LightpinkInstance} from './UiSlice'
import {MeshInstruction, extractLine} from '@/util/Instruction'
import {imageToCaption} from '@/serverAction/imageToCaption'
import {textToInstructionsRunpod} from '@/serverAction/textToInstructions'
import {nullthrows} from '@/util/nullthrows'
import {getCaption, getInstructionsText} from '@/serverAction/Steps'

export const applyInstruction = async (instruction: MeshInstruction) => {
  const {addMesh} = useLightpinkStore.getState()
  const {meshGenId} = await promptToMesh(instruction.prompt)
  addMesh({
    meshId: meshGenId,
    position: instruction.location,
    scale: instruction.area,
  })
}

export const initializeApp = async (instance: LightpinkInstance) => {
  useLightpinkStore.setState(state => {
    state.instance = instance
  })
  await useLightpinkStore.persist.rehydrate()
}

export const runStep1 = async () => {
  const instance = useLightpinkStore.getState().instance
  const {canvas} = useLightpinkStore.getState().refs
  const dataUrl = canvas.toDataURL('image/png')
  const caption = await imageToCaption(instance, dataUrl)
  console.info(
    `${instance.timeline}.${instance.iteration}.step1 result: ${caption}`,
  )
}

const makeStep2Prompt = (caption: string) =>
  `I have a cube canvas of size 10x10x10 with axes xyz. I want to build a nice backyard. The canvas already contains the following objects: ${caption}. Please give me a list of the objects I should place along with their coordinates, sizes and detailed description. Please use the following format:\n 1. Object 1 with description. Location: (x, y, z). Area: (x, y, z) \n 2. Object 2 ...`

export const runStep2 = async () => {
  const instance = useLightpinkStore.getState().instance
  const caption = nullthrows(await getCaption(instance))
  const instructionsText = await textToInstructionsRunpod(
    instance,
    makeStep2Prompt(caption),
  )
  console.info(
    `${instance.timeline}.${instance.iteration}.step2 result: ${instructionsText}`,
  )
}

export const runStep3 = async () => {
  const instance = useLightpinkStore.getState().instance
  const instructionsText = nullthrows(await getInstructionsText(instance))
  const instructions = instructionsText.split('\n').map(extractLine)
  const {length} = await Promise.all(instructions.map(applyInstruction))

  useLightpinkStore.getState().advanceIteration()
  console.info(
    `${instance.timeline}.${instance.iteration}.step3 complete. ${length} meshes added.`,
  )
}
