import React from 'react';
import { isEmbedded } from '../skills/embed';

export default function ProgressBar({ current, total }) {
  const percentage = Math.round((current / total) * 100);
  const embedded = isEmbedded();

  return (
    <div className={`w-full ${embedded ? '' : 'mb-6'}`} aria-hidden="true">
      <div className="flex justify-between items-end mb-2">
        <span className="text-xs font-bold text-quiz-primary uppercase tracking-wider">
          Question {current} of {total}
        </span>
        {/* Percentage hidden on small (mobile) screens, visible from sm breakpoint up */}
        <span className="hidden sm:inline text-xs font-semibold text-quiz-text/60">{percentage}%</span>
      </div>
      {/* Progress bar visual hidden on small screens */}
      <div className="hidden sm:block h-2.5 w-full bg-orange-100 rounded-full overflow-hidden">
        <div
          className="h-full bg-quiz-primary rounded-full transition-all duration-500 ease-out"
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
}
