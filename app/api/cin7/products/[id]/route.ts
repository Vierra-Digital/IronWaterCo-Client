import { NextRequest, NextResponse } from 'next/server'
import { cin7Cache, getProductCacheKey, getProductsCacheKey, getProductIndexCacheKey } from '@/lib/cin7Cache'
import { fetchCin7Data } from '@/lib/cin7Api'

// GET endpoint to fetch a single product by ID from Cin7
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  console.log('=== PRODUCT API ROUTE CALLED ===')
  console.log('Request URL:', request.url)
  console.log('Params:', params)
  try {
    // Decode the product identifier (SKU or ID) in case it's URL-encoded
    // Handle both encoded and unencoded formats
    let productIdentifier = params.id
    try {
      productIdentifier = decodeURIComponent(params.id)
    } catch (e) {
      // If decoding fails, use the original
      productIdentifier = params.id
    }
    console.log('Looking up product with SKU/ID:', productIdentifier, '(original:', params.id, ', decoded:', productIdentifier, ')')

    if (!productIdentifier) {
      return NextResponse.json(
        { success: false, error: 'Product SKU or ID is required' },
        { status: 400 }
      )
    }

    // Check individual product cache first (try both SKU and ID as cache keys)
    const cacheKeyBySku = getProductCacheKey(`sku:${productIdentifier}`)
    const cacheKeyById = getProductCacheKey(productIdentifier)
    let data = cin7Cache.get<any>(cacheKeyBySku) || cin7Cache.get<any>(cacheKeyById)
    
    if (data) {
      console.log('✓ Using cached product data')
    } else {
      // Check product index cache (built from store page loads)
      const indexCacheKey = getProductIndexCacheKey()
      const productIndex = cin7Cache.get<Record<string, any>>(indexCacheKey)
      if (productIndex) {
        const searchValue = String(productIdentifier).trim()
        // Try SKU first, then ID
        data = productIndex[`sku:${searchValue}`] || productIndex[searchValue.toLowerCase()] || productIndex[searchValue]
        if (data) {
          console.log('✓ Found product in index cache')
        }
      }
    }
    
    if (!data) {
      // Search through cached products lists first (prioritize SKU matching)
      console.log('🔍 STEP 1: Searching cached products lists for SKU/ID:', productIdentifier)
      let foundInCache = false
      
      // Search through cached products lists first (prioritize SKU matching)
      // Check common cache keys (first few pages that are likely cached)
      // Increase to 20 pages to cover more cached data
      for (let page = 1; page <= 20; page++) {
        // Try different limit sizes that might be cached
        for (const limit of [20, 100, 1000]) {
          const productsCacheKey = getProductsCacheKey({ page, limit })
          const cachedProductsData = cin7Cache.get<any>(productsCacheKey)
          
          if (cachedProductsData) {
            // The cached data might be the raw API response or our transformed format
            let productsList: any[] = []
            if (cachedProductsData.products && Array.isArray(cachedProductsData.products)) {
              productsList = cachedProductsData.products
            } else if (cachedProductsData.Products && Array.isArray(cachedProductsData.Products)) {
              productsList = cachedProductsData.Products
            } else if (Array.isArray(cachedProductsData)) {
              productsList = cachedProductsData
            }
            
            if (productsList.length > 0) {
              console.log(`Checking ${productsList.length} cached products from page ${page} (limit ${limit})...`)
              
              // Search by SKU first (more reliable), then by ID as fallback
              const foundProduct = productsList.find((p: any, index: number) => {
                // Handle both transformed format (from our API) and raw Cin7 format
                const pSku = String(p.sku || p.SKU || p.Sku || '').trim()
                const pId = String(p.id || p.ID || p.Id || '').trim()
                const searchValue = String(productIdentifier).trim()
                
                // Log first few products for debugging
                if (index < 3) {
                  console.log(`  Sample product ${index + 1}: SKU="${pSku}", ID="${pId}", Name="${p.name || p.Name || ''}"`)
                }
                
                // Try exact SKU match first (most reliable)
                if (pSku && pSku === searchValue) {
                  console.log(`✓ Found in cache by SKU (exact): "${pSku}" === "${searchValue}"`)
                  return true
                }
                // Try SKU match (case-insensitive)
                if (pSku && pSku.toLowerCase() === searchValue.toLowerCase()) {
                  console.log(`✓ Found in cache by SKU (case-insensitive): "${pSku}" === "${searchValue}"`)
                  return true
                }
                // Try ID match (exact) - fallback
                if (pId && pId === searchValue) {
                  console.log(`✓ Found in cache by ID (exact): "${pId}" === "${searchValue}"`)
                  return true
                }
                // Try ID match (case-insensitive) - fallback
                if (pId && pId.toLowerCase() === searchValue.toLowerCase()) {
                  console.log(`✓ Found in cache by ID (case-insensitive): "${pId}" === "${searchValue}"`)
                  return true
                }
                // Try ID without dashes - fallback
                const pIdNoDashes = pId.replace(/-/g, '').toLowerCase()
                const searchValueNoDashes = searchValue.replace(/-/g, '').toLowerCase()
                if (pIdNoDashes && searchValueNoDashes && pIdNoDashes === searchValueNoDashes) {
                  console.log(`✓ Found in cache by ID (no dashes): "${pId}" === "${searchValue}"`)
                  return true
                }
                return false
              })
              
          if (foundProduct) {
            console.log('Found product in cached products list!')
            // The found product is in raw Cin7 format, which is what we need
            data = foundProduct
            foundInCache = true
            break
          }
            }
          }
        }
        if (foundInCache) break
      }
      
      // Check the full product list cache (populated by background warm)
      if (!foundInCache) {
        const fullListKey = 'products:full-list-unfiltered'
        const fullList = cin7Cache.get<any[]>(fullListKey)
        if (fullList && Array.isArray(fullList) && fullList.length > 0) {
          const searchValue = String(productIdentifier).trim()
          const foundProduct = fullList.find((p: any) => {
            const pSku = String(p.SKU || p.sku || p.Sku || '').trim()
            const pId = String(p.ID || p.id || p.Id || '').trim()
            if (pSku && pSku === searchValue) return true
            if (pSku && pSku.toLowerCase() === searchValue.toLowerCase()) return true
            if (pId === searchValue) return true
            if (pId.toLowerCase() === searchValue.toLowerCase()) return true
            return false
          })
          if (foundProduct) {
            console.log('✓ Found product in full list cache')
            data = foundProduct
            foundInCache = true
          }
        }
      }

      // Last resort: sequential API search (rate-limited, one page at a time)
      if (!foundInCache) {
        console.log('Product not in any cache. Searching API sequentially...')
        try {
          const pageSize = 1000
          const searchValue = String(productIdentifier).trim()
          let found = false
          let searchedPages = 0

          for (let page = 1; page <= 200 && !found; page++) {
            try {
              const batchData = await fetchCin7Data('/Products', {
                page: page.toString(),
                limit: pageSize.toString(),
              }, undefined, true)
              const products = batchData.Products || batchData.ProductsList || batchData || []

              if (!Array.isArray(products) || products.length === 0) break

              searchedPages++
              const product = products.find((p: any) => {
                const pSku = String(p.SKU || p.sku || p.Sku || '').trim()
                const pId = String(p.ID || p.id || p.Id || '').trim()
                if (pSku && pSku === searchValue) return true
                if (pSku && pSku.toLowerCase() === searchValue.toLowerCase()) return true
                if (pId === searchValue) return true
                if (pId.toLowerCase() === searchValue.toLowerCase()) return true
                return false
              })

              if (product) {
                console.log(`✓ Product found on page ${page}`)
                data = product
                found = true
              }
            } catch (error: any) {
              if (error.message?.includes('429')) {
                console.log('Rate limited during product search, stopping')
                break
              }
              console.error(`Error fetching page ${page}:`, error.message)
            }
          }

          if (!found) {
            return NextResponse.json(
              {
                success: false,
                error: 'Product not found',
                productIdentifier: productIdentifier,
                message: `Searched ${searchedPages} pages but could not find product with SKU/ID: ${productIdentifier}`,
              },
              { status: 404 }
            )
          }
        } catch (error: any) {
          console.error('Error searching for product:', error)
          return NextResponse.json(
            {
              success: false,
              error: 'Failed to fetch product',
              message: error.message || 'Unknown error',
            },
            { status: 500 }
          )
        }
      }
      
      // Cache the found product data (by both SKU and ID for faster lookups)
      if (data) {
        const productSku = String(data.SKU || data.sku || data.Sku || '').trim()
        const productId = String(data.ID || data.id || data.Id || '').trim()
        
        // Cache by SKU if available
        if (productSku) {
          cin7Cache.set(getProductCacheKey(`sku:${productSku}`), data, 10 * 60 * 1000)
        }
        // Cache by ID
        if (productId) {
          cin7Cache.set(getProductCacheKey(productId), data, 10 * 60 * 1000)
        }
        // Also cache by the search identifier
        cin7Cache.set(cacheKeyById, data, 10 * 60 * 1000)
      }
    }

    // Handle both single product and array responses
    const productData = Array.isArray(data) ? data[0] : data

    if (!productData) {
      console.error(`Product lookup failed: No product data found for SKU/ID: ${productIdentifier}`)
      console.error(`Data value:`, data)
      console.error(`Searched through cache and API but product was not found`)
      return NextResponse.json(
        { 
          success: false, 
          error: 'Product not found',
          message: `Product with SKU/ID "${productIdentifier}" was not found after searching all available products.`,
          productIdentifier: productIdentifier
        },
        { status: 404 }
      )
    }
    
    console.log(`✓ Product found successfully: ${productData.Name || productData.name || 'Unknown'} (SKU: ${productData.SKU || productData.sku || 'N/A'}, ID: ${productData.ID || productData.id || 'N/A'})`)

    // Product is already cached above (lines 365-373), no need to cache again here

    // Fetch category name from Category API if category ID is present
    let categoryName = productData.Category || productData.category || productData.ProductCategory || productData.CategoryName || 'Uncategorized'
    const categoryId = productData.CategoryID || productData.categoryID || productData.CategoryId
    if (categoryId) {
        try {
          // Use silent mode for category API since it's optional and may not exist
          const categoryData = await fetchCin7Data('/Category', { limit: '1000' }, undefined, true)
          const categories = categoryData.Categories || categoryData.Category || categoryData || []
          if (Array.isArray(categories)) {
            const foundCategory = categories.find((cat: any) => (cat.ID || cat.id || cat.CategoryID) === categoryId)
            if (foundCategory) {
              categoryName = foundCategory.Name || foundCategory.name || foundCategory.CategoryName || categoryName
            }
          }
        } catch (error) {
          // Category API not available, using product category field
        }
    }

    // Transform Cin7 response to our format
    // Ensure ID matches the format used in the products list
    const productIdFromData = productData.ID || productData.id || productData.Id || productIdentifier
    const product = {
      id: String(productIdFromData), // Ensure ID is a string
      name: productData.Name || productData.name || 'Unnamed Product',
      sku: productData.SKU || productData.sku || productData.Sku || '',
      barcode: productData.Barcode || productData.barcode || productData.BARCODE || productData.BarCode || null,
      description: productData.Description || productData.description || '',
      price: productData['Price Tier 1'] || productData.PriceTier1 || productData.PriceTier1Price || productData.priceTier1 || productData.priceTier1Price || productData.Price || productData.price || productData.SalePrice || productData.salePrice || 0,
      cost: productData.Cost || productData.cost || 0,
      category: categoryName,
      brand: productData.Brand || productData.brand || productData.Manufacturer || '',
      images: productData.Images || productData.images || productData.Image || productData.image || [],
      stockOnHand: productData.StockOnHand || productData.stockOnHand || productData.QuantityOnHand || productData.quantityOnHand || 0,
      inStock: (productData.StockOnHand || productData.stockOnHand || productData.QuantityOnHand || productData.quantityOnHand || 0) > 0,
      attributes: productData.Attributes || productData.attributes || {},
    }

    return NextResponse.json({
      success: true,
      product,
    })
  } catch (error: any) {
    console.error('Cin7 API error:', error)
    console.error('Error details:', {
      message: error.message,
      stack: error.stack,
      name: error.name,
      productIdentifier: params.id,
    })
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to fetch product',
        message: error.message || 'Unknown error',
        productIdentifier: params.id,
      },
      { status: 500 }
    )
  }
}

