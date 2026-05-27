// Centralized theme colors for the 5 styles to allow easy editing during development
export const STYLE_COLORS = {
  words_of_affirmation: '#6A4C93', // Royal Purple  — intentional, distinctive
  quality_time:         '#2A9D8F', // Deep Teal     — present, connected
  acts_of_service:      '#E76F51', // Burnt Sienna  — action, in the trenches
  tangible_gifts:       '#E9C46A', // Soft Gold     — precious, marked
  physical_touch:       '#F4A261'  // Warm Honey    — shared team energy
};

// The 5 Appreciation Styles
// Question option `styleId`s in ./questionsData.js MUST match an `id` here.
// `description` is the single paragraph shown on the results screen for each style.
export const STYLES = [
  {
    id: 'words_of_affirmation',
    name: 'Words of Affirmation',
    subtitle: 'Words of Affirmation',
    description: 'You feel most valued when someone names exactly what you did and why it mattered. Generic praise doesn\'t land for you, but a specific, genuine word at the right moment carries real weight. You probably remember compliments that happened years ago. Share this with your manager: the most meaningful thing they can do is catch you getting something right and say so. Specifically, in the moment, and without anything attached.',
    color: STYLE_COLORS.words_of_affirmation
  },
  {
    id: 'quality_time',
    name: 'Quality Time',
    subtitle: 'Quality Time',
    description: 'Your currency is attention. You feel valued when someone puts everything else down and is genuinely present with you. Not glancing at the screen, not half-listening while restocking. A two-minute real conversation means more to you than a gift or a compliment. Share this with your manager: showing up alongside you, whether on the line or in a quiet check-in, is what tells you that you matter here.',
    color: STYLE_COLORS.quality_time
  },
  {
    id: 'acts_of_service',
    name: 'Acts of Service',
    subtitle: 'Acts of Service',
    description: 'Talk is cheap. You feel most appreciated when someone shows it through action, jumping in to help, lightening your load, or working right alongside you when things get hard. You notice who rolls up their sleeves and who manages from a distance. Share this with your manager: the moments that mean the most to you are the ones where they get in the trenches with you rather than directing from the side.',
    color: STYLE_COLORS.acts_of_service
  },
  {
    id: 'tangible_gifts',
    name: 'Tangible Gifts',
    subtitle: 'Tangible Gifts',
    description: 'It\'s not about the dollar amount, it\'s about the fact that someone noticed and remembered. A small, specific gesture tells you that your effort was seen and worth marking. You hold onto things: the note, the card, the small moment someone took the time to make real. Share this with your manager: what stays with you isn\'t the size of the gesture, it\'s the specificity and something to remember it by. The more it proves they were paying attention to you personally, the more it means.',
    color: STYLE_COLORS.tangible_gifts
  },
  {
    id: 'physical_touch',
    name: 'Physical Touch',
    subtitle: 'Physical Touch',
    description: 'You run on shared energy. A fist-bump after a tough rush, a high-five when the team hits a goal, a quick shoulder tap in a hard moment, these feel like real confirmation that you went through something together. You\'re most motivated when the team wins as a unit. Share this with your manager: the physical signals of a shared win are what connect you to the team and remind you that what you\'re doing here actually matters.',
    color: STYLE_COLORS.physical_touch
  }
];
