'use client'

import { useState } from 'react'

interface FormData {
  name: string
  company: string
  role: string
  email: string
  phone: string
  zip: string
  interests: string
  foundersPreview: boolean
}

interface ModalProps {
  isOpen: boolean
  onClose: () => void
}

export default function FormModal({ isOpen, onClose }: ModalProps) {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    company: '',
    role: '',
    email: '',
    phone: '',
    zip: '',
    interests: '',
    foundersPreview: false
  })
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
    }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log('Form submitted:', formData)
    setIsSubmitted(true)
  }

  const handleClose = () => {
    setIsSubmitted(false)
    setFormData({
      name: '',
      company: '',
      role: '',
      email: '',
      phone: '',
      zip: '',
      interests: '',
      foundersPreview: false
    })
    onClose()
  }

  if (!isOpen) return null

  return (
    <div className="modal-overlay" onClick={handleClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={handleClose}>
          ×
        </button>
        
        {isSubmitted ? (
          <div className="success-message">
            <h2 className="success-title">You're on the list.</h2>
            <p className="success-text">We'll reach out with early previews and VIP invites.</p>
            <button className="close-button" onClick={handleClose}>
              Close
            </button>
          </div>
        ) : (
          <>
            <h2 className="modal-title">Join Our Founders Circle</h2>
            <p className="modal-subtitle">Join our exclusive preview for designers, architects, builders & homeowners.</p>
            
            <form className="modal-form" onSubmit={handleSubmit}>
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="name">Name *</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="company">Company</label>
                  <input
                    type="text"
                    id="company"
                    name="company"
                    value={formData.company}
                    onChange={handleInputChange}
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="role">Role *</label>
                  <select
                    id="role"
                    name="role"
                    value={formData.role}
                    onChange={handleInputChange}
                    required
                  >
                    <option value="">Select your role</option>
                    <option value="Designer">Designer</option>
                    <option value="Architect">Architect</option>
                    <option value="Builder">Builder</option>
                    <option value="Homeowner">Homeowner</option>
                  </select>
                </div>
                <div className="form-group">
                  <label htmlFor="email">Email *</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="phone">Phone</label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="zip">ZIP *</label>
                  <input
                    type="text"
                    id="zip"
                    name="zip"
                    value={formData.zip}
                    onChange={handleInputChange}
                    required
                  />
                </div>
              </div>

              <div className="form-group">
                <label>Interests *</label>
                <div className="radio-group">
                  <label className="radio-label">
                    <input
                      type="radio"
                      name="interests"
                      value="Hardware"
                      checked={formData.interests === 'Hardware'}
                      onChange={handleInputChange}
                      required
                    />
                    Hardware
                  </label>
                  <label className="radio-label">
                    <input
                      type="radio"
                      name="interests"
                      value="Plumbing"
                      checked={formData.interests === 'Plumbing'}
                      onChange={handleInputChange}
                      required
                    />
                    Plumbing
                  </label>
                  <label className="radio-label">
                    <input
                      type="radio"
                      name="interests"
                      value="Both"
                      checked={formData.interests === 'Both'}
                      onChange={handleInputChange}
                      required
                    />
                    Both
                  </label>
                </div>
              </div>

              <div className="form-group checkbox-group">
              <label className="checkbox-label">
                <input
                  type="checkbox"
                  name="foundersPreview"
                  checked={formData.foundersPreview}
                  onChange={handleInputChange}
                />
                Invite Me To Soft Opening
              </label>
              </div>

              <button type="submit" className="submit-button">
                Get Early Access
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  )
}
