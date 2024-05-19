import {useGLTF} from '@react-three/drei'
import useOctree from './useOctree'
import Player from './Player'
import useOctreeHelper from './useOctreeHelper'
import {useCallback, useEffect, useRef} from 'react'
import SphereCollider from './SphereCollider'
import Ball from './Ball'
import * as Constants from './Constants'
import {computeSphereCollisions} from '@/util/SphereCollision'
import {useLightpinkStore} from '@/state/LightpinkStore'
import {useThree} from '@react-three/fiber'
import {MeshGroup} from './MeshGroup'

export default function Physics() {
  const {nodes, scene} = useGLTF('/model/scene-transformed.glb')
  const octree = useOctree(scene)
  useOctreeHelper(octree)

  const colliders = useRef([])
  const checkSphereCollisions = useCallback(
    () => computeSphereCollisions(colliders.current),
    [colliders.current],
  )

  const setRefs = useLightpinkStore(state => state.setRefs)
  useThree(({gl}) => {
    setRefs({renderer: gl, canvas: gl.domElement})
  })

  return (
    <>
      <MeshGroup />
      <group name="builtinMeshGroup">
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Suzanne007.geometry}
          material={nodes.Suzanne007.material}
          position={[1.74, 1.04, 24.97]}
        />
      </group>

      <group name="ballGroup" dispose={null}>
        {Constants.balls.map(({position}, i) => (
          <SphereCollider
            key={i}
            id={i}
            radius={Constants.radius}
            octree={octree}
            position={position}
            colliders={colliders.current}
            checkSphereCollisions={checkSphereCollisions}
          >
            <Ball radius={Constants.radius} />
          </SphereCollider>
        ))}
      </group>

      <Player
        ballCount={Constants.ballCount}
        octree={octree}
        colliders={colliders.current}
      />
    </>
  )
}
