import Image from 'next/image'

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-grid">
          <div className="footer-column">
            <div className="footer-logo">
              <Image 
                src="/logo.png" 
                alt="Iron & Water Co. - Architectural Hardware & Plumbing Showroom Logo" 
                width={100} 
                height={100}
                loading="lazy"
              />
              <p className="footer-brand">Iron & Water Co.</p>
              <p className="footer-tagline">"New inspiration every day."</p>
            </div>
          </div>
          
          <address className="footer-column">
            <h3>Contact</h3>
            <p>1506 Northern Blvd</p>
            <p>Manhasset, NY 11030</p>
            <p><a href="mailto:customerexperience@ironandwaterco.com" target="_blank" rel="noopener noreferrer" className="footer-link" aria-label="Email Iron & Water Co.">customerexperience@ironandwaterco.com</a></p>
            <p><a href="tel:329-233-6638" className="footer-link" aria-label="Call Iron & Water Co.">329-233-6638</a></p>
          </address>
          
          <nav className="footer-column" aria-label="Navigation links">
            <h3>Navigation</h3>
            <p><a href="/#services" className="footer-link">Services</a></p>
            <p><a href="/vendors" className="footer-link">Vendors</a></p>
            <p><a href="/#contact" className="footer-link">Contact</a></p>
          </nav>
          
          <nav className="footer-column" aria-label="Social media links">
            <h3>Connect</h3>
            <p><a href="https://www.linkedin.com/company/iron-water-co/" target="_blank" rel="noopener noreferrer" className="footer-link" aria-label="Visit Iron & Water Co. on LinkedIn">LinkedIn</a></p>
            <p><a href="https://www.instagram.com/ironandwaterco/" target="_blank" rel="noopener noreferrer" className="footer-link" aria-label="Follow Iron & Water Co. on Instagram">Instagram</a></p>
            <p>Alignable</p>
          </nav>
          
          <nav className="footer-column" aria-label="Legal information">
            <h3>Legal</h3>
            <p>Privacy Policy</p>
            <p>Terms of Service</p>
          </nav>
        </div>
      </div>
      {/* Copyright bar */}
      <div className="footer-bar">
        <div className="container">
          <p>
            &copy; 2025 Iron & Water Co. All rights reserved. | Powered by <a href="https://vierradev.com" target="_blank" rel="noopener noreferrer" className="footer-powered-link">Vierra Digital</a>
          </p>
        </div>
      </div>
    </footer>
  )
}

