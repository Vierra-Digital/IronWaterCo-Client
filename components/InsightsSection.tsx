'use client'

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { insights, type Insight } from '../data/insights'

const ITEMS_PER_PAGE = 9

const categories = ['All', ...Array.from(new Set(insights.map(i => i.category)))]

type SortOrder = 'newest' | 'oldest'

export default function InsightsSection() {
  const [currentPage, setCurrentPage] = useState(1)
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [sortOrder, setSortOrder] = useState<SortOrder>('newest')
  const [showFilters, setShowFilters] = useState(false)
  const [isVisible, setIsVisible] = useState(false)
  const cardsRef = useRef<(HTMLElement | null)[]>([])
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    setIsVisible(true)
  }, [])

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

    cardsRef.current.forEach((card) => {
      if (card) observer.observe(card)
    })

    return () => observer.disconnect()
  }, [currentPage, searchQuery, selectedCategory, sortOrder])

  let filteredInsights = insights.filter(insight => {
    const matchesSearch = searchQuery === '' ||
      insight.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      insight.summary.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory = selectedCategory === 'All' || insight.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  filteredInsights = [...filteredInsights].sort((a, b) => {
    const dateA = new Date(a.date).getTime()
    const dateB = new Date(b.date).getTime()
    return sortOrder === 'newest' ? dateB - dateA : dateA - dateB
  })

  const totalPages = Math.ceil(filteredInsights.length / ITEMS_PER_PAGE)
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE
  const endIndex = startIndex + ITEMS_PER_PAGE
  const currentInsights = filteredInsights.slice(startIndex, endIndex)

  useEffect(() => {
    setCurrentPage(1)
  }, [searchQuery, selectedCategory, sortOrder])

  const handlePageChange = (page: number) => {
    setCurrentPage(page)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr + 'T12:00:00')
    const day = date.getDate()
    const getOrdinal = (n: number) => {
      const s = ['th', 'st', 'nd', 'rd']
      const v = n % 100
      return n + (s[(v - 20) % 10] || s[v] || s[0])
    }
    const month = date.toLocaleDateString('en-US', { month: 'long' })
    const year = date.getFullYear()
    return `${month} ${getOrdinal(day)}, ${year}`
  }

  return (
    <section id="insights" className={`insights-section ${isVisible ? 'insights-section-visible' : ''}`} ref={sectionRef} aria-labelledby="insights-heading">
      <div className="container">
        <div>
          <p className="section-subtitle">From Our Showroom</p>
          <h1 id="insights-heading" className="section-title">Insights</h1>
          <p className="insights-intro">
            Quick reads on materials, design decisions, and the details that make a difference in architectural hardware and plumbing.
          </p>
        </div>

        <div className="insights-search-filter">
          <div className="insights-search-wrapper">
            <div className="search-input-wrapper">
              <svg className="search-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="11" cy="11" r="8"></circle>
                <path d="m21 21-4.35-4.35"></path>
              </svg>
              <input
                type="text"
                placeholder="Search insights..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="insights-search-input"
                aria-label="Search insights"
              />
            </div>
            <button
              className="insights-filter-toggle"
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
            <div className="insights-filters">
              <div className="filter-group">
                <label htmlFor="insights-category-filter" className="filter-label">Category</label>
                <div className="select-wrapper">
                  <select
                    id="insights-category-filter"
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
                <label htmlFor="insights-sort-filter" className="filter-label">Sort by Date</label>
                <div className="select-wrapper">
                  <select
                    id="insights-sort-filter"
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

        <div>
          {filteredInsights.length === 0 ? (
            <div className="insights-empty">
              <div className="empty-animation">
                <svg width="80" height="80" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="empty-icon">
                  <circle cx="11" cy="11" r="8"></circle>
                  <path d="m21 21-4.35-4.35"></path>
                </svg>
              </div>
              <p>No insights found matching your search. Try adjusting your filters or search terms.</p>
            </div>
          ) : (
            <>
              <div className="insights-grid" role="list">
                {currentInsights.map((insight, index) => (
                  <article
                    key={insight.id}
                    ref={(el) => { cardsRef.current[startIndex + index] = el; }}
                    className="insights-card fade-in"
                    role="listitem"
                  >
                    <Link href={`/insights/${insight.slug}`} className="insights-card-link">
                      <div className="insights-card-header">
                        <span className="insights-category">{insight.category}</span>
                      </div>
                      <h2 className="insights-card-title">{insight.title}</h2>
                      <div className="insights-meta">
                        <span className="insights-date">{formatDate(insight.date)}</span>
                        <span className="insights-meta-separator">&bull;</span>
                        <span className="insights-read-time">{insight.readTime}</span>
                      </div>
                      <p className="insights-card-summary">{insight.summary}</p>
                      <div className="insights-card-footer">
                        <span className="insights-read-more">
                          Read Insight
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <polyline points="9 18 15 12 9 6"></polyline>
                          </svg>
                        </span>
                      </div>
                    </Link>
                  </article>
                ))}
              </div>

              {filteredInsights.length > 0 && (
                <div className="insights-results-count">
                  <p>Showing {startIndex + 1}-{Math.min(endIndex, filteredInsights.length)} of {filteredInsights.length} insight{filteredInsights.length !== 1 ? 's' : ''}.</p>
                </div>
              )}

              {totalPages > 1 && (
                <div className="insights-pagination">
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
      </div>
    </section>
  )
}
