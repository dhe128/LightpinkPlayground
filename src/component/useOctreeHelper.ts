import {useEffect} from 'react'
import {OctreeHelper} from 'three/examples/jsm/helpers/OctreeHelper'
import {useThree} from '@react-three/fiber'
import {button, useControls} from 'leva'
import {
  testInstructionGen,
  testMeshGen,
  testCaptionGen,
  saveScreenshot,
} from '@/state/TestAction'
import {runStep1, runStep2, runStep3} from '@/state/Action'

export default function useOctreeHelper(octree) {
  const {scene} = useThree()
  useEffect(() => {
    const helper = new OctreeHelper(octree, 'hotpink')
    helper.name = 'octreeHelper'
    scene.add(helper)
    return () => {
      scene.remove(helper)
    }
  }, [octree, scene])

  useControls('Actions', {
    runStep1: button(() => runStep1()),
    runStep2: button(() => runStep2()),
    runStep3: button(() => runStep3()),
  })

  useControls('Debug', {
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
