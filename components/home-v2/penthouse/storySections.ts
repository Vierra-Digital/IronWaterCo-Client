/** Pinned chapters — hero camera tour + content sections over the 3D backdrop. */
export const PINNED_SECTIONS = [
  { id: 'scene-hero-1', vh: 165, vhMobile: 140 },
  { id: 'scene-hero-2', vh: 155, vhMobile: 130 },
  { id: 'scene-hero-3', vh: 155, vhMobile: 130 },
  { id: 'scene-hero-4', vh: 155, vhMobile: 130 },
  { id: 'scene-hero-5', vh: 155, vhMobile: 130 },
  { id: 'scene-services', vh: 210, vhMobile: 180 },
  { id: 'scene-why', vh: 200, vhMobile: 170 },
  { id: 'scene-wwdd', vh: 220, vhMobile: 190 },
  { id: 'scene-testimonials', vh: 200, vhMobile: 170 },
  { id: 'scene-team', vh: 190, vhMobile: 165 },
  { id: 'scene-transition', vh: 150, vhMobile: 130 },
] as const

export const CONTACT_VH = 140
export const CONTACT_VH_MOBILE = 120

export type PinnedSectionId = (typeof PINNED_SECTIONS)[number]['id']

export function sectionVh(id: PinnedSectionId, mobile = false): number {
  const s = PINNED_SECTIONS.find((x) => x.id === id)
  if (!s) return 200
  return mobile && s.vhMobile ? s.vhMobile : s.vh
}

export function totalPinnedVh(mobile = false): number {
  return PINNED_SECTIONS.reduce(
    (sum, s) => sum + (mobile && s.vhMobile ? s.vhMobile : s.vh),
    0
  )
}

export function sectionStarts(mobile = false): { id: PinnedSectionId; start: number }[] {
  const total = totalPinnedVh(mobile)
  let acc = 0
  return PINNED_SECTIONS.map((s) => {
    const start = acc / total
    const vh = mobile && s.vhMobile ? s.vhMobile : s.vh
    acc += vh
    return { id: s.id, start }
  })
}

export function sectionGlobalBounds(
  id: PinnedSectionId,
  mobile = false
): { start: number; end: number } {
  const total = totalPinnedVh(mobile)
  let acc = 0
  for (const s of PINNED_SECTIONS) {
    const vh = mobile && s.vhMobile ? s.vhMobile : s.vh
    if (s.id === id) {
      return { start: acc / total, end: (acc + vh) / total }
    }
    acc += vh
  }
  return { start: 0, end: 1 }
}

export function activeSectionId(globalProgress: number, mobile = false): PinnedSectionId {
  const starts = sectionStarts(mobile)
  let active = starts[0].id
  for (const { id, start } of starts) {
    if (globalProgress >= start) active = id
  }
  return active
}

export function globalToCameraProgress(global: number): number {
  return Math.min(1, Math.max(0, global))
}

export function backdropFadeRange(mobile = false): { fadeStart: number; fadeEnd: number } {
  const { start } = sectionGlobalBounds('scene-transition', mobile)
  const span = 0.05
  return { fadeStart: start, fadeEnd: Math.min(1, start + span) }
}
