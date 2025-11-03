# Environment Variables Setup

Create a `.env.local` file in the root directory with the following variables:

```env
# Gmail Email Configuration
# Use your Gmail address and app-specific password
# To create an app password: https://support.google.com/accounts/answer/185833
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_app_specific_password

# Email addresses to receive signup notifications
# Separate multiple emails with commas
NOTIFICATION_EMAILS=richard@ironandwaterco.com,raynny@ironandwaterco.com

# Site URL for logo in emails (optional)
# If not set, defaults to https://ironandwaterco.com/logo.png
# Update this with your actual domain once deployed
NEXT_PUBLIC_SITE_URL=https://ironandwaterco.com
```

## Setup Instructions

1. **Gmail Setup:**
   - Use your Gmail address for `EMAIL_USER`
   - Create an app-specific password:
     - Go to https://myaccount.google.com/apppasswords
     - Sign in with your Google account
     - Select "Mail" and "Other (Custom name)"
     - Enter "Iron Water Co" and click Generate
     - Copy the 16-character password and add it to `EMAIL_PASS`
   - Note: You must have 2-Step Verification enabled on your Google account

2. **Notification Emails:**
   - Update `NOTIFICATION_EMAILS` with actual email addresses for Richard and Raynny
   - Separate multiple emails with commas

## Important Notes

- The `.env.local` file is git-ignored and won't be committed
- Make sure to restart your dev server after adding environment variables
- For production deployment, add these variables to your hosting platform's environment settings
- This uses the same email system as Vierra-Website (Nodemailer with Gmail)

