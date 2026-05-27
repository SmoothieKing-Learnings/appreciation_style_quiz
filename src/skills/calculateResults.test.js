import { describe, it, expect } from 'vitest';
import { calculateResults } from './calculateResults';
import { STYLES } from '../data/stylesData';
import { QUESTIONS } from '../data/questionsData';

describe('calculateResults (Skill 2)', () => {
  it('should calculate a clear single winner correctly', () => {
    // All answers map to 'direct' — one per question in the current QUESTIONS set
    const answers = Array(QUESTIONS.length).fill('direct');
    const results = calculateResults(answers, STYLES);

    expect(results.topStyles).toHaveLength(1);
    expect(results.topStyles[0].id).toBe('direct');
    const directScore = results.allScores.find(s => s.id === 'direct');
    expect(directScore.percentage).toBe(100);
  });

  it('should accurately handle an exact 2-way tie', () => {
    // Equal counts of 'direct' and 'collaborative'
    const answers = ['direct', 'collaborative', 'direct', 'collaborative'];
    const results = calculateResults(answers, STYLES);

    expect(results.topStyles).toHaveLength(2);
    const topIds = results.topStyles.map(s => s.id);
    expect(topIds).toContain('direct');
    expect(topIds).toContain('collaborative');
  });

  it('should initialize all styles with 0 score with no answers provided', () => {
    const answers = [];
    const results = calculateResults(answers, STYLES);
    
    // Everyone ties at 0 when no questions answered
    expect(results.topStyles).toHaveLength(4);
    results.allScores.forEach(styleResult => {
      expect(styleResult.score).toBe(0);
      expect(styleResult.percentage).toBe(0);
    });
  });
});
