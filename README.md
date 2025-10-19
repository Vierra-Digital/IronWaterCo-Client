# Iron & Water Co. Client

A NextJS landing page for Iron & Water Co. featuring a hero section with early access signup form.

## Features

- **Hero Section**: Clean, professional design with gradient background
- **Early Access Form**: Complete form with all required fields
- **Responsive Design**: Mobile-first approach with responsive breakpoints
- **Form Validation**: Client-side validation for required fields
- **Success State**: Custom success message after form submission

## Form Fields

- Name (required)
- Company (optional)
- Role (Designer/Architect/Builder/Homeowner) - required
- Email (required)
- Phone (optional)
- ZIP (required)
- Interests (Hardware/Plumbing/Both) - required
- Founders Preview checkbox (optional)

## Getting Started

1. Install dependencies:
```bash
npm install
```

2. Run the development server:
```bash
npm run dev
```

3. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
├── app/
│   ├── globals.css          # Global styles and hero section styling
│   ├── layout.tsx           # Root layout component
│   └── page.tsx             # Home page with hero section
├── components/
│   └── HeroSection.tsx      # Main hero component with form
├── package.json             # Dependencies and scripts
├── next.config.js           # NextJS configuration
└── tsconfig.json            # TypeScript configuration
```

## Technologies Used

- **NextJS 14** with App Router
- **TypeScript** for type safety
- **CSS** for styling with modern design patterns
- **React Hooks** for state management
