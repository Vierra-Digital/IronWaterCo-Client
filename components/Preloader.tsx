'use client'

import { useEffect, useState } from 'react'

export default function Preloader() {
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 2000)

    return () => clearTimeout(timer)
  }, [])

  if (!isLoading) return null

  return (
    <div className="preloader">
      <div className="preloader-content">
        <div className="preloader-logo">
          <div className="logo-spinner"></div>
        </div>
        <p className="preloader-text">Iron & Water Co.</p>
      </div>
    </div>
  )
}
