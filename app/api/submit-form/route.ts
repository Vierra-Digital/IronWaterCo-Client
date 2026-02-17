import { NextRequest, NextResponse } from 'next/server'
import { sendWelcomeEmail, sendNotificationEmail } from '@/lib/emailSender'

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
