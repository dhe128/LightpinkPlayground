'use client'
import {useRef} from 'react'
import {Canvas, useThree} from '@react-three/fiber'
import {Environment, Stats} from '@react-three/drei'
import Game from './Game'
import Overlay from './Overlay'

export default function App() {
  return (
    <>
      <Canvas shadows>
        <directionalLight
          intensity={1}
          castShadow={true}
          shadow-bias={-0.00015}
          shadow-radius={4}
          shadow-blur={10}
          shadow-mapSize={[2048, 2048]}
          position={[85.0, 80.0, 70.0]}
          shadow-camera-left={-30}
          shadow-camera-right={30}
          shadow-camera-top={30}
          shadow-camera-bottom={-30}
        />
        <Environment
          files="/environment/rustig_koppie_puresky_1k.hdr"
          background
        />
        <Game />
        <Stats />
      </Canvas>
      <Overlay />
    </>
  )
}
