export type InsightBlock =
  | { type: 'paragraph'; content: string }
  | { type: 'heading'; content: string; subtitle?: string }
  | { type: 'list'; items: string[] }

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
]
