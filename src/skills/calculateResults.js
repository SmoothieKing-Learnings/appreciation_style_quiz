import { QUESTIONS } from '../data/questionsData';

export function calculateResults(answers, stylesData) {
  // answers is an ordered array of styleIds, one per question
  // totalQuestions is fixed to QUESTIONS.length (8) so percentages are
  // always relative to the maximum possible score, not just answers given.
  const totalQuestions = QUESTIONS.length;
  const scores = {};

  // Initialize all style scores to 0
  stylesData.forEach(style => {
    scores[style.id] = 0;
  });

  // Tally scores — guard against null/undefined from any skipped answers
  answers.forEach(answerId => {
    if (answerId && scores[answerId] !== undefined) {
      scores[answerId] += 1;
    }
  });

  let maxScore = -1;
  let topStyles = [];

  const results = stylesData.map(style => {
    const score = scores[style.id];
    // Percentage out of the total possible points (e.g. 4/8 = 50%)
    const percentage = Math.round((score / totalQuestions) * 100);

    if (score > maxScore) {
      maxScore = score;
      topStyles = [style];
    } else if (score === maxScore) {
      topStyles.push(style);
    }

    return {
      ...style,
      score,
      percentage,
      maxPossible: totalQuestions // exposed for results display (e.g. "4 out of 8")
    };
  });

  return {
    allScores: results,
    topStyles // Array to handle ties
  };
}

