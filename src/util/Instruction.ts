import {Vector3} from 'three'

export type MeshInstruction = {
  title: string
  prompt: string
  location: Vector3
  area: Vector3
}

export const extractTuple = (s: string) => {
  const [_, ...parts] = /([\d\.\+\-]+)/.exec(s)
  return parts.map(part => parseFloat(part))
}

export const extractLine = (line: string): MeshInstruction => {
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
