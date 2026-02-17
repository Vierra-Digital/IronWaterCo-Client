import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import ProductPageContent from '@/components/ProductPageContent'
import type { Metadata } from 'next'
import { notFound } from 'next/navigation'

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://ironandwaterco.com'

export async function generateMetadata({ params }: { params: { id: string } }): Promise<Metadata> {
  try {
    // The id parameter is now SKU (or ID as fallback)
    const productIdentifier = decodeURIComponent(params.id)
    const response = await fetch(`${siteUrl}/api/cin7/products/${encodeURIComponent(productIdentifier)}`, {
      cache: 'no-store',
    })
    
    if (!response.ok) {
      return {
        title: 'Product Not Found',
      }
    }

    const data = await response.json()
    const product = data.product

    if (!product) {
      return {
        title: 'Product Not Found',
      }
    }

    return {
      title: product.name,
      description: product.description || `View ${product.name} - SKU: ${product.sku} at Iron & Water Co.`,
      keywords: [
        product.name,
        product.sku,
        product.category,
        product.brand,
        'plumbing products',
        'construction products',
      ],
      openGraph: {
        title: `${product.name} | Iron & Water Co.`,
        description: product.description || `View ${product.name} at Iron & Water Co.`,
        url: `${siteUrl}/store/${params.id}`,
        siteName: 'Iron & Water Co.',
        type: 'website',
        images: product.images && product.images.length > 0 ? [product.images[0]] : [`${siteUrl}/logo-long.jpg`],
      },
      twitter: {
        card: 'summary_large_image',
        title: `${product.name} | Iron & Water Co.`,
        description: product.description || `View ${product.name} at Iron & Water Co.`,
        images: product.images && product.images.length > 0 ? [product.images[0]] : [`${siteUrl}/logo-long.jpg`],
        creator: '@ironandwaterco',
      },
      alternates: {
        canonical: `${siteUrl}/store/${params.id}`,
      },
    }
  } catch (error) {
    return {
      title: 'Product',
    }
  }
}

export default async function ProductPage({ params }: { params: { id: string } }) {
  let product = null
  let error = null

  try {
    // Fetch product data - use localhost in development, production URL in production
    // The id parameter is now SKU (or ID as fallback)
    const isDevelopment = process.env.NODE_ENV === 'development'
    let baseUrl: string
    if (isDevelopment) {
      // In development, always use http://localhost (never https)
      // Try to detect port from NEXT_PUBLIC_SITE_URL or default to 3000
      const envUrl = process.env.NEXT_PUBLIC_SITE_URL || ''
      // Extract port from URL if it contains localhost, otherwise use default
      let port = '3000'
      if (envUrl.includes('localhost')) {
        const portMatch = envUrl.match(/:(\d+)/)
        if (portMatch) {
          port = portMatch[1]
        }
      }
      // Always use http:// in development (never https)
      baseUrl = `http://localhost:${port}`
    } else {
      // In production, use the production URL
      baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://ironandwaterco.com'
    }
    const productIdentifier = decodeURIComponent(params.id)
    const apiUrl = `${baseUrl}/api/cin7/products/${encodeURIComponent(productIdentifier)}`
    console.log('Fetching product from:', apiUrl, 'Product SKU/ID:', productIdentifier, '(dev:', isDevelopment, ')')
    const response = await fetch(apiUrl, {
      cache: 'no-store',
      headers: {
        'Content-Type': 'application/json',
      },
    })
    console.log('Product API response status:', response.status)

    if (!response.ok) {
      if (response.status === 404) {
        notFound()
      }
      throw new Error('Failed to fetch product')
    }

    const data = await response.json()
    console.log('Product API response data:', { success: data.success, hasProduct: !!data.product })
    if (data.success && data.product) {
      product = data.product
      console.log('Product found:', product.name, product.id)
    } else {
      console.error('Product not found in response:', data)
      notFound()
    }
  } catch (err: any) {
    console.error('Error fetching product:', err)
    console.error('Error details:', {
      message: err.message,
      stack: err.stack,
      name: err.name,
    })
    error = err.message
  }

  if (!product) {
    notFound()
  }

  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    '@id': `${siteUrl}/store/${params.id}#product`,
    name: product.name,
    sku: product.sku,
    description: product.description,
    category: product.category,
    brand: product.brand ? {
      '@type': 'Brand',
      name: product.brand,
    } : undefined,
    offers: {
      '@type': 'Offer',
      price: product.price,
      priceCurrency: 'USD',
      availability: product.inStock ? 'https://schema.org/InStock' : 'https://schema.org/OutOfStock',
    },
    image: product.images && product.images.length > 0 ? product.images : undefined,
  }

  const breadcrumbStructuredData = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: siteUrl,
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Store',
        item: `${siteUrl}/store`,
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: product.name,
        item: `${siteUrl}/store/${params.id}`,
      },
    ],
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbStructuredData) }}
      />
      <Navbar activePage="store" />
      <main>
        <ProductPageContent product={product} />
      </main>
      <Footer />
    </>
  )
}

