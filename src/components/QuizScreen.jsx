import React, { useState, useEffect } from 'react';
import ProgressBar from './ProgressBar';
import { QUESTIONS } from '../data/questionsData';
import { announceToScreenReader } from '../skills/a11yUtils';
import { isEmbedded } from '../skills/embed';

// Fisher-Yates shuffle — returns a new shuffled array, never mutates the original
function shuffleArray(arr) {
  const shuffled = [...arr];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

export default function QuizScreen({ onComplete }) {
  const embedded = isEmbedded();
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

  // Shuffle question order AND option order within each question once on mount.
  // The lazy initializer runs only once so the order stays stable during back-navigation.
  const [shuffledQuestions] = useState(() =>
    shuffleArray(QUESTIONS).map(q => ({
      ...q,
      options: shuffleArray(q.options)
    }))
  );

  // Store answers as { questionIndex: styleId } so going back never erases prior picks
  const [answers, setAnswers] = useState({});

  const currentQuestion = shuffledQuestions[currentQuestionIndex];
  const isLastQuestion = currentQuestionIndex === shuffledQuestions.length - 1;
  const selectedAnswer = answers[currentQuestionIndex]; // previously picked on this question (if any)

  useEffect(() => {
    announceToScreenReader(`Question ${currentQuestionIndex + 1} of ${shuffledQuestions.length}: ${currentQuestion.text}`);
  }, [currentQuestionIndex, currentQuestion]);

  const handleOptionSelect = (styleId) => {
    setAnswers({ ...answers, [currentQuestionIndex]: styleId });
  };

  const handleContinue = () => {
    if (!selectedAnswer) return;

    if (isLastQuestion) {
      // Convert object to ordered array of styleIds before sending to results
      const orderedAnswers = shuffledQuestions.map((_, idx) => answers[idx]);
      onComplete(orderedAnswers);
    } else {
      setCurrentQuestionIndex(prev => prev + 1);
    }
  };

  const handleGoBack = () => {
    setCurrentQuestionIndex(prev => prev - 1);
  };

  const handleKeyDown = (e, styleId) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handleOptionSelect(styleId);
    }
  };

  // When embedded, fill 80% of the viewport (iframe) height so the quiz has
  // breathing room top and bottom. justify-around distributes spacing across
  // progress / question / options / button.
  return (
    <div className={`w-full flex flex-col items-center animate-fade-in text-left ${embedded ? 'min-h-[80vh] justify-around py-2' : ''}`}>
      <ProgressBar current={currentQuestionIndex + 1} total={shuffledQuestions.length} />

      <h2
        className={`font-heading text-xl sm:text-2xl md:text-3xl font-bold text-quiz-text w-full leading-snug ${embedded ? '' : 'mb-4 sm:mb-8'}`}
        aria-live="polite"
      >
        {currentQuestion.text}
      </h2>

      <div className="w-full flex flex-col gap-2 sm:gap-4">
        {currentQuestion.options.map((option, idx) => {
          const isSelected = selectedAnswer === option.styleId;
          return (
            <div
              key={option.id}
              role="button"
              tabIndex={0}
              onClick={() => handleOptionSelect(option.styleId)}
              onKeyDown={(e) => handleKeyDown(e, option.styleId)}
              className={`w-full min-h-[44px] p-3 sm:p-5 rounded-xl border-2 transition-all cursor-pointer shadow-sm
                ${isSelected
                  ? 'border-quiz-primary bg-[#fff5e6] shadow-md ring-2 ring-quiz-primary/30'
                  : 'border-orange-100 bg-white hover:border-quiz-primary hover:bg-[#fff5e6] hover:shadow'
                } focus:outline-none focus:ring-4 focus:ring-quiz-primary/30`}
              aria-label={`Option ${idx + 1}: ${option.text}`}
              aria-pressed={isSelected}
            >
              <span className="text-base font-medium text-quiz-text">{option.text}</span>
            </div>
          );
        })}
      </div>

      {/* Continue button — only active when a selection is made */}
      <button
        onClick={handleContinue}
        disabled={!selectedAnswer}
        className={`w-full py-4 px-5 sm:py-5 sm:px-6 rounded-xl font-bold text-white transition-all duration-300 shadow-lg scale-[1.00] active:scale-95
          ${embedded ? '' : 'mt-6 sm:mt-10'}
          ${selectedAnswer
            ? 'bg-quiz-primary hover:bg-red-800'
            : 'bg-gray-300 cursor-not-allowed opacity-50 grayscale shadow-none hover:bg-gray-300'
          }`}
      >
        <span className="text-lg">
          {isLastQuestion ? 'See My Results' : 'Next Question'}
        </span>
      </button>

      {/* Back button — only visible after the first question */}
      {currentQuestionIndex > 0 && (
        <button
          onClick={handleGoBack}
          className={`flex items-center gap-2 text-xs text-quiz-primary hover:text-orange-700 font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-quiz-primary/40 rounded-lg px-3 py-2 hover:bg-orange-50 ${embedded ? '' : 'mt-8'}`}
          aria-label="Go back to the previous question"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M15 18l-6-6 6-6" />
          </svg>
          Back to previous question
        </button>
      )}
    </div>
  );
}

