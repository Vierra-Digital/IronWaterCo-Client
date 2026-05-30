'use client'

import { useMemo, useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import type { Group, Points } from 'three'
import * as THREE from 'three'
import { useCameraRig } from './useCameraRig'
import { createMarbleTexture, createPlasterTexture, createSkylineTexture } from './penthouseTextures'

type PenthouseSceneProceduralProps = {
  scrollProgressRef: React.MutableRefObject<number>
  activeSectionId: string
}

const PLASTER = '#c4b9a8'
const CEILING = '#1a1a1a'
const CERAMIC = '#f3efe8'
const TUB_STONE = '#f0ebe4'
const BRASS_COLOR = '#b8956a'

function useSceneTextures() {
  return useMemo(() => {
    const marbleMap = createMarbleTexture()
    const plasterMap = createPlasterTexture()
    const skylineMap = createSkylineTexture()
    return { marbleMap, plasterMap, skylineMap }
  }, [])
}

/** Slow upward mist — white, max ~12% opacity, no gold sparkles. */
function ShowerSteam() {
  const ref = useRef<Points>(null)
  const count = 48
  const startY = useMemo(() => {
    const ys = new Float32Array(count)
    for (let i = 0; i < count; i++) ys[i] = 0.55 + Math.random() * 1.6
    return ys
  }, [count])

  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3)
    for (let i = 0; i < count; i++) {
      pos[i * 3] = 1.15 + (Math.random() - 0.5) * 0.9
      pos[i * 3 + 1] = startY[i]
      pos[i * 3 + 2] = -0.45 + (Math.random() - 0.5) * 0.5
    }
    return pos
  }, [count, startY])

  useFrame(({ clock }) => {
    if (!ref.current) return
    const posAttr = ref.current.geometry.attributes.position
    if (!posAttr?.array) return
    const arr = posAttr.array as Float32Array
    const t = clock.getElapsedTime()
    for (let i = 0; i < count; i++) {
      const cycle = ((t * 0.125 + i * 0.17) % 8) / 8
      arr[i * 3 + 1] = 0.5 + cycle * 2.1
      arr[i * 3] += Math.sin(t * 0.3 + i) * 0.0008
    }
    posAttr.needsUpdate = true
  })

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" count={count} array={positions} itemSize={3} />
      </bufferGeometry>
      <pointsMaterial
        size={0.065}
        color="#f5f5f5"
        transparent
        opacity={0.11}
        sizeAttenuation
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  )
}

function ArchitecturalLighting() {
  return (
    <>
      <ambientLight intensity={0.18} color="#fff0e0" />
      <hemisphereLight intensity={0.22} color="#fff5eb" groundColor="#3a3530" />
      {/* Golden-hour sun from window (right wall) */}
      <directionalLight
        position={[8, 3.5, 2]}
        intensity={1.35}
        color="#ffb86a"
        castShadow
        shadow-mapSize={[1024, 1024]}
        shadow-camera-far={24}
        shadow-camera-left={-8}
        shadow-camera-right={8}
        shadow-camera-top={8}
        shadow-camera-bottom={-8}
        shadow-bias={-0.0002}
      />
      <directionalLight position={[6, 1.2, 4]} intensity={0.25} color="#ff9d4a" />
      {/* Vanity mirror bounce */}
      <pointLight position={[-2, 2.2, 2.5]} intensity={0.35} color="#fff8f0" distance={8} decay={2} />
      {/* Recessed downlights */}
      {[
        [-2.2, 4.95, 1.5],
        [0.5, 4.95, -0.5],
        [2, 4.95, 1],
        [-0.8, 4.95, -2],
      ].map((pos, i) => (
        <spotLight
          key={i}
          position={pos as [number, number, number]}
          rotation={[-Math.PI / 2, 0, 0]}
          intensity={0.55}
          angle={0.38}
          penumbra={0.85}
          color="#fff4e0"
          distance={9}
          castShadow={i === 0}
        />
      ))}
    </>
  )
}

