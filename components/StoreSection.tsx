'use client'

import { useState, useEffect, useRef, useMemo } from 'react'
import Image from 'next/image'
import Link from 'next/link'

interface Product {
  id: string
  name: string
  sku: string
  description: string
  price: number
  cost: number
  category: string
  brand: string
  images: string[]
  stockOnHand: number
  inStock: boolean
  attributes: Record<string, any>
  salesCount?: number
}

interface StoreSectionProps {
  initialProducts?: Product[]
}

export default function StoreSection({ initialProducts = [] }: StoreSectionProps) {
  const [products, setProducts] = useState<Product[]>(initialProducts)
  const [filteredProducts, setFilteredProducts] = useState<Product[]>(initialProducts)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [isVisible, setIsVisible] = useState(false)
  const [loadingProductId, setLoadingProductId] = useState<string | null>(null)
  const [filtersOpen, setFiltersOpen] = useState(false)
  
  // Filter and sort states
  const [searchQuery, setSearchQuery] = useState('')
  const [debouncedSearchQuery, setDebouncedSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [sortBy, setSortBy] = useState<'name' | 'price' | 'category'>('name')
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc')
  
  // Pagination state
  const [currentPage, setCurrentPage] = useState(1)
  const [totalProducts, setTotalProducts] = useState(0)
  const productsPerPage = 20
  
  const productsRef = useRef<(HTMLElement | null)[]>([])
  const sectionRef = useRef<HTMLElement>(null)
  const headerRef = useRef<HTMLDivElement>(null)
  const gridRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  // Debounce search query to avoid searching on every keystroke
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearchQuery(searchQuery)
    }, 500) // Wait 500ms after user stops typing

    return () => clearTimeout(timer)
  }, [searchQuery])

  // Reset to page 1 when search, category, or sort changes
  useEffect(() => {
    setCurrentPage(1)
  }, [debouncedSearchQuery, selectedCategory, sortBy, sortOrder])

  // Fetch products from Cin7 API - only fetch what's needed for current page
  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true)
      setError(null)
      
      try {
        const params = new URLSearchParams({
          page: currentPage.toString(),
          limit: productsPerPage.toString(),
        })
        
        if (selectedCategory !== 'all') {
          params.append('category', selectedCategory)
        }
        
        if (debouncedSearchQuery) {
          params.append('search', debouncedSearchQuery)
        }
        
        params.append('sortBy', sortBy)
        params.append('sortOrder', sortOrder)

        const response = await fetch(`/api/cin7/products?${params.toString()}`)
        
        if (!response.ok) {
          const errorData = await response.json().catch(() => ({}))
          const errorMessage = errorData.message || errorData.error || `HTTP ${response.status}: ${response.statusText}`
          console.error('API response error:', {
            status: response.status,
            statusText: response.statusText,
            error: errorMessage,
            details: errorData.details,
          })
          setError(errorMessage || 'Failed to load products')
          return
        }
        
        const data = await response.json()
        console.log('Products API response:', { success: data.success, productCount: data.products?.length, total: data.total })

        if (data.success) {
          setProducts(data.products || [])
          setFilteredProducts(data.products || [])
          // Store total for pagination
          if (data.total !== undefined) {
            setTotalProducts(data.total)
          }
        } else {
          const errorMessage = data.message || data.error || 'Failed to load products'
          console.error('API returned success:false:', { message: errorMessage, data })
          setError(errorMessage)
        }
      } catch (err: any) {
        console.error('Error fetching products:', err)
        console.error('Error details:', {
          message: err.message,
          stack: err.stack,
          name: err.name,
        })
        setError(`Failed to load products: ${err.message || 'Unknown error'}`)
      } finally {
        setLoading(false)
      }
    }

    fetchProducts()
  }, [currentPage, selectedCategory, debouncedSearchQuery, sortBy, sortOrder, productsPerPage])

  // Calculate pagination - use totalProducts from API for total count
  // The API returns only the products for the current page, so we use those directly
  const totalPages = totalProducts > 0 
    ? Math.ceil(totalProducts / productsPerPage)
    : Math.ceil(filteredProducts.length / productsPerPage)
  const currentPageProducts = filteredProducts // API already returns paginated products
  const startIndex = (currentPage - 1) * productsPerPage + 1
  const endIndex = Math.min(currentPage * productsPerPage, totalProducts || filteredProducts.length)

  // Fetch all categories from API
  const [categories, setCategories] = useState<string[]>([])
  const [categoriesLoading, setCategoriesLoading] = useState(true)
  
  useEffect(() => {
    const fetchCategories = async () => {
      setCategoriesLoading(true)
      try {
        const response = await fetch('/api/cin7/categories')
        const data = await response.json()
        console.log('Categories API response:', { success: data.success, count: data.categories?.length })
        if (data.success && Array.isArray(data.categories) && data.categories.length > 0) {
          setCategories(data.categories)
          console.log(`Loaded ${data.categories.length} categories`)
        } else if (data.success && Array.isArray(data.categories) && data.categories.length === 0) {
          // If categories array is empty, try fallback
          console.log('Categories array is empty, using fallback from products')
          const categorySet = new Set<string>()
          products.forEach((product) => {
            if (product.category && product.category !== 'Uncategorized') {
              categorySet.add(product.category)
            }
          })
          const fallbackCategories = Array.from(categorySet).sort()
          if (fallbackCategories.length > 0) {
            setCategories(fallbackCategories)
            console.log(`Using ${fallbackCategories.length} categories from current products`)
          }
        }
      } catch (error) {
        console.error('Error fetching categories:', error)
        // Fallback to categories from current products
        const categorySet = new Set<string>()
        products.forEach((product) => {
          if (product.category && product.category !== 'Uncategorized') {
            categorySet.add(product.category)
          }
        })
        const fallbackCategories = Array.from(categorySet).sort()
        if (fallbackCategories.length > 0) {
          setCategories(fallbackCategories)
          console.log(`Fallback: Using ${fallbackCategories.length} categories from current products`)
        }
      } finally {
        setCategoriesLoading(false)
      }
    }
    
    fetchCategories()
  }, [products])

  // Intersection Observer for fade-in animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry, index) => {
          if (entry.isIntersecting) {
            setTimeout(() => {
              entry.target.classList.add('fade-in-visible')
            }, index * 50)
          }
        })
      },
      { threshold: 0.1 }
    )

    productsRef.current.forEach((card) => {
      if (card) observer.observe(card)
    })

    return () => observer.disconnect()
  }, [currentPageProducts])


  const handlePageChange = (page: number) => {
    setCurrentPage(page)
    // Scroll to top of products section
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
    }).format(price)
  }

  const getProductImage = (product: Product) => {
    if (product.images && product.images.length > 0) {
      const imageUrl = product.images[0]
      // Handle both absolute URLs and relative paths
      if (imageUrl.startsWith('http://') || imageUrl.startsWith('https://')) {
        return imageUrl
      }
      return imageUrl
    }
    return '/logo.png' // Fallback image
  }

  return (
    <section id="store" className={`store-section ${isVisible ? 'store-section-visible' : ''}`} ref={sectionRef} aria-labelledby="store-heading">
      <div className="container">
        <div ref={headerRef}>
          <p className="section-subtitle">Curated Collections</p>
          <h2 id="store-heading" className="section-title">Our Products</h2>
          <p className="store-intro">
            Explore our curated selection of plumbing fixtures, hardware, and construction products.
            Each piece is carefully selected for quality, design, and performance.
          </p>
        </div>

        {/* Filters and Search */}
        <div className="store-controls">
          <div className="store-search-wrapper">
            <div className="store-search">
              <svg
                className="search-icon"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <circle cx="11" cy="11" r="8"></circle>
                <path d="m21 21-4.35-4.35"></path>
              </svg>
              <input
                type="text"
                placeholder="Search products, SKU, brand, or category..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="store-search-input"
                aria-label="Search products"
              />
            </div>
            <button
              className="store-filters-toggle"
              onClick={() => setFiltersOpen(!filtersOpen)}
              aria-label={filtersOpen ? 'Hide filters' : 'Show filters'}
              aria-expanded={filtersOpen}
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                className={filtersOpen ? 'rotated' : ''}
              >
                <line x1="4" y1="6" x2="20" y2="6"></line>
                <line x1="4" y1="12" x2="20" y2="12"></line>
                <line x1="4" y1="18" x2="20" y2="18"></line>
              </svg>
              <span>Filters</span>
            </button>
          </div>

          <div className={`store-filters ${filtersOpen ? 'open' : ''}`}>
            <div className="select-wrapper">
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="filter-select"
                aria-label="Filter by category"
                disabled={categoriesLoading}
              >
                <option value="all">
                  {categoriesLoading ? 'Loading Categories...' : 'All Categories'}
                </option>
                {!categoriesLoading && categories.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </div>

            <div className="select-wrapper">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as 'name' | 'price' | 'category')}
                className="filter-select"
                aria-label="Sort by"
              >
                <option value="name">Sort by Name</option>
                <option value="price">Sort by Price</option>
                <option value="category">Sort by Category</option>
              </select>
            </div>

            <div className="select-wrapper">
              <select
                value={sortOrder}
                onChange={(e) => setSortOrder(e.target.value as 'asc' | 'desc')}
                className="filter-select"
                aria-label="Sort order"
              >
                <option value="asc">Ascending</option>
                <option value="desc">Descending</option>
              </select>
            </div>

            {(searchQuery || selectedCategory !== 'all' || sortBy !== 'name' || sortOrder !== 'asc') && (
              <button
                onClick={() => {
                  setSearchQuery('')
                  setDebouncedSearchQuery('')
                  setSelectedCategory('all')
                  setSortBy('name')
                  setSortOrder('asc')
                  setCurrentPage(1)
                }}
                className="store-clear-filters"
                aria-label="Clear all filters"
              >
                Clear Filters
              </button>
            )}
          </div>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="store-loading">
            <div className="loading-spinner"></div>
            <p>Loading Products...</p>
          </div>
        )}

        {/* Error State */}
        {error && !loading && (
          <div className="store-error">
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <circle cx="12" cy="12" r="10"></circle>
              <line x1="12" y1="8" x2="12" y2="12"></line>
              <line x1="12" y1="16" x2="12.01" y2="16"></line>
            </svg>
            <p>{error}</p>
            <button onClick={() => window.location.reload()} className="store-retry-button">
              Retry
            </button>
          </div>
        )}

        {/* Products Grid */}
        {!loading && !error && (
          <>
            {filteredProducts.length === 0 ? (
              <div className="store-empty">
                <svg
                  width="48"
                  height="48"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <circle cx="11" cy="11" r="8"></circle>
                  <path d="m21 21-4.35-4.35"></path>
                </svg>
                <h3>No Products Found</h3>
                <p>Try Adjusting Your Search Or Filters</p>
              </div>
            ) : (
              <>
                <div className="store-grid" ref={gridRef} role="list">
                  {currentPageProducts.map((product, index) => (
                  <Link
                    key={product.id}
                    href={`/store/${encodeURIComponent(product.sku || product.id)}`}
                    ref={(el) => {
                      productsRef.current[index] = el
                    }}
                    className="store-product-card fade-in"
                    role="listitem"
                  >
                    <div className="product-image-wrapper">
                      <Image
                        src={getProductImage(product)}
                        alt={product.name}
                        width={400}
                        height={400}
                        className="product-image"
                        loading="lazy"
                        unoptimized={getProductImage(product).startsWith('http')}
                      />
                    </div>
                    <div className="product-info">
                      {/* Name - Required */}
                      <h3 className="product-name">{product.name}</h3>
                      
                      {/* Rating - Default to 5 stars with randomized review count */}
                      <div className="product-rating">
                        <div className="product-rating-inline">
                          <div className="product-stars">
                            {[1, 2, 3, 4, 5].map((star) => (
                              <svg
                                key={star}
                                width="14"
                                height="14"
                                viewBox="0 0 24 24"
                                fill="#d4af37"
                                stroke="#d4af37"
                                strokeWidth="1"
                              >
                                <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                              </svg>
                            ))}
                          </div>
                          <span className="product-rating-count">
                            5.0 ({(() => {
                              // Generate consistent random number based on product ID
                              let hash = 0;
                              for (let i = 0; i < product.id.length; i++) {
                                hash = ((hash << 5) - hash) + product.id.charCodeAt(i);
                                hash = hash & hash;
                              }
                              const reviewCount = Math.abs(hash) % 501; // 0-500
                              return reviewCount;
                            })()})
                          </span>
                        </div>
                      </div>
                      
                      {/* Supplier and Category tags on same line */}
                      <div className="product-tags-row">
                        {product.brand && (
                          <span className="product-supplier-tag">{product.brand}</span>
                        )}
                        {product.category && product.category !== 'Uncategorized' && (
                          <span className="product-category-badge">{product.category}</span>
                        )}
                      </div>
                      
                      {/* View Details and Add To Cart Buttons */}
                      <div className="product-footer">
                        <button
                          className="product-add-to-cart-button"
                          aria-label={`Add ${product.name} to cart`}
                          onClick={(e) => {
                            e.preventDefault()
                            e.stopPropagation()
                            // Handle add to cart action
                          }}
                        >
                          Add To Cart
                        </button>
                        <Link
                          href={`/store/${encodeURIComponent(product.sku || product.id)}`}
                          className={`product-inquire-button ${loadingProductId === product.id ? 'loading' : ''}`}
                          aria-label={`View details for ${product.name}`}
                          onClick={(e) => {
                            e.stopPropagation()
                            setLoadingProductId(product.id)
                            // Clear loading state after navigation (fallback in case navigation fails)
                            setTimeout(() => {
                              setLoadingProductId(null)
                            }, 10000)
                          }}
                        >
                          {loadingProductId === product.id ? (
                            <>
                              <span className="product-loading-spinner"></span>
                              <span style={{ marginLeft: '0.5rem' }}>Loading...</span>
                            </>
                          ) : (
                            'View Details'
                          )}
                        </Link>
                      </div>
                    </div>
                  </Link>
                  ))}
                </div>

                {/* Pagination Controls */}
                {totalPages > 1 && (
                  <div className="store-pagination" role="navigation" aria-label="Product pagination">
                    <button
                      className="pagination-button"
                      onClick={() => handlePageChange(currentPage - 1)}
                      disabled={currentPage === 1}
                      aria-label="Previous page"
                    >
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <polyline points="15 18 9 12 15 6"></polyline>
                      </svg>
                      Previous
                    </button>

                    <div className="pagination-numbers">
                      {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => {
                        // Show first page, last page, current page, and pages around current
                        const showPage =
                          pageNum === 1 ||
                          pageNum === totalPages ||
                          (pageNum >= currentPage - 1 && pageNum <= currentPage + 1)

                        if (!showPage) {
                          // Show ellipsis
                          if (pageNum === currentPage - 2 || pageNum === currentPage + 2) {
                            return (
                              <span key={pageNum} className="pagination-ellipsis">
                                ...
                              </span>
                            )
                          }
                          return null
                        }

                        return (
                          <button
                            key={pageNum}
                            className={`pagination-number ${currentPage === pageNum ? 'active' : ''}`}
                            onClick={() => handlePageChange(pageNum)}
                            aria-label={`Page ${pageNum}`}
                            aria-current={currentPage === pageNum ? 'page' : undefined}
                          >
                            {pageNum}
                          </button>
                        )
                      })}
                    </div>

                    <button
                      className="pagination-button"
                      onClick={() => handlePageChange(currentPage + 1)}
                      disabled={currentPage === totalPages}
                      aria-label="Next page"
                    >
                      Next
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <polyline points="9 18 15 12 9 6"></polyline>
                      </svg>
                    </button>
                  </div>
                )}

                {/* Product Count at Bottom */}
                <div className="store-results-info-bottom">
                  <p>
                    Showing <strong>{startIndex}</strong> - <strong>{endIndex}</strong> of <strong>{totalProducts > 0 ? totalProducts.toLocaleString() : filteredProducts.length.toLocaleString()}</strong> Products
                  </p>
                </div>
              </>
            )}
          </>
        )}
      </div>
    </section>
  )
}

