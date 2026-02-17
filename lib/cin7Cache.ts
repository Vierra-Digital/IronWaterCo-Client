interface CacheEntry<T> {
  data: T
  timestamp: number
  ttl: number
}

class Cin7Cache {
  private cache: Map<string, CacheEntry<any>> = new Map()
  private readonly DEFAULT_TTL = 5 * 60 * 1000

  get<T>(key: string): T | null {
    const entry = this.cache.get(key)
    if (!entry) return null

    if (Date.now() - entry.timestamp > entry.ttl) {
      this.cache.delete(key)
      return null
    }

    return entry.data as T
  }

  set<T>(key: string, data: T, ttl: number = this.DEFAULT_TTL): void {
    this.cache.set(key, { data, timestamp: Date.now(), ttl })
  }

  delete(key: string): void {
    this.cache.delete(key)
  }

  clear(): void {
    this.cache.clear()
  }

  size(): number {
    return this.cache.size
  }

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

export const cin7Cache = new Cin7Cache()

if (typeof setInterval !== 'undefined') {
  setInterval(() => cin7Cache.cleanup(), 10 * 60 * 1000)
}

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
