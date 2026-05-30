import { sectionGlobalBounds, type PinnedSectionId } from './storySections'

const HERO_IDS: PinnedSectionId[] = [
  'scene-hero-1',
  'scene-hero-2',
  'scene-hero-3',
  'scene-hero-4',
  'scene-hero-5',
]

/** Fade photo panels in/out as the scroll camera visits each hero station. */
export function photoWallOpacity(globalProgress: number, stationIndex: number, mobile = false): number {
  const id = HERO_IDS[stationIndex]
  if (!id) return 0

  const { start, end } = sectionGlobalBounds(id, mobile)
  const span = end - start || 0.001
  const local = (globalProgress - start) / span

  if (local < 0 || local > 1) return 0
  if (local < 0.12) return local / 0.12
  if (local > 0.88) return (1 - local) / 0.12
  return 1
}
