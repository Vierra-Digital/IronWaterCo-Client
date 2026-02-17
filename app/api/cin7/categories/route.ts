import { NextRequest, NextResponse } from 'next/server'
import { cin7Cache } from '@/lib/cin7Cache'
import { readProductFileCache } from '@/lib/cin7FileCache'
import { fetchCin7Data } from '@/lib/cin7Api'

const CACHE_TTL = 2 * 60 * 60 * 1000

function extractCategories(products: any[]): string[] {
  const categorySet = new Set<string>()
  products.forEach((product: any) => {
    const categoryName = product.Category ||
      product.category ||
      product.ProductCategory ||
      product.CategoryName ||
      'Uncategorized'

    if (
      categoryName &&
      categoryName !== 'Uncategorized' &&
      categoryName !== '' &&
      typeof categoryName === 'string'
    ) {
      categorySet.add(categoryName.trim())
    }
  })
  return Array.from(categorySet).filter(cat => cat && cat.length > 0).sort()
}

export async function GET(request: NextRequest) {
  try {
    const cacheKey = 'categories:all'

    const cachedCategories = cin7Cache.get<string[]>(cacheKey)
    if (cachedCategories && Array.isArray(cachedCategories) && cachedCategories.length > 0) {
      return NextResponse.json({ success: true, categories: cachedCategories })
    }

    const fullListCacheKey = 'products:full-list-unfiltered'
    const cachedFullList = cin7Cache.get<any[]>(fullListCacheKey)

    if (cachedFullList && Array.isArray(cachedFullList) && cachedFullList.length > 0) {
      const categories = extractCategories(cachedFullList)
      if (categories.length > 0) {
        cin7Cache.set(cacheKey, categories, CACHE_TTL)
      }
      return NextResponse.json({ success: true, categories })
    }

    const fileCached = readProductFileCache()
    if (fileCached && fileCached.products.length > 0) {
      cin7Cache.set(fullListCacheKey, fileCached.products, CACHE_TTL)
      cin7Cache.set('products:total', fileCached.total, CACHE_TTL)
      const categories = extractCategories(fileCached.products)
      if (categories.length > 0) {
        cin7Cache.set(cacheKey, categories, CACHE_TTL)
      }
      return NextResponse.json({ success: true, categories })
    }

    try {
      const categoryData = await fetchCin7Data('/Category', { limit: '1000' }, undefined, true)
      const rawCategories = categoryData.Categories || categoryData.Category || categoryData || []
      if (Array.isArray(rawCategories) && rawCategories.length > 0) {
        const categories = rawCategories
          .map((cat: any) => cat.Name || cat.name || cat.CategoryName || '')
          .filter((name: string) => name && name.trim().length > 0 && name !== 'Uncategorized')
          .map((name: string) => name.trim())
          .sort()

        const uniqueCategories = Array.from(new Set(categories))

        if (uniqueCategories.length > 0) {
          cin7Cache.set(cacheKey, uniqueCategories, CACHE_TTL)
        }

        return NextResponse.json({ success: true, categories: uniqueCategories })
      }
    } catch {
      // Cin7 Category API not available
    }

    return NextResponse.json({ success: true, categories: [] })
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: 'Failed to fetch categories', message: error.message || 'Unknown error' },
      { status: 500 }
    )
  }
}
