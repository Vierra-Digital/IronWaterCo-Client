import { NextRequest, NextResponse } from 'next/server'
import { sendWelcomeEmail, sendNotificationEmail } from '@/lib/emailSender'

function toValueOrNA(value: unknown): string {
  if (typeof value === 'string') {
    const trimmed = value.trim()
    return trimmed.length > 0 ? trimmed : 'N/A'
  }
  if (typeof value === 'number' || typeof value === 'boolean') {
    return String(value)
  }
  return 'N/A'
}

function splitName(fullName: string): { firstName: string; lastName: string } {
  const normalized = fullName.trim().replace(/\s+/g, ' ')
  if (!normalized) return { firstName: 'N/A', lastName: 'N/A' }

  const parts = normalized.split(' ')
  const firstName = parts[0] || 'N/A'
  const lastName = parts.slice(1).join(' ').trim() || 'N/A'

  return { firstName, lastName }
}

async function syncFoundersCircleToSheet(payload: {
  name: string
  company?: string
  role: string
  email: string
  phone?: string
  zip: string
  interests: string
}) {
  const webhookUrl = process.env.GOOGLE_SHEETS_WEBHOOK_URL
  if (!webhookUrl) {
    throw new Error('GOOGLE_SHEETS_WEBHOOK_URL is not configured')
  }

  const { firstName, lastName } = splitName(payload.name)
  const normalizedEmail = toValueOrNA(payload.email).toLowerCase()

  const row = {
    Email: normalizedEmail,
    'First Name': toValueOrNA(firstName),
    'Last Name': toValueOrNA(lastName),
    Role: toValueOrNA(payload.role),
    'Zip Code': toValueOrNA(payload.zip),
    Interests: toValueOrNA(payload.interests),
    Company: toValueOrNA(payload.company),
    Phone: toValueOrNA(payload.phone),
  }

  const response = await fetch(webhookUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(row),
  })

  if (!response.ok) {
    const details = await response.text()
    throw new Error(`Google Sheets sync failed: ${response.status} ${details}`)
  }

  // Apps Script can return HTTP 200 even when the payload indicates failure.
  const result = await response.json().catch(() => null)
  if (result && result.success === false) {
    throw new Error(`Google Sheets sync failed: ${result.error || 'Unknown webhook error'}`)
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { name, company, role, email, phone, zip, interests, foundersPreview } = body

    if (!name || !role || !email || !zip || !interests) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    await sendWelcomeEmail({ name, email })

    await sendNotificationEmail({
      name,
      company: company || undefined,
      role,
      email,
      phone: phone || undefined,
      zip,
      interests,
      foundersPreview: foundersPreview || false,
    })

    await syncFoundersCircleToSheet({
      name,
      company: company || undefined,
      role,
      email,
      phone: phone || undefined,
      zip,
      interests,
    })

    return NextResponse.json({
      success: true,
      message: 'Form submitted successfully',
    })
  } catch (error: any) {
    return NextResponse.json(
      { error: 'Failed to submit form', details: error.message },
      { status: 500 }
    )
  }
}
