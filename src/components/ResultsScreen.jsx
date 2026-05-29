import React, { useEffect, useMemo, useState } from 'react';
import { Share2, RotateCcw } from 'lucide-react';
import { exportAndShare } from '../skills/exportAndShare';
import { announceToScreenReader } from '../skills/a11yUtils';
import OtherTypesModal from './OtherTypesModal';
import { STYLES } from '../data/stylesData';

export default function ResultsScreen({ resultsData, userName, onRestart }) {
  const { allScores, topStyles } = resultsData;
  const trimmedName = (userName || '').trim();
  const hasName = trimmedName.length > 0;

  // "Explore the other types" modal state. Trigger button auto-hides when
  // no "other" types remain (e.g. all 5 styles tied at the top — rare).
  const [otherTypesOpen, setOtherTypesOpen] = useState(false);
  // Set of top-style ids — used both to gate the footer "Explore" link and to
  // mark non-top stacked-bar segments as clickable shortcuts into the modal.
  const topIds = useMemo(() => new Set(topStyles.map(s => s.id)), [topStyles]);
  const otherTypesAvailable = useMemo(
    () => STYLES.some(s => !topIds.has(s.id)),
    [topIds]
  );

  useEffect(() => {
    const styleNames = topStyles.map(s => s.name).join(' and ');
    const subject = hasName ? `${trimmedName}'s` : 'Your';
    announceToScreenReader(`Quiz complete. ${subject} primary type of appreciation is ${styleNames}.`);
  }, [topStyles, trimmedName, hasName]);

  const handleShare = () => {
    // For ties, join top style names with " and " so the share text reads
    // "My appreciation style is Words of Affirmation and Quality Time."
    const styleName = topStyles.map((s) => s.name).join(' and ');
    exportAndShare('result-capture-area', 'my-appreciation-style.png', {
      userName: trimmedName,
      styleName,
    });
  };

  // Proportional stacked-bar data — all 5 styles, sorted high → low so the
  // dominant style sits at the leading edge. Percentages sum to 100 (±1 from
  // rounding); zero-score styles are filtered from the bar but kept in the
  // legend so the learner sees their full distribution.
  const chartData = useMemo(() => {
    return [...allScores]
      .sort((a, b) => b.score - a.score)
      .map(s => ({
        id: s.id,
        name: s.name,
        subtitle: s.subtitle,
        percentage: s.percentage,
        score: s.score,
        maxPossible: s.maxPossible,
        color: s.color,
      }));
  }, [allScores]);

  const isTie = topStyles.length > 1;

  return (
    <div className="w-full animate-fade-in flex flex-col items-center">

      {/* CAPTURE AREA */}
      <div id="result-capture-area" className="w-full flex flex-col items-center p-2 rounded-2xl">
        <h2 className="text-xs font-extrabold text-quiz-primary uppercase tracking-widest mb-2">
          {hasName ? `${trimmedName}'s Type of Appreciation` : 'Your Type of Appreciation'}
        </h2>

        {/*
          PROPORTIONAL STACKED BAR
          Single horizontal bar = 100% of answers, segments per style sized by
          `flex: percentage`. Zero-score styles are filtered out of both the
          bar and the legend below. minWidth: 4px keeps very small (1–3%)
          segments visible as a thin sliver instead of collapsing.
        */}
        <div
          className="w-full h-8 md:h-10 mt-4 flex bg-surface-track rounded-full overflow-hidden shadow-sm"
          role="group"
          aria-label={`Score breakdown. ${chartData.map(s => `${s.subtitle} ${s.percentage} percent`).join(', ')}.`}
        >
          {chartData.filter(s => s.percentage > 0).map((s) => {
            // Non-top segments become buttons that open the OtherTypesModal so
            // the learner can dig into the styles outside their primary result.
            const isOther = !topIds.has(s.id) && otherTypesAvailable;
            return (
              <div
                key={s.name}
                className={`h-full transition-opacity ${isOther ? 'cursor-pointer hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-quiz-primary/60' : ''}`}
                style={{
                  flex: s.percentage,
                  backgroundColor: s.color,
                  minWidth: '4px',
                }}
                title={isOther
                  ? `${s.subtitle}: ${s.percentage}% — tap to explore`
                  : `${s.subtitle}: ${s.percentage}% (${s.score}/${s.maxPossible} pts)`}
                role={isOther ? 'button' : undefined}
                tabIndex={isOther ? 0 : undefined}
                aria-label={isOther ? `Explore ${s.subtitle}, ${s.percentage} percent` : undefined}
                onClick={isOther ? () => setOtherTypesOpen(true) : undefined}
                onKeyDown={isOther ? (e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    setOtherTypesOpen(true);
                  }
                } : undefined}
              />
            );
          })}
        </div>

        {/* LEGEND — color swatch + subtitle + percentage, horizontal wrap.
            Only styles with a non-zero score are shown. */}
        <div className="w-full flex flex-wrap justify-center gap-x-4 gap-y-2 mt-2 mb-6 text-[9px]">
          {chartData.filter(s => s.percentage > 0).map((s) => (
            <div key={s.name} className="flex items-center gap-1.5">
              <span
                className="w-2.5 h-2.5 rounded-full flex-shrink-0"
                style={{ backgroundColor: s.color }}
                aria-hidden="true"
              />
              <span className="font-semibold text-quiz-text">{s.subtitle}</span>
              <span className="text-quiz-text/60">{s.percentage}%</span>
            </div>
          ))}
        </div>

        {isTie ? (
          <h1 className="font-heading text-xs font-black text-quiz-text mb-2 text-center">
            {hasName ? `${trimmedName} has a Hybrid Appreciation Style` : 'You have a Hybrid Appreciation Style'}
          </h1>
        ) : (
          <h1 className="font-heading text-3xl font-black text-quiz-text mb-6 text-center">
            {topStyles[0].name}
          </h1>
        )}

        {isTie && (
          <p className="text-xs text-quiz-text/80 mb-6 text-center">
            {hasName ? 'Primary styles: ' : 'Your primary styles are '}
            {topStyles.map(s => <strong key={s.id} className="text-quiz-primary">{s.name}</strong>).reduce((prev, curr) => [prev, ' and ', curr])}
          </p>
        )}

        {/* TOP STYLE DESCRIPTION(S) */}
        <div className="w-full flex flex-col gap-3 text-left">
          {topStyles.map((style) => (
            <div key={style.id} className="overflow-hidden">
              <p className="text-xs text-quiz-text/80 leading-relaxed">
                {style.description}
              </p>
            </div>
          ))}
        </div>

      </div>

      {/* ACTION BUTTONS (Outside Capture Area) */}
      <div className="w-full flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 mt-4 sm:mt-6">
        <button
          onClick={handleShare}
          className="flex-1 max-w-xs min-h-[44px] flex items-center justify-center gap-2 px-6 py-4 bg-quiz-primary text-quiz-bg rounded-xl font-bold text-base hover:bg-brand-dark focus:outline-none focus:ring-4 focus:ring-quiz-primary/50 transition-all shadow-md active:scale-95"
          aria-label="Share or download my result image"
        >
          <Share2 size={20} /> Share Result
        </button>

        <button
          onClick={onRestart}
          className="flex-1 max-w-xs min-h-[44px] flex items-center justify-center gap-2 px-6 py-4 bg-white text-quiz-primary border-2 border-quiz-primary rounded-xl font-bold text-base hover:bg-interactive-cream focus:outline-none focus:ring-4 focus:ring-quiz-primary/30 transition-all active:scale-95"
          aria-label="Retake the quiz"
        >
          <RotateCcw size={20} /> Retake Quiz
        </button>
      </div>

      {/*
        "Explore the other types →" footer link — quiet, low-priority
        affordance, sits below the CTAs. Auto-hidden when no other types
        remain (rare full-tie edge case).
      */}
      {otherTypesAvailable && (
        <button
          type="button"
          onClick={() => setOtherTypesOpen(true)}
          className="mt-3 mx-auto text-xs font-medium text-quiz-text/60 hover:text-quiz-primary focus:outline-none focus:ring-2 focus:ring-quiz-primary/30 transition-colors rounded-md px-2 py-1"
          aria-label="Explore the other appreciation types"
        >
          Explore the other types →
        </button>
      )}

      {otherTypesOpen && (
        <OtherTypesModal
          allStyles={STYLES}
          topStyles={topStyles}
          onClose={() => setOtherTypesOpen(false)}
        />
      )}
    </div>
  );
}
