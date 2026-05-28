// Appreciation Style Quiz
// styleId mapping (matches ./stylesData.js):
//   words_of_affirmation → A answers: specific verbal praise
//   quality_time         → B answers: undivided attention, presence
//   acts_of_service      → C answers: helping action, sharing the load
//   tangible_gifts       → D answers: small thoughtful gestures and objects
//   physical_touch       → E answers: fist-bumps, high-fives, team energy

export const QUESTIONS = [
  {
    id: 'q1',
    text: 'After a really tough shift, what would mean the most to you?',
    options: [
      { id: 'q1-a', text: 'Your manager pulls you aside and tells you specifically what you did well.', styleId: 'words_of_affirmation' },
      { id: 'q1-b', text: 'Your manager sits with you for a few minutes and just checks in on how you\'re doing.', styleId: 'quality_time' },
      { id: 'q1-c', text: 'Your manager jumps in and handles some of the remaining tasks so you can clock out on time.', styleId: 'acts_of_service' },
      { id: 'q1-d', text: 'Your manager hands you a small thank-you, a note, a gift card, something tangible.', styleId: 'tangible_gifts' },
      { id: 'q1-e', text: 'Your manager gives you a fist-bump or a high-five and says "we crushed it."', styleId: 'physical_touch' }
    ]
  },
  {
    id: 'q2',
    text: 'You go above and beyond covering a last-minute call-out. What kind of recognition feels right?',
    options: [
      { id: 'q2-a', text: 'A genuine shout-out at the next huddle in front of the team.', styleId: 'words_of_affirmation' },
      { id: 'q2-b', text: 'Your manager finds a quiet moment to personally thank you and ask how you\'re holding up.', styleId: 'quality_time' },
      { id: 'q2-c', text: 'Your manager makes your next shift a little easier, more prep or switching your open to a close the next day so you don\'t close then open.', styleId: 'acts_of_service' },
      { id: 'q2-d', text: 'Something small but real, a smoothie on your break, a note with your check.', styleId: 'tangible_gifts' },
      { id: 'q2-e', text: 'A quick fist-bump and "I owe you one" the moment you walk in.', styleId: 'physical_touch' }
    ]
  },
  {
    id: 'q3',
    text: 'What makes you feel most connected to a manager you respect?',
    options: [
      { id: 'q3-a', text: 'They tell me directly what they think of my work, often and specifically.', styleId: 'words_of_affirmation' },
      { id: 'q3-b', text: 'They remember things about my life outside work and actually ask about them.', styleId: 'quality_time' },
      { id: 'q3-c', text: 'They work alongside me, they don\'t just manage, they get in the trenches.', styleId: 'acts_of_service' },
      { id: 'q3-d', text: 'They mark the small milestones like birthdays or work milestones with a thoughtful card.', styleId: 'tangible_gifts' },
      { id: 'q3-e', text: 'They bring the energy, the high-fives, the team celebrations, the shared wins.', styleId: 'physical_touch' }
    ]
  },
  {
    id: 'q4',
    text: 'You\'re having a hard day and it\'s showing. What would help most?',
    options: [
      { id: 'q4-a', text: 'Someone saying out loud: "I see you working hard. You\'re doing great."', styleId: 'words_of_affirmation' },
      { id: 'q4-b', text: 'Someone stepping away from the line to ask: "Hey, you okay? What do you need?"', styleId: 'quality_time' },
      { id: 'q4-c', text: 'Someone quietly taking the harder tasks off my plate without making it a big deal.', styleId: 'acts_of_service' },
      { id: 'q4-d', text: 'Someone handing me a coffee or a snack and saying "this one\'s on me."', styleId: 'tangible_gifts' },
      { id: 'q4-e', text: 'Someone walking past and giving me a quick "you\'ve got this" fist bump.', styleId: 'physical_touch' }
    ]
  },
  {
    id: 'q5',
    text: 'Looking back at a job, team or class where you felt truly valued, what made the difference?',
    options: [
      { id: 'q5-a', text: 'My leader or teacher regularly told me what I was doing right and what made me stand out.', styleId: 'words_of_affirmation' },
      { id: 'q5-b', text: 'My leader or teacher actually knew me, not just my performance, but who I was as a person.', styleId: 'quality_time' },
      { id: 'q5-c', text: 'My leader or teacher worked hard alongside us and never asked anyone to do something they wouldn\'t do.', styleId: 'acts_of_service' },
      { id: 'q5-d', text: 'My leader or teacher noticed and marked the milestones, making small gestures that showed they were paying attention.', styleId: 'tangible_gifts' },
      { id: 'q5-e', text: 'My manager brought the team energy, the kind you could feel the moment you walked in.', styleId: 'physical_touch' }
    ]
  }
];
