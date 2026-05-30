export const heroContent = {
  headline: 'Elevating the Design Trade',
  headlineLines: [
    'Elevating the Design Trade',
    'Through Exceptional Detail,',
    'Service, and Partnership',
  ],
  intro:
    "Extraordinary architectural hardware & plumbing. Long Island's Miracle Mile.",
  manifestoLine: 'Design is felt, not just seen.',
  ctaLabel: 'Join Our Founders Circle',
}

/** Cinematic scroll hero — image paths + copy per scene. */
export const heroScenes = [
  {
    image: '/images/hero/scene-1-full-room.jpg',
    label: 'IRON & WATER CO.',
    title: 'Elevating the Design Trade',
    subtext:
      "Extraordinary architectural hardware & plumbing. Long Island's Miracle Mile.",
    layout: 'corner' as const,
  },
  {
    image: '/images/hero/scene-2-shower.jpg',
    label: 'CRAFTSMANSHIP',
    title: 'Every Detail, Engineered',
    subtext: "Hand-selected fixtures from the world's most exclusive vendors.",
    layout: 'corner' as const,
    steam: true,
  },
  {
    image: '/images/hero/scene-3-bathtub.jpg',
    label: 'COLLECTIONS',
    title: 'Curated to Perfection',
    subtext: 'Every fixture and handle is a statement piece.',
    layout: 'corner' as const,
  },
  {
    image: '/images/hero/scene-4-hardware.jpg',
    label: 'PRECISION',
    title: 'Authority Through Simplicity',
    subtext: '60+ years of collective design and construction experience.',
    layout: 'corner' as const,
  },
  {
    image: '/images/hero/scene-5-cta.jpg',
    label: 'THE TRADE PROGRAM',
    title: 'Shape Legacy',
    subtext:
      "Partnering with architects, designers, and builders on Long Island's Miracle Mile.",
    layout: 'center' as const,
    showCta: true,
  },
] as const

export const navLinks = [
  { label: 'Store', href: '/store' },
  { label: 'Vendors', href: '/vendors' },
  { label: 'Knowledgebase', href: '/knowledgebase' },
  { label: 'Insights', href: '/insights' },
  { label: 'FAQ', href: '/faq' },
  { label: 'Contact', href: '#contact' },
] as const

export const GLB_PATH = '/home-v2/penthouse-suite.glb'

export const services = [
  {
    title: 'Trade Program',
    description: 'Partnering with architects, designers, builders.',
  },
  {
    title: 'Curated Collections',
    description: 'Every fixture and handle is a statement piece.',
  },
  {
    title: 'Specification Support',
    description: 'Beauty aligned with code and logistics.',
  },
  {
    title: 'Concierge Ordering',
    description: 'White-glove logistics, start to finish.',
  },
  {
    title: 'Showroom Experiences',
    description: 'Design is felt, not just seen.',
  },
  {
    title: 'Custom Solutions',
    description: 'Tailored designs that reflect your unique vision.',
  },
  {
    title: 'Expert Consultations',
    description: 'Guidance from industry-leading specialists.',
  },
  {
    title: 'Project Management',
    description: 'Seamless coordination from concept to completion.',
  },
] as const

export const differentiationFeatures = [
  '60+ years of collective design + construction experience.',
  'Exclusive vendor partnerships.',
  'Integrated AI-powered customer experience.',
  'Miracle Mile location.',
  'Zero-compromise approach to detail.',
  'White-glove service & hospitality.',
] as const

export const differentiationQuote =
  "Because when you work with us, you don't just choose fixtures. You shape legacy."

export const stats = [
  { target: 60, label: 'Years of Combined Experience', suffix: '+' },
  { target: 100, label: 'Successful Projects', suffix: '+' },
  { target: 50, label: 'Satisfied Clients', suffix: '+' },
  { target: 6, label: 'Showroom Open Days', suffix: '/7' },
] as const

export const whatWeDoDifferently = [
  {
    title: 'Uncompromising Precision',
    description:
      'Every detail engineered to perfection, because mediocrity has no place in exceptional design.',
  },
  {
    title: 'White-Glove Service',
    description:
      'From initial consultation to final installation, we handle every detail with meticulous care.',
  },
  {
    title: 'Trade-First Approach',
    description:
      'Built by professionals, for professionals. We understand your workflow and respect your timeline.',
  },
  {
    title: 'Curated Excellence',
    description:
      'Every product in our collection is hand-selected for quality, aesthetic, and durability.',
  },
] as const

export const testimonials = [
  {
    text: "Richard's Dumbo showroom is a true one-stop shop for fixtures, tile, and hardware. He goes to great lengths to make projects successful, from home renovations to large-scale builds.",
    author: 'Susan Vehaskari, MBA, LEED GA',
    role: 'Regional Vice President - Durkan / Mohawk',
    initials: 'SV',
    imageSrc: '/testimonials/susan-vehaskari.png',
  },
  {
    text: "Richard is one of the most professional, reliable, and trustworthy people I've worked with. His product knowledge helped close deals, and his integrity kept clients confident.",
    author: 'Tamara D.',
    role: 'Regional Account Manager | Certified Paralegal',
    initials: 'TD',
    imageSrc: '/testimonials/tamara-d.png',
  },
  {
    text: 'Richard was amazing to work with. His design and sales experience is impressive, he listens closely, and he consistently guides clients to the right products for their needs.',
    author: 'Gretchen Auer',
    role: 'UX Designer and Writer',
    initials: 'GA',
    imageSrc: '/testimonials/gretchen-auer.png',
  },
] as const

export const teamMembers = [
  {
    name: 'Richard Segal',
    role: 'General Manager',
    imageSrc: '/Richard-Segal.png',
    imageAlt: 'Richard Segal - General Manager at Iron & Water Co. Architectural Hardware Showroom',
  },
  {
    name: 'Alex Shick',
    role: 'IT & Systems',
    imageSrc: '/alex-shick.JPG',
    imageAlt: 'Alex Shick - IT & Systems Specialist at Iron & Water Co. Architectural Hardware Showroom',
  },
  {
    name: 'Ebony Howard',
    role: 'Customer Concierge',
    initials: 'E',
  },
] as const

export const contactInfo = {
  street: '1506 Northern Blvd',
  city: 'Manhasset',
  state: 'NY',
  zip: '11030',
  phone: '329-233-6638',
  email: 'customerexperience@ironandwaterco.com',
  hours: 'Soft Opening November 2025\nGrand Opening 2026',
  mapEmbedUrl:
    'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3019.8576!2d-73.6985!3d40.7919!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNDDCsDQ3JzMwLjgiTiA3M8KwNDEnNTQuNiJX!5e0!3m2!1sen!2sus!4v1234567890123!5m2!1sen!2sus',
} as const

export const brandMarqueeLogos = [
  '/vendor-logos/duravit.png',
  '/vendor-logos/geberit.svg',
  '/vendor-logos/emtek.png',
  '/vendor-logos/riobel.png',
  '/vendor-logos/perrin-and-rowe.png',
  '/vendor-logos/victoria-and-albert.png',
  '/vendor-logos/mr-steam.svg',
  '/vendor-logos/blanco.png',
] as const
