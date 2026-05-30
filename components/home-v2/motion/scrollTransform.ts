/** Clamp scroll progress for WAAPI-safe transforms (inputs must stay in [0, 1]). */
export function clamp01(n: number): number {
  return Math.min(1, Math.max(0, n))
}

export function remap(
  v: number,
  inMin: number,
  inMax: number,
  outMin = 0,
  outMax = 1
): number {
  if (inMax <= inMin) return outMin
  const t = clamp01((v - inMin) / (inMax - inMin))
  return outMin + (outMax - outMin) * t
}
