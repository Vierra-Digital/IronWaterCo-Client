'use client'

import { useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'

interface VendorDetail {
  heading: string
  blurb: string
  logoPath: string
}

const vendors = [
  'Accurate Hardware',
  'Alice Ceramica',
  'Alt',
  'Alno Inc',
  'Amba',
  'AquaBrass',
  'Armadi Art',
  'Artos',
  'Ashley Norton',
  'Axent',
  'Baden Haus',
  'Barber Wilsons',
  'Bates & Bates',
  'Beloni Bagno',
  'Bemis',
  'Blanco',
  'Buster & Punch',
  'CaBano',
  'Cavity Sliders',
  'Century Bathworks',
  'Cheviot Products',
  'Cinier',
  'Colombo Design',
  'Cool Lines USA',
  'Cristal et Bronze',
  'Croft Co',
  'Decor Walther',
  'Deltana',
  'Devon & Devon',
  'DND Handles',
  'Duravit',
  'Electric Mirror',
  'Elkay',
  'Emtek',
  'Fleurco',
  'Fiora',
  'Formed',
  'Ged Kennett',
  'Geberit',
  'GlassCrafters Inc.',
  'Hafele',
  'Hapny Home',
  'Hendel & Hendel',
  'Herbeau',
  'HydroSystems',
  'Insinkerator',
  'Jaclo',
  'Jorger',
  'Kartners',
  'Kingston Brass',
  'Lucena Bath',
  'Laufen',
  'LinkaSink',
  'Mac Faucets',
  'Madeli',
  'Maestro Bath',
  'Matthew Studios',
  'Miroir Brot',
  'Mountain Plumbing',
  'Mr. Steam',
  'Oatey',
  'P&Bhusri',
  'Perrin & Rowe',
  'Produits Neptune',
  'Riobel',
  'Rocky Mountain',
  'House Of Rohl',
  'Rubinetterie Treeme',
  'Schaub & Company',
  'Schmidlin',
  'Serdaneli',
  'Shaw\'s',
  'Simas',
  'Sterlingham',
  'StoneTouch',
  'Studio Lux',
  'Sugatsune',
  'Thompson Traders',
  'Trim to the Trade',
  'Vanico Maronyx',
  'Vast Studio',
  'Victoria & Albert',
  'Vogue UK',
  'Wasserwerk',
].sort((a, b) => a.localeCompare(b, undefined, { sensitivity: 'base' }))

const vendorDetails: Record<string, VendorDetail> = {
  'Alice Ceramica': {
    heading: 'Alice',
    blurb: 'Italian-made ceramic wash bins and sanitary ware, offering 16 collections, 20 finishes, and cutting-edge technology.',
    logoPath: '/vendor-logos/alice-ceramica.png',
  },
  Alt: {
    heading: 'Alt',
    blurb: 'Alt is an alternative decorative plumbing brand offering made-to-measure, certified lead-free faucets, and ecological aerators that reduce water consumption by 20%.',
    logoPath: '/vendor-logos/alt.png',
  },
  Amba: {
    heading: 'Amba',
    blurb: 'A pioneer in refined, accessible luxury heated towel racks crafted from premium stainless steel.',
    logoPath: '/vendor-logos/amba.png',
  },
  AquaBrass: {
    heading: 'AquaBrass',
    blurb: 'A Montreal-based designer and manufacturer of premium kitchen and bath fixtures, crafting refined faucets and shower systems defined by precision, performance, and modern elegance.',
    logoPath: '/vendor-logos/aquabrass.svg',
  },
  'Alno Inc': {
    heading: 'Alno',
    blurb: 'Known for designing and manufacturing high-quality decorative cabinet hardware, bathroom accessories, and mirrors defined by refined craftsmanship and timeless design.',
    logoPath: '/vendor-logos/alno.png',
  },
  'Armadi Art': {
    heading: 'Armadi',
    blurb: 'Specializing in vanity design and decorative plumbing, offering creations for upscale urban living or romantic, emotive spaces.',
    logoPath: '/vendor-logos/armadi-art.png',
  },
  Artos: {
    heading: 'Artos',
    blurb: 'An Italian-inspired collection of plumbing fixtures, including faucets, showers, and towel warmers, defined by refined design and lasting quality.',
    logoPath: '/vendor-logos/artos.png',
  },
  'Ashley Norton': {
    heading: 'Ashley Norton',
    blurb: 'This maker has crafted artisan architectural hardware in solid bronze and solid brass, offering door levers, knobs, cabinet pulls, and bath accessories defined by enduring craftsmanship and timeless design.',
    logoPath: '/vendor-logos/ashley-norton.svg',
  },
  Axent: {
    heading: 'Axent',
    blurb: 'Internationally renowned for blending Western aesthetics with Eastern technology, offering Swiss minimalist design and an extensive range of bathroom products.',
    logoPath: '/vendor-logos/axent.svg',
  },
  'Baden Haus': {
    heading: 'Baden Haus',
    blurb: 'A leading Italian manufacturer where sophisticated Italian design meets innovative German engineering, setting the standard for LED lighting and soft-close systems.',
    logoPath: '/vendor-logos/baden-haus.png',
  },
  'Barber Wilsons': {
    heading: 'Barber Wilson',
    blurb: 'A British-owned manufacturer dedicated to crafting luxury brass bathroom hardware with timeless beauty and artisanal precision.',
    logoPath: '/vendor-logos/barber-wilsons.svg',
  },
  'Bates & Bates': {
    heading: 'Bates & Bates',
    blurb: 'Part of the Alno family of brands, Bates & Bates shares the same commitment to decorative hardware and bath accessories defined by refined craftsmanship and timeless design.',
    logoPath: '/vendor-logos/bates-and-bates.png',
  },
  'Beloni Bagno': {
    heading: 'Beloni Bagno',
    blurb: 'A designer of premium bathroom cabinetry and furniture, creating customizable vanity collections distinguished by refined craftsmanship, modern style, and durable waterproof construction.',
    logoPath: '/vendor-logos/beloni-bagno.svg',
  },
  Bemis: {
    heading: 'Bemis',
    blurb: 'A global leader in the design and manufacturing of premium toilet seats, known for innovation, comfort, and lasting quality.',
    logoPath: '/vendor-logos/bemis.png',
  },
  Blanco: {
    heading: 'Blanco',
    blurb: 'A prestigious German brand specializing in luxury kitchen sinks and faucets, renowned for Silgranit and stainless-steel designs crafted with precision and timeless style.',
    logoPath: '/vendor-logos/blanco.png',
  },
  'Buster & Punch': {
    heading: 'Buster Punch',
    blurb: 'From light sources and dimmer switches to sculptural pendant lamps, door hardware, and cabinet pulls, the collection curates elevated details that bring depth, character, and quiet distinction to every space.',
    logoPath: '/vendor-logos/buster-punch.svg',
  },
  CaBano: {
    heading: 'Cabano',
    blurb: 'Luxury bathroom and kitchen water fixtures, with an extensive range of decorative plumbing products from faucets and shower components to curated accessories.',
    logoPath: '/vendor-logos/cabano.png',
  },
  'Century Bathworks': {
    heading: 'Century Bathworks',
    blurb: 'A pinnacle of precision and craftsmanship, where glass shower enclosures, frameless doors, finely engineered hinges, and bespoke vanities are brought to life as sculptural statements of enduring elegance.',
    logoPath: '/vendor-logos/century-bathworks.png',
  },
  'Cavity Sliders': {
    heading: 'Cavity Sliders',
    blurb: 'Originating from New Zealand, Cavity Sliders is renowned for precision-engineered CS Track Systems in heavy-duty aluminum for smooth, reliable performance, paired with refined CaviLock hardware for barn, bypass, and pocket door applications.',
    logoPath: '/vendor-logos/cavity-sliders.svg',
  },
  'Cheviot Products': {
    heading: 'Cheviot Products',
    blurb: 'Offers refined, European-inspired bath fixtures, including cast iron tubs, fireclay sinks, and elegant fittings that blend traditional craftsmanship with contemporary design and enduring performance.',
    logoPath: '/vendor-logos/cheviot-products.svg',
  },
  Cinier: {
    heading: 'Cinier',
    blurb: 'Creates sculptural cast iron radiators, towel warmers, and refined LED lighting that merge artistic expression with exceptional performance for sophisticated interiors.',
    logoPath: '/vendor-logos/cinier.svg',
  },
  'Colombo Design': {
    heading: 'Colombo Design',
    blurb: 'Offers an exquisite collection of door handles, pulls, knobs, and flush pulls in sixteen distinctive finishes, from timeless gold, bronze, brass, and chrome to modern matte black and matte white.',
    logoPath: '/vendor-logos/colombo-design.png',
  },
  'Cool Lines USA': {
    heading: 'Cool Lines',
    blurb: 'Sleek stainless steel bathroom accessories defined by clean, minimalist design, crafted for durability, easy maintenance, and understated elegance.',
    logoPath: '/vendor-logos/cool-lines.png',
  },
  'Croft Co': {
    heading: 'Croft Co',
    blurb: 'Renowned for handcrafted architectural ironmongery in solid brass and fine materials, blending timeless craftsmanship with modern design in classic and bespoke finishes.',
    logoPath: '/vendor-logos/croft-co.png',
  },
  'Decor Walther': {
    heading: 'Decor Walther',
    blurb: 'Crafts refined bathroom furnishings, including lamps, mirrors, and accessories, in collaboration with master specialists in metal, glass, porcelain, and wood.',
    logoPath: '/vendor-logos/decor-walther.svg',
  },
  Deltana: {
    heading: 'Deltana',
    blurb: 'A premier U.S. manufacturer of architectural hardware, offering door, cabinet, and bath fittings in refined finishes such as brass, stainless steel, and bronze.',
    logoPath: '/vendor-logos/deltana.png',
  },
  'Devon & Devon': {
    heading: 'Devon&Devon',
    blurb: 'An Italian luxury house from Florence, renowned for exquisite bath and home furnishings that unite classical European heritage with contemporary design.',
    logoPath: '/vendor-logos/devon-and-devon.png',
  },
  'DND Handles': {
    heading: 'DnD Handles',
    blurb: 'An Italian luxury hardware brand from Val Sabbia, known for refined craftsmanship, innovative finishes, and designer collaborations creating distinctive levers and pulls.',
    logoPath: '/vendor-logos/dnd-handles.png',
  },
  Duravit: {
    heading: 'Duravit',
    blurb: 'A distinguished German manufacturer of premium bath furnishings, offering ceramics, furniture, showers, tubs, and wellness systems that unite timeless design with technological innovation.',
    logoPath: '/vendor-logos/duravit.png',
  },
  'Electric Mirror': {
    heading: 'Electric Mirror',
    blurb: 'A luxury mirror brand known for illuminated, smart, and design-forward mirrors, from lighted vanities and makeup mirrors to frame-lit mirrors and mirror TVs.',
    logoPath: '/vendor-logos/electric-mirror.png',
  },
  Elkay: {
    heading: 'Elkay',
    blurb: 'A family-owned American manufacturer since 1920, renowned for premium stainless-steel sinks, faucets, and innovative water delivery systems, including drinking fountains and bottle-filling stations.',
    logoPath: '/vendor-logos/elkay.svg',
  },
  Emtek: {
    heading: 'Emtek',
    blurb: 'A high-end hardware brand specializing in customizable door and cabinet pieces that merge elegant design with dependable security.',
    logoPath: '/vendor-logos/emtek.png',
  },
  Fiora: {
    heading: 'Fiora',
    blurb: 'A Spanish luxury bath manufacturer known for innovative, high-tech shower trays, wall panels, sinks, and furnishings.',
    logoPath: '/vendor-logos/fiora.png',
  },
  'Produits Neptune': {
    heading: 'Produits Neptune',
    blurb: 'A Canadian brand specializing in eco-responsible bathtubs, toilets, sinks, and shower doors, renowned for refined designs and advanced whirlpool therapy systems.',
    logoPath: '/vendor-logos/produits-neptune.png',
  },
  Geberit: {
    heading: 'Geberit',
    blurb: 'A Swiss-made brand specializing in sanitary technology, actuator plates, flush controls, and advanced flushing systems that combine precision engineering with refined design.',
    logoPath: '/vendor-logos/geberit.svg',
  },
  'Ged Kennett': {
    heading: 'Ged Kennett',
    blurb: 'Ged and his team of skilled local metalworkers craft exceptional bar handles and door pulls, celebrated for uncompromising quality, refined design, and masterful craftsmanship.',
    logoPath: '/vendor-logos/ged-kennett.png',
  },
  'GlassCrafters Inc.': {
    heading: 'GlassCrafters',
    blurb: 'A leading U.S. manufacturer and installer of custom luxury glass, crafting frameless shower doors and architectural glass installations for residential and commercial spaces.',
    logoPath: '/vendor-logos/glasscrafters.svg',
  },
  Hafele: {
    heading: 'Hafele',
    blurb: 'A leader in precision-engineered furniture fittings and architectural hardware, offering innovative solutions for kitchens, closets, and office spaces.',
    logoPath: '/vendor-logos/hafele.png',
  },
  'Hapny Home': {
    heading: 'Hapny',
    blurb: 'Crafting durable solid brass cabinet knobs, pulls, and handles with a thoughtfully curated collection that makes hardware selection effortless, refined, and accessible.',
    logoPath: '/vendor-logos/hapny.png',
  },
  'Hendel & Hendel': {
    heading: 'Hendel and Hendel',
    blurb: 'Drawing on British heritage, the brand is known for tactile, timeless designs that create distinctive statement-piece knobs for kitchens, bathrooms, and closets.',
    logoPath: '/vendor-logos/hendel-and-hendel.svg',
  },
  Herbeau: {
    heading: 'Herbeau',
    blurb: 'Founded in Lille, France, the brand offers a curated collection of faucets, fireclay and hand-painted sinks, tubs, showers, and accessories with unique artistic character.',
    logoPath: '/vendor-logos/herbeau.svg',
  },
  'House Of Rohl': {
    heading: 'House of Rohl',
    blurb: 'A curator of high-end, handcrafted kitchen and bath pieces defined by artisanal craftsmanship and exceptional attention to detail.',
    logoPath: '/vendor-logos/house-of-rohl.png',
  },
  HydroSystems: {
    heading: 'Hydro Systems',
    blurb: 'A U.S. manufacturer of customizable, high-end bathtubs and bathing products, renowned for American-made craftsmanship and personalized wellness features.',
    logoPath: '/vendor-logos/hydro-systems.png',
  },
  Insinkerator: {
    heading: 'Insinkerator',
    blurb: 'Premium food waste disposers and instant hot water dispensers that elevate kitchen hygiene and bring seamless convenience to refined living.',
    logoPath: '/vendor-logos/insinkerator.png',
  },
  Jaclo: {
    heading: 'Jaclo',
    blurb: 'A family-owned manufacturer of high-end decorative plumbing fixtures, specializing in faucets, shower systems, grab bars, and accessories.',
    logoPath: '/vendor-logos/jaclo.png',
  },
  Jorger: {
    heading: 'Jorger',
    blurb: 'A German house of precision with over a century of heritage, crafting luxury faucets and fittings where meticulous engineering, refined design, and enduring craftsmanship meet.',
    logoPath: '/vendor-logos/jorger.png',
  },
  Kartners: {
    heading: 'Kartners',
    blurb: 'A Canadian design house crafting contemporary bathroom accessories and hardware with a distinctly European sensibility, where modern form meets refined craftsmanship.',
    logoPath: '/vendor-logos/kartners.svg',
  },
  'Kingston Brass': {
    heading: 'Kingston Brass',
    blurb: 'A California design house crafting kitchen and bath fixtures in solid brass, where enduring craftsmanship meets a refined balance of vintage character and modern design.',
    logoPath: '/vendor-logos/kingston-brass.png',
  },
  Laufen: {
    heading: 'Laufen',
    blurb: 'A Swiss design house since 1892, renowned for pioneering SaphirKeramik, creating refined ultra-thin bathroom ceramics and complete collections where precision engineering meets sculptural elegance.',
    logoPath: '/vendor-logos/laufen.svg',
  },
  LinkaSink: {
    heading: 'LinkaSink',
    blurb: 'An artisan sink atelier creating distinctive kitchen and bath pieces in hand-hammered copper, brass, bronze, porcelain, stone, and mosaic, where craftsmanship and design become functional art.',
    logoPath: '/vendor-logos/linkasink.png',
  },
  Madeli: {
    heading: 'Madeli',
    blurb: 'A Miami design house with Italian influence, crafting luxury bathroom furniture, vanities, and mirrors where European style meets modern function and refined craftsmanship.',
    logoPath: '/vendor-logos/madeli.png',
  },
  'Mac Faucets': {
    heading: 'Mac Faucets',
    blurb: 'Founded on the fusion of technology and design, this brand creates refined sensor-activated faucets, soap dispensers, and flush valves that bring innovation and elegance to modern spaces.',
    logoPath: '/vendor-logos/mac-faucets.png',
  },
  'Maestro Bath': {
    heading: 'Maestro Bath',
    blurb: 'Presents handcrafted Italian bath fixtures for modern luxury, offering designer sinks, faucets, vanities, bathtubs, mirrors, and accessories defined by refined style and contemporary elegance.',
    logoPath: '/vendor-logos/maestro-bath.svg',
  },
  'Matthew Studios': {
    heading: 'Matthew Studios',
    blurb: 'Matthew Studios is a Bronx-based, woman-owned design atelier creating bespoke lighting, hardware, and furniture, where each piece embodies artistry, sustainability, and quiet luxury.',
    logoPath: '/vendor-logos/matthew-studios.png',
  },
  'Mountain Plumbing': {
    heading: 'Mountain Plumbing Supply',
    blurb: 'Based in Dallas, Texas, this luxury plumbing house crafts refined kitchen and bath accessories, from faucets and filtration to instant hot water systems and disposers, offered in a curated range of elegant finishes.',
    logoPath: '/vendor-logos/mountain-plumbing.png',
  },
  'Mr. Steam': {
    heading: 'Mr Steam',
    blurb: 'A leader in luxury steam shower systems and spa technology, crafting advanced generators and wellness solutions that transform bathing into a true spa experience.',
    logoPath: '/vendor-logos/mr-steam.svg',
  },
  Oatey: {
    heading: 'Oatey',
    blurb: 'A trusted manufacturer of plumbing products, including solvent cements, roof flashings, and drains designed for dependable performance.',
    logoPath: '/vendor-logos/oatey.svg',
  },
  'Perrin & Rowe': {
    heading: 'Perrin & Rowe',
    blurb: 'Born in Britain over four decades ago, Perrin & Rowe crafts exquisite hand-finished brassware for kitchens and baths, where heritage craftsmanship and timeless design meet enduring luxury.',
    logoPath: '/vendor-logos/perrin-and-rowe.png',
  },
  Riobel: {
    heading: 'Riobel',
    blurb: 'A Canadian design house crafting high-end kitchen and bath fittings, celebrated for modern geometric forms and engineering that delivers both durability and refined performance.',
    logoPath: '/vendor-logos/riobel.png',
  },
  'Rubinetterie Treeme': {
    heading: 'Rubinetterie Treemme',
    blurb: 'Founded in Tuscany in 1968, this Italian house of luxury taps is celebrated for 100% Made in Italy craftsmanship. Blending traditional artistry with innovative design, each collection expresses modern elegance through refined brass and stainless-steel forms.',
    logoPath: '/vendor-logos/rubinetterie-treeme.png',
  },
  'Schaub & Company': {
    heading: 'Schaub & Company',
    blurb: 'A premier manufacturer of decorative cabinet hardware, known for finely crafted knobs, pulls, and hinges that complete cabinetry with sophistication.',
    logoPath: '/vendor-logos/schaub-and-company.png',
  },
  Schmidlin: {
    heading: 'Schmidlin',
    blurb: 'A Swiss manufacturer renowned for precision-crafted enameled steel bathtubs and shower trays, combining exceptional durability with refined European design.',
    logoPath: '/vendor-logos/schmidlin.png',
  },
  Serdaneli: {
    heading: 'Serdaneli',
    blurb: 'Serdaneli is a French designer of bespoke bathroom fittings and hardware, renowned as haute couture for the home, crafted from marble, crystal, fine stone, and Limoges porcelain.',
    logoPath: '/vendor-logos/serdaneli.png',
  },
  'Shaw\'s': {
    heading: 'Shaw\'s',
    blurb: 'A prestigious British manufacturer handcrafting authentic fireclay sinks in Lancashire, England since 1897, renowned as the originator of the classic farmhouse sink and celebrated for enduring craftsmanship.',
    logoPath: '/vendor-logos/shaws.svg',
  },
  Simas: {
    heading: 'Simas',
    blurb: 'An Italian manufacturer of fine ceramic sanitary ware, offering toilets, washbasins, consoles, and bathroom furnishings crafted with the elegance and precision of true Made in Italy design.',
    logoPath: '/vendor-logos/simas.png',
  },
  Sterlingham: {
    heading: 'Sterlingham',
    blurb: 'A distinguished British maker of handcrafted brass bathroom accessories, washstands, and towel warmers, defined by timeless design and exceptional craftsmanship.',
    logoPath: '/vendor-logos/sterlingham.png',
  },
  StoneTouch: {
    heading: 'Stone Touch',
    blurb: 'A luxury Italian brand creating refined, sustainable bathroom fixtures, including freestanding bathtubs, vanities, and shower bases, where contemporary design meets responsible craftsmanship.',
    logoPath: '/vendor-logos/stone-touch.png',
  },
  'Studio Lux': {
    heading: 'Studio Lux',
    blurb: 'An internationally recognized architectural lighting studio based in St. Helena, California, creating transformative lighting designs that shape and elevate interior spaces.',
    logoPath: '/vendor-logos/studio-lux.png',
  },
  Sugatsune: {
    heading: 'Sugatsune',
    blurb: 'A Japanese manufacturer and global distributor of precision-engineered hardware, known for exceptional quality, innovation, and performance.',
    logoPath: '/vendor-logos/sugatsune.png',
  },
  'Trim to the Trade': {
    heading: 'Trim to the Trade',
    blurb: 'A specialized manufacturer of high-quality decorative plumbing products and rare finishing components, offering refined solutions for distinctive kitchen and bath installations.',
    logoPath: '/vendor-logos/trim-to-the-trade.png',
  },
  'Vast Studio': {
    heading: 'Vast Studio',
    blurb: 'Drawing on ancient Moroccan techniques, this maker creates sculptural cementitious pieces crafted from micro-cement, quartz, and rich pigments, where tradition meets modern engineering and refined durability.',
    logoPath: '/vendor-logos/vast-studio.png',
  },
  'Victoria & Albert': {
    heading: 'Victoria & Albert',
    blurb: 'Freestanding bathtubs and basins of exceptional luxury, handcrafted in South Africa from natural volcanic limestone, celebrated for their sculptural beauty and refined durability.',
    logoPath: '/vendor-logos/victoria-and-albert.png',
  },
  'Vogue UK': {
    heading: 'Vogue UK',
    blurb: 'The countrys leading manufacturer of heated towel rails, designer radiators, and accessories, known for combining performance with refined design.',
    logoPath: '/vendor-logos/vogue-uk.png',
  },
  Wasserwerk: {
    heading: 'Wasserwerk',
    blurb: 'A German manufacturer of premium kitchen faucets and accessories, distinguished by sustainable design, precision engineering, and refined performance.',
    logoPath: '/vendor-logos/wasserwerk.png',
  },
  'Accurate Hardware': {
    heading: 'Accurate Hardware',
    blurb: 'A Connecticut-based manufacturer specializing in custom architectural and door hardware, crafting mortise locks, security solutions, and decorative ADA-compliant fittings with precision and reliability.',
    logoPath: '/vendor-logos/accurate-hardware.png',
  },
  'Lucena Bath': {
    heading: 'Lucena Bath',
    blurb: 'A New York–based bathroom furniture house offering contemporary vanities, mirrors, and storage with Italian-influenced design, moisture-resistant engineered wood construction, soft-close hardware, and accessible price points for residential projects.',
    logoPath: '/vendor-logos/lucena-bath.png',
  },
  'P&Bhusri': {
    heading: 'P&Bhusri',
    blurb: 'A British design house creating sculptural heated towel warmers and designer radiators in stainless steel and mixed metals, where art-forward forms, hand-finished craftsmanship, and reliable heating performance elevate the bath as a gallery-worthy space.',
    logoPath: '/vendor-logos/pb-husri.png',
  },
  'Vanico Maronyx': {
    heading: 'Vanico Maronyx',
    blurb: 'A Quebec manufacturer proudly designing and building customizable bathroom furniture in Canada—vanities, linen cabinets, mirrors, medicine cabinets, composite sinks, and quartz countertops—through an integrated furniture, composite, and stone facility serving dealers across North America.',
    logoPath: '/vendor-logos/vanico-maronyx.png',
  },
  'Rocky Mountain': {
    heading: 'Rocky Mountain',
    blurb: 'Handcrafted in the American West, this maker produces architectural hardware in solid bronze, brass, and nickel—door levers, knobs, hinges, cabinet pulls, and bath accessories—celebrated for artisan casting, living finishes, and enduring presence in luxury residences.',
    logoPath: '/vendor-logos/rocky-mountain.png',
  },
  'Miroir Brot': {
    heading: 'Miroir Brot',
    blurb: 'A French heritage brand with roots in fine mirror-making, offering refined bathroom mirrors, magnifying mirrors, and illuminated vanity glass that unite optical clarity, elegant proportion, and the quiet craftsmanship of European bath design.',
    logoPath: '/vendor-logos/miroir-brot.png',
  },
  'Cristal et Bronze': {
    heading: 'Cristal et Bronze',
    blurb: 'A Parisian house of luxury bath fittings and accessories, pairing crystal, fine metalwork, and bronze in faucets, lighting, and decorative pieces where Old World artistry and contemporary refinement meet in distinctly French interiors.',
    logoPath: '/vendor-logos/cristal-et-bronze.png',
  },
  Fleurco: {
    heading: 'Fleurco',
    blurb: 'A Canadian manufacturer specializing in shower bases, glass shower doors and enclosures, bathtubs, and steam solutions—known for precision acrylic and solid-surface engineering, clean modern lines, and dependable performance in high-end residential baths.',
    logoPath: '/vendor-logos/fleurco.png',
  },
  'Thompson Traders': {
    heading: 'Thompson Traders',
    blurb: 'An artisan metalworks studio crafting hand-hammered copper and brass kitchen and bath sinks, tubs, and accents in Mexico, where traditional hammering techniques, living metal patinas, and sculptural forms bring warmth and character to refined interiors.',
    logoPath: '/vendor-logos/thompson-traders.png',
  },
  Formed: {
    heading: 'Formed',
    blurb: 'A specialist in custom solid-surface shower bases and wet-area solutions, manufacturing slip-resistant, non-porous platforms from mineral-filled acrylic resin in tailored sizes, drain locations, and threshold details for seamless, grout-free shower design.',
    logoPath: '/vendor-logos/formed.png',
  },
}

export default function VendorsSection() {
  const [isVisible, setIsVisible] = useState(false)
  const [selectedVendor, setSelectedVendor] = useState<string | null>(null)
  const [logoError, setLogoError] = useState<Record<string, boolean>>({})
  const [isMounted, setIsMounted] = useState(false)
  const vendorsRef = useRef<(HTMLElement | null)[]>([])
  const sectionRef = useRef<HTMLElement>(null)
  const headerRef = useRef<HTMLDivElement>(null)
  const gridRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    setIsVisible(true)
    setIsMounted(true)
  }, [])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry, index) => {
          if (entry.isIntersecting) {
            setTimeout(() => {
              entry.target.classList.add('fade-in-visible')
            }, index * 50)
          }
        })
      },
      { threshold: 0.1 }
    )

    vendorsRef.current.forEach((vendor) => {
      if (vendor) observer.observe(vendor)
    })

    return () => observer.disconnect()
  }, [])

  const selectedVendorDetail = selectedVendor ? vendorDetails[selectedVendor] : null

  const handleVendorClick = (vendor: string) => {
    if (!vendorDetails[vendor]) return
    setSelectedVendor(vendor)
  }

  useEffect(() => {
    if (!selectedVendorDetail) return
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setSelectedVendor(null)
      }
    }
    window.addEventListener('keydown', handleEscape)
    return () => window.removeEventListener('keydown', handleEscape)
  }, [selectedVendorDetail])

  useEffect(() => {
    if (!selectedVendorDetail) return

    const scrollY = window.scrollY
    const originalHtmlOverflow = document.documentElement.style.overflow
    const originalBodyOverflow = document.body.style.overflow
    const originalBodyPosition = document.body.style.position
    const originalBodyTop = document.body.style.top
    const originalBodyWidth = document.body.style.width
    const originalTouchAction = document.body.style.touchAction

    document.documentElement.style.overflow = 'hidden'
    document.body.style.overflow = 'hidden'
    document.body.style.touchAction = 'none'
    document.body.style.position = 'fixed'
    document.body.style.top = `-${scrollY}px`
    document.body.style.width = '100%'

    return () => {
      document.documentElement.style.overflow = originalHtmlOverflow
      document.body.style.overflow = originalBodyOverflow
      document.body.style.position = originalBodyPosition
      document.body.style.top = originalBodyTop
      document.body.style.width = originalBodyWidth
      document.body.style.touchAction = originalTouchAction
      window.scrollTo(0, scrollY)
    }
  }, [selectedVendorDetail])

  return (
    <section id="vendors" className={`vendors-section ${isVisible ? 'vendors-section-visible' : ''}`} ref={sectionRef} aria-labelledby="vendors-heading">
      <div className="container">
        <div ref={headerRef}>
          <p className="section-subtitle">Curated Excellence</p>
          <h1 id="vendors-heading" className="section-title">Our Vendors</h1>
          <p className="vendors-intro">
            We partner with the world's finest manufacturers to bring you exceptional architectural hardware and plumbing fixtures. 
            Each vendor in our collection has been carefully selected for their commitment to quality, craftsmanship, and design excellence.
          </p>
        </div>
        <div className="vendors-grid" ref={gridRef} role="list">
          {vendors.map((vendor, index) => (
            <div
              key={index}
              ref={(el) => { vendorsRef.current[index] = el; }}
              className="vendor-card-wrapper fade-in"
              role="listitem"
            >
              <button
                type="button"
                className={`vendor-card ${vendorDetails[vendor] ? 'vendor-card--detailed' : 'vendor-card--disabled'} ${selectedVendor === vendor ? 'vendor-card--active' : ''}`}
                onClick={() => handleVendorClick(vendor)}
                aria-label={vendorDetails[vendor] ? `View vendor details for ${vendor}` : `${vendor} details coming soon`}
              >
                <div className="vendor-name">{vendor}</div>
              </button>
            </div>
          ))}
        </div>
        {isMounted && selectedVendorDetail && createPortal(
          <div className="vendor-modal-overlay" onClick={() => setSelectedVendor(null)} role="presentation">
            <div
              className="vendor-modal vendor-detail-panel fade-in-visible"
              aria-live="polite"
              role="dialog"
              aria-modal="true"
              aria-label={`${selectedVendorDetail.heading} vendor details`}
              onClick={(e) => e.stopPropagation()}
            >
              <button
                type="button"
                className="vendor-modal-close"
                aria-label="Close vendor details"
                onClick={() => setSelectedVendor(null)}
              >
                ×
              </button>
              <div className="vendor-detail-logo-column">
                {!logoError[selectedVendor || ''] ? (
                  <img
                    src={selectedVendorDetail.logoPath}
                    alt={`${selectedVendorDetail.heading} logo`}
                    className="vendor-detail-logo"
                    draggable={false}
                    onContextMenu={(e) => e.preventDefault()}
                    onDragStart={(e) => e.preventDefault()}
                    onMouseDown={(e) => {
                      if (e.button === 2) e.preventDefault()
                    }}
                    onError={() => setLogoError((prev) => ({ ...prev, [selectedVendor || '']: true }))}
                  />
                ) : (
                  <div className="vendor-detail-logo-fallback">
                    <span>{selectedVendorDetail.heading}</span>
                  </div>
                )}
              </div>
              <div className="vendor-detail-content">
                <h3>{selectedVendorDetail.heading}</h3>
                <p>{selectedVendorDetail.blurb}</p>
              </div>
            </div>
          </div>,
          document.body
        )}
        <div className="vendors-cta">
          <a 
            href="mailto:customerexperience@ironandwaterco.com?subject=Vendor Inquiry" 
            className="vendor-email-button"
            aria-label="Inquire about joining our elite collection of vendors"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
              <polyline points="22,6 12,13 2,6"></polyline>
            </svg>
            Inquire About Joining Our Elite Collection Of Vendors
          </a>
        </div>
      </div>
    </section>
  )
}

