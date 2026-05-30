'use client'

import { useEffect, useMemo, useRef, useState } from 'react'
import { useTexture } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import type { Group, Mesh } from 'three'
import * as THREE from 'three'
import { HERO_IMAGE_PATHS } from './heroImagePaths'
import { configurePhotoTexture } from './configurePhotoTexture'
import { photoWallOpacity } from './photoWallOpacity'
import { useCameraRig } from './useCameraRig'
import { createMarbleTexture } from './penthouseTextures'

type PenthouseScenePhotoRoomProps = {
  scrollProgressRef: React.MutableRefObject<number>
  activeSectionId: string
}

type PhotoPanelConfig = {
  stationIndex: number
  position: [number, number, number]
  rotation: [number, number, number]
  size: [number, number]
}

const PHOTO_PANELS: PhotoPanelConfig[] = [
  { stationIndex: 0, position: [0, 2.45, -5.42], rotation: [0, 0, 0], size: [13.5, 5.2] },
  { stationIndex: 1, position: [2.05, 1.55, -0.15], rotation: [0, -0.72, 0], size: [4.2, 3.4] },
  { stationIndex: 2, position: [0.15, 1.15, -2.35], rotation: [0, 0.08, 0], size: [5.5, 3.8] },
  { stationIndex: 3, position: [-2.85, 1.2, 0.55], rotation: [0, 0.95, 0], size: [3.8, 2.8] },
  { stationIndex: 4, position: [5.95, 2.15, 0.05], rotation: [0, -Math.PI / 2, 0], size: [5.2, 4.2] },
]

function PhotoPanel({
  texture,
  config,
  scrollProgressRef,
  mobile,
}: {
  texture: THREE.Texture
  config: PhotoPanelConfig
  scrollProgressRef: React.MutableRefObject<number>
  mobile: boolean
}) {
  const meshRef = useRef<Mesh>(null)
  const material = useMemo(() => {
    const mat = new THREE.MeshStandardMaterial({
      map: texture,
      emissive: '#ffffff',
      emissiveIntensity: 0.05,
      roughness: 0.92,
      metalness: 0,
      transparent: true,
      depthWrite: true,
      side: THREE.DoubleSide,
    })
    return mat
  }, [texture])

  useFrame(() => {
    const opacity = photoWallOpacity(scrollProgressRef.current, config.stationIndex, mobile)
    material.opacity = opacity
    material.emissiveIntensity = opacity * 0.08
    if (meshRef.current) meshRef.current.visible = opacity > 0.02
  })

  return (
    <mesh
      ref={meshRef}
      position={config.position}
      rotation={config.rotation}
      renderOrder={config.stationIndex}
      material={material}
    >
      <planeGeometry args={config.size} />
    </mesh>
  )
}

function RoomShell({ marbleMap }: { marbleMap: THREE.CanvasTexture }) {
  return (
    <group>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.01, 0]} receiveShadow>
        <planeGeometry args={[14, 12]} />
        <meshPhysicalMaterial
          map={marbleMap}
          color="#ddd4c8"
          roughness={0.2}
          metalness={0.02}
          clearcoat={0.25}
        />
      </mesh>
      <mesh position={[0, 5.1, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <planeGeometry args={[14, 12]} />
        <meshStandardMaterial color="#0a0e1a" roughness={1} />
      </mesh>
      <mesh position={[-6.55, 2.5, 0]} rotation={[0, Math.PI / 2, 0]}>
        <planeGeometry args={[12, 5.2]} />
        <meshStandardMaterial color="#1a1520" roughness={1} />
      </mesh>
    </group>
  )
}

function ArchitecturalLighting() {
  return (
    <>
      <ambientLight intensity={0.35} color="#fff0e0" />
      <hemisphereLight intensity={0.28} color="#fff5eb" groundColor="#2a2520" />
      <directionalLight
        position={[8, 4, 2]}
        intensity={0.85}
        color="#ffb86a"
        castShadow
        shadow-mapSize={[1024, 1024]}
      />
      <pointLight position={[-2, 2.2, 2.5]} intensity={0.4} color="#fff8f0" distance={14} />
    </>
  )
}

export default function PenthouseScenePhotoRoom({
  scrollProgressRef,
}: PenthouseScenePhotoRoomProps) {
  const groupRef = useRef<Group>(null)
  const [mobile, setMobile] = useState(false)

  useEffect(() => {
    const mq = window.matchMedia('(max-width: 768px)')
    const update = () => setMobile(mq.matches)
    update()
    mq.addEventListener('change', update)
    return () => mq.removeEventListener('change', update)
  }, [])

  const textures = useTexture(HERO_IMAGE_PATHS)
  const configured = useMemo(() => textures.map((t) => configurePhotoTexture(t)), [textures])

  const marbleMap = useMemo(() => createMarbleTexture(), [])
  useCameraRig(scrollProgressRef)

  return (
    <group ref={groupRef}>
      <color attach="background" args={['#0a0e1a']} />
      <fog attach="fog" args={['#12151f', 10, 28]} />
      <ArchitecturalLighting />
      <RoomShell marbleMap={marbleMap} />
      {PHOTO_PANELS.map((panel, i) => (
        <PhotoPanel
          key={HERO_IMAGE_PATHS[i]}
          texture={configured[i]}
          config={panel}
          scrollProgressRef={scrollProgressRef}
          mobile={mobile}
        />
      ))}
      <mesh position={[0, 2.5, -5.2]} rotation={[0, 0, 0]}>
        <planeGeometry args={[14, 5.2]} />
        <meshBasicMaterial color="#000000" transparent opacity={0.35} depthWrite={false} />
      </mesh>
    </group>
  )
}
