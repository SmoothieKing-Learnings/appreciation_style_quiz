// Appreciation Style Quiz
// Internal styleIds are stable (kept for back-compat with shared `?scores=…`
// links and existing test fixtures). Display names live in ./stylesData.js
// and have evolved: tangible_gifts → "Receiving Gifts", physical_touch →
// "Celebratory Energy".
//
// styleId mapping (matches ./stylesData.js):
//   words_of_affirmation → A answers: sincere thanks, public praise
//   acts_of_service      → B answers: jumping in to help, sharing the load
//   tangible_gifts       → C answers: thoughtful gifts that mark the moment
//   quality_time         → D answers: undivided attention, one-on-one time
//   physical_touch       → E answers: celebratory energy, fun, shared mood

export const QUESTIONS = [
  {
    id: 'q1',
    text: 'When I do a great job, I prefer:',
    options: [
      { id: 'q1-a', text: 'A sincere thank-you or shout-out.', styleId: 'words_of_affirmation' },
      { id: 'q1-b', text: 'Someone helping me complete a tough task.', styleId: 'acts_of_service' },
      { id: 'q1-c', text: 'A small treat or gift.', styleId: 'tangible_gifts' },
      { id: 'q1-d', text: 'Extra time to connect with my manager.', styleId: 'quality_time' },
      { id: 'q1-e', text: 'A celebratory high five or fist bump.', styleId: 'physical_touch' }
    ]
  },
  {
    id: 'q2',
    text: 'I feel most valued when:',
    options: [
      { id: 'q2-a', text: 'Someone acknowledges my effort in front of the team.', styleId: 'words_of_affirmation' },
      { id: 'q2-b', text: 'A coworker jumps in to help when I\'m overloaded.', styleId: 'acts_of_service' },
      { id: 'q2-c', text: 'I receive a surprise bonus, gift card, or coffee.', styleId: 'tangible_gifts' },
      { id: 'q2-d', text: 'I get quality one-on-one time with my leader.', styleId: 'quality_time' },
      { id: 'q2-e', text: 'We celebrate wins together with some fun energy.', styleId: 'physical_touch' }
    ]
  },
  {
    id: 'q3',
    text: 'My ideal recognition moment would be:',
    options: [
      { id: 'q3-a', text: 'Hearing "you crushed it!" in a team meeting.', styleId: 'words_of_affirmation' },
      { id: 'q3-b', text: 'A teammate saying "I\'ve got this, let me help."', styleId: 'acts_of_service' },
      { id: 'q3-c', text: 'Receiving a personal card or a favorite snack.', styleId: 'tangible_gifts' },
      { id: 'q3-d', text: 'Grabbing time to talk, reflect, or plan together.', styleId: 'quality_time' },
      { id: 'q3-e', text: 'Laughing and bonding during a team huddle.', styleId: 'physical_touch' }
    ]
  },
  {
    id: 'q4',
    text: 'In stressful times, I feel supported when:',
    options: [
      { id: 'q4-a', text: 'I\'m reminded I\'m doing great.', styleId: 'words_of_affirmation' },
      { id: 'q4-b', text: 'Someone steps in to lighten my load.', styleId: 'acts_of_service' },
      { id: 'q4-c', text: 'A thoughtful gesture shows someone noticed my effort.', styleId: 'tangible_gifts' },
      { id: 'q4-d', text: 'I\'m given space to talk or be heard.', styleId: 'quality_time' },
      { id: 'q4-e', text: 'The team lifts the mood with fun and positivity.', styleId: 'physical_touch' }
    ]
  },
  {
    id: 'q5',
    text: 'I wish my team would do more of:',
    options: [
      { id: 'q5-a', text: 'Saying "thank you" and offering praise.', styleId: 'words_of_affirmation' },
      { id: 'q5-b', text: 'Sharing the workload or offering help.', styleId: 'acts_of_service' },
      { id: 'q5-c', text: 'Celebrating small wins with thoughtful perks.', styleId: 'tangible_gifts' },
      { id: 'q5-d', text: 'Creating space to connect without distractions.', styleId: 'quality_time' },
      { id: 'q5-e', text: 'Creating more energy and fun in the day.', styleId: 'physical_touch' }
    ]
  }
];
