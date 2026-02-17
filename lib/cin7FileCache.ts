// File-based cache for Cin7 product data
// This module uses Node.js fs/path and must only be imported in server-side code (API routes)

import * as fs from 'fs'
import * as path from 'path'

const FILE_CACHE_DIR = path.join(process.cwd(), '.cache')
const FILE_CACHE_TTL = 4 * 60 * 60 * 1000 // 4 hours

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
    // Directory might already exist or can't be created
  }
}

export function readProductFileCache(): { products: any[]; total: number } | null {
  try {
    const filePath = path.join(FILE_CACHE_DIR, 'products.json')
    if (!fs.existsSync(filePath)) return null

    const raw = fs.readFileSync(filePath, 'utf-8')
    const envelope: FileCacheEnvelope = JSON.parse(raw)

    if (Date.now() - envelope.timestamp > FILE_CACHE_TTL) {
      console.log('[File cache] Expired, ignoring')
      return null
    }

    if (!Array.isArray(envelope.products) || envelope.products.length === 0) {
      return null
    }

    console.log(`[File cache] Read ${envelope.products.length.toLocaleString()} products`)
    return { products: envelope.products, total: envelope.total }
  } catch (error: any) {
    console.error('[File cache] Read error:', error.message)
    return null
  }
}

export function writeProductFileCache(products: any[], total: number): void {
  try {
    ensureCacheDir()
    const filePath = path.join(FILE_CACHE_DIR, 'products.json')
    const envelope: FileCacheEnvelope = {
      timestamp: Date.now(),
      total,
      products,
    }
    fs.writeFileSync(filePath, JSON.stringify(envelope))
    console.log(`[File cache] Wrote ${products.length.toLocaleString()} products`)
  } catch (error: any) {
    console.error('[File cache] Write error:', error.message)
  }
}

export function clearProductFileCache(): void {
  try {
    const filePath = path.join(FILE_CACHE_DIR, 'products.json')
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath)
      console.log('[File cache] Cleared')
    }
  } catch (error: any) {
    console.error('[File cache] Clear error:', error.message)
  }
}
