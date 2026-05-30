'use client'

import { useEffect, useMemo, useState } from 'react'
import { useGLTF, Center, Environment, useTexture } from '@react-three/drei'
import { HERO_IMAGE_PATHS } from './heroImagePaths'
import * as THREE from 'three'
import { GLB_PATH } from '../../../data/homepage'
import {
  CAM_EMPTY_NAMES,
  applyCameraTargets,
  buildCameraStations,
  setCameraStationOverrides,
} from './cameraPath'
import { useCameraRig } from './useCameraRig'
import PenthouseScenePhotoRoom from './PenthouseScenePhotoRoom'
import PenthouseSceneProcedural from './PenthouseSceneProcedural'

type PenthouseModelProps = {
  scrollProgressRef: React.MutableRefObject<number>
  activeSectionId: string
}

function tuneMaterials(scene: THREE.Object3D) {
  scene.traverse((obj) => {
    if (!(obj instanceof THREE.Mesh)) return
    const mats = Array.isArray(obj.material) ? obj.material : [obj.material]
    mats.forEach((mat) => {
      if (!(mat instanceof THREE.MeshStandardMaterial)) return
      const n = mat.name.toLowerCase()
      if (n.includes('brass') || n.includes('gold') || n.includes('metal')) {
        mat.metalness = 0.88
        mat.roughness = 0.36
        mat.color.set('#b8956a')
      }
      if (n.includes('marble') || n.includes('stone') || n.includes('floor')) {
        mat.roughness = 0.22
        mat.color.set('#e8e0d4')
      }
    })
  })
}

function extractCamTargets(scene: THREE.Object3D) {
  const targets: Partial<
    Record<string, { position: THREE.Vector3; lookAt: THREE.Vector3 }>
  > = {}
  scene.traverse((obj) => {
    if (!CAM_EMPTY_NAMES.includes(obj.name as (typeof CAM_EMPTY_NAMES)[number])) return
    const pos = new THREE.Vector3()
    obj.getWorldPosition(pos)
    targets[obj.name] = {
      position: pos.clone().add(new THREE.Vector3(0, 0.2, 0.8)),
      lookAt: pos.clone(),
    }
  })
  return targets
}

function GlbRoom({ scrollProgressRef }: Pick<PenthouseModelProps, 'scrollProgressRef'>) {
  const { scene } = useGLTF(GLB_PATH)
  const cloned = useMemo(() => {
    const s = scene.clone()
    tuneMaterials(s)
    const targets = extractCamTargets(s)
    if (Object.keys(targets).length > 0) {
      setCameraStationOverrides(applyCameraTargets(buildCameraStations(false), targets))
    }
    return s
  }, [scene])

  useCameraRig(scrollProgressRef)

  return (
    <Center>
      <primitive object={cloned} scale={1.15} />
      <Environment preset="apartment" />
      <ambientLight intensity={0.2} color="#fff0e0" />
      <directionalLight position={[8, 4, 2]} intensity={1.1} color="#ffb86a" />
      <pointLight position={[-2, 2.2, 2.5]} intensity={0.35} color="#fff8f0" distance={12} />
    </Center>
  )
}

export default function PenthouseModel({ scrollProgressRef, activeSectionId }: PenthouseModelProps) {
  const [hasGlb, setHasGlb] = useState(false)

  useEffect(() => {
    useTexture.preload(HERO_IMAGE_PATHS)
    fetch(GLB_PATH, { method: 'HEAD' })
      .then((r) => {
        setHasGlb(r.ok)
        if (r.ok) useGLTF.preload(GLB_PATH)
      })
      .catch(() => setHasGlb(false))
  }, [])

  if (!hasGlb) {
    return (
      <PenthouseScenePhotoRoom
        scrollProgressRef={scrollProgressRef}
        activeSectionId={activeSectionId}
      />
    )
  }

  return <GlbRoom scrollProgressRef={scrollProgressRef} />
}
