'use client'

import { useState, useEffect, useRef } from 'react'
import Image from 'next/image'
import Link from 'next/link'

interface Product {
  id: string
  name: string
  sku: string
  barcode?: string | null
  description: string
  price: number
  cost: number
  category: string
  brand: string
  images: string[]
  stockOnHand: number
  inStock: boolean
  attributes: Record<string, any>
}

interface ProductPageContentProps {
  product: Product
}

export default function ProductPageContent({ product }: ProductPageContentProps) {
  const [selectedImageIndex, setSelectedImageIndex] = useState(0)
  const [isVisible, setIsVisible] = useState(false)
  const sectionRef = useRef<HTMLElement>(null)
  const imageRef = useRef<HTMLDivElement>(null)
  const detailsRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    setIsVisible(true)
    
    // Parallax scrolling effect
    const handleScroll = () => {
      if (imageRef.current && detailsRef.current) {
        const scrolled = window.pageYOffset
        const rate = scrolled * 0.3
        imageRef.current.style.transform = `translateY(${rate}px)`
        detailsRef.current.style.transform = `translateY(${-rate * 0.2}px)`
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
    }).format(price)
  }

  const getProductImage = (imageUrl: string) => {
    if (imageUrl.startsWith('http://') || imageUrl.startsWith('https://')) {
      return imageUrl
    }
    return imageUrl
  }

  const mainImage = product.images && product.images.length > 0 
    ? product.images[selectedImageIndex] 
    : '/logo.png'

  return (
    <section className={`product-page ${isVisible ? 'product-page-visible' : ''}`} ref={sectionRef}>
      <div className="container">
        <div className="product-page-content">
          {/* Product Images */}
          <div className="product-images-section" ref={imageRef}>
            <div className="product-main-image">
              <Image
                src={getProductImage(mainImage)}
                alt={product.name}
                width={600}
                height={600}
                className="product-image-main"
                priority
                unoptimized={mainImage.startsWith('http')}
              />
            </div>
            {product.images && product.images.length > 1 && (
              <div className="product-thumbnails">
                {product.images.map((image, index) => (
                  <button
                    key={index}
                    className={`product-thumbnail ${selectedImageIndex === index ? 'active' : ''}`}
                    onClick={() => setSelectedImageIndex(index)}
                    aria-label={`View image ${index + 1}`}
                  >
                    <Image
                      src={getProductImage(image)}
                      alt={`${product.name} - View ${index + 1}`}
                      width={100}
                      height={100}
                      className="product-thumbnail-image"
                      unoptimized={image.startsWith('http')}
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product Information */}
          <div className="product-details-section" ref={detailsRef}>
            {/* Name - First */}
            <h1 className="product-title">{product.name}</h1>

            {/* Rating - Default to 5 stars with randomized review count */}
            <div className="product-rating">
              <div className="product-rating-inline">
                <div className="product-stars">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <svg
                      key={star}
                      width="18"
                      height="18"
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

            {/* SKU */}
            <div className="product-detail-row">
              <span className="product-detail-label">SKU:</span>
              <span className="product-detail-value product-sku-value">{product.sku}</span>
            </div>

            {/* Barcode */}
            <div className="product-detail-row">
              <span className="product-detail-label">Barcode:</span>
              <span className="product-detail-value">{product.barcode || 'N/A'}</span>
            </div>

            {/* Category */}
            {product.category && (
              <div className="product-detail-row">
                <span className="product-detail-label">Category:</span>
                <span className="product-detail-value">{product.category}</span>
              </div>
            )}

            {/* Supplier */}
            {product.brand && (
              <div className="product-detail-row">
                <span className="product-detail-label">Supplier:</span>
                <span className="product-detail-value">{product.brand}</span>
              </div>
            )}

            {/* Price */}
            <div className="product-detail-row">
              <span className="product-detail-label">Price:</span>
              <span className="product-detail-value">
                {product.price > 0 ? `${formatPrice(product.price)} USD` : 'Price on Request'}
              </span>
            </div>

            {/* Description */}
            {product.description && (
              <div className="product-description-section">
                <h2 className="product-section-title">Description</h2>
                <p className="product-description-text">{product.description}</p>
              </div>
            )}

            {/* Attributes */}
            {product.attributes && Object.keys(product.attributes).length > 0 && (
              <div className="product-attributes-section">
                <h2 className="product-section-title">Specifications</h2>
                <dl className="product-attributes-list">
                  {Object.entries(product.attributes).map(([key, value]) => (
                    <div key={key} className="product-attribute-item">
                      <dt className="product-attribute-key">{key}:</dt>
                      <dd className="product-attribute-value">{String(value)}</dd>
                    </div>
                  ))}
                </dl>
              </div>
            )}

            {/* Action Buttons */}
            <div className="product-actions">
              <button className="product-inquire-button-large">
                Add To Cart
              </button>
              <Link href="/store" className="product-back-link">
                ← Back to Store
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

