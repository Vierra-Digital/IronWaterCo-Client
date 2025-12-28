'use client'

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'

interface Guide {
  id: string
  title: string
  slug: string
  description: string
  category: string
  date: string
  readTime: string
}

const guides: Guide[] = [
  {
    id: '1',
    title: 'Wall-Hung Toilets + In-Wall Carriers: Co-op Approval, Specs, and Pitfalls',
    slug: '/guides/wall-hung-toilets-in-wall-carriers-coop-approval',
    description: 'A practical guide to wall-hung toilets and in-wall carrier systems—what to specify, common mistakes, and the exact documents co-ops/condos typically require for approval.',
    category: 'Plumbing',
    date: '2025-12-27',
    readTime: '8 min read'
  },
  {
    id: '2',
    title: 'Wall-Hung Toilets in NYC Co-Op & Condo Buildings: Local Approval Notes & Planning Considerations',
    slug: '/guides/wall-hung-toilets-nyc-coop-condo',
    description: 'NYC-specific guidance for wall-hung toilet installations. Learn what boards typically ask, approval language, and local building considerations for co-op and condo buildings.',
    category: 'Plumbing',
    date: '2025-12-27',
    readTime: '6 min read'
  },
  // Add more guides here as they're created
]

const ITEMS_PER_PAGE = 9

const categories = ['All', ...Array.from(new Set(guides.map(g => g.category)))]

type SortOrder = 'newest' | 'oldest'