function RecessedDownlights() {
  const positions: [number, number, number][] = [
    [-2.2, 5.05, 1.5],
    [0.5, 5.05, -0.5],
    [2, 5.05, 1],
    [-0.8, 5.05, -2],
  ]
  return (
    <>
      {positions.map((p, i) => (
        <mesh key={i} position={p} rotation={[Math.PI / 2, 0, 0]}>
          <circleGeometry args={[0.06, 20]} />
          <meshStandardMaterial
            color="#fff8e8"
            emissive="#ffe8c0"
            emissiveIntensity={0.85}
            roughness={0.4}
          />
        </mesh>
      ))}
    </>
  )
}

function FloorGrout({ marbleMap }: { marbleMap: THREE.CanvasTexture }) {
  const tiles: JSX.Element[] = []
  const tileW = 1.4
  const tileH = 1.4
  const cols = 10
  const rows = 8
  const grout = 0.025

  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
      const x = -cols * tileW * 0.5 + col * tileW + tileW * 0.5
      const z = -rows * tileH * 0.5 + row * tileH + tileH * 0.5
      tiles.push(
        <mesh
          key={`${row}-${col}`}
          rotation={[-Math.PI / 2, 0, 0]}
          position={[x, 0.002, z]}
          receiveShadow
        >
          <planeGeometry args={[tileW - grout, tileH - grout]} />
          <meshPhysicalMaterial
            map={marbleMap}
            color="#ebe4d8"
            roughness={0.14}
            metalness={0.02}
            clearcoat={0.35}
            clearcoatRoughness={0.2}
            envMapIntensity={0.6}
          />
        </mesh>
      )
    }
  }
  return <group>{tiles}</group>
}

function WetShowerFloor({ marbleMap }: { marbleMap: THREE.CanvasTexture }) {
  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]} position={[1.3, 0.003, -0.5]} receiveShadow>
      <planeGeometry args={[2.1, 2.2]} />
      <meshPhysicalMaterial
        map={marbleMap}
        color="#d8d0c4"
        roughness={0.08}
        metalness={0.04}
        clearcoat={0.5}
        clearcoatRoughness={0.12}
      />
    </mesh>
  )
}

function WallAO() {
  return (
    <>
      <mesh position={[0, 0.04, -5.35]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[13.5, 0.12]} />
        <meshBasicMaterial color="#000000" transparent opacity={0.22} depthWrite={false} />
      </mesh>
      <mesh position={[0, 5.12, -5.35]}>
        <planeGeometry args={[13.5, 0.1]} />
        <meshBasicMaterial color="#000000" transparent opacity={0.18} depthWrite={false} />
      </mesh>
      <mesh position={[-6.38, 2.6, 0]} rotation={[0, Math.PI / 2, 0]}>
        <planeGeometry args={[11.5, 0.1]} />
        <meshBasicMaterial color="#000000" transparent opacity={0.16} depthWrite={false} />
      </mesh>
    </>
  )
}

function CityWindow({ skylineMap }: { skylineMap: THREE.CanvasTexture }) {
  return (
    <group position={[6.05, 2.2, 0]} rotation={[0, -Math.PI / 2, 0]}>
      {/* Skyline view */}
      <mesh position={[0, 0, -0.08]}>
        <planeGeometry args={[4.5, 3.8]} />
        <meshStandardMaterial
          map={skylineMap}
          emissive="#ffaa55"
          emissiveMap={skylineMap}
          emissiveIntensity={0.35}
          toneMapped
        />
      </mesh>
      {/* Glass */}
      <mesh position={[0, 0, 0.02]}>
        <planeGeometry args={[4.45, 3.75]} />
        <meshPhysicalMaterial
          color="#e8eef2"
          roughness={0.03}
          metalness={0.05}
          transmission={0.92}
          thickness={0.02}
          transparent
          opacity={0.25}
          envMapIntensity={1}
        />
      </mesh>
      {/* Thin dark frame */}
      {[
        { args: [4.6, 0.06, 0.04] as [number, number, number], pos: [0, 1.93, 0.04] as [number, number, number] },
        { args: [4.6, 0.06, 0.04] as [number, number, number], pos: [0, -1.93, 0.04] as [number, number, number] },
        { args: [0.06, 3.86, 0.04] as [number, number, number], pos: [-2.28, 0, 0.04] as [number, number, number] },
        { args: [0.06, 3.86, 0.04] as [number, number, number], pos: [2.28, 0, 0.04] as [number, number, number] },
      ].map((f, i) => (
        <mesh key={i} position={f.pos}>
          <boxGeometry args={f.args} />
          <meshStandardMaterial color="#1c1c1c" roughness={0.7} metalness={0.15} />
        </mesh>
      ))}
    </group>
  )
}

