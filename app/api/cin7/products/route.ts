import { NextRequest, NextResponse } from 'next/server'
import { cin7Cache, getProductsCacheKey, getSalesDataCacheKey, getProductIndexCacheKey } from '@/lib/cin7Cache'

// Cin7 API configuration
// Dear Inventory API base URL - working endpoint format
// Documentation: https://dearinventory.docs.apiary.io/
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

interface Cin7Response {
  Products?: Cin7Product[]
  ProductsList?: Cin7Product[]
  [key: string]: any
}

// Helper function to make authenticated requests to Cin7 API
async function fetchCin7Data(endpoint: string, params?: Record<string, string>, baseUrlOverride?: string, silent = false) {
  if (!CIN7_API_USERNAME || !CIN7_API_KEY) {
    throw new Error('Cin7 API credentials are not configured')
  }

  // Build URL - Dear Inventory API format
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

  // Get response text first to check if it's JSON or HTML
  const responseText = await response.text()
  
  // Check if response is HTML (error page)
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

// Helper function to fetch and aggregate sales data
async function getProductSalesData(): Promise<Record<string, number>> {
  // Check cache first
  const cacheKey = getSalesDataCacheKey()
  const cached = cin7Cache.get<Record<string, number>>(cacheKey)
  if (cached) {
    console.log('Using cached sales data')
    return cached
  }

  const salesCounts: Record<string, number> = {}
  
  try {
    // Fetch sales orders from Cin7 - limit to 1 page to avoid rate limits and speed up
    // Try different endpoint formats
    const endpoints = ['/Sale', '/Sales', '/SalesOrder', '/SalesOrders']
    
    for (const endpoint of endpoints) {
      try {
        // Only fetch first page to avoid rate limits and keep it fast
        const salesData = await fetchCin7Data(endpoint, {
          page: '1',
          limit: '100',
        }, undefined, true)
        
        const orders = salesData.Sale || salesData.Sales || salesData.SalesOrder || salesData.SalesOrders || salesData || []
        
        if (Array.isArray(orders) && orders.length > 0) {
          // Process each order
          orders.forEach((order: any) => {
            const lines = order.Lines || order.LineItems || order.Items || []
            if (Array.isArray(lines)) {
              lines.forEach((line: any) => {
                const productId = line.ProductID || line.ProductId || line.productID || line.Product?.ID || line.Product?.id
                const quantity = line.Quantity || line.quantity || line.Qty || 0
                
                if (productId && quantity > 0) {
                  const id = String(productId)
                  salesCounts[id] = (salesCounts[id] || 0) + quantity
                }
              })
            }
          })
          
          // If we got data, break out of endpoint loop
          if (Object.keys(salesCounts).length > 0) {
            break
          }
        }
      } catch (err) {
        continue // Try next endpoint
      }
    }
    
    // Cache the sales data for 30 minutes (sales data changes less frequently)
    if (Object.keys(salesCounts).length > 0) {
      cin7Cache.set(cacheKey, salesCounts, 30 * 60 * 1000)
    }
  } catch (error) {
    // Sales data is optional, so we'll continue without it
    // Don't log errors to avoid noise
  }
  
  return salesCounts
}

// GET endpoint to fetch products from Cin7
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    // Get pagination parameters - only fetch what's needed for the current page
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '20')
    const category = searchParams.get('category')
    const search = searchParams.get('search')
    const sortByParam = searchParams.get('sortBy') || 'name'
    const sortBy = sortByParam === 'popularity' ? 'popularity' : (sortByParam === 'name' ? 'name' : sortByParam === 'price' ? 'price' : sortByParam === 'category' ? 'category' : 'name')
    const sortOrderParam = searchParams.get('sortOrder')
    const sortOrder = sortOrderParam || (sortBy === 'popularity' ? 'desc' : 'asc') // Default to desc for popularity

    // When searching or sorting, we need to fetch ALL products to work across everything
    // For search queries and any sorting, fetch all products in batches and filter/sort client-side
    // This ensures sorting works across all 26,000 products, not just the current page
    // Always use full list to ensure accurate sorting across all products
    const needsFullSearch = true // Always use full cached list for proper sorting across all products
    
    // Also check for total count cache (separate cache for total)
    const totalCacheKey = 'products:total'
    let totalCount = cin7Cache.get<number>(totalCacheKey)
    
    // If we still don't have total count, use known total
    if (!totalCount) {
      // Known total from user: 26,255 products
      totalCount = 26255
    }

    let allProducts: Cin7Product[] = []
    
    if (needsFullSearch) {
      // For search, fetch ALL products in batches
      // Check for cached full product list first (use unfiltered list, then filter client-side)
      const fullListCacheKey = 'products:full-list-unfiltered'
      const cachedFullList = cin7Cache.get<Cin7Product[]>(fullListCacheKey)
      
      if (cachedFullList && Array.isArray(cachedFullList) && cachedFullList.length > 0) {
        console.log(`Using cached full product list (${cachedFullList.length} products)`)
        allProducts = cachedFullList
      } else {
        // Fetch all products in parallel batches for faster loading
        // Rate limit: 60 calls per 60 seconds, so we can fetch up to 60 pages in parallel
        // But we'll limit concurrency to 10 to be safe and avoid overwhelming the API
        console.log('Fetching all products for search in parallel batches...')
        const pageSize = 1000
        const maxPages = Math.ceil(totalCount / pageSize) + 2
        const concurrencyLimit = 10 // Fetch 10 pages at a time
        const results: Array<{ page: number; products: Cin7Product[] }> = []
        const errors: Array<{ page: number; error: any }> = []
        
        // Helper function to fetch a single page
        const fetchPage = async (pageNum: number): Promise<void> => {
          try {
            const batchParams: Record<string, string> = {
              page: pageNum.toString(),
              limit: pageSize.toString(),
            }
            
            const batchData = await fetchCin7Data('/Products', batchParams)
            const batchProducts = batchData.Products || batchData.ProductsList || batchData || []
            
            if (Array.isArray(batchProducts) && batchProducts.length > 0) {
              results.push({ page: pageNum, products: batchProducts })
              console.log(`✓ Fetched page ${pageNum}: ${batchProducts.length} products`)
            }
          } catch (error: any) {
            if (error.message && error.message.includes('429')) {
              // Rate limit - will retry later
              errors.push({ page: pageNum, error })
              console.log(`⚠ Rate limit on page ${pageNum}, will retry`)
            } else {
              console.error(`✗ Error fetching page ${pageNum}:`, error.message)
            }
          }
        }
        
        // Fetch pages in batches with controlled concurrency
        for (let startPage = 1; startPage <= maxPages; startPage += concurrencyLimit) {
          const endPage = Math.min(startPage + concurrencyLimit - 1, maxPages)
          const batchPromises: Promise<void>[] = []
          
          // Create promises for this batch
          for (let page = startPage; page <= endPage; page++) {
            batchPromises.push(fetchPage(page))
          }
          
          // Wait for all pages in this batch to complete
          await Promise.all(batchPromises)
          
          // Small delay between batches to respect rate limits
          if (endPage < maxPages) {
            await new Promise(resolve => setTimeout(resolve, 1200)) // 1.2s delay between batches
          }
        }
        
        // Retry failed pages (rate limit errors)
        if (errors.length > 0) {
          console.log(`Retrying ${errors.length} pages that hit rate limits...`)
          await new Promise(resolve => setTimeout(resolve, 5000)) // Wait 5s before retrying
          
          for (const { page } of errors) {
            try {
              const batchParams: Record<string, string> = {
                page: page.toString(),
                limit: pageSize.toString(),
              }
              const batchData = await fetchCin7Data('/Products', batchParams)
              const batchProducts = batchData.Products || batchData.ProductsList || batchData || []
              if (Array.isArray(batchProducts) && batchProducts.length > 0) {
                results.push({ page, products: batchProducts })
                console.log(`✓ Retried page ${page}: ${batchProducts.length} products`)
              }
            } catch (retryError: any) {
              console.error(`✗ Retry failed for page ${page}:`, retryError.message)
            }
            await new Promise(resolve => setTimeout(resolve, 1100)) // Delay between retries
          }
        }
        
        // Sort results by page number and combine
        results.sort((a, b) => a.page - b.page)
        for (const result of results) {
          allProducts.push(...result.products)
        }
        
        console.log(`Finished fetching ${allProducts.length} products for search`)
        
        // Cache the full unfiltered list for 30 minutes
        if (allProducts.length > 0) {
          cin7Cache.set(fullListCacheKey, allProducts, 30 * 60 * 1000)
          console.log(`Cached ${allProducts.length} products for 30 minutes`)
          
          // Also update categories cache from the full product list
          const categorySet = new Set<string>()
          allProducts.forEach((product: Cin7Product) => {
            const category = product.Category || product.category || product.ProductCategory || product.CategoryName
            if (category && category !== 'Uncategorized') {
              categorySet.add(category)
            }
          })
          const allCategories = Array.from(categorySet).sort()
          cin7Cache.set('categories:all', allCategories, 30 * 60 * 1000)
          console.log(`Updated categories cache with ${allCategories.length} categories`)
        }
      }
    } else {
      // For non-search requests, fetch only what's needed
      const cin7Page = page
      const cin7Limit = Math.min(limit, 1000)
      
      // Build query parameters for Cin7 API
      const params: Record<string, string> = {
        page: cin7Page.toString(),
        limit: cin7Limit.toString(),
      }
      
      // Add category filter if provided
      if (category && category !== 'all') {
        params.Category = category
      }
      
      // Check cache first
      const cacheKey = getProductsCacheKey({ 
        page: cin7Page, 
        limit: cin7Limit, 
        category, 
        search: undefined,
        sortBy, 
        sortOrder 
      })
      let data = cin7Cache.get<any>(cacheKey)
      
      if (!data) {
        // Fetch products from Cin7 - only what we need
        try {
          data = await fetchCin7Data('/Products', params)
          
          // Try to get total from API response
          if (!totalCount && (data.Total || data.total || data.Count || data.count)) {
            totalCount = data.Total || data.total || data.Count || data.count
            // Cache total for 30 minutes (changes less frequently)
            cin7Cache.set(totalCacheKey, totalCount, 30 * 60 * 1000)
          }
          
          // Cache the products data for 5 minutes
          cin7Cache.set(cacheKey, data, 5 * 60 * 1000)
        } catch (fetchError: any) {
          console.error('Error fetching products from Cin7:', fetchError)
          throw new Error(`Failed to fetch products: ${fetchError.message}`)
        }
      }
      
      // Convert to array format
      allProducts = data.Products || data.ProductsList || data || []
    }
    
    // Fetch sales data if sorting by popularity - but don't block if it fails
    let salesData: Record<string, number> = {}
    if (sortBy === 'popularity') {
      try {
        console.log('Fetching sales data for popularity sorting...')
        salesData = await getProductSalesData()
        console.log(`Fetched sales data for ${Object.keys(salesData).length} products`)
      } catch (error: any) {
        // If sales data fails, continue without it
        console.log('Sales data fetch failed, continuing without popularity data:', error.message)
        salesData = {}
      }
    }

    // Fetch categories from Cin7 Category API if available
    // Note: Category endpoint may not be available, so we'll try but fall back to product category field
    let categoryMap: Record<string, string> = {}
    try {
      // Try different category endpoint formats
      const categoryEndpoints = ['/Categories', '/Category', '/ProductCategory']
      for (const endpoint of categoryEndpoints) {
        try {
          // Use silent mode for category API since it's optional and may not exist
          const categoryData = await fetchCin7Data(endpoint, { limit: '1000' }, undefined, true)
          const categories = categoryData.Categories || categoryData.Category || categoryData || []
          if (Array.isArray(categories) && categories.length > 0) {
            categories.forEach((cat: any) => {
              const catId = cat.ID || cat.id || cat.CategoryID
              const catName = cat.Name || cat.name || cat.CategoryName
              if (catId && catName) {
                categoryMap[catId] = catName
              }
            })
            break // Successfully fetched categories
          }
        } catch (err) {
          continue // Try next endpoint silently
        }
      }
    } catch (error) {
      // Category API not available, using product category field directly
    }

    // Transform Cin7 response to our format
    // Ensure all required fields are mapped: Name, SKU, Stock, Image, Category, Price
    const products = allProducts.map((product: Cin7Product) => {
      // Get category - try to map from category API first, then fall back to product field
      const categoryId = product.CategoryID || product.categoryID || product.CategoryId
      const categoryName = categoryId && categoryMap[categoryId] 
        ? categoryMap[categoryId]
        : (product.Category || product.category || product.ProductCategory || product.CategoryName || 'Uncategorized')
      
      const productId = String(product.ID || product.id || product.Id || '')
      return {
        id: productId,
        name: product.Name || product.name || 'Unnamed Product',
        sku: product.SKU || product.sku || product.Sku || '',
        description: product.Description || product.description || '',
        price: product['Price Tier 1'] || product.PriceTier1 || product.PriceTier1Price || product.priceTier1 || product.priceTier1Price || product.Price || product.price || product.SalePrice || product.salePrice || 0,
        cost: product.Cost || product.cost || 0,
        category: categoryName,
        brand: product.Brand || product.brand || product.Manufacturer || '',
        images: product.Images || product.images || product.Image || product.image || [],
        stockOnHand: product.StockOnHand || product.stockOnHand || product.QuantityOnHand || product.quantityOnHand || 0,
        inStock: (product.StockOnHand || product.stockOnHand || product.QuantityOnHand || product.quantityOnHand || 0) > 0,
        attributes: product.Attributes || product.attributes || {},
        salesCount: salesData[productId] || 0, // Add sales count for popularity sorting
      }
    })

    // Client-side filtering (search and category)
    let filteredProducts = products
    
    // Filter by category if provided
    if (category && category !== 'all') {
      filteredProducts = filteredProducts.filter((product) => {
        return product.category && product.category === category
      })
    }
    
    // Filter by search query if provided
    if (search) {
      const searchLower = search.toLowerCase()
      filteredProducts = filteredProducts.filter((product) => {
        const nameMatch = product.name?.toLowerCase().includes(searchLower) || false
        const skuMatch = product.sku?.toLowerCase().includes(searchLower) || false
        const brandMatch = product.brand?.toLowerCase().includes(searchLower) || false
        const categoryMatch = product.category?.toLowerCase().includes(searchLower) || false
        const descriptionMatch = product.description?.toLowerCase().includes(searchLower) || false
        return nameMatch || skuMatch || brandMatch || categoryMatch || descriptionMatch
      })
    }

    // Client-side sorting (Cin7 API may not support all sort options)
    let sortedProducts = [...filteredProducts]
    if (sortBy === 'name') {
      sortedProducts.sort((a, b) => {
        const comparison = a.name.localeCompare(b.name)
        return sortOrder === 'asc' ? comparison : -comparison
      })
    } else if (sortBy === 'price') {
      sortedProducts.sort((a, b) => {
        const comparison = a.price - b.price
        return sortOrder === 'asc' ? comparison : -comparison
      })
    } else if (sortBy === 'category') {
      sortedProducts.sort((a, b) => {
        // Handle null/undefined/empty categories - put them at the end
        const categoryA = a.category || 'ZZZ_Uncategorized' // Put uncategorized at end
        const categoryB = b.category || 'ZZZ_Uncategorized'
        
        // Case-insensitive comparison for consistent sorting
        const comparison = categoryA.toLowerCase().localeCompare(categoryB.toLowerCase())
        
        // If categories are the same, sort by name as secondary sort
        if (comparison === 0) {
          const nameComparison = (a.name || '').localeCompare(b.name || '')
          return sortOrder === 'asc' ? nameComparison : -nameComparison
        }
        
        return sortOrder === 'asc' ? comparison : -comparison
      })
    } else if (sortBy === 'popularity') {
      sortedProducts.sort((a, b) => {
        const comparison = (a.salesCount || 0) - (b.salesCount || 0)
        // Default to descending (most sold first)
        return sortOrder === 'asc' ? comparison : -comparison
      })
    }

    // Paginate products (when we fetched all products for search/sort, paginate client-side)
    let paginatedProducts = sortedProducts
    if (needsFullSearch && sortedProducts.length > limit) {
      const startIndex = (page - 1) * limit
      const endIndex = startIndex + limit
      paginatedProducts = sortedProducts.slice(startIndex, endIndex)
    }
    
    // Calculate total and hasMore
    let finalTotal = totalCount
    if (search || (category && category !== 'all')) {
      // For search or category filter, use the filtered count
      finalTotal = sortedProducts.length
    } else if (needsFullSearch) {
      // For sorting with full list, use the sorted count (all products are sorted)
      finalTotal = sortedProducts.length
    }
    
    const hasMore = needsFullSearch
      ? (sortedProducts.length > page * limit)
      : (totalCount > page * limit)

    return NextResponse.json({
      success: true,
      products: paginatedProducts,
      total: finalTotal,
      page: page,
      limit: limit,
      hasMore: hasMore,
    })
  } catch (error: any) {
    console.error('Cin7 API error:', error)
    console.error('Error stack:', error.stack)
    console.error('Error details:', {
      message: error.message,
      name: error.name,
      cause: error.cause,
    })
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to fetch products',
        message: error.message || 'Unknown error',
        details: process.env.NODE_ENV === 'development' ? error.stack : undefined,
      },
      { status: 500 }
    )
  }
}

