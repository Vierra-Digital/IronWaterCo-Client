import Link from 'next/link'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

export default function NotFound() {
  return (
    <>
      <Navbar activePage="store" />
      <main>
        <section className="product-page">
          <div className="container">
            <div style={{ textAlign: 'center', padding: '4rem 2rem' }}>
              <h1 style={{ fontSize: '3rem', color: '#ffffff', marginBottom: '1rem' }}>404</h1>
              <h2 style={{ fontSize: '1.5rem', color: '#d4af37', marginBottom: '1rem' }}>Product Not Found</h2>
              <p style={{ color: 'rgba(255, 255, 255, 0.7)', marginBottom: '2rem' }}>
                The product you're looking for doesn't exist or has been removed.
              </p>
              <Link 
                href="/store" 
                style={{
                  display: 'inline-block',
                  padding: '0.75rem 1.5rem',
                  background: 'rgba(212, 175, 55, 0.1)',
                  border: '1px solid rgba(212, 175, 55, 0.3)',
                  borderRadius: '8px',
                  color: '#d4af37',
                  textDecoration: 'none',
                  fontWeight: '600',
                  transition: 'all 0.3s ease',
                }}
              >
                ← Back to Store
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}


