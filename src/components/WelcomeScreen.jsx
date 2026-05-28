import React, { useRef, useState } from 'react';
import logo from '../assets/logo.png';
import { isEmbedded } from '../skills/embed';

const NAME_MAX = 40;

export default function WelcomeScreen({ onStart }) {
  // When embedded, fill the iframe viewport vertically and center content.
  // Welcome content is short, so vertical centering is safe (no overflow).
  const embedded = isEmbedded();
  const [name, setName] = useState('');
  // Becomes true once the user clicks the CTA with no name; turns the input
  // border red until the user starts typing again.
  const [attempted, setAttempted] = useState(false);
  const inputRef = useRef(null);

  const trimmedName = name.trim();
  const canSubmit = trimmedName.length > 0;
  const showInvalid = attempted && !canSubmit;

  const shakeInput = () => {
    const el = inputRef.current;
    if (!el) return;
    // Cancel any in-flight shake so rapid clicks restart cleanly.
    el.getAnimations().forEach((a) => a.cancel());
    el.animate(
      [
        { transform: 'translateX(0)' },
        { transform: 'translateX(-8px)' },
        { transform: 'translateX(8px)' },
        { transform: 'translateX(-6px)' },
        { transform: 'translateX(6px)' },
        { transform: 'translateX(-3px)' },
        { transform: 'translateX(3px)' },
        { transform: 'translateX(0)' },
      ],
      { duration: 420, easing: 'ease-out' }
    );
  };

  const handleSubmit = (e) => {
    if (e) e.preventDefault();
    if (!canSubmit) {
      setAttempted(true);
      shakeInput();
      inputRef.current?.focus();
      return;
    }
    onStart(trimmedName);
  };

  const handleChange = (e) => {
    setName(e.target.value);
    // Clear the invalid state the moment the user types something.
    if (attempted) setAttempted(false);
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

      {/* gap-1 = 4px so input ↔ CTA ↔ helper all sit on the same 4px rhythm */}
      <form onSubmit={handleSubmit} className="w-full max-w-sm flex flex-col items-stretch gap-1">
        <label htmlFor="user-name" className="text-sm font-semibold text-quiz-text text-left">
          Enter your name to start the quiz
        </label>
        <input
          ref={inputRef}
          id="user-name"
          type="text"
          inputMode="text"
          autoComplete="off"
          required
          maxLength={NAME_MAX}
          value={name}
          onChange={handleChange}
          placeholder="e.g. Sarah"
          // Inline 17px font-size is required regardless of viewport so iOS
          // Safari never auto-zooms on focus (its threshold is < 16px).
          style={{ fontSize: '17px' }}
          aria-invalid={showInvalid || undefined}
          aria-describedby="user-name-hint"
          className={`w-full min-h-[44px] px-4 py-3 bg-white border-2 rounded-xl text-quiz-text placeholder-quiz-text/40 focus:outline-none transition-colors
            ${showInvalid
              ? 'border-red-500 bg-red-50 focus:border-red-500 focus:ring-2 focus:ring-red-300'
              : 'border-orange-100 focus:border-quiz-primary focus:ring-2 focus:ring-quiz-primary/30'
            }`}
        />

        <button
          type="submit"
          className="w-full min-h-[44px] px-8 py-4 mt-0 bg-quiz-primary text-[#FFF9EF] rounded-xl font-bold text-base hover:bg-[#7a0014] focus:outline-none focus:ring-4 focus:ring-quiz-primary/50 transition-all shadow-lg hover:shadow-xl active:scale-95"
          aria-label="Start the Appreciation Style Quiz"
        >
          Let's Blend!
        </button>

        <p id="user-name-hint" className="text-xs text-quiz-text/50 text-center">
          Used only in your results headline. Not stored anywhere.
        </p>
      </form>
    </div>
  );
}
