import { NextRequest, NextResponse } from 'next/server'
import { cin7Cache, getProductCacheKey, getProductsCacheKey, getProductIndexCacheKey } from '@/lib/cin7Cache'

// Cin7 API configuration
// Dear Inventory API base URL - working endpoint format
const CIN7_API_BASE_URL = 'https://inventory.dearsystems.com/externalapi'
const CIN7_API_USERNAME = process.env.CIN7_API_USERNAME
const CIN7_API_KEY = process.env.CIN7_API_KEY

interface Cin7Product {
  ID: string
  Name: string
  SKU: string
  Description?: string
  Price?: number
  PriceTier1?: number
  'Price Tier 1'?: number
  PriceTier1Price?: number
  Cost?: number
  Category?: string
  CategoryID?: string
  CategoryId?: string
  categoryID?: string
  CategoryName?: string
  ProductCategory?: string
  Brand?: string
  Images?: string[]
  StockOnHand?: number
  Attributes?: Record<string, any>
  [key: string]: any
}

// Helper function to make authenticated requests to Cin7 API
async function fetchCin7Data(endpoint: string, params?: Record<string, string>, baseUrlOverride?: string, silent = false) {
  if (!CIN7_API_USERNAME || !CIN7_API_KEY) {
    throw new Error('Cin7 API credentials are not configured')
  }

  const baseUrl = baseUrlOverride || CIN7_API_BASE_URL
  const url = new URL(`${baseUrl}${endpoint}`)
  if (params) {
    Object.entries(params).forEach(([key, value]) => {
      url.searchParams.append(key, value)
    })
  }

  const response = await fetch(url.toString(), {
    method: 'GET',
    headers: {
      'api-auth-accountid': CIN7_API_USERNAME,
      'api-auth-applicationkey': CIN7_API_KEY,
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    },
  })

  const responseText = await response.text()
  
  if (responseText.trim().startsWith('<!DOCTYPE') || responseText.trim().startsWith('<html')) {
    if (!silent) {
      console.error('Cin7 API returned HTML instead of JSON:', responseText.substring(0, 500))
    }
    throw new Error(`Cin7 API returned HTML error page. Status: ${response.status}. Check API endpoint and credentials.`)
  }

  if (!response.ok) {
    if (!silent) {
      console.error('Cin7 API error response:', {
        status: response.status,
        statusText: response.statusText,
        body: responseText.substring(0, 500),
      })
    }
    throw new Error(`Cin7 API error: ${response.status} - ${response.statusText}`)
  }

  try {
    return JSON.parse(responseText)
  } catch (parseError) {
    if (!silent) {
      console.error('Failed to parse JSON response:', responseText.substring(0, 500))
    }
    throw new Error(`Invalid JSON response from Cin7 API: ${parseError}`)
  }
}

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
      
      // If not found in cache, search through API products using parallel search
      if (!foundInCache) {
        console.log('🔍 STEP 2: Product not found in cached products lists. Searching through API in parallel...')
        try {
          console.log('🔍 STEP 3: Parallel searching through products by SKU/ID:', productIdentifier)
          const pageSize = 1000
          const totalProducts = 26255 // Total number of products in Cin7
          const totalPages = Math.ceil(totalProducts / pageSize) // ~27 pages
          const searchValue = String(productIdentifier).trim()
          
          // Parallel search: search multiple pages at once (5 pages at a time to avoid rate limits)
          const batchSize = 5 // Search 5 pages in parallel
          let found = false
          let searchedPages = 0
          
          // Search in batches of 5 pages in parallel
          for (let startPage = 1; startPage <= totalPages && !found; startPage += batchSize) {
            const endPage = Math.min(startPage + batchSize - 1, totalPages)
            console.log(`Searching pages ${startPage}-${endPage} in parallel...`)
            
            // Fetch all pages in this batch in parallel
            const pagePromises = []
            for (let page = startPage; page <= endPage; page++) {
              pagePromises.push(
                fetchCin7Data('/Products', { 
                  page: page.toString(), 
                  limit: pageSize.toString() 
                }, undefined, true).catch((err) => {
                  console.error(`Error fetching page ${page}:`, err.message)
                  return null
                })
              )
            }
            
            // Wait for all pages in this batch
            const batchResults = await Promise.all(pagePromises)
            
            // Search through all results from this batch
            for (let i = 0; i < batchResults.length; i++) {
              const batchData = batchResults[i]
              if (!batchData) continue
              
              const page = startPage + i
              const products = batchData.Products || batchData.ProductsList || batchData || []
              
              if (Array.isArray(products) && products.length > 0) {
                searchedPages++
                
                // Try to find the product - prioritize SKU matching (more reliable)
                const product = products.find((p: any) => {
                  const pSku = String(p.SKU || p.sku || p.Sku || '').trim()
                  const pId = String(p.ID || p.id || p.Id || '').trim()
                  
                  // Try exact SKU match first (most reliable)
                  if (pSku && pSku === searchValue) return true
                  // Try SKU match (case-insensitive)
                  if (pSku && pSku.toLowerCase() === searchValue.toLowerCase()) return true
                  // Try ID exact match (fallback)
                  if (pId === searchValue) return true
                  // Try ID case-insensitive match (fallback)
                  if (pId.toLowerCase() === searchValue.toLowerCase()) return true
                  // Try without dashes (UUID format) - fallback
                  const pIdNoDashes = pId.replace(/-/g, '').toLowerCase()
                  const searchValueNoDashes = searchValue.replace(/-/g, '').toLowerCase()
                  if (pIdNoDashes && searchValueNoDashes && pIdNoDashes === searchValueNoDashes) return true
                  return false
                })
                
                if (product) {
                  console.log(`✓ Product found in page ${page}! SKU: ${product.SKU || product.sku || 'N/A'}, ID: ${product.ID || product.id || 'N/A'}`)
                  data = product
                  found = true
                  break
                }
              }
            }
            
            if (found) break
          }
          
          if (!found) {
            console.error(`Product with SKU/ID ${productIdentifier} not found after searching ${searchedPages} pages`)
            return NextResponse.json(
              { 
                success: false, 
                error: 'Product not found',
                searchedPages: searchedPages,
                productIdentifier: productIdentifier,
                message: `Searched through ${searchedPages * pageSize} products but could not find product with SKU/ID: ${productIdentifier}`,
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

