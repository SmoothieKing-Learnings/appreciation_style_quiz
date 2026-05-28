import React, { useEffect } from 'react';
import { Share2, RotateCcw } from 'lucide-react';
import { exportAndShare } from '../skills/exportAndShare';
import { announceToScreenReader } from '../skills/a11yUtils';

export default function ResultsScreen({ resultsData, onRestart }) {
  const { allScores, topStyles } = resultsData;

  useEffect(() => {
    const styleNames = topStyles.map(s => s.name).join(' and ');
    announceToScreenReader(`Quiz complete. Your primary appreciation style is ${styleNames}.`);
  }, [topStyles]);

  const handleShare = () => {
    exportAndShare('result-capture-area', 'my-appreciation-style.png');
  };

  const isTie = topStyles.length > 1;

  return (
    <div className="w-full animate-fade-in flex flex-col items-center">

      {/* CAPTURE AREA */}
      <div id="result-capture-area" className="w-full flex flex-col items-center p-2 sm:p-4 md:p-6 rounded-2xl">
        <h2 className="text-xs font-extrabold text-quiz-primary uppercase tracking-widest mb-2">
          Your Results
        </h2>

        {isTie ? (
          <h1 className="font-heading text-3xl md:text-4xl font-black text-quiz-text mb-2 text-center">
            You have a Hybrid Appreciation Style
          </h1>
        ) : (
          <h1 className="font-heading text-3xl md:text-5xl font-black text-quiz-text mb-2 text-center">
            {topStyles[0].name}
          </h1>
        )}

        {isTie && (
          <p className="text-base font-medium text-quiz-text/80 mb-6 text-center">
            Your primary styles are {topStyles.map(s => <strong key={s.id} className="text-quiz-primary">{s.name}</strong>).reduce((prev, curr) => [prev, ' and ', curr])}
          </p>
        )}

        {/* TOP STYLE DESCRIPTION(S) */}
        <div className="w-full flex flex-col gap-3 sm:gap-6 mt-4 sm:mt-6 text-left">
          {topStyles.map((style) => {
            const scored = allScores.find(s => s.id === style.id);
            return (
              <div key={style.id} className="bg-white p-3 sm:p-6 rounded-2xl shadow-sm border border-orange-50 overflow-hidden">
                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 mb-3">
                  <h3 className="text-xl sm:text-2xl font-bold text-quiz-text flex items-start gap-3 min-w-0 break-words">
                    <span className="w-4 h-4 mt-1.5 rounded-full flex-shrink-0" style={{ backgroundColor: style.color }}></span>
                    <span className="min-w-0 break-words">{style.name}</span>
                  </h3>
                  {scored && (
                    <span className="self-start flex-shrink-0 text-xs font-bold px-3 py-1 rounded-full text-white whitespace-nowrap"
                      style={{ backgroundColor: style.color }}>
                      {scored.score}/{scored.maxPossible} pts
                    </span>
                  )}
                </div>

                <p className="text-sm sm:text-base text-quiz-text/90 leading-relaxed">
                  {style.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>

      {/* ACTION BUTTONS (Outside Capture Area) */}
      <div className="w-full flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center mt-6 sm:mt-10">
        <button
          onClick={handleShare}
          className="flex-1 max-w-xs min-h-[44px] flex items-center justify-center gap-2 px-6 py-4 bg-quiz-primary text-[#FFF9EF] rounded-xl font-bold text-base hover:bg-[#7a0014] focus:outline-none focus:ring-4 focus:ring-quiz-primary/50 transition-all shadow-md active:scale-95"
          aria-label="Share or download my result image"
        >
          <Share2 size={20} /> Share Result
        </button>

        <button
          onClick={onRestart}
          className="flex-1 max-w-xs min-h-[44px] flex items-center justify-center gap-2 px-6 py-4 bg-white text-quiz-primary border-2 border-quiz-primary rounded-xl font-bold text-base hover:bg-orange-50 focus:outline-none focus:ring-4 focus:ring-quiz-primary/30 transition-all active:scale-95"
          aria-label="Retake the quiz"
        >
          <RotateCcw size={20} /> Retake Quiz
        </button>
      </div>
    </div>
  );
}