function VanityZone() {
  const brass = useMemo(
    () => ({
      color: BRASS_COLOR,
      roughness: 0.38,
      metalness: 0.88,
    }),
    []
  )

  return (
    <group position={[-2.2, 0, 0.2]} name="zone_vanity">
      <mesh position={[0, 0.5, 0]} castShadow receiveShadow>
        <boxGeometry args={[3.2, 0.95, 0.65]} />
        <meshStandardMaterial color="#3d2e24" roughness={0.62} metalness={0.04} />
      </mesh>
      {/* Under-cabinet LED */}
      <mesh position={[0, 0.06, 0.32]}>
        <boxGeometry args={[2.9, 0.015, 0.04]} />
        <meshStandardMaterial color="#fff4e6" emissive="#ffe8cc" emissiveIntensity={0.25} />
      </mesh>
      <mesh position={[-0.55, 0.92, 0.35]} castShadow>
        <cylinderGeometry args={[0.28, 0.26, 0.12, 32]} />
        <meshStandardMaterial color={CERAMIC} roughness={0.35} metalness={0.02} />
      </mesh>
      <mesh position={[0.55, 0.92, 0.35]} castShadow>
        <cylinderGeometry args={[0.28, 0.26, 0.12, 32]} />
        <meshStandardMaterial color={CERAMIC} roughness={0.35} metalness={0.02} />
      </mesh>
      {[-0.55, 0.55].map((x) => (
        <group key={x} position={[x, 1.05, 0.42]}>
          <mesh castShadow>
            <cylinderGeometry args={[0.025, 0.022, 0.32, 16]} />
            <meshStandardMaterial {...brass} />
          </mesh>
          <mesh position={[0, 0.2, 0]}>
            <sphereGeometry args={[0.05, 16, 16]} />
            <meshStandardMaterial {...brass} />
          </mesh>
        </group>
      ))}
      {/* Mirror backlight halo */}
      <mesh position={[0, 1.85, 0.08]}>
        <boxGeometry args={[2.55, 1.75, 0.04]} />
        <meshStandardMaterial color="#fff8f0" emissive="#fff5eb" emissiveIntensity={0.18} />
      </mesh>
      <mesh position={[0, 1.85, 0.15]}>
        <boxGeometry args={[2.4, 1.6, 0.08]} />
        <meshStandardMaterial color="#d8d4ce" roughness={0.06} metalness={0.75} envMapIntensity={1.2} />
      </mesh>
      <mesh position={[0, 1.85, 0.2]}>
        <boxGeometry args={[2.2, 1.4, 0.02]} />
        <meshPhysicalMaterial
          color="#a8b8c8"
          roughness={0.04}
          metalness={0.9}
          transparent
          opacity={0.45}
          envMapIntensity={1.5}
        />
      </mesh>
    </group>
  )
}

function ShowerZone() {
  const brass = useMemo(
    () => ({
      color: BRASS_COLOR,
      roughness: 0.36,
      metalness: 0.9,
    }),
    []
  )

  return (
    <group position={[1.3, 0, -0.5]} name="zone_shower">
      <mesh position={[0, 1.35, 0]}>
        <boxGeometry args={[0.06, 2.6, 2.2]} />
        <meshPhysicalMaterial
          color="#eef2f5"
          roughness={0.04}
          metalness={0.02}
          transmission={0.88}
          thickness={0.015}
          transparent
          opacity={0.2}
        />
      </mesh>
      <mesh position={[0, 2.55, 0]} castShadow>
        <torusGeometry args={[0.35, 0.045, 20, 48, Math.PI]} />
        <meshStandardMaterial {...brass} />
      </mesh>
      <mesh position={[0, 2.35, 0]}>
        <cylinderGeometry args={[0.12, 0.11, 0.08, 24]} />
        <meshStandardMaterial {...brass} />
      </mesh>
      <mesh position={[-0.15, 1.8, 0]}>
        <cylinderGeometry args={[0.022, 0.02, 1.8, 12]} />
        <meshStandardMaterial {...brass} />
      </mesh>
    </group>
  )
}

