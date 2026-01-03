// Simple in-memory cache for Cin7 API responses
// This helps reduce API calls and improve performance

interface CacheEntry<T> {
  data: T
  timestamp: number
  ttl: number // Time to live in milliseconds
}

class Cin7Cache {
  private cache: Map<string, CacheEntry<any>> = new Map()
  private readonly DEFAULT_TTL = 5 * 60 * 1000 // 5 minutes default

  // Get cached data if it exists and hasn't expired
  get<T>(key: string): T | null {
    const entry = this.cache.get(key)
    if (!entry) {
      return null
    }

    const now = Date.now()
    if (now - entry.timestamp > entry.ttl) {
      // Entry has expired
      this.cache.delete(key)
      return null
    }

    return entry.data as T
  }

  // Set cached data with optional TTL
  set<T>(key: string, data: T, ttl: number = this.DEFAULT_TTL): void {
    this.cache.set(key, {
      data,
      timestamp: Date.now(),
      ttl,
    })
  }

  // Delete a specific cache entry
  delete(key: string): void {
    this.cache.delete(key)
  }

  // Clear all cache
  clear(): void {
    this.cache.clear()
  }

  // Get cache size
  size(): number {
    return this.cache.size
  }

  // Clean up expired entries
  cleanup(): void {
    const now = Date.now()
    const keysToDelete: string[] = []
    this.cache.forEach((entry, key) => {
      if (now - entry.timestamp > entry.ttl) {
        keysToDelete.push(key)
      }
    })
    keysToDelete.forEach(key => this.cache.delete(key))
  }
}

// Singleton instance
export const cin7Cache = new Cin7Cache()

// Clean up expired entries every 10 minutes
if (typeof setInterval !== 'undefined') {
  setInterval(() => {
    cin7Cache.cleanup()
  }, 10 * 60 * 1000)
}

// Cache key generators
export function getProductsCacheKey(params: {
  page?: number
  limit?: number
  category?: string
  search?: string
  sortBy?: string
  sortOrder?: string
}): string {
  return `products:${JSON.stringify(params)}`
}

export function getProductCacheKey(productId: string): string {
  return `product:${productId}`
}

export function getSalesDataCacheKey(): string {
  return 'sales:data'
}

export function getProductIndexCacheKey(): string {
  return 'product:index'
}

