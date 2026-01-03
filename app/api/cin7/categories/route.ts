import { NextRequest, NextResponse } from 'next/server'
import { cin7Cache } from '@/lib/cin7Cache'

// GET endpoint to fetch all unique categories from products
export async function GET(request: NextRequest) {
  try {
    // Check cache first
    const cacheKey = 'categories:all'
    const cachedCategories = cin7Cache.get<string[]>(cacheKey)
    
    if (cachedCategories && Array.isArray(cachedCategories)) {
      return NextResponse.json({
        success: true,
        categories: cachedCategories,
      })
    }

    // Try to get categories from the cached full product list
    const fullListCacheKey = 'products:full-list-unfiltered'
    const cachedFullList = cin7Cache.get<any[]>(fullListCacheKey)
    
    if (cachedFullList && Array.isArray(cachedFullList) && cachedFullList.length > 0) {
      // Extract unique categories from cached products
      // Use the same logic as the products route to extract categories
      const categorySet = new Set<string>()
      cachedFullList.forEach((product: any) => {
        // Try the same category extraction logic as in products route
        const categoryId = product.CategoryID || product.categoryID || product.CategoryId
        // For now, just use the direct category field (category mapping would require category API)
        const categoryName = product.Category || 
                            product.category || 
                            product.ProductCategory || 
                            product.CategoryName || 
                            'Uncategorized'
        
        if (categoryName && 
            categoryName !== 'Uncategorized' && 
            categoryName !== '' && 
            categoryName !== null && 
            categoryName !== undefined &&
            typeof categoryName === 'string') {
          categorySet.add(categoryName.trim())
        }
      })
      const categories = Array.from(categorySet).filter(cat => cat && cat.length > 0).sort()
      
      console.log(`Extracted ${categories.length} categories from ${cachedFullList.length} cached products`)
      if (categories.length > 0) {
        console.log(`Sample categories: ${categories.slice(0, 5).join(', ')}`)
      }
      
      // Cache categories for 30 minutes
      if (categories.length > 0) {
        cin7Cache.set(cacheKey, categories, 30 * 60 * 1000)
      }
      
      return NextResponse.json({
        success: true,
        categories,
      })
    }

    // If no cached products, return empty array (will be populated when products are fetched)
    return NextResponse.json({
      success: true,
      categories: [],
    })
  } catch (error: any) {
    console.error('Error fetching categories:', error)
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to fetch categories',
        message: error.message || 'Unknown error',
      },
      { status: 500 }
    )
  }
}