function TubZone() {
  const brass = useMemo(
    () => ({
      color: BRASS_COLOR,
      roughness: 0.36,
      metalness: 0.9,
    }),
    []
  )

  return (
    <group position={[0, 0, -1.7]} name="zone_tub">
      <mesh position={[0, 0.02, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <circleGeometry args={[0.72, 32]} />
        <meshBasicMaterial color="#000000" transparent opacity={0.2} depthWrite={false} />
      </mesh>
      <mesh position={[0, 0.42, 0]} castShadow receiveShadow>
        <capsuleGeometry args={[0.55, 1.4, 12, 32]} />
        <meshStandardMaterial color={TUB_STONE} roughness={0.28} metalness={0.04} />
      </mesh>
      <mesh position={[0.7, 0.35, 0.5]}>
        <cylinderGeometry args={[0.03, 0.028, 0.5, 12]} />
        <meshStandardMaterial {...brass} />
      </mesh>
      <mesh position={[0.7, 0.55, 0.5]}>
        <sphereGeometry args={[0.06, 16, 16]} />
        <meshStandardMaterial {...brass} />
      </mesh>
    </group>
  )
}

function RoomShell({
  marbleMap,
  plasterMap,
  skylineMap,
}: {
  marbleMap: THREE.CanvasTexture
  plasterMap: THREE.CanvasTexture
  skylineMap: THREE.CanvasTexture
}) {
  const plasterMat = useMemo(
    () => ({
      map: plasterMap,
      color: PLASTER,
      roughness: 0.92,
      metalness: 0,
    }),
    [plasterMap]
  )

  return (
    <group>
      <FloorGrout marbleMap={marbleMap} />
      <WetShowerFloor marbleMap={marbleMap} />

      {/* Back wall — plaster */}
      <mesh position={[0, 2.6, -5.5]} receiveShadow>
        <boxGeometry args={[14, 5.2, 0.35]} />
        <meshStandardMaterial {...plasterMat} />
      </mesh>

      {/* Left wall — plaster (soft enclosed space, not dark geometry) */}
      <mesh position={[-6.5, 2.6, 0]} rotation={[0, Math.PI / 2, 0]} receiveShadow>
        <boxGeometry args={[12, 5.2, 0.35]} />
        <meshStandardMaterial {...plasterMat} />
      </mesh>

      {[-5.8, -4.2, -2.6].map((y) => (
        <mesh key={y} position={[-6.35, y, 0]} rotation={[0, Math.PI / 2, 0]}>
          <boxGeometry args={[12, 0.12, 0.08]} />
          <meshStandardMaterial color="#b8aea0" roughness={0.85} />
        </mesh>
      ))}

      {/* Right wall — plaster surrounding window */}
      <mesh position={[6.2, 2.6, 0]} rotation={[0, -Math.PI / 2, 0]} receiveShadow>
        <boxGeometry args={[12, 5.2, 0.25]} />
        <meshStandardMaterial {...plasterMat} />
      </mesh>

      <CityWindow skylineMap={skylineMap} />

      {/* Ceiling */}
      <mesh position={[0, 5.15, 0]} rotation={[Math.PI / 2, 0, 0]} receiveShadow>
        <planeGeometry args={[14, 12]} />
        <meshStandardMaterial color={CEILING} roughness={0.95} metalness={0} />
      </mesh>

      <WallAO />
      <RecessedDownlights />
    </group>
  )
}

export default function PenthouseSceneProcedural({
  scrollProgressRef,
}: PenthouseSceneProceduralProps) {
  const rigRef = useRef<Group>(null)
  const { marbleMap, plasterMap, skylineMap } = useSceneTextures()
  useCameraRig(scrollProgressRef)

  return (
    <group ref={rigRef}>
      <color attach="background" args={['#0a0e1a']} />
      <fog attach="fog" args={['#12151f', 14, 32]} />
      <ArchitecturalLighting />
      <RoomShell marbleMap={marbleMap} plasterMap={plasterMap} skylineMap={skylineMap} />
      <VanityZone />
      <ShowerZone />
      <TubZone />
      <ShowerSteam />
    </group>
  )
}
