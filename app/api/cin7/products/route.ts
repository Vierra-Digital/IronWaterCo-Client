import { NextRequest, NextResponse } from 'next/server'
import { cin7Cache, getSalesDataCacheKey } from '@/lib/cin7Cache'
import { readProductFileCache, writeProductFileCache, clearProductFileCache } from '@/lib/cin7FileCache'
import { fetchCin7Data } from '@/lib/cin7Api'

const FULL_LIST_CACHE_KEY = 'products:full-list-unfiltered'
const TOTAL_CACHE_KEY = 'products:total'
const CACHE_TTL = 2 * 60 * 60 * 1000

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

async function discoverTotalProducts(): Promise<number> {
  const cached = cin7Cache.get<number>(TOTAL_CACHE_KEY)
  if (cached) return cached

  try {
    const data = await fetchCin7Data('/Products', { page: '1', limit: '1' })
    const total = data.Total || data.total || data.Count || data.count || 0
    if (total > 0) {
      cin7Cache.set(TOTAL_CACHE_KEY, total, CACHE_TTL)
      return total
    }
  } catch {
    // Fall through to default
  }

  return 200000
}

const _g = globalThis as any
if (_g.__cin7WarmState === undefined) {
  _g.__cin7WarmState = { inProgress: false, promise: null }
}
const warmState: { inProgress: boolean; promise: Promise<void> | null } = _g.__cin7WarmState

async function fetchAllProductsInBackground(): Promise<void> {
  if (warmState.inProgress) return
  warmState.inProgress = true

  try {
    const totalCount = await discoverTotalProducts()
    const pageSize = 1000
    const maxPages = Math.ceil(totalCount / pageSize) + 5
    const allProducts: Cin7Product[] = []
    const categorySet = new Set<string>()

    for (let pageNum = 1; pageNum <= maxPages; pageNum++) {
      try {
        const batchData = await fetchCin7Data('/Products', {
          page: pageNum.toString(),
          limit: pageSize.toString(),
        }, undefined, true)
        const batchProducts = batchData.Products || batchData.ProductsList || batchData || []
        if (Array.isArray(batchProducts) && batchProducts.length > 0) {
          allProducts.push(...batchProducts)
          batchProducts.forEach((product: Cin7Product) => {
            const cat = product.Category || product.category || product.ProductCategory || product.CategoryName
            if (cat && cat !== 'Uncategorized' && typeof cat === 'string') {
              categorySet.add(cat.trim())
            }
          })
        } else {
          break
        }
      } catch (error: any) {
        if (error.message?.includes('429')) break
      }

      if (pageNum % 10 === 0 && categorySet.size > 0) {
        cin7Cache.set('categories:all', Array.from(categorySet).sort(), CACHE_TTL)
      }
    }

    if (allProducts.length > 0) {
      cin7Cache.set(FULL_LIST_CACHE_KEY, allProducts, CACHE_TTL)
      cin7Cache.set(TOTAL_CACHE_KEY, allProducts.length, CACHE_TTL)
      writeProductFileCache(allProducts, allProducts.length)
      cin7Cache.set('categories:all', Array.from(categorySet).sort(), CACHE_TTL)
    }
  } catch {
    // Background warm failed
  } finally {
    warmState.inProgress = false
    warmState.promise = null
  }
}

function startBackgroundWarm(): void {
  if (warmState.inProgress) return
  warmState.promise = fetchAllProductsInBackground()
}

function getFullProductList(): Cin7Product[] | null {
  const memoryCached = cin7Cache.get<Cin7Product[]>(FULL_LIST_CACHE_KEY)
  if (memoryCached && memoryCached.length > 0) return memoryCached

  const fileCached = readProductFileCache()
  if (fileCached && fileCached.products.length > 0) {
    cin7Cache.set(FULL_LIST_CACHE_KEY, fileCached.products, CACHE_TTL)
    cin7Cache.set(TOTAL_CACHE_KEY, fileCached.total, CACHE_TTL)
    return fileCached.products
  }

  return null
}

