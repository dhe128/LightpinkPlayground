import {useEffect} from 'react'
import {OctreeHelper} from 'three/examples/jsm/helpers/OctreeHelper'
import {useThree} from '@react-three/fiber'
import {button, useControls} from 'leva'
import {
  testInstructionGen,
  testMeshGen,
  testCaptionGen,
} from '@/state/TestAction'
import {saveScreenshot} from '@/state/Action'

export default function useOctreeHelper(octree) {
  const {scene} = useThree()
  useEffect(() => {
    console.log('new OctreeHelper')
    const helper = new OctreeHelper(octree, 'hotpink')
    helper.name = 'octreeHelper'
    scene.add(helper)
    return () => {
      console.log('removing OctreeHelper')
      scene.remove(helper)
    }
  }, [octree, scene])

  useControls('Octree Helper', {
    visible: {
      value: false,
      onChange: v => {
        scene.getObjectByName('octreeHelper').visible = v
      },
    },
    testMeshGen: button(() => testMeshGen()),
    testInstructionGen: button(() => testInstructionGen()),
    testCaptionGen: button(() => testCaptionGen()),
    saveScreenshot: button(() => saveScreenshot()),
  })
}
