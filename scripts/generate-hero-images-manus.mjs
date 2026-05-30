#!/usr/bin/env node
/**
 * Generate 5 hero images via Manus async tasks API.
 * Usage: node scripts/generate-hero-images-manus.mjs
 * Requires MANUS_API_KEY in .env.local
 */
import { readFileSync, writeFileSync, mkdirSync, existsSync, statSync } from 'fs'
import { join, dirname } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const root = join(__dirname, '..')
const outDir = join(root, 'public/images/hero')
const BASE_URL = 'https://api.manus.im/v1'

function loadEnv() {
  const path = join(root, '.env.local')
  if (!existsSync(path)) {
    throw new Error('Missing .env.local — add MANUS_API_KEY before proceeding.')
  }
  const text = readFileSync(path, 'utf8')
  const env = {}
  for (const line of text.split('\n')) {
    const m = line.match(/^([A-Z_]+)=(.*)$/)
    if (m) env[m[1]] = m[2].replace(/^["']|["']$/g, '')
  }
  if (!env.MANUS_API_KEY) {
    throw new Error('MANUS_API_KEY not set in .env.local — add it before proceeding.')
  }
  return env
}

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

const SCENES = [
  {
    file: 'scene-1-full-room.jpg',
    prompt:
      'Ultra-luxury penthouse bathroom wide establishing shot, dark moody interior, freestanding dome bathtub center frame, double dark walnut vanity with aged brass faucets, floor-to-ceiling city window golden hour glow, Calacatta marble floors, warm plaster walls, recessed lighting, Architectural Digest editorial photography, photorealistic, 16:9 aspect ratio',
  },
  {
    file: 'scene-2-shower.jpg',
    prompt:
      'Extreme close up ultra-luxury shower, aged brushed brass rain shower head, Calacatta marble wet wall subtle grey veining, steam rising, golden hour backlight, moody dark atmosphere, architectural detail photography, photorealistic, 16:9 aspect ratio',
  },
  {
    file: 'scene-3-bathtub.jpg',
    prompt:
      'Freestanding stone resin dome bathtub ultra-luxury penthouse bathroom, matte warm white, Calacatta marble surround, warm golden ambient light from floor-to-ceiling window, soft shadows, single white towel draped over edge, Architectural Digest editorial photography, photorealistic, 16:9 aspect ratio',
  },
  {
    file: 'scene-4-hardware.jpg',
    prompt:
      'Extreme macro close up aged brushed brass bathroom faucet hardware, visible surface texture and oxidation, warm studio light raking across metal surface, dark moody background, shallow depth of field, luxury product photography, photorealistic, 16:9 aspect ratio',
  },
  {
    file: 'scene-5-cta.jpg',
    prompt:
      'Ultra-luxury penthouse bathroom full room golden hour, warm amber light shaft cutting across Calacatta marble floor, dark walnut double vanity brass fixtures, freestanding bathtub, Manhattan skyline at dusk through floor-to-ceiling window, deep corner shadows, warm recessed lighting, Architectural Digest editorial photography, photorealistic, 16:9 aspect ratio',
  },
]

let apiKey

async function manusFetch(path, options = {}) {
  const res = await fetch(`${BASE_URL}${path}`, {
    ...options,
    headers: {
      API_KEY: apiKey,
      'Content-Type': 'application/json',
      ...options.headers,
    },
  })
  const text = await res.text()
  let json
  try {
    json = JSON.parse(text)
  } catch {
    json = { raw: text }
  }
  if (!res.ok) {
    const err = new Error(`Manus ${path} HTTP ${res.status}: ${text.slice(0, 800)}`)
    err.body = text
    err.status = res.status
    throw err
  }
  return json
}

async function submitJob(prompt) {
  return manusFetch('/tasks', {
    method: 'POST',
    body: JSON.stringify({
      prompt: `Generate ONE photorealistic JPEG image. ${prompt}. When finished, reply with ONLY a single direct HTTPS URL to download the JPG file.`,
      agentProfile: 'manus-1.6-lite',
    }),
  })
}

async function checkStatus(jobId) {
  const task = await manusFetch(`/tasks/${jobId}`)
  return {
    status: task.status,
    error: task.error || task.message,
    url: extractImageUrl(task),
    raw: task,
  }
}

function extractImageUrl(task) {
  const urls = []
  const walk = (obj) => {
    if (!obj) return
    if (typeof obj === 'string') {
      const matches = obj.matchAll(/https?:\/\/[^\s"'<>)]+/gi)
      for (const m of matches) {
        const u = m[0].replace(/[.,;]+$/, '')
        if (/\.(jpg|jpeg|png|webp)(\?|$)/i.test(u) || u.includes('manuscdn.com')) {
          urls.push(u)
        }
      }
    } else if (Array.isArray(obj)) {
      obj.forEach(walk)
    } else if (typeof obj === 'object') {
      Object.values(obj).forEach(walk)
    }
  }
  walk(task)
  if (task.url) urls.unshift(task.url)
  if (task.image_url) urls.unshift(task.image_url)
  if (task.output?.url) urls.unshift(task.output.url)
  return urls.find((u) => /\.(jpg|jpeg|png|webp)/i.test(u) || u.includes('manuscdn')) || urls[0]
}

async function generateAndSave(prompt, filename) {
  const dest = join(outDir, filename)

  const job = await submitJob(prompt)
  const jobId = job.id || job.task_id || job.job_id
  if (!jobId) {
    throw new Error(`No job id in submit response: ${JSON.stringify(job).slice(0, 500)}`)
  }
  console.log(`Submitted job ${jobId} for ${filename}`)

  let result = null
  let attempts = 0
  // Manus agent image tasks typically finish in ~2.5–3 min (120s is often too short).
  const maxAttempts = Number(process.env.MANUS_MAX_ATTEMPTS) || 70

  while (attempts < maxAttempts) {
    await sleep(3000)
    const status = await checkStatus(jobId)
    console.log(
      `Job ${jobId} | attempt ${attempts + 1}/${maxAttempts} | status: ${status.status} | elapsed: ${(attempts + 1) * 3}s`
    )

    if (status.status === 'completed' || status.status === 'success' || status.status === 'done') {
      result = status
      break
    }

    if (status.status === 'failed' || status.status === 'error') {
      throw new Error(`Job ${jobId} failed: ${status.error || JSON.stringify(status.raw).slice(0, 400)}`)
    }

    attempts++
  }

  if (!result) {
    throw new Error(`Job ${jobId} timed out after ${maxAttempts * 3} seconds`)
  }

  const imageUrl = result.url || result.image_url || result.output?.url
  if (!imageUrl) {
    throw new Error(
      `Job ${jobId} completed but no image URL found. Response: ${JSON.stringify(result.raw).slice(0, 600)}`
    )
  }

  const imageRes = await fetch(imageUrl)
  if (!imageRes.ok) {
    throw new Error(`Download failed HTTP ${imageRes.status}: ${imageUrl}`)
  }
  const buffer = Buffer.from(await imageRes.arrayBuffer())
  writeFileSync(dest, buffer)
  console.log(`✓ Saved: ${dest}`)
}

async function main() {
  const env = loadEnv()
  apiKey = env.MANUS_API_KEY
  mkdirSync(outDir, { recursive: true })

  console.log('Manus hero image generation — sequential, 3s poll, 120s timeout per image\n')

  const succeeded = []
  const failed = []

  for (const scene of SCENES) {
    console.log(`\n--- ${scene.file} ---`)
    try {
      await generateAndSave(scene.prompt, scene.file)
      succeeded.push(scene.file)
    } catch (e) {
      console.error(`✗ Failed ${scene.file}: ${e.message}`)
      if (e.body) console.error(`  Response body: ${String(e.body).slice(0, 500)}`)
      failed.push({ file: scene.file, error: e.message })
    }
  }

  console.log('\n=== File check ===')
  for (const scene of SCENES) {
    const dest = join(outDir, scene.file)
    if (existsSync(dest)) {
      const { size } = statSync(dest)
      console.log(`  ${scene.file} — ${(size / 1024).toFixed(1)} KB`)
    } else {
      console.log(`  ${scene.file} — MISSING`)
    }
  }

  console.log('\n=== Hero paths (data/homepage.ts) ===')
  const heroPaths = SCENES.map((s) => `/images/hero/${s.file}`)
  heroPaths.forEach((p, i) => console.log(`  scene-${i + 1} → ${p}`))
  console.log('  (heroScenes in data/homepage.ts + SceneHeroBeat / CinematicImageHero use these paths)')

  console.log('\n=== Summary ===')
  console.log(`Succeeded (${succeeded.length}):`, succeeded.join(', ') || 'none')
  if (failed.length) {
    console.log(`Failed (${failed.length}):`)
    failed.forEach((f) => console.log(`  - ${f.file}: ${f.error}`))
    process.exitCode = 1
  }
}

main().catch((e) => {
  console.error(e)
  process.exit(1)
})
