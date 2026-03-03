export type InsightBlock =
  | { type: 'paragraph'; content: string }
  | { type: 'heading'; content: string; subtitle?: string }
  | { type: 'list'; items: string[] }
  | { type: 'image'; src: string; alt: string; caption?: string }

export interface Insight {
  id: string
  title: string
  subtitle?: string
  slug: string
  summary: string
  category: string
  date: string
  readTime: string
  body: InsightBlock[]
}

export function getInsightWordCount(insight: Insight): number {
  return insight.body.reduce((count, block) => {
    if (block.type === 'paragraph' || block.type === 'heading') {
      const words = block.content.split(/\s+/).length
      const subtitleWords = 'subtitle' in block && block.subtitle ? block.subtitle.split(/\s+/).length : 0
      return count + words + subtitleWords
    }
    if (block.type === 'list') {
      return count + block.items.join(' ').split(/\s+/).length
    }
    return count
  }, 0)
}

export const insights: Insight[] = [
  {
    id: '1',
    title: 'The Architecture of Door Hardware',
    subtitle: 'Specifying for Performance, Longevity, and Use',
    slug: 'the-architecture-of-door-hardware',
    summary: 'A structural guide to specifying door hardware for performance, longevity, and long-term use. Weight, latch design, mortise vs tubular, and function selection explained.',
    category: 'Specification Series',
    date: '2026-02-17',

    readTime: '6 min read',
    body: [
      { type: 'paragraph', content: 'Before you enter a home, you touch it.' },
      { type: 'paragraph', content: 'Sometimes it is the doorbell trim.\nSometimes the weight of a knocker.\nSometimes the handle itself.\nAnd in certain homes, the mezuzah fixed to the frame.' },
      { type: 'paragraph', content: 'The first interaction is rarely visual.\nIt is tactile.\nIt is intentional.\nIt is a handshake.' },
      { type: 'paragraph', content: 'That moment sets the tone for everything that follows.' },
      { type: 'paragraph', content: 'And yet, door hardware is often selected by finish alone.\nColor is discussed.\nStyle is debated.\nTrend is referenced.' },
      { type: 'paragraph', content: 'But long-term performance is determined elsewhere.' },
      { type: 'paragraph', content: 'When specifying door hardware, five structural decisions matter more than finish:' },
      { type: 'list', items: [
        'Knob or lever.',
        'Tubular or mortise construction.',
        'Backset and door preparation.',
        'Latch quality and sound.',
        'Function selection.',
      ]},
      { type: 'paragraph', content: 'Finish matters.\nStructure matters more.' },

      { type: 'heading', content: '1. Knob or Lever', subtitle: 'Ergonomics and Long-Term Usability' },
      { type: 'paragraph', content: 'A door is opened thousands of times a year.' },
      { type: 'paragraph', content: 'The difference between a knob and a lever is not stylistic.\nIt is mechanical.' },
      { type: 'paragraph', content: 'A knob requires grip strength and rotational force.\nA lever requires downward pressure and minimal wrist articulation.' },
      { type: 'paragraph', content: 'In youth, the distinction feels minor.\nOver decades, it becomes decisive.' },
      { type: 'paragraph', content: 'Levers allow operation when hands are full.\nThey accommodate temporary injury.\nThey adapt more easily to limited mobility.' },
      { type: 'paragraph', content: 'Homes are built to last.\nThe hardware within them should be equally accommodating.' },
      { type: 'paragraph', content: 'The choice between knob and lever is often framed as aesthetic.\nIn practice, it is anatomical.' },
      { type: 'paragraph', content: 'The hand will decide long after the trend has passed.' },

      { type: 'heading', content: '2. Tubular or Mortise', subtitle: 'A Component or a System' },
      { type: 'paragraph', content: 'Once the hand is considered, the next decision is structural.' },
      { type: 'paragraph', content: 'Most residential doors are fitted with a tubular latch.\nSome are built around a mortise lock.' },
      { type: 'paragraph', content: 'The difference is not obvious from across the room.\nIt is felt over time.' },
      { type: 'paragraph', content: 'A tubular latch is a cylindrical mechanism installed through a standard bore hole. It is efficient, widely available, and relatively simple to replace. For many homes, it performs adequately.' },
      { type: 'paragraph', content: 'But it is a component.' },
      { type: 'paragraph', content: 'The latch and locking mechanism are separate. The internal mass is limited by the cylindrical bore. Spring tension and internal construction are constrained by size.' },
      { type: 'paragraph', content: 'A mortise lock is set into a pocket cut into the door edge. The lock body is larger, heavier, and integrated. The latch, deadbolt, and internal mechanics operate within a unified chassis.' },
      { type: 'paragraph', content: 'This changes performance.' },
      { type: 'paragraph', content: 'Greater internal mass.\nSmoother return.\nReduced rattle.\nLonger service intervals.' },
      { type: 'paragraph', content: 'Tubular hardware is a component added to a door.\nMortise hardware is a system built into it.' },
      { type: 'paragraph', content: 'Each has its place.' },
      { type: 'paragraph', content: 'Renovations and production construction often favor tubular preparation.\nCustom millwork and long-horizon projects frequently benefit from mortise construction.' },
      { type: 'paragraph', content: 'The distinction is not decorative.\nIt is architectural.' },

      { type: 'heading', content: '3. Backset and Door Preparation', subtitle: 'Dimensions Before Design' },
      { type: 'paragraph', content: 'Before hardware is chosen, the door must be understood.' },
      { type: 'paragraph', content: 'Backset, bore diameter, and door thickness determine compatibility and performance.' },
      { type: 'paragraph', content: 'In most residential construction, backset is either 2\u00a03/8 inches or 2\u00a03/4 inches. That small difference affects lever projection, hand clearance, and visual proportion on the stile.' },
      { type: 'paragraph', content: 'Door thickness also matters. Standard doors are commonly 1\u00a03/8 inches or 1\u00a03/4 inches thick, but custom millwork may vary. Hardware must be specified within the correct thickness range to ensure spindle engagement, structural stability, and long-term alignment.' },
      { type: 'paragraph', content: 'Typical residential preparation includes a 2\u00a01/8 inch face bore and a 1 inch edge bore. Mortise preparation differs entirely. European door standards often differ as well.' },
      { type: 'paragraph', content: 'Hardware should follow the door.\nNot the other way around.' },
      { type: 'paragraph', content: 'Once a door is cut, the architecture has made a decision.' },

      { type: 'heading', content: '4. Latch Quality and Sound', subtitle: 'The Quiet Measure of Precision' },
      { type: 'paragraph', content: 'Most people evaluate door hardware by how it looks.\nVery few evaluate it by how it closes.' },
      { type: 'paragraph', content: 'And yet the sound of a latch engaging is one of the most repeated acoustic moments inside a home.' },
      { type: 'paragraph', content: 'A well-made latch has balanced spring tension and a smooth, controlled return. It engages the strike with compression, not chatter.' },
      { type: 'paragraph', content: 'Lower-grade mechanisms may drag, click sharply, rattle, or fail to return fully.' },
      { type: 'paragraph', content: 'The difference is subtle at first. Over time, it becomes unmistakable.' },
      { type: 'paragraph', content: 'A door should close with intention, not apology.' },
      { type: 'paragraph', content: 'Even the finest hardware will sound poor if the strike is misaligned or the reveal inconsistent.\nInstallation precision and mechanism quality work together.' },
      { type: 'paragraph', content: 'Silence is not the absence of sound.\nIt is the absence of disturbance.' },
      { type: 'paragraph', content: 'The difference between good hardware and great hardware is often heard before it is seen.' },

      { type: 'heading', content: '5. Function Selection', subtitle: 'The Right Mechanism in the Right Place' },
      { type: 'paragraph', content: 'Not every door serves the same purpose.\nThe hardware should reflect that.' },
      { type: 'paragraph', content: 'Passage sets allow free movement and belong on closets and hallways.\nPrivacy sets introduce controlled locking for bedrooms and bathrooms.\nDummy sets provide fixed pull without operation.' },
      { type: 'paragraph', content: 'Misapplied functions create frustration and unnecessary replacements.' },
      { type: 'paragraph', content: 'At the entry, logic shifts again. Hardware becomes security, threshold, and identity. Keyed entry sets must coordinate with deadbolt configuration, door thickness, and environmental exposure.' },
      { type: 'paragraph', content: 'Hardware should anticipate behavior before behavior tests it.' },

      { type: 'heading', content: 'Looking Forward' },
      { type: 'paragraph', content: 'Door hardware is handled more than it is admired. It is touched daily, heard daily, and relied upon daily.' },
      { type: 'paragraph', content: 'It is also evolving.' },
      { type: 'paragraph', content: 'Intelligent locking systems and app-based entry platforms are becoming more common in residential architecture. These technologies offer convenience and control. They also introduce new questions: battery life, software longevity, cybersecurity, long-term serviceability, and in certain homes, Sabbath point-of-use considerations.' },
      { type: 'paragraph', content: 'Technology does not replace architecture.\nIt joins it.' },
      { type: 'paragraph', content: 'The future of door hardware will combine digital intelligence with mechanical integrity.' },
      { type: 'paragraph', content: 'The principles remain the same.' },
      { type: 'paragraph', content: 'Structure before surface.\nFunction before novelty.\nPermanence before trend.' },
    ],
  },
  {
    id: '2',
    title: 'The Architectural Guide to Specifying a Residential Steam Shower',
    subtitle: 'Steam Shower Generator Sizing, Electrical Requirements, and Installation Mistakes to Avoid',
    slug: 'architectural-guide-to-specifying-a-residential-steam-shower',
    summary: 'A technical guide to residential steam shower specification covering generator sizing, electrical requirements, insulation, sequencing, and field-proven installation mistakes to avoid.',
    category: 'Specification Series',
    date: '2026-02-25',
    readTime: '12 min read',
    body: [
      { type: 'paragraph', content: 'Steam showers are often discussed as luxury features.\nThey are not.' },
      { type: 'paragraph', content: 'A properly specified steam system is wellness infrastructure. When executed correctly, it becomes a daily reset chamber embedded into the architecture of the home. When executed poorly, it becomes an expensive moisture problem.' },
      { type: 'paragraph', content: 'This guide addresses steam shower generator sizing, electrical requirements, ceiling design, insulation strategy, and the most common field failures we see in residential construction.' },
      { type: 'image', src: '/residential-steam-shower-guide.png', alt: 'Residential steam shower with brass-framed glass enclosure and active steam', caption: 'A residential steam enclosure should be specified as a complete performance system, not a fixture add-on.' },
      { type: 'paragraph', content: 'Target audience layered:\nArchitects and designers get technical clarity.\nBuilders get sequencing and failure prevention.\nHomeowners get confidence and health context.\nSEO gets fed properly.' },

      { type: 'heading', content: '1. Steam Shower Generator Sizing', subtitle: 'The Most Common and Most Costly Error' },
      { type: 'paragraph', content: 'If a generator is undersized, the shower never reaches full vapor density. If oversized, energy usage climbs unnecessarily.' },
      { type: 'paragraph', content: 'Correct sizing begins with cubic volume:' },
      { type: 'paragraph', content: 'Length x Width x Height = Cubic Feet.' },
      { type: 'paragraph', content: 'But raw cubic footage is not enough.' },
      { type: 'heading', content: 'Material Multipliers Matter' },
      { type: 'paragraph', content: 'Heat loss increases when using:' },
      { type: 'list', items: ['Glass walls.', 'Stone surfaces.', 'Exterior walls.', 'Marble slabs.', 'High ceilings.'] },
      { type: 'paragraph', content: 'For example:' },
      { type: 'list', items: ['One full glass wall can increase required output by 30% or more.', 'Natural stone absorbs heat and delays steam saturation.'] },
      { type: 'paragraph', content: 'Manufacturers publish adjustment charts. They must be used. Guessing leads to failure.' },
      { type: 'paragraph', content: 'Field Failure #1: Generator sized only by room volume without accounting for glass and stone. Result: 20-minute heat-up times and disappointed clients.' },

      { type: 'heading', content: '2. Ceiling Design and Condensation Control' },
      { type: 'heading', content: 'Why Flat Ceilings Drip' },
      { type: 'paragraph', content: 'Steam condenses on cooler surfaces. Without a sloped ceiling, condensation forms droplets that fall directly onto the occupant.' },
      { type: 'paragraph', content: 'Best practice:' },
      { type: 'list', items: ['Minimum 1/2 inch per foot slope.', 'Slope directed away from seating position.'] },
      { type: 'paragraph', content: 'This is not aesthetic. It is comfort.' },
      { type: 'paragraph', content: 'Field Failure #2: No ceiling slope. Result: rhythmic condensation dripping on shoulders and face.' },

      { type: 'heading', content: '3. Steam Head Placement' },
      { type: 'heading', content: 'Do Not Aim Steam at the Occupant' },
      { type: 'paragraph', content: 'Steam heads discharge extremely hot vapor. During startup cycles, condensation can cause brief spurts of hot water.' },
      { type: 'paragraph', content: 'Steam head placement rules:' },
      { type: 'list', items: ['6-12 inches above finished floor.', 'Away from seating.', 'Not directly below bench.', 'Not opposite the primary seating position.', 'Avoid proximity to door opening.'] },
      { type: 'paragraph', content: 'Field Failure #3: Steam head placed at bench height. Result: hot vapor directly contacting skin and discomfort during startup.' },
      { type: 'paragraph', content: 'This mistake is more common than it should be.' },

      { type: 'heading', content: '4. Insulation Requirements' },
      { type: 'heading', content: 'Steam Without Insulation Is Waste' },
      { type: 'paragraph', content: 'Steam showers must be treated as thermal envelopes.' },
      { type: 'paragraph', content: 'Best practice:' },
      { type: 'list', items: ['Full wall cavity insulation.', 'Insulated exterior walls.', 'Insulated ceiling.', 'Vapor barrier strategy per local code.', 'Waterproof membrane system behind finish material.'] },
      { type: 'paragraph', content: 'Field Failure #4: No insulation in exterior wall cavity. Result: prolonged heat-up time, high energy use, moisture migration risk.' },
      { type: 'paragraph', content: 'Steam is controlled heat. The enclosure must be designed to retain it.' },

      { type: 'heading', content: '5. Electrical Requirements for Steam Generators' },
      { type: 'paragraph', content: 'Most residential steam generators require:' },
      { type: 'list', items: ['240V dedicated circuit.', 'Significant amperage draw depending on size.', 'Hardwired connection.', 'Service disconnect within sight.'] },
      { type: 'paragraph', content: 'Load calculations must occur early in the design phase. Steam is not an afterthought.' },
      { type: 'paragraph', content: 'Electrical oversight can delay projects weeks.' },
      { type: 'paragraph', content: 'Field Failure #5: Generator specified late, panel capacity insufficient, requiring costly electrical upgrades.' },

      { type: 'heading', content: '6. Drainage, Auto Flush, and Condensation Protection' },
      { type: 'paragraph', content: 'This is where many projects quietly fail long term.' },
      { type: 'heading', content: 'Auto Drain / Auto Flush' },
      { type: 'paragraph', content: 'Mineral buildup from hard water significantly reduces generator life. An automatic drain valve flushes the tank after each cycle, reducing scale accumulation. On Long Island and throughout the Northeast, hard water makes this essential.' },
      { type: 'heading', content: 'Condensation Tray' },
      { type: 'paragraph', content: 'Generators should be installed over a drain pan or condensation tray where appropriate. Mechanical rooms are not immune to moisture.' },
      { type: 'heading', content: 'Maintenance Access' },
      { type: 'paragraph', content: 'The generator must be:' },
      { type: 'list', items: ['Accessible.', 'Not entombed behind finished drywall.', 'Within manufacturer-recommended distance from steam head.'] },
      { type: 'paragraph', content: 'Field Failure #6: Generator buried in millwork with no access panel. Result: invasive demolition for service.' },

      { type: 'heading', content: '7. Door Gaps and Vapor Retention' },
      { type: 'paragraph', content: 'Steam showers require proper door seals and controlled transom or minimal gap at bottom.' },
      { type: 'paragraph', content: 'Too large a gap prevents full steam saturation. Too tight without ventilation planning can create moisture issues. Balance matters.' },

      { type: 'heading', content: '8. Maximum Distance from Generator to Steam Head' },
      { type: 'paragraph', content: 'Most manufacturers limit the maximum run length of steam piping.' },
      { type: 'paragraph', content: 'Long runs:' },
      { type: 'list', items: ['Increase condensation in line.', 'Delay steam delivery.', 'Reduce performance.'] },
      { type: 'paragraph', content: 'Proper slope of steam line toward steam head prevents pooling.' },

      { type: 'heading', content: '9. Health and Wellness Benefits of Steam Showers' },
      { type: 'paragraph', content: 'Steam therapy has documented benefits including:' },
      { type: 'list', items: ['Improved circulation.', 'Respiratory relief.', 'Muscle relaxation.', 'Stress reduction.', 'Skin hydration.', 'Post-workout recovery.'] },
      { type: 'paragraph', content: 'But none of those benefits materialize if the system is poorly engineered.' },
      { type: 'paragraph', content: 'Steam is not a spa fantasy. It is a controlled environment requiring architectural discipline.' },

      { type: 'heading', content: '10. Material Selection and Heat Retention' },
      { type: 'paragraph', content: 'Best-performing steam enclosures typically include:' },
      { type: 'list', items: ['Porcelain tile.', 'Properly sealed stone.', 'Frameless glass with appropriate thickness.', 'Insulated framing.', 'Waterproof membrane system (e.g., sheet membrane).'] },
      { type: 'paragraph', content: 'Large-format slabs require careful thermal consideration.' },

      { type: 'heading', content: '11. Sequencing in Construction' },
      { type: 'paragraph', content: 'Steam generators must be coordinated with:' },
      { type: 'list', items: ['Rough plumbing.', 'Electrical rough-in.', 'Waterproofing.', 'Tile installation.', 'Cabinetry (if concealed).'] },
      { type: 'paragraph', content: 'Late coordination causes rework.' },

      { type: 'heading', content: '12. Maintenance Planning' },
      { type: 'paragraph', content: 'Homeowners should understand:' },
      { type: 'list', items: ['Periodic descaling may be required.', 'Water treatment improves longevity.', 'Access must remain available.', 'Auto flush is strongly recommended.'] },
      { type: 'paragraph', content: 'Steam systems are durable when maintained. Neglected systems fail quietly.' },

      { type: 'heading', content: 'Conclusion', subtitle: 'Steam Done Properly Is Architecture, Not Accessory' },
      { type: 'paragraph', content: 'A residential steam shower is not about indulgence.' },
      { type: 'paragraph', content: 'It is about ritual.\nIt is about recovery.\nIt is about creating a controlled environment within the home that supports longevity and daily reset.' },
      { type: 'paragraph', content: 'When properly sized, insulated, drained, sloped, electrically supported, and thoughtfully placed, a steam shower performs reliably for years.' },
      { type: 'paragraph', content: 'When treated casually, it becomes an expensive lesson in heat loss, moisture mismanagement, and retrofit regret.' },
      { type: 'paragraph', content: 'Steam is not complicated.\nBut it is technical.\nAnd it demands early coordination between architect, designer, builder, electrician, and supplier.' },

      { type: 'heading', content: 'A Note on Specification Support' },
      { type: 'paragraph', content: 'At Iron & Water Co., we approach steam as a system, not a fixture.' },
      { type: 'paragraph', content: 'That means reviewing cubic volume calculations, verifying material multipliers, confirming electrical load requirements, addressing water conditions, and coordinating installation details before walls are closed.' },
      { type: 'paragraph', content: 'The goal is simple:\nA steam enclosure that performs exactly as designed on day one and continues to do so years later.' },
      { type: 'paragraph', content: 'Submittal review and specification support available for active projects.' },
    ],
  },
  {
    id: '3',
    title: 'The Architectural Guide to Specifying Wall-Hung and Floor-Standing Back-to-Wall Toilets',
    subtitle: 'A system-level specification framework for concealed cistern toilet assemblies',
    slug: 'architectural-guide-specifying-wall-hung-floor-standing-back-to-wall-toilets',
    summary: 'A technical guide to wall-hung and floor-standing back-to-wall toilet specification, including carrier systems, wall depth, waste alignment, ADA heights, MaP performance, trapway geometry, and electrical coordination for bidet seats.',
    category: 'Specification Series',
    date: '2026-03-03',
    readTime: '13 min read',
    body: [
      { type: 'paragraph', content: 'Wall-hung and floor-standing back-to-wall toilets are often selected for aesthetic reasons.\nThe tank is concealed.\nThe floor line is clean.\nThe room reads quieter.' },
      { type: 'paragraph', content: 'But the visible porcelain is only one component.' },
      { type: 'paragraph', content: 'Behind it sits:' },
      { type: 'image', src: '/wall-hung-floor-standing-back-to-wall-toilet-guide.png', alt: 'Blueprint-style illustration of a wall-hung toilet with concealed carrier and flush plate', caption: 'Concealed toilet systems are coordinated assemblies of structure, cistern, waste alignment, wall depth, and service access.' },
      { type: 'list', items: [
        'A structural carrier frame.',
        'A concealed cistern.',
        'A defined wall assembly.',
        'A coordinated waste alignment.',
        'A flush plate interface.',
        'A service access strategy.',
      ]},
      { type: 'paragraph', content: 'These are not accessories.\nThey are system components.' },
      { type: 'paragraph', content: 'When the system is specified early, installation is predictable.\nWhen it is not, conflicts surface during framing, tile, or final set.' },

      { type: 'heading', content: 'Wall-Hung vs Floor-Standing Back-to-Wall' },
      { type: 'paragraph', content: 'These categories are often grouped together. They are not identical.' },
      { type: 'heading', content: 'Wall-Hung' },
      { type: 'paragraph', content: 'The bowl is suspended from a structural steel carrier anchored to framing and floor. Waste exits horizontally into the wall.' },
      { type: 'paragraph', content: 'Advantages include:' },
      { type: 'list', items: [
        'Adjustable mounting height.',
        'Fully exposed floor for cleaning.',
        'Clean visual termination.',
      ]},
      { type: 'paragraph', content: 'Load transfer occurs through the carrier, not the porcelain.' },
      { type: 'paragraph', content: 'When properly installed, the carrier rated load capacity exceeds that of the ceramic fixture itself.' },

      { type: 'heading', content: 'Floor-Standing Back-to-Wall' },
      { type: 'paragraph', content: 'The bowl sits on the floor but connects to a concealed in-wall or surface-mounted cistern. Waste may exit horizontally into the wall or vertically into the floor depending on design.' },
      { type: 'paragraph', content: 'These systems maintain a concealed flush aesthetic while retaining floor contact.' },
      { type: 'paragraph', content: 'However, back-to-wall does not always mean flush.\nThat distinction matters.' },

      { type: 'heading', content: 'Back-to-Wall Does Not Always Mean Flush' },
      { type: 'paragraph', content: 'In horizontal outlet configurations, the rough alignment of the waste connection is critical.' },
      { type: 'paragraph', content: 'Limited cavity depth, finished wall thickness, and bowl geometry influence how closely the bowl sits to the finished surface.' },
      { type: 'paragraph', content: 'The use of decorative baseboard, applied moldings, or stone wainscoting behind a floor-standing back-to-wall toilet further complicates this condition.' },
      { type: 'paragraph', content: 'When trim remains behind the bowl, one of three outcomes occurs:' },
      { type: 'list', items: [
        'The trim must be cut and returned.',
        'The bowl sits forward of the wall plane.',
        'The horizontal waste connector alignment becomes visible.',
      ]},
      { type: 'paragraph', content: 'None of these are product failures.\nThey are coordination decisions.' },
      { type: 'paragraph', content: 'Back-to-wall assumes a flat, coordinated wall surface.' },

      { type: 'heading', content: 'Carrier Systems and Structural Frames' },
      { type: 'paragraph', content: 'The concealed carrier is the structural backbone of the system.' },
      { type: 'paragraph', content: 'Manufacturers such as Geberit and OLI produce multiple carrier configurations for:' },
      { type: 'list', items: [
        'Wall-hung installations.',
        'Floor-standing back-outlet bowls.',
        'Masonry conditions.',
        'Low-height walls.',
        'ADA applications.',
      ]},
      { type: 'paragraph', content: 'Carrier selection must align with:' },
      { type: 'list', items: [
        'Bowl type.',
        'Waste outlet orientation.',
        'Wall assembly depth.',
        'Finished floor height.',
        'Intended seat elevation.',
      ]},
      { type: 'paragraph', content: 'Selecting the bowl without confirming the carrier introduces risk.' },

      { type: 'heading', content: 'Wall Depth and Framing Implications' },
      { type: 'paragraph', content: 'In many residential projects, 2x4 construction remains common.' },
      { type: 'paragraph', content: 'Slim-profile carriers allow concealed installation within standard framing. However, reduced wall depth increases dimensional sensitivity.' },
      { type: 'paragraph', content: 'Clearances for the following become tighter:' },
      { type: 'list', items: [
        'Waste piping.',
        'Venting.',
        'Water supply lines.',
        'Mounting brackets.',
        'Flush pipe connections.',
        'Actuator plate mechanisms.',
      ]},
      { type: 'paragraph', content: 'Tile buildup also affects alignment. Backer board, membrane, thinset, and finish thickness change outlet projection and bolt depth.' },
      { type: 'paragraph', content: 'The critical variable is not the stud size.\nIt is when the dimensional decisions are made.' },

      { type: 'heading', content: 'ADA Compliance and Height Flexibility' },
      { type: 'paragraph', content: 'Wall-hung systems allow vertical adjustment at installation.' },
      { type: 'paragraph', content: 'This flexibility supports:' },
      { type: 'list', items: [
        'ADA-compliant seat heights.',
        'Aging-in-place planning.',
        'Custom comfort heights.',
      ]},
      { type: 'paragraph', content: 'Seat height must account for carrier mounting elevation, bowl rim dimension, seat thickness, and finished floor condition.' },
      { type: 'paragraph', content: 'Comfort and compliance are determined by the full assembly.' },

      { type: 'heading', content: 'Flush Performance and MaP Ratings' },
      { type: 'paragraph', content: 'Dual flush systems now dominate residential specification.' },
      { type: 'paragraph', content: 'Typical configurations include:' },
      { type: 'list', items: [
        '1.28 gpf full flush.',
        '0.8 gpf reduced flush.',
      ]},
      { type: 'paragraph', content: 'Some European sanitary ware remains available at 1.6 gpf where permitted by code.' },
      { type: 'paragraph', content: 'Water volume alone does not determine performance.' },
      { type: 'paragraph', content: 'MaP testing evaluates solid waste evacuation under standardized conditions. A well-engineered 1.28 gpf system can outperform a poorly designed 1.6 gpf fixture.' },
      { type: 'paragraph', content: 'Performance is a function of hydraulic design.' },

      { type: 'heading', content: 'Trapway Geometry and Glazing' },
      { type: 'paragraph', content: 'Trapway design directly affects reliability.' },
      { type: 'paragraph', content: 'Key factors include:' },
      { type: 'list', items: [
        'Internal diameter.',
        'Smooth curvature.',
        'Consistent cross-section.',
        'Fully glazed interior surfaces.',
      ]},
      { type: 'paragraph', content: 'Fully glazed trapways reduce friction and long-term buildup.' },
      { type: 'paragraph', content: 'In concealed carrier installations, where service access is limited to the actuator opening, hydraulic reliability is not optional.\nIt is critical.' },

      { type: 'heading', content: 'Bidet Seats, Electrical Planning, and GFCI Protection' },
      { type: 'paragraph', content: 'Electric bidet seats are increasingly standard in residential projects.' },
      { type: 'paragraph', content: 'Specification must include:' },
      { type: 'list', items: [
        'Dedicated GFCI-protected 120V outlet.',
        'Moisture-safe placement.',
        'Cord length verification.',
        'Early electrical coordination.',
      ]},
      { type: 'paragraph', content: 'Improper outlet location can interfere with carrier frames, piping, and service access.' },
      { type: 'paragraph', content: 'Electronic seats also affect final seat height, rear bowl clearance, and actuator plate lid arc.' },
      { type: 'paragraph', content: 'The concealed system shifts constraints.\nIt does not remove them.' },

      { type: 'heading', content: 'When the Wall Cavity Is Not an Option' },
      { type: 'paragraph', content: 'Not every project allows in-wall installation. Masonry walls, concrete assemblies, historic renovations, and structural limitations may prevent cavity framing.' },
      { type: 'paragraph', content: 'In these conditions, in-front-of-wall sanitary modules provide an alternative.' },
      { type: 'paragraph', content: 'Geberit previously offered a surface-mounted concealed system known as the Monolith, which has since been discontinued.' },
      { type: 'paragraph', content: 'OLI remains one of the few major manufacturers producing self-contained in-front-of-wall modules for floor-standing back-outlet bowls.' },
      { type: 'paragraph', content: 'These systems anchor primarily to the floor and brace laterally to the wall. They preserve concealed flush aesthetics without invasive framing.' },
      { type: 'paragraph', content: 'They are niche solutions. But in renovation scenarios, they can prevent extensive reconstruction.' },

      { type: 'heading', content: 'Common Specification and Field Failures' },
      { type: 'paragraph', content: 'Most issues arise from sequencing.' },
      { type: 'list', items: [
        'Carrier selected after framing.',
        'Height determined at installation.',
        'Trim added after rough plumbing.',
        'Bidet power introduced after waterproofing.',
      ]},
      { type: 'paragraph', content: 'These are coordination failures.\nNot product defects.' },
      { type: 'paragraph', content: 'When the system is specified early, these conflicts disappear.' },

      { type: 'heading', content: 'The System Is the Specification' },
      { type: 'paragraph', content: 'The concealed toilet is not a decorative object.\nIt is an integrated assembly.' },
      { type: 'list', items: [
        'Structural frame.',
        'Cistern.',
        'Outlet geometry.',
        'Wall depth.',
        'Electrical.',
        'Hydraulics.',
        'Service access.',
      ]},
      { type: 'paragraph', content: 'When the system is evaluated at the specification stage, installation becomes predictable.' },
      { type: 'paragraph', content: 'When it is not, the wall becomes reactive.' },
      { type: 'paragraph', content: 'Architectural planning prevents downstream compromise.\nSpecification is where flexibility exists.\nInstallation is where it does not.' },

      { type: 'heading', content: 'A Specification-Driven Approach' },
      { type: 'paragraph', content: 'At Iron & Water Co., concealed carrier systems are evaluated as assemblies, not isolated fixtures.' },
      { type: 'paragraph', content: 'Wall depth, carrier type, outlet alignment, structural load capacity, MaP performance, trapway design, electrical planning, and service access are reviewed before orders are placed.' },
      { type: 'paragraph', content: 'The objective is dimensional clarity.\nBecause once framing and tile are complete, options narrow.' },
      { type: 'paragraph', content: 'Submittal review and specification support available for active projects.' },
    ],
  },
]
