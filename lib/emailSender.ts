import nodemailer from "nodemailer";

interface WelcomeEmailData {
  name: string;
  email: string;
}

interface NotificationEmailData {
  name: string;
  company?: string;
  role: string;
  email: string;
  phone?: string;
  zip: string;
  interests: string;
  foundersPreview: boolean;
}

// Validate environment variables
if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
  console.warn("⚠️  EMAIL_USER and EMAIL_PASS must be set in .env.local for email functionality");
}

// Create transporter with Gmail/Google Workspace configuration
// Works for both @gmail.com and custom domains (Google Workspace)
const transporter = nodemailer.createTransport({
  service: "gmail",
  host: "smtp.gmail.com",
  port: 465,
  secure: true, // Use SSL
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
  // Add debug option for troubleshooting
  debug: process.env.NODE_ENV === "development",
  logger: process.env.NODE_ENV === "development",
});

const notificationRecipients = process.env.NOTIFICATION_EMAILS?.split(",") || [
  "richard@ironandwaterco.com",
  "raynny@ironandwaterco.com",
];

// Logo URL - use environment variable or default to placeholder
const logoUrl = process.env.NEXT_PUBLIC_SITE_URL 
  ? `${process.env.NEXT_PUBLIC_SITE_URL}/logo-long.jpg`
  : "https://ironandwaterco.com/logo-long.jpg"; // Update with your actual domain

