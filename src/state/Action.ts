import {testAText} from '@/test/testA'
import {useLightpinkStore} from './LightpinkStore'
import {supabase} from '@/api/SupabaseBrowser'
import {Mesh, Vector3} from 'three'
import {promptToMesh} from './ApiCall'

export const extractTuple = (s: string) => {
  const [_, ...parts] = /([\d\.\+\-]+)/.exec(s)
  return parts.map(part => parseFloat(part))
}

export const extractLine = (line: string) => {
  const [_, title, locationStr, areaStr, prompt] =
    /^\d+\.\s*(.*)Location: (\([\d,\.\-\+]*\))\. Area: (\([\d,\.\-\+]*\))\. (.*)$/.exec(
      line,
    )

  return {
    title,
    prompt,
    location: new Vector3(...extractTuple(locationStr)),
    area: new Vector3(...extractTuple(areaStr)),
  }
}

export type ObjectSpec = {
  title: string
  prompt: string
  location: Vector3
  area: Vector3
}

export const applySpec = async (spec: ObjectSpec) => {
  const mesh: Mesh = await promptToMesh(spec.prompt)
  placeMeshInScene(mesh, spec.location, spec.area)
}

export const placeMeshInScene = (
  mesh: Mesh,
  position: Vector3 = new Vector3(),
  size?: Vector3,
) => {
  const {
    refs: {meshGroup},
  } = useLightpinkStore.getState()
  mesh.position.copy(position)

  if (size) {
    const {geometry} = mesh
    geometry.computeBoundingBox()
    mesh.scale.multiply(size).divide(geometry.boundingBox.max)
  }
  meshGroup.add(mesh)
}

export const applyChangesFromResponse = (text: string) => {
  const specs = text.split('\n').map(extractLine)
  for (const spec of specs) {
    applySpec(spec)
  }
}

export const saveScreenshot = () => {
  const {canvas} = useLightpinkStore(state => state.refs)
  canvas.toBlob(blob => {
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.style.display = 'none'
    link.href = url
    link.download = 'screenshot.png'
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    URL.revokeObjectURL(url)
  }, 'image/png')
}
