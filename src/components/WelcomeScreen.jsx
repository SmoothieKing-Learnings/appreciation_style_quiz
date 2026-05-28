import React, { useState } from 'react';
import logo from '../assets/logo.png';
import { isEmbedded } from '../skills/embed';

const NAME_MAX = 40;

export default function WelcomeScreen({ onStart }) {
  // When embedded, fill the iframe viewport vertically and center content.
  // Welcome content is short, so vertical centering is safe (no overflow).
  const embedded = isEmbedded();
  const [name, setName] = useState('');

  const trimmedName = name.trim();
  const canSubmit = trimmedName.length > 0;

  const handleSubmit = (e) => {
    if (e) e.preventDefault();
    if (!canSubmit) return;
    onStart(trimmedName);
  };

  return (
    <div className={`w-full animate-fade-in flex flex-col items-center ${embedded ? 'min-h-[80vh] justify-center' : ''}`}>
      <img src={logo} alt="Smoothie King Logo" className="h-8 md:h-10 w-auto mb-8 animate-fade-in" />
      <h1 className="font-heading text-3xl md:text-5xl font-extrabold text-quiz-primary mb-6 tracking-tight">
        Discover Your Appreciation Style
      </h1>
      <p className="text-base md:text-lg text-quiz-text/80 mb-8 max-w-md">
        Take this short assessment to discover how you most feel valued and appreciated at work.
      </p>

      <form onSubmit={handleSubmit} className="w-full max-w-sm flex flex-col items-stretch gap-5">
        <div className="w-full text-left">
          <label htmlFor="user-name" className="block text-sm font-semibold text-quiz-text mb-2">
            Your name
          </label>
          <input
            id="user-name"
            type="text"
            inputMode="text"
            autoComplete="off"
            required
            maxLength={NAME_MAX}
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="e.g. Sarah"
            // Inline 17px font-size is required regardless of viewport so iOS
            // Safari never auto-zooms on focus (its threshold is < 16px).
            style={{ fontSize: '17px' }}
            className="w-full min-h-[44px] px-4 py-3 bg-white border-2 border-orange-100 rounded-xl text-quiz-text placeholder-quiz-text/40 focus:outline-none focus:border-quiz-primary focus:ring-2 focus:ring-quiz-primary/30 transition-colors"
            aria-describedby="user-name-hint"
          />
          <p id="user-name-hint" className="mt-1 text-xs text-quiz-text/50">
            Used only in your results headline. Not stored anywhere.
          </p>
        </div>

        <button
          type="submit"
          disabled={!canSubmit}
          className={`w-full min-h-[44px] px-8 py-4 rounded-xl font-bold text-base text-[#FFF9EF] transition-all shadow-lg
            ${canSubmit
              ? 'bg-quiz-primary hover:bg-[#7a0014] focus:outline-none focus:ring-4 focus:ring-quiz-primary/50 hover:shadow-xl active:scale-95'
              : 'bg-gray-300 cursor-not-allowed opacity-60 shadow-none hover:bg-gray-300'
            }`}
          aria-label="Start the Appreciation Style Quiz"
        >
          Let's Blend!
        </button>
      </form>
    </div>
  );
}