export async function sendWelcomeEmail(data: WelcomeEmailData): Promise<void> {
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: data.email,
    subject: "Welcome to Iron & Water Co. Founders Circle",
    html: `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Welcome to Iron & Water Co.</title>
  <style>
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }
    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif;
      line-height: 1.6;
      color: #1a202c;
      background-color: #f8fafc;
    }
    .email-container {
      max-width: 600px;
      margin: 0 auto;
      background-color: #ffffff;
    }
    .email-header {
      background: linear-gradient(135deg, #2d3748 0%, #4a5568 25%, #2b6cb0 75%, #1a365d 100%);
      padding: 40px 30px;
      text-align: center;
    }
    .email-logo {
      margin-bottom: 20px;
      display: block;
    }
    .email-logo img {
      max-width: 250px;
      height: auto;
      border-radius: 8px;
    }
    .email-header h1 {
      color: #ffffff;
      font-size: 28px;
      font-weight: 700;
      margin-bottom: 10px;
    }
    .email-header p {
      color: #e2e8f0;
      font-size: 16px;
    }
    .email-body {
      padding: 40px 30px;
    }
    .greeting {
      font-size: 18px;
      color: #1a202c;
      margin-bottom: 20px;
      font-weight: 600;
    }
    .content {
      font-size: 16px;
      color: #4a5568;
      margin-bottom: 25px;
      line-height: 1.8;
    }
    .highlight {
      color: #d4af37;
      font-weight: 600;
    }
    .section {
      margin-bottom: 30px;
    }
    .section-title {
      font-size: 20px;
      color: #1a202c;
      font-weight: 700;
      margin-bottom: 15px;
      padding-bottom: 10px;
      border-bottom: 2px solid #e2e8f0;
    }
    .section-content {
      font-size: 16px;
      color: #4a5568;
      line-height: 1.8;
    }
    .cta-section {
      background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%);
      padding: 30px;
      border-radius: 12px;
      margin: 30px 0;
      text-align: center;
    }
    .cta-title {
      font-size: 22px;
      color: #1a202c;
      font-weight: 700;
      margin-bottom: 15px;
    }
    .cta-text {
      font-size: 16px;
      color: #4a5568;
      margin-bottom: 20px;
    }
    .event-list {
      list-style: none;
      padding: 0;
      margin: 20px 0;
    }
    .event-list li {
      padding: 12px 0;
      border-bottom: 1px solid #e2e8f0;
      font-size: 16px;
      color: #4a5568;
    }
    .event-list li:last-child {
      border-bottom: none;
    }
    .event-name {
      font-weight: 600;
      color: #1a202c;
    }
    .footer {
      background-color: #2d3748;
      padding: 30px;
      text-align: center;
      color: #e2e8f0;
    }
    .footer-text {
      font-size: 14px;
      margin-bottom: 10px;
    }
    .footer-brand {
      font-size: 18px;
      font-weight: 700;
      color: #d4af37;
      margin-top: 15px;
    }
    .footer-tagline {
      font-size: 14px;
      font-style: italic;
      color: #a0aec0;
      margin-top: 5px;
    }
    .signature {
      margin-top: 30px;
      font-size: 16px;
      color: #4a5568;
    }
    .signature-name {
      font-weight: 600;
      color: #1a202c;
      margin-top: 10px;
    }
    @media only screen and (max-width: 600px) {
      .email-body {
        padding: 30px 20px;
      }
      .email-header {
        padding: 30px 20px;
      }
      .email-header h1 {
        font-size: 24px;
      }
      .cta-section {
        padding: 20px;
      }
    }
  </style>
</head>
<body>
  <div class="email-container">
    <div class="email-header">
      <div class="email-logo">
        <img src="${logoUrl}" alt="Iron & Water Co. Logo" />
      </div>
      <h1>Welcome to Iron & Water Co.</h1>
      <p>Thank you for joining our Founders Circle</p>
    </div>
    
    <div class="email-body">
      <div class="greeting">
        Hi ${data.name},
      </div>
      
      <div class="content">
        We're thrilled you've joined our <span class="highlight">Founders Circle</span>! Your interest in exceptional design and craftsmanship means the world to us.
      </div>
      
      <div class="section">
        <div class="section-title">About Iron & Water Co.</div>
        <div class="section-content">
          We're curating extraordinary architectural hardware and plumbing for the trade on Long Island's Miracle Mile. Our mission is simple: elevating the design trade through exceptional detail, service, and partnership. We believe that every project deserves hardware and fixtures that are as thoughtfully designed as the spaces they inhabit.
        </div>
      </div>
      
      <div class="section">
        <div class="section-title">What's Next?</div>
        <div class="section-content">
          As a Founders Circle member, you'll get first access to our curated collections, exclusive previews, and invitations to special events. We're building something special here, and we want you to be part of it from the very beginning.
        </div>
      </div>
      
      <div class="cta-section">
        <div class="cta-title">Join Us for Our Openings</div>
        <div class="cta-text">
          We'd love to have you celebrate with us as we open our doors. Here's what's coming:
        </div>
        <ul class="event-list">
          <li>
            <span class="event-name">Soft Opening</span><br>
            An exclusive preview for our Founders Circle members
          </li>
          <li>
            <span class="event-name">Grand Opening</span><br>
            The official celebration of Iron & Water Co.
          </li>
        </ul>
        <div class="cta-text" style="margin-top: 20px;">
          You'll receive detailed invitations and event information as we get closer to these dates. We can't wait to welcome you in person!
        </div>
      </div>
      
      <div class="content">
        In the meantime, if you have any questions or want to learn more about what we're building, don't hesitate to reach out. We're here to help.
      </div>
      
      <div class="signature">
        Warm regards,<br>
        <div class="signature-name">The Iron & Water Co. Team</div>
      </div>
    </div>
    
    <div class="footer">
      <div class="footer-brand">Iron & Water Co.</div>
      <div class="footer-tagline">"The Architecture of Beauty"</div>
      <div class="footer-text" style="margin-top: 20px;">
        1506 Northern Blvd<br>
        Manhasset, NY 11030<br>
        <a href="mailto:customerexperience@ironandwaterco.com" style="color: #d4af37; text-decoration: none;">customerexperience@ironandwaterco.com</a><br>
        329-233-6638
      </div>
    </div>
  </div>
</body>
</html>
    `,
  };

  try {
    if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
      throw new Error("Email credentials not configured. Please set EMAIL_USER and EMAIL_PASS in .env.local");
    }
    const info = await transporter.sendMail(mailOptions);
    console.log("Welcome email sent successfully:", info.response);
  } catch (error: any) {
    console.error("Error sending welcome email:", error);
    if (error.code === "EAUTH") {
      const emailDomain = process.env.EMAIL_USER?.split("@")[1] || "";
      const isCustomDomain = emailDomain !== "gmail.com";
      
      let errorMessage = "Gmail/Google Workspace authentication failed. Please check:\n";
      errorMessage += `1. EMAIL_USER is correct: ${process.env.EMAIL_USER}\n`;
      errorMessage += "2. EMAIL_PASS is an app-specific password (NOT your regular password)\n";
      errorMessage += "3. 2-Step Verification is enabled on your Google account\n";
      
      if (isCustomDomain) {
        errorMessage += "4. For Google Workspace accounts, create app password at: https://myaccount.google.com/apppasswords\n";
        errorMessage += "   (Make sure you're signed in with your Google Workspace account)\n";
        errorMessage += "5. If this is NOT a Google Workspace account, you'll need different SMTP settings\n";
      } else {
        errorMessage += "4. Create app password at: https://myaccount.google.com/apppasswords\n";
      }
      
      throw new Error(errorMessage);
    }
    throw error;
  }
}