export default function KnowledgebaseSection() {
  const [currentPage, setCurrentPage] = useState(1)
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [sortOrder, setSortOrder] = useState<SortOrder>('newest')
  const [showFilters, setShowFilters] = useState(false)
  const guidesRef = useRef<(HTMLDivElement | null)[]>([])

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

    guidesRef.current.forEach((guide) => {
      if (guide) observer.observe(guide)
    })

    return () => observer.disconnect()
  }, [currentPage, searchQuery, selectedCategory, sortOrder])

  // Filter guides based on search and category
  let filteredGuides = guides.filter(guide => {
    const matchesSearch = searchQuery === '' || 
      guide.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      guide.description.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory = selectedCategory === 'All' || guide.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  // Sort guides by date
  filteredGuides = [...filteredGuides].sort((a, b) => {
    const dateA = new Date(a.date).getTime()
    const dateB = new Date(b.date).getTime()
    return sortOrder === 'newest' ? dateB - dateA : dateA - dateB
  })

  const totalPages = Math.ceil(filteredGuides.length / ITEMS_PER_PAGE)
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE
  const endIndex = startIndex + ITEMS_PER_PAGE
  const currentGuides = filteredGuides.slice(startIndex, endIndex)

  // Reset to page 1 when filters change
  useEffect(() => {
    setCurrentPage(1)
  }, [searchQuery, selectedCategory, sortOrder])

  const handlePageChange = (page: number) => {
    setCurrentPage(page)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <section id="knowledgebase" className="knowledgebase-section" aria-labelledby="knowledgebase-heading">
      <div className="container">
        <p className="section-subtitle">Expert Resources</p>
        <h1 id="knowledgebase-heading" className="section-title">Knowledgebase</h1>
        <p className="knowledgebase-intro">
          Comprehensive guides, specifications, and best practices for architectural hardware, plumbing systems, and installation requirements.
        </p>

        <div className="knowledgebase-search-filter">
          <div className="knowledgebase-search-wrapper">
            <div className="search-input-wrapper">
              <svg className="search-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="11" cy="11" r="8"></circle>
                <path d="m21 21-4.35-4.35"></path>
              </svg>
              <input
                type="text"
                placeholder="Search guides..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="knowledgebase-search-input"
                aria-label="Search knowledgebase"
              />
            </div>
            <button
              className="knowledgebase-filter-toggle"
              onClick={() => setShowFilters(!showFilters)}
              aria-label="Toggle filters"
              aria-expanded={showFilters}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"></polygon>
              </svg>
              Filter
            </button>
          </div>
          
          {showFilters && (
            <div className="knowledgebase-filters">
              <div className="filter-group">
                <label htmlFor="category-filter" className="filter-label">Category</label>
                <div className="select-wrapper">
                  <select
                    id="category-filter"
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="filter-select"
                  >
                    {categories.map(category => (
                      <option key={category} value={category}>{category}</option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="filter-group">
                <label htmlFor="sort-filter" className="filter-label">Sort by Date</label>
                <div className="select-wrapper">
                  <select
                    id="sort-filter"
                    value={sortOrder}
                    onChange={(e) => setSortOrder(e.target.value as SortOrder)}
                    className="filter-select"
                  >
                    <option value="newest">Newest First</option>
                    <option value="oldest">Oldest First</option>
                  </select>
                </div>
              </div>
              {(searchQuery || selectedCategory !== 'All' || sortOrder !== 'newest') && (
                <button
                  className="clear-filters"
                  onClick={() => {
                    setSearchQuery('')
                    setSelectedCategory('All')
                    setSortOrder('newest')
                  }}
                >
                  Clear Filters
                </button>
              )}
            </div>
          )}
        </div>

        {filteredGuides.length === 0 ? (
          <div className="knowledgebase-empty">
            <div className="empty-animation">
              <svg width="80" height="80" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="empty-icon">
                <circle cx="11" cy="11" r="8"></circle>
                <path d="m21 21-4.35-4.35"></path>
              </svg>
            </div>
            <p>No guides found matching your search. Try adjusting your filters or search terms.</p>
          </div>
        ) : (
          <>
            <div className="knowledgebase-grid" role="list">
              {currentGuides.map((guide, index) => (
                <article
                  key={guide.id}
                  ref={(el) => { guidesRef.current[startIndex + index] = el; }}
                  className="knowledgebase-card fade-in"
                  role="listitem"
                >
                  <Link href={guide.slug} className="knowledgebase-card-link">
                    <div className="knowledgebase-card-header">
                      <span className="knowledgebase-category">{guide.category}</span>
                    </div>
                    <h2 className="knowledgebase-card-title">{guide.title}</h2>
                    <div className="knowledgebase-meta">
                      <span className="knowledgebase-date">
                        {(() => {
                          const date = new Date(guide.date + 'T12:00:00')
                          const day = date.getDate()
                          const getOrdinal = (n: number) => {
                            const s = ['th', 'st', 'nd', 'rd']
                            const v = n % 100
                            return n + (s[(v - 20) % 10] || s[v] || s[0])
                          }
                          const month = date.toLocaleDateString('en-US', { month: 'long' })
                          const year = date.getFullYear()
                          return `${month} ${getOrdinal(day)}, ${year}`
                        })()}
                      </span>
                      <span className="knowledgebase-meta-separator">•</span>
                      <span className="knowledgebase-read-time">{guide.readTime}</span>
                    </div>
                    <p className="knowledgebase-card-description">{guide.description}</p>
                    <div className="knowledgebase-card-footer">
                      <span className="knowledgebase-read-more">
                        Read Guide
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <polyline points="9 18 15 12 9 6"></polyline>
                        </svg>
                      </span>
                    </div>
                  </Link>
                </article>
              ))}
            </div>

            {filteredGuides.length > 0 && (
              <div className="knowledgebase-results-count">
                <p>Showing {startIndex + 1}-{Math.min(endIndex, filteredGuides.length)} of {filteredGuides.length} guide{filteredGuides.length !== 1 ? 's' : ''}.</p>
              </div>
            )}

            {totalPages > 1 && (
              <div className="knowledgebase-pagination">
                <button
                  className="pagination-button"
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                  aria-label="Previous page"
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <polyline points="15 18 9 12 15 6"></polyline>
                  </svg>
                  Previous
                </button>
                
                <div className="pagination-numbers">
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => {
                    if (
                      page === 1 ||
                      page === totalPages ||
                      (page >= currentPage - 1 && page <= currentPage + 1)
                    ) {
                      return (
                        <button
                          key={page}
                          className={`pagination-number ${currentPage === page ? 'active' : ''}`}
                          onClick={() => handlePageChange(page)}
                          aria-label={`Go to page ${page}`}
                          aria-current={currentPage === page ? 'page' : undefined}
                        >
                          {page}
                        </button>
                      )
                    } else if (
                      page === currentPage - 2 ||
                      page === currentPage + 2
                    ) {
                      return (
                        <span key={page} className="pagination-ellipsis">...</span>
                      )
                    }
                    return null
                  })}
                </div>

                <button
                  className="pagination-button"
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  aria-label="Next page"
                >
                  Next
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <polyline points="9 18 15 12 9 6"></polyline>
                  </svg>
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </section>
  )
}

