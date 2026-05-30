import * as THREE from 'three'

/** Golden-hour city skyline for the floor-to-ceiling window. */
export function createSkylineTexture(): THREE.CanvasTexture {
  const w = 1024
  const h = 768
  const canvas = document.createElement('canvas')
  canvas.width = w
  canvas.height = h
  const ctx = canvas.getContext('2d')
  if (!ctx) return new THREE.CanvasTexture(canvas)

  const sky = ctx.createLinearGradient(0, 0, 0, h)
  sky.addColorStop(0, '#0f1a2e')
  sky.addColorStop(0.25, '#2a3f6b')
  sky.addColorStop(0.45, '#c9783a')
  sky.addColorStop(0.62, '#e8a04a')
  sky.addColorStop(0.78, '#d4884a')
  sky.addColorStop(1, '#1a120c')
  ctx.fillStyle = sky
  ctx.fillRect(0, 0, w, h)

  const sunGlow = ctx.createRadialGradient(w * 0.72, h * 0.38, 0, w * 0.72, h * 0.38, w * 0.35)
  sunGlow.addColorStop(0, 'rgba(255, 210, 140, 0.55)')
  sunGlow.addColorStop(0.4, 'rgba(255, 160, 80, 0.15)')
  sunGlow.addColorStop(1, 'rgba(255, 120, 40, 0)')
  ctx.fillStyle = sunGlow
  ctx.fillRect(0, 0, w, h)

  const buildings: { x: number; bw: number; bh: number; tone: string }[] = [
    { x: 0.02, bw: 0.08, bh: 0.42, tone: '#0a0e14' },
    { x: 0.1, bw: 0.06, bh: 0.55, tone: '#121820' },
    { x: 0.17, bw: 0.1, bh: 0.38, tone: '#0d1118' },
    { x: 0.28, bw: 0.07, bh: 0.62, tone: '#151c28' },
    { x: 0.36, bw: 0.09, bh: 0.48, tone: '#10151e' },
    { x: 0.46, bw: 0.05, bh: 0.7, tone: '#1a2230' },
    { x: 0.52, bw: 0.11, bh: 0.45, tone: '#0e121a' },
    { x: 0.64, bw: 0.08, bh: 0.58, tone: '#141a24' },
    { x: 0.73, bw: 0.06, bh: 0.35, tone: '#0c1016' },
    { x: 0.8, bw: 0.1, bh: 0.52, tone: '#161e2a' },
    { x: 0.9, bw: 0.08, bh: 0.44, tone: '#11161f' },
  ]

  buildings.forEach(({ x, bw, bh, tone }) => {
    const bx = x * w
    const bwPx = bw * w
    const bhPx = bh * h * 0.55
    ctx.fillStyle = tone
    ctx.fillRect(bx, h - bhPx, bwPx, bhPx)
    if (Math.random() > 0.3) {
      ctx.fillStyle = 'rgba(255, 200, 120, 0.08)'
      for (let row = 0; row < 6; row++) {
        for (let col = 0; col < 3; col++) {
          if (Math.random() > 0.55) {
            ctx.fillRect(
              bx + col * (bwPx / 4) + 4,
              h - bhPx + row * (bhPx / 8) + 6,
              bwPx / 6,
              bhPx / 12
            )
          }
        }
      }
    }
  })

  const tex = new THREE.CanvasTexture(canvas)
  tex.colorSpace = THREE.SRGBColorSpace
  return tex
}

/** Calacatta-style marble with subtle veining. */
export function createMarbleTexture(): THREE.CanvasTexture {
  const size = 512
  const canvas = document.createElement('canvas')
  canvas.width = size
  canvas.height = size
  const ctx = canvas.getContext('2d')
  if (!ctx) return new THREE.CanvasTexture(canvas)

  ctx.fillStyle = '#ebe4d8'
  ctx.fillRect(0, 0, size, size)

  for (let i = 0; i < 28; i++) {
    ctx.strokeStyle = `rgba(140, 135, 128, ${0.06 + Math.random() * 0.12})`
    ctx.lineWidth = 0.5 + Math.random() * 2
    ctx.beginPath()
    ctx.moveTo(Math.random() * size, Math.random() * size)
    ctx.bezierCurveTo(
      Math.random() * size,
      Math.random() * size,
      Math.random() * size,
      Math.random() * size,
      Math.random() * size,
      Math.random() * size
    )
    ctx.stroke()
  }

  const tex = new THREE.CanvasTexture(canvas)
  tex.wrapS = tex.wrapT = THREE.RepeatWrapping
  tex.repeat.set(3, 3)
  tex.colorSpace = THREE.SRGBColorSpace
  return tex
}

/** Plaster wall micro-variation. */
export function createPlasterTexture(): THREE.CanvasTexture {
  const size = 256
  const canvas = document.createElement('canvas')
  canvas.width = size
  canvas.height = size
  const ctx = canvas.getContext('2d')
  if (!ctx) return new THREE.CanvasTexture(canvas)

  ctx.fillStyle = '#c4b9a8'
  ctx.fillRect(0, 0, size, size)

  const img = ctx.getImageData(0, 0, size, size)
  for (let i = 0; i < img.data.length; i += 4) {
    const n = (Math.random() - 0.5) * 14
    img.data[i] = Math.min(255, Math.max(0, img.data[i] + n))
    img.data[i + 1] = Math.min(255, Math.max(0, img.data[i + 1] + n))
    img.data[i + 2] = Math.min(255, Math.max(0, img.data[i + 2] + n))
  }
  ctx.putImageData(img, 0, 0)

  const tex = new THREE.CanvasTexture(canvas)
  tex.wrapS = tex.wrapT = THREE.RepeatWrapping
  tex.repeat.set(2, 2)
  tex.colorSpace = THREE.SRGBColorSpace
  return tex
}
