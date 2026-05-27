import { describe, it, expect } from 'vitest';
import { calculateResults } from './calculateResults';
import { STYLES } from '../data/stylesData';
import { QUESTIONS } from '../data/questionsData';

describe('calculateResults (Skill 2)', () => {
  it('should calculate a clear single winner correctly', () => {
    // All answers map to 'words_of_affirmation' — one per question in the current QUESTIONS set
    const answers = Array(QUESTIONS.length).fill('words_of_affirmation');
    const results = calculateResults(answers, STYLES);

    expect(results.topStyles).toHaveLength(1);
    expect(results.topStyles[0].id).toBe('words_of_affirmation');
    const topScore = results.allScores.find(s => s.id === 'words_of_affirmation');
    expect(topScore.percentage).toBe(100);
  });

  it('should accurately handle an exact 2-way tie', () => {
    // Equal counts of 'words_of_affirmation' and 'quality_time'
    const answers = ['words_of_affirmation', 'quality_time', 'words_of_affirmation', 'quality_time'];
    const results = calculateResults(answers, STYLES);

    expect(results.topStyles).toHaveLength(2);
    const topIds = results.topStyles.map(s => s.id);
    expect(topIds).toContain('words_of_affirmation');
    expect(topIds).toContain('quality_time');
  });

  it('should initialize all styles with 0 score with no answers provided', () => {
    const answers = [];
    const results = calculateResults(answers, STYLES);

    // Everyone ties at 0 when no questions answered
    expect(results.topStyles).toHaveLength(5);
    results.allScores.forEach(styleResult => {
      expect(styleResult.score).toBe(0);
      expect(styleResult.percentage).toBe(0);
    });
  });
});
