import * as THREE from 'three'
import { PINNED_SECTIONS, sectionGlobalBounds, type PinnedSectionId } from './storySections'

export type CameraStation = {
  id: string
  globalStart: number
  globalEnd: number
  position: [number, number, number]
  lookAt: [number, number, number]
  fov: number
}

/** Shorter edges = longer holds; content shows while camera rests mid-chapter. */
export const TRANSITION_EDGE = 0.07

type CameraPose = {
  position: [number, number, number]
  lookAt: [number, number, number]
  fov: number
}

/** Pose per chapter (order matches PINNED_SECTIONS). */
export const CAMERA_POSES: Record<PinnedSectionId, CameraPose> = {
  'scene-hero-1': {
    position: [0, 1.75, 7.5],
    lookAt: [0, 1.1, 0],
    fov: 58,
  },
  'scene-hero-2': {
    position: [2.8, 1.55, 1.5],
    lookAt: [1.4, 1.35, -0.6],
    fov: 42,
  },
  'scene-hero-3': {
    position: [0.8, 0.95, 2.8],
    lookAt: [0, 0.75, -1.6],
    fov: 46,
  },
  'scene-hero-4': {
    position: [-3.2, 1.35, 2.2],
    lookAt: [-2.2, 1.05, 0.3],
    fov: 44,
  },
  'scene-hero-5': {
    position: [0, 2.4, 8.2],
    lookAt: [0, 1, 0],
    fov: 56,
  },
  'scene-services': {
    position: [1.4, 2.15, 7.8],
    lookAt: [0.6, 0.95, 0.2],
    fov: 54,
  },
  'scene-why': {
    position: [-1.2, 2.05, 7.4],
    lookAt: [-0.4, 0.9, 0],
    fov: 52,
  },
  'scene-wwdd': {
    position: [0.5, 1.85, 6.8],
    lookAt: [0, 0.85, -0.5],
    fov: 50,
  },
  'scene-testimonials': {
    position: [-0.8, 2.25, 8.5],
    lookAt: [0, 1, 0.5],
    fov: 55,
  },
  'scene-team': {
    position: [0, 2.5, 9],
    lookAt: [0, 1.05, 0],
    fov: 57,
  },
  'scene-transition': {
    position: [0, 2.6, 9.5],
    lookAt: [0, 1, 0],
    fov: 58,
  },
}

let stationOverrides: CameraStation[] | null = null

export function buildCameraStations(mobile = false): CameraStation[] {
  return PINNED_SECTIONS.map((section) => {
    const pose = CAMERA_POSES[section.id]
    const { start, end } = sectionGlobalBounds(section.id, mobile)
    return {
      id: section.id,
      globalStart: start,
      globalEnd: end,
      ...pose,
    }
  })
}

export function syncCameraStations(mobile = false) {
  stationOverrides = buildCameraStations(mobile)
}

export function getCameraStations(): CameraStation[] {
  return stationOverrides ?? buildCameraStations(false)
}

export function setCameraStationOverrides(stations: CameraStation[] | null) {
  stationOverrides = stations
}

export const CAM_EMPTY_NAMES = [
  'cam_establishing',
  'cam_shower',
  'cam_tub',
  'cam_vanity',
  'cam_window',
] as const

function smootherstep(t: number): number {
  const c = Math.max(0, Math.min(1, t))
  return c * c * (3 - 2 * c)
}

export function sampleCameraPath(t: number): {
  position: THREE.Vector3
  lookAt: THREE.Vector3
  fov: number
} {
  const stations = getCameraStations()
  const clamped = Math.max(0, Math.min(1, t))

  let idx = 0
  for (let i = 0; i < stations.length; i++) {
    if (clamped >= stations[i].globalStart) idx = i
  }

  const station = stations[idx]
  const prev = stations[Math.max(0, idx - 1)]
  const next = stations[Math.min(stations.length - 1, idx + 1)]

  const span = station.globalEnd - station.globalStart || 0.001
  const local = (clamped - station.globalStart) / span

  const pos = new THREE.Vector3(...station.position)
  const look = new THREE.Vector3(...station.lookAt)
  let fov = station.fov

  if (local >= TRANSITION_EDGE && local <= 1 - TRANSITION_EDGE) {
    return { position: pos, lookAt: look, fov }
  }

  if (local < TRANSITION_EDGE && idx > 0) {
    const blend = smootherstep(local / TRANSITION_EDGE)
    const fromPos = new THREE.Vector3(...prev.position)
    const fromLook = new THREE.Vector3(...prev.lookAt)
    return {
      position: fromPos.lerp(pos, blend),
      lookAt: fromLook.lerp(look, blend),
      fov: prev.fov + (fov - prev.fov) * blend,
    }
  }

  if (local > 1 - TRANSITION_EDGE && idx < stations.length - 1) {
    const blend = smootherstep((local - (1 - TRANSITION_EDGE)) / TRANSITION_EDGE)
    const toPos = new THREE.Vector3(...next.position)
    const toLook = new THREE.Vector3(...next.lookAt)
    return {
      position: pos.lerp(toPos, blend),
      lookAt: look.lerp(toLook, blend),
      fov: fov + (next.fov - fov) * blend,
    }
  }

  return { position: pos, lookAt: look, fov }
}

/** True when camera is holding still (safe to show chapter content). */
export function isCameraHolding(t: number): boolean {
  const stations = getCameraStations()
  const clamped = Math.max(0, Math.min(1, t))

  for (const station of stations) {
    if (clamped < station.globalStart || clamped > station.globalEnd) continue
    const span = station.globalEnd - station.globalStart || 0.001
    const local = (clamped - station.globalStart) / span
    return local >= TRANSITION_EDGE && local <= 1 - TRANSITION_EDGE
  }
  return false
}

export function applyCameraTargets(
  stations: CameraStation[],
  targets: Partial<Record<string, { position: THREE.Vector3; lookAt: THREE.Vector3 }>>
): CameraStation[] {
  const map: Record<string, number> = {
    cam_establishing: 0,
    cam_shower: 1,
    cam_tub: 2,
    cam_vanity: 3,
    cam_window: 4,
  }
  return stations.map((s, i) => {
    const key = Object.entries(map).find(([, idx]) => idx === i)?.[0]
    if (!key || !targets[key]) return s
    const tgt = targets[key]!
    return {
      ...s,
      position: [tgt.position.x, tgt.position.y, tgt.position.z],
      lookAt: [tgt.lookAt.x, tgt.lookAt.y, tgt.lookAt.z],
    }
  })
}
