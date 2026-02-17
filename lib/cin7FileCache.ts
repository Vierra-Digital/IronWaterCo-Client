import * as fs from 'fs'
import * as path from 'path'

const FILE_CACHE_DIR = path.join(process.cwd(), '.cache')
const FILE_CACHE_TTL = 4 * 60 * 60 * 1000

interface FileCacheEnvelope {
  timestamp: number
  total: number
  products: any[]
}

function ensureCacheDir(): void {
  try {
    if (!fs.existsSync(FILE_CACHE_DIR)) {
      fs.mkdirSync(FILE_CACHE_DIR, { recursive: true })
    }
  } catch {
    // Directory might already exist
  }
}

export function readProductFileCache(): { products: any[]; total: number } | null {
  try {
    const filePath = path.join(FILE_CACHE_DIR, 'products.json')
    if (!fs.existsSync(filePath)) return null

    const raw = fs.readFileSync(filePath, 'utf-8')
    const envelope: FileCacheEnvelope = JSON.parse(raw)

    if (Date.now() - envelope.timestamp > FILE_CACHE_TTL) return null
    if (!Array.isArray(envelope.products) || envelope.products.length === 0) return null

    return { products: envelope.products, total: envelope.total }
  } catch {
    return null
  }
}

export function writeProductFileCache(products: any[], total: number): void {
  try {
    ensureCacheDir()
    const filePath = path.join(FILE_CACHE_DIR, 'products.json')
    const envelope: FileCacheEnvelope = { timestamp: Date.now(), total, products }
    fs.writeFileSync(filePath, JSON.stringify(envelope))
  } catch {
    // Write failed silently
  }
}

export function clearProductFileCache(): void {
  try {
    const filePath = path.join(FILE_CACHE_DIR, 'products.json')
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath)
    }
  } catch {
    // Clear failed silently
  }
}
