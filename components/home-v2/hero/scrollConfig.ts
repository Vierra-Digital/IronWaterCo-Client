export const SCROLL_HEIGHT_VH = 1400
export const SCRUB = 3
export const TIMELINE_DURATION = 14

/** Map viewport-height units to scroll progress (0–1). */
export function vhProgress(vh: number): number {
  return vh / SCROLL_HEIGHT_VH
}

/** Map viewport-height units to GSAP timeline position (0–14). */
export function vhTime(vh: number): number {
  return (vh / SCROLL_HEIGHT_VH) * TIMELINE_DURATION
}

export const SERVICES = [
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

export const CONSTELLATION_SLOTS = [
  { top: '11%', left: '5%' },
  { top: '16%', right: '7%' },
  { top: '28%', left: '4%' },
  { top: '34%', right: '5%' },
  { top: '58%', left: '6%' },
  { top: '64%', right: '8%' },
  { top: '78%', left: '9%' },
] as const

export const TESTIMONIALS = [
  {
    quote:
      "Richard's showroom is a true one-stop shop for fixtures, tile, and hardware. He goes to great lengths to make projects successful.",
    name: 'Susan Vehaskari, MBA, LEED GA',
    title: 'Regional Vice President, Durkan / Mohawk',
  },
  {
    quote:
      "Richard is one of the most professional, reliable, and trustworthy people I've worked with. His product knowledge helped close deals.",
    name: 'Tamara D.',
    title: 'Regional Account Manager | Certified Paralegal',
  },
  {
    quote:
      'Richard was amazing to work with. His design and sales experience is impressive, he listens closely, and consistently guides clients to the right products.',
    name: 'Gretchen Auer',
    title: 'UX Designer and Writer',
  },
] as const

export const TEAM = [
  { name: 'Richard Segal', title: 'General Manager', initials: 'RS' },
  { name: 'Alex Shick', title: 'IT & Systems', initials: 'AS' },
  { name: 'Ebony Howard', title: 'Customer Concierge', initials: 'EH' },
] as const

export const DIFFERENTIATORS = [
  {
    num: '01',
    title: 'Uncompromising Precision',
    description:
      'Every detail engineered to perfection, because mediocrity has no place in exceptional design.',
  },
  {
    num: '02',
    title: 'White-Glove Service',
    description:
      'From initial consultation to final installation, we handle every detail with meticulous care.',
  },
  {
    num: '03',
    title: 'Trade-First Approach',
    description:
      'Built by professionals, for professionals. We understand your workflow and respect your timeline.',
  },
  {
    num: '04',
    title: 'Curated Excellence',
    description:
      'Every product in our collection is hand-selected for quality, aesthetic, and durability.',
  },
] as const

export const CONTACT_LINES = [
  '1506 Northern Blvd, Manhasset, NY 11030',
  '329-233-6638',
  'customerexperience@ironandwaterco.com',
  'Soft Opening: November 2025 | Grand Opening: 2026',
] as const