export async function sendNotificationEmail(data: NotificationEmailData): Promise<void> {
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: notificationRecipients.join(","),
    subject: `New Founders Circle Sign Up: ${data.name}`,
    html: `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>New Founders Circle Sign Up</title>
  <style>
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }
    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', sans-serif;
      line-height: 1.6;
      color: #1a202c;
      background-color: #f8fafc;
    }
    .email-container {
      max-width: 600px;
      margin: 0 auto;
      background-color: #ffffff;
    }
    .email-header {
      background: linear-gradient(135deg, #2d3748 0%, #4a5568 25%, #2b6cb0 75%, #1a365d 100%);
      padding: 30px;
      text-align: center;
    }
    .email-logo {
      margin-bottom: 15px;
      display: block;
    }
    .email-logo img {
      max-width: 200px;
      height: auto;
      border-radius: 8px;
    }
    .email-header h1 {
      color: #ffffff;
      font-size: 24px;
      font-weight: 700;
    }
    .email-body {
      padding: 30px;
    }
    .info-row {
      padding: 15px 0;
      border-bottom: 1px solid #e2e8f0;
    }
    .info-row:last-child {
      border-bottom: none;
    }
    .info-label {
      font-weight: 600;
      color: #1a202c;
      margin-bottom: 5px;
      font-size: 14px;
      text-transform: uppercase;
      letter-spacing: 0.5px;
    }
    .info-value {
      color: #4a5568;
      font-size: 16px;
    }
    .highlight-badge {
      display: inline-block;
      background: linear-gradient(135deg, #d4af37 0%, #f4d03f 100%);
      color: #1a202c;
      padding: 4px 12px;
      border-radius: 6px;
      font-size: 12px;
      font-weight: 600;
      margin-top: 5px;
    }
    .footer {
      background-color: #2d3748;
      padding: 30px;
      text-align: center;
      color: #e2e8f0;
    }
    .footer-text {
      font-size: 14px;
      margin-bottom: 10px;
    }
    .footer-brand {
      font-size: 18px;
      font-weight: 700;
      color: #d4af37;
      margin-top: 15px;
    }
    .footer-tagline {
      font-size: 14px;
      font-style: italic;
      color: #a0aec0;
      margin-top: 5px;
    }
  </style>
</head>
<body>
  <div class="email-container">
    <div class="email-header">
      <div class="email-logo">
        <img src="${logoUrl}" alt="Iron & Water Co. Logo" />
      </div>
      <h1>New Founders Circle Sign Up</h1>
    </div>
    
    <div class="email-body">
      <div class="info-row">
        <div class="info-label">Name</div>
        <div class="info-value">${data.name}</div>
      </div>
      
      ${data.company ? `
      <div class="info-row">
        <div class="info-label">Company</div>
        <div class="info-value">${data.company}</div>
      </div>
      ` : ''}
      
      <div class="info-row">
        <div class="info-label">Role</div>
        <div class="info-value">${data.role}</div>
      </div>
      
      <div class="info-row">
        <div class="info-label">Email</div>
        <div class="info-value"><a href="mailto:${data.email}" style="color: #2b6cb0; text-decoration: none;">${data.email}</a></div>
      </div>
      
      ${data.phone ? `
      <div class="info-row">
        <div class="info-label">Phone</div>
        <div class="info-value"><a href="tel:${data.phone}" style="color: #2b6cb0; text-decoration: none;">${data.phone}</a></div>
      </div>
      ` : ''}
      
      <div class="info-row">
        <div class="info-label">ZIP Code</div>
        <div class="info-value">${data.zip}</div>
      </div>
      
      <div class="info-row">
        <div class="info-label">Interests</div>
        <div class="info-value">${data.interests}</div>
      </div>
      
      ${data.foundersPreview ? `
      <div class="info-row">
        <div class="info-label">Soft Opening Invite</div>
        <div class="info-value">
          <span class="highlight-badge">Requested</span>
        </div>
      </div>
      ` : ''}
    </div>
    
    <div class="footer">
      <div class="footer-brand">Iron & Water Co.</div>
      <div class="footer-tagline">"The Architecture of Beauty"</div>
      <div class="footer-text" style="margin-top: 20px;">
        1506 Northern Blvd<br>
        Manhasset, NY 11030<br>
        <a href="mailto:customerexperience@ironandwaterco.com" style="color: #d4af37; text-decoration: none;">customerexperience@ironandwaterco.com</a><br>
        329-233-6638
      </div>
    </div>
  </div>
</body>
</html>
    `,
    replyTo: data.email,
  };

  try {
    if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
      throw new Error("Email credentials not configured. Please set EMAIL_USER and EMAIL_PASS in .env.local");
    }
    const info = await transporter.sendMail(mailOptions);
    console.log("Notification email sent successfully:", info.response);
  } catch (error: any) {
    console.error("Error sending notification email:", error);
    if (error.code === "EAUTH") {
      const emailDomain = process.env.EMAIL_USER?.split("@")[1] || "";
      const isCustomDomain = emailDomain !== "gmail.com";
      
      let errorMessage = "Gmail/Google Workspace authentication failed. Please check:\n";
      errorMessage += `1. EMAIL_USER is correct: ${process.env.EMAIL_USER}\n`;
      errorMessage += "2. EMAIL_PASS is an app-specific password (NOT your regular password)\n";
      errorMessage += "3. 2-Step Verification is enabled on your Google account\n";
      
      if (isCustomDomain) {
        errorMessage += "4. For Google Workspace accounts, create app password at: https://myaccount.google.com/apppasswords\n";
        errorMessage += "   (Make sure you're signed in with your Google Workspace account)\n";
        errorMessage += "5. If this is NOT a Google Workspace account, you'll need different SMTP settings\n";
      } else {
        errorMessage += "4. Create app password at: https://myaccount.google.com/apppasswords\n";
      }
      
      throw new Error(errorMessage);
    }
    throw error;
  }
}