async function getProductSalesData(): Promise<Record<string, number>> {
  const cacheKey = getSalesDataCacheKey()
  const cached = cin7Cache.get<Record<string, number>>(cacheKey)
  if (cached) return cached

  const salesCounts: Record<string, number> = {}

  try {
    const endpoints = ['/Sale', '/Sales', '/SalesOrder', '/SalesOrders']
    for (const endpoint of endpoints) {
      try {
        const salesData = await fetchCin7Data(endpoint, { page: '1', limit: '100' }, undefined, true)
        const orders = salesData.Sale || salesData.Sales || salesData.SalesOrder || salesData.SalesOrders || salesData || []
        if (Array.isArray(orders) && orders.length > 0) {
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
          if (Object.keys(salesCounts).length > 0) break
        }
      } catch {
        continue
      }
    }
    if (Object.keys(salesCounts).length > 0) {
      cin7Cache.set(cacheKey, salesCounts, 30 * 60 * 1000)
    }
  } catch {
    // Sales data is optional
  }

  return salesCounts
}

function invalidateAllProductCaches(): void {
  cin7Cache.delete(FULL_LIST_CACHE_KEY)
  cin7Cache.delete(TOTAL_CACHE_KEY)
  cin7Cache.delete('categories:all')
  cin7Cache.delete('categories:id-map')
  clearProductFileCache()
  warmState.inProgress = false
  warmState.promise = null
}

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '20')
    const category = searchParams.get('category')
    const search = searchParams.get('search')
    const sortByParam = searchParams.get('sortBy') || 'name'
    const sortBy = sortByParam === 'popularity' ? 'popularity' : sortByParam === 'brand' ? 'brand' : (sortByParam === 'name' ? 'name' : sortByParam === 'price' ? 'price' : sortByParam === 'category' ? 'category' : 'name')
    const sortOrderParam = searchParams.get('sortOrder')
    const sortOrder = sortOrderParam || (sortBy === 'popularity' ? 'desc' : 'asc')
    const refresh = searchParams.get('refresh') === 'true'

    if (refresh) {
      invalidateAllProductCaches()
    }

    let allProducts = getFullProductList()
    const hasFullList = allProducts !== null && allProducts.length > 0

    if (!hasFullList) {
      startBackgroundWarm()

      const params: Record<string, string> = {
        page: page.toString(),
        limit: limit.toString(),
      }
      if (category && category !== 'all') {
        params.Category = category
      }

      const data = await fetchCin7Data('/Products', params)
      const pageProducts = data.Products || data.ProductsList || data || []
      const apiTotal = data.Total || data.total || data.Count || data.count || 0

      if (apiTotal > 0) {
        cin7Cache.set(TOTAL_CACHE_KEY, apiTotal, CACHE_TTL)
      }

      const products = (Array.isArray(pageProducts) ? pageProducts : []).map((product: Cin7Product) => ({
        id: String(product.ID || product.id || product.Id || ''),
        name: product.Name || product.name || 'Unnamed Product',
        sku: product.SKU || product.sku || product.Sku || '',
        description: product.Description || product.description || '',
        price: product['Price Tier 1'] || product.PriceTier1 || product.PriceTier1Price || product.priceTier1 || product.priceTier1Price || product.Price || product.price || product.SalePrice || product.salePrice || 0,
        cost: product.Cost || product.cost || 0,
        category: product.Category || product.category || product.ProductCategory || product.CategoryName || 'Uncategorized',
        brand: product.Brand || product.brand || product.Manufacturer || '',
        images: product.Images || product.images || product.Image || product.image || [],
        stockOnHand: product.StockOnHand || product.stockOnHand || product.QuantityOnHand || product.quantityOnHand || 0,
        inStock: (product.StockOnHand || product.stockOnHand || product.QuantityOnHand || product.quantityOnHand || 0) > 0,
        attributes: product.Attributes || product.attributes || {},
        salesCount: 0,
      }))

      return NextResponse.json({
        success: true,
        products,
        total: apiTotal || products.length,
        page,
        limit,
        hasMore: (apiTotal || 0) > page * limit,
        cacheStatus: 'warming',
      })
    }

    let totalCount = allProducts!.length

    let salesData: Record<string, number> = {}
    if (sortBy === 'popularity') {
      try {
        salesData = await getProductSalesData()
      } catch {
        salesData = {}
      }
    }

    const CATEGORY_MAP_KEY = 'categories:id-map'
    let categoryMap: Record<string, string> = cin7Cache.get<Record<string, string>>(CATEGORY_MAP_KEY) || {}

    if (Object.keys(categoryMap).length === 0) {
      try {
        const categoryData = await fetchCin7Data('/Category', { limit: '1000' }, undefined, true)
        const categories = categoryData.Categories || categoryData.Category || categoryData || []
        if (Array.isArray(categories) && categories.length > 0) {
          categories.forEach((cat: any) => {
            const catId = cat.ID || cat.id || cat.CategoryID
            const catName = cat.Name || cat.name || cat.CategoryName
            if (catId && catName) {
              categoryMap[catId] = catName
            }
          })
          cin7Cache.set(CATEGORY_MAP_KEY, categoryMap, CACHE_TTL)
        }
      } catch {
        // Use product category fields directly
      }
    }

    const products = allProducts!.map((product: Cin7Product) => {
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
        salesCount: salesData[productId] || 0,
      }
    })

    let filteredProducts = products

    if (category && category !== 'all') {
      filteredProducts = filteredProducts.filter((p) => p.category === category)
    }

    if (search) {
      const searchLower = search.toLowerCase()
      filteredProducts = filteredProducts.filter((p) => {
        return (
          p.name?.toLowerCase().includes(searchLower) ||
          p.sku?.toLowerCase().includes(searchLower) ||
          p.brand?.toLowerCase().includes(searchLower) ||
          p.category?.toLowerCase().includes(searchLower) ||
          p.description?.toLowerCase().includes(searchLower)
        )
      })
    }

    let sortedProducts = [...filteredProducts]
    if (sortBy === 'name') {
      sortedProducts.sort((a, b) => {
        const c = a.name.localeCompare(b.name)
        return sortOrder === 'asc' ? c : -c
      })
    } else if (sortBy === 'price') {
      sortedProducts.sort((a, b) => {
        const c = a.price - b.price
        return sortOrder === 'asc' ? c : -c
      })
    } else if (sortBy === 'category') {
      sortedProducts.sort((a, b) => {
        const catA = a.category || 'ZZZ_Uncategorized'
        const catB = b.category || 'ZZZ_Uncategorized'
        const c = catA.toLowerCase().localeCompare(catB.toLowerCase())
        if (c === 0) {
          const nc = (a.name || '').localeCompare(b.name || '')
          return sortOrder === 'asc' ? nc : -nc
        }
        return sortOrder === 'asc' ? c : -c
      })
    } else if (sortBy === 'brand') {
      sortedProducts.sort((a, b) => {
        const brandA = a.brand || 'ZZZ_Unknown'
        const brandB = b.brand || 'ZZZ_Unknown'
        const c = brandA.toLowerCase().localeCompare(brandB.toLowerCase())
        if (c === 0) {
          const nc = (a.name || '').localeCompare(b.name || '')
          return sortOrder === 'asc' ? nc : -nc
        }
        return sortOrder === 'asc' ? c : -c
      })
    } else if (sortBy === 'popularity') {
      sortedProducts.sort((a, b) => {
        const c = (a.salesCount || 0) - (b.salesCount || 0)
        return sortOrder === 'asc' ? c : -c
      })
    }

    const startIndex = (page - 1) * limit
    const paginatedProducts = sortedProducts.slice(startIndex, startIndex + limit)

    const finalTotal = (search || (category && category !== 'all'))
      ? sortedProducts.length
      : totalCount

    return NextResponse.json({
      success: true,
      products: paginatedProducts,
      total: finalTotal,
      page,
      limit,
      hasMore: sortedProducts.length > page * limit,
      cacheStatus: 'ready',
    })
  } catch (error: any) {
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

export async function POST(request: NextRequest) {
  try {
    const body = await request.json().catch(() => ({}))
    const action = body?.action || 'refresh'

    if (action === 'refresh') {
      invalidateAllProductCaches()
      startBackgroundWarm()

      return NextResponse.json({
        success: true,
        message: 'Product cache cleared and background refresh started',
        warmingInProgress: true,
      })
    }

    if (action === 'status') {
      const fullList = getFullProductList()
      const totalCached = cin7Cache.get<number>(TOTAL_CACHE_KEY)

      return NextResponse.json({
        success: true,
        cacheStatus: fullList ? 'ready' : (warmState.inProgress ? 'warming' : 'cold'),
        cachedProductCount: fullList?.length || 0,
        cachedTotal: totalCached || 0,
        warmingInProgress: warmState.inProgress,
      })
    }

    return NextResponse.json({ success: false, error: 'Unknown action' }, { status: 400 })
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || 'Unknown error' },
      { status: 500 }
    )
  }
}
