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
NOTIFICATION_EMAILS=email1@example.com,email2@example.com

# Site URL for logo in emails (optional)
# If not set, defaults to https://ironandwaterco.com/logo.png
# Update this with your actual domain once deployed
NEXT_PUBLIC_SITE_URL=https://ironandwaterco.com

# Cin7 API Configuration
# Get these credentials from your Cin7 account:
# 1. Log in to Cin7
# 2. Go to Settings > Integrations & API > API v1
# 3. Create a new API connection
# 4. Copy the AccountID (API Username) and Key (API Key)
# Example credentials (replace with your actual values):
CIN7_API_USERNAME=88ddca51-e896-451d-aaff-43deb7a49c16
CIN7_API_KEY=906d36e5-890b-51df-d0f3-6b93477dbe3d
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
   - Update `NOTIFICATION_EMAILS` with actual email addresses that should receive form submission notifications
   - Separate multiple emails with commas

3. **Cin7 API Setup:**
   - Log in to your Cin7 account
   - Navigate to **Settings** > **Integrations & API** > **API v1**
   - Click **Add New API Connection**
   - Provide a descriptive name (e.g., "Iron Water Co Store")
   - Click **Save** to generate the API Key
   - Copy the **API Username** and **API Key**
   - Add them to your `.env.local` file as `CIN7_API_USERNAME` and `CIN7_API_KEY`
   - Set permissions for the connection (at minimum, Read access for Products)
   - For more information, see: https://dearinventory.docs.apiary.io/

## Important Notes

- The `.env.local` file is git-ignored and won't be committed
- Make sure to restart your dev server after adding environment variables
- For production deployment, add these variables to your hosting platform's environment settings
- This uses the same email system as Vierra-Website (Nodemailer with Gmail)

