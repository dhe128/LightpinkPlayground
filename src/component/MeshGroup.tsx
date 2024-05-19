import {useLightpinkStore} from '@/state/LightpinkStore'
import {type MeshSpec} from '@/state/SceneSlice'
import {loadMeshFromSpec} from '@/state/Fetch'
import {suspend} from 'suspend-react'
import {Mesh} from 'three'

export const MeshBySpec = ({meshSpec}: {meshSpec: MeshSpec}) => {
  const mesh: Mesh = suspend(loadMeshFromSpec(meshSpec))
  return <primitive object={mesh} />
}

export const MeshGroup = () => {
  const meshSpecs = useLightpinkStore(state => state.scene.meshSpecs)
  const setRefs = useLightpinkStore(state => state.setRefs)

  return (
    <group
      name="meshGroup"
      ref={meshGroup => setRefs({meshGroup})}
      dispose={null}
    >
      {meshSpecs.map(meshSpec => (
        <MeshBySpec key={meshSpec.id} meshSpec={meshSpec} />
      ))}
    </group>
  )
}
