import { NextRequest, NextResponse } from 'next/server'
import { cin7Cache, getProductCacheKey, getProductsCacheKey, getProductIndexCacheKey } from '@/lib/cin7Cache'
import { fetchCin7Data } from '@/lib/cin7Api'

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    let productIdentifier = params.id
    try {
      productIdentifier = decodeURIComponent(params.id)
    } catch {
      productIdentifier = params.id
    }

    if (!productIdentifier) {
      return NextResponse.json(
        { success: false, error: 'Product SKU or ID is required' },
        { status: 400 }
      )
    }

    const cacheKeyBySku = getProductCacheKey(`sku:${productIdentifier}`)
    const cacheKeyById = getProductCacheKey(productIdentifier)
    let data = cin7Cache.get<any>(cacheKeyBySku) || cin7Cache.get<any>(cacheKeyById)

    if (!data) {
      const indexCacheKey = getProductIndexCacheKey()
      const productIndex = cin7Cache.get<Record<string, any>>(indexCacheKey)
      if (productIndex) {
        const searchValue = String(productIdentifier).trim()
        data = productIndex[`sku:${searchValue}`] || productIndex[searchValue.toLowerCase()] || productIndex[searchValue]
      }
    }

    if (!data) {
      let foundInCache = false

      for (let page = 1; page <= 20; page++) {
        for (const limit of [20, 100, 1000]) {
          const productsCacheKey = getProductsCacheKey({ page, limit })
          const cachedProductsData = cin7Cache.get<any>(productsCacheKey)

          if (cachedProductsData) {
            let productsList: any[] = []
            if (cachedProductsData.products && Array.isArray(cachedProductsData.products)) {
              productsList = cachedProductsData.products
            } else if (cachedProductsData.Products && Array.isArray(cachedProductsData.Products)) {
              productsList = cachedProductsData.Products
            } else if (Array.isArray(cachedProductsData)) {
              productsList = cachedProductsData
            }

            if (productsList.length > 0) {
              const foundProduct = productsList.find((p: any) => {
                const pSku = String(p.sku || p.SKU || p.Sku || '').trim()
                const pId = String(p.id || p.ID || p.Id || '').trim()
                const searchValue = String(productIdentifier).trim()

                if (pSku && pSku === searchValue) return true
                if (pSku && pSku.toLowerCase() === searchValue.toLowerCase()) return true
                if (pId && pId === searchValue) return true
                if (pId && pId.toLowerCase() === searchValue.toLowerCase()) return true

                const pIdNoDashes = pId.replace(/-/g, '').toLowerCase()
                const searchValueNoDashes = searchValue.replace(/-/g, '').toLowerCase()
                if (pIdNoDashes && searchValueNoDashes && pIdNoDashes === searchValueNoDashes) return true

                return false
              })

              if (foundProduct) {
                data = foundProduct
                foundInCache = true
                break
              }
            }
          }
        }
        if (foundInCache) break
      }

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
            data = foundProduct
            foundInCache = true
          }
        }
      }

      if (!foundInCache) {
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
                data = product
                found = true
              }
            } catch (error: any) {
              if (error.message?.includes('429')) break
            }
          }

          if (!found) {
            return NextResponse.json(
              {
                success: false,
                error: 'Product not found',
                productIdentifier,
                message: `Searched ${searchedPages} pages but could not find product with SKU/ID: ${productIdentifier}`,
              },
              { status: 404 }
            )
          }
        } catch (error: any) {
          return NextResponse.json(
            { success: false, error: 'Failed to fetch product', message: error.message || 'Unknown error' },
            { status: 500 }
          )
        }
      }

      if (data) {
        const productSku = String(data.SKU || data.sku || data.Sku || '').trim()
        const productId = String(data.ID || data.id || data.Id || '').trim()
        if (productSku) {
          cin7Cache.set(getProductCacheKey(`sku:${productSku}`), data, 10 * 60 * 1000)
        }
        if (productId) {
          cin7Cache.set(getProductCacheKey(productId), data, 10 * 60 * 1000)
        }
        cin7Cache.set(cacheKeyById, data, 10 * 60 * 1000)
      }
    }

    const productData = Array.isArray(data) ? data[0] : data

    if (!productData) {
      return NextResponse.json(
        {
          success: false,
          error: 'Product not found',
          message: `Product with SKU/ID "${productIdentifier}" was not found after searching all available products.`,
          productIdentifier,
        },
        { status: 404 }
      )
    }

    let categoryName = productData.Category || productData.category || productData.ProductCategory || productData.CategoryName || 'Uncategorized'
    const categoryId = productData.CategoryID || productData.categoryID || productData.CategoryId
    if (categoryId) {
      try {
        const categoryData = await fetchCin7Data('/Category', { limit: '1000' }, undefined, true)
        const categories = categoryData.Categories || categoryData.Category || categoryData || []
        if (Array.isArray(categories)) {
          const foundCategory = categories.find((cat: any) => (cat.ID || cat.id || cat.CategoryID) === categoryId)
          if (foundCategory) {
            categoryName = foundCategory.Name || foundCategory.name || foundCategory.CategoryName || categoryName
          }
        }
      } catch {
        // Category API not available
      }
    }

    const productIdFromData = productData.ID || productData.id || productData.Id || productIdentifier
    const product = {
      id: String(productIdFromData),
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

    return NextResponse.json({ success: true, product })
  } catch (error: any) {
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
