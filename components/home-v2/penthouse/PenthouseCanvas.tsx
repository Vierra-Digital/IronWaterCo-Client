'use client'

import { Suspense } from 'react'
import { Canvas } from '@react-three/fiber'
import * as THREE from 'three'
import PenthouseModel from './PenthouseModel'

type PenthouseCanvasProps = {
  scrollProgressRef: React.MutableRefObject<number>
  activeSectionId: string
}

export default function PenthouseCanvas({ scrollProgressRef, activeSectionId }: PenthouseCanvasProps) {
  return (
    <Canvas
      camera={{ position: [0, 1.75, 7.5], fov: 58, near: 0.1, far: 60 }}
      dpr={[1, 1.5]}
      frameloop="always"
      shadows
      gl={{
        antialias: true,
        alpha: false,
        toneMapping: THREE.ACESFilmicToneMapping,
        toneMappingExposure: 1.05,
      }}
      style={{ width: '100%', height: '100%' }}
    >
      <Suspense fallback={null}>
        <PenthouseModel scrollProgressRef={scrollProgressRef} activeSectionId={activeSectionId} />
      </Suspense>
    </Canvas>
  )
}
