import {useLightpinkStore} from '@/state/LightpinkStore'

export const MeshSpec = ({meshSpec}: {meshSpec: MeshSpec}) => {
  const mesh = loadMeshFromSpec(meshSpec)
  return <primitive object={mesh} />
}

export const MeshGroup = () => {
  const meshSpecs = useLightpinkStore(state => state.meshSpecs)
  const setRefs = useLightpinkStore(state => state.setRefs)

  return (
    <group
      name="meshGroup"
      ref={meshGroup => setRefs({meshGroup})}
      dispose={null}
    >
      {meshSpecs.map(meshSpec => (
        <MeshSpec key={meshSpec.id} meshSpec={meshSpec} />
      ))}
    </group>
  )
}
