'use client'

import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { isCameraHolding, sampleCameraPath } from './cameraPath'

const LERP_MOVING = 0.14
const LERP_HOLD = 0.22

export function useCameraRig(scrollProgressRef: React.MutableRefObject<number>) {
  const targetPos = useRef(new THREE.Vector3())
  const targetLook = useRef(new THREE.Vector3())
  const targetFov = useRef(58)

  useFrame((state) => {
    const progress = scrollProgressRef.current
    const holding = isCameraHolding(progress)
    const { position, lookAt, fov } = sampleCameraPath(progress)

    if (holding) {
      const t = state.clock.elapsedTime
      targetPos.current.copy(position)
      targetPos.current.x += Math.sin(t * 0.25) * 0.012
      targetPos.current.y += Math.cos(t * 0.2) * 0.008
      targetLook.current.copy(lookAt)
      targetFov.current = fov
    } else {
      targetPos.current.copy(position)
      targetLook.current.copy(lookAt)
      targetFov.current = fov
    }

    const lerp = holding ? LERP_HOLD : LERP_MOVING
    state.camera.position.lerp(targetPos.current, lerp)
    state.camera.lookAt(targetLook.current)

    if ('fov' in state.camera && typeof state.camera.fov === 'number') {
      const cam = state.camera as THREE.PerspectiveCamera
      cam.fov += (targetFov.current - cam.fov) * lerp
      cam.updateProjectionMatrix()
    }
  })
}
