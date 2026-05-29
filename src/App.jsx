import React, { useState, useCallback, useEffect, useMemo } from 'react';
import LayoutWrapper from './components/LayoutWrapper';
import WelcomeScreen from './components/WelcomeScreen';
import QuizScreen from './components/QuizScreen';
import ResultsScreen from './components/ResultsScreen';
import TieBreakerScreen from './components/TieBreakerScreen';
import { calculateResults } from './skills/calculateResults';
import {
  findTieBreakerCandidates,
  MAX_TIE_BREAKER_ATTEMPTS,
} from './skills/tieBreaker';
import { STYLES } from './data/stylesData';
import { QUESTIONS } from './data/questionsData';
import { useIframeBridge } from './utils/iframeBridge';

function App() {
  const [currentScreen, setCurrentScreen] = useState('welcome');
  const [resultsData, setResultsData] = useState(null);
  // Held only in memory for this session; cleared on restart and on unload.
  const [userName, setUserName] = useState('');

  // Tie-breaker context (see leadership_style_quiz/src/App.jsx for the
  // full design notes — same shape and lifecycle across the three quizzes).
  const [tieBreakerCtx, setTieBreakerCtx] = useState(null);

  const startQuiz = useCallback((name) => {
    setUserName(name || '');
    setCurrentScreen('quiz');
  }, []);

  const finalizeOrTieBreak = useCallback((answers, shuffledQuestions, attemptIdx, usedCandidates) => {
    const results = calculateResults(answers, STYLES);
    const isTied = results.topStyles.length > 1;

    if (!isTied) {
      setResultsData(results);
      setTieBreakerCtx(null);
      setCurrentScreen('results');
      return;
    }

    if (attemptIdx >= MAX_TIE_BREAKER_ATTEMPTS) {
      setResultsData(results);
      setTieBreakerCtx(null);
      setCurrentScreen('results');
      return;
    }

    const tiedIds = new Set(results.topStyles.map(s => s.id));
    const pool = findTieBreakerCandidates(answers, tiedIds, usedCandidates);
    if (pool.length === 0) {
      setResultsData(results);
      setTieBreakerCtx(null);
      setCurrentScreen('results');
      return;
    }

    setTieBreakerCtx({
      answers,
      shuffledQuestions,
      tiedStyleIds: tiedIds,
      attemptIdx,
      usedCandidates,
    });
    setCurrentScreen('tieBreaker');
  }, []);

  const handleQuizComplete = useCallback((answers, shuffledQuestions) => {
    finalizeOrTieBreak(answers, shuffledQuestions, 0, new Set());
  }, [finalizeOrTieBreak]);

  const handleTieBreakerAttempt = useCallback((newAnswers, newUsedCandidates) => {
    if (!tieBreakerCtx) return;
    finalizeOrTieBreak(
      newAnswers,
      tieBreakerCtx.shuffledQuestions,
      tieBreakerCtx.attemptIdx + 1,
      newUsedCandidates,
    );
  }, [tieBreakerCtx, finalizeOrTieBreak]);

  const handleNoCandidates = useCallback(() => {
    if (!tieBreakerCtx) return;
    const results = calculateResults(tieBreakerCtx.answers, STYLES);
    setResultsData(results);
    setTieBreakerCtx(null);
    setCurrentScreen('results');
  }, [tieBreakerCtx]);

  const restartQuiz = useCallback(() => {
    setResultsData(null);
    setUserName('');
    setTieBreakerCtx(null);
    setCurrentScreen('welcome');
  }, []);

  // Rehydrate the Results screen from URL params on first mount. Used by the
  // iframe "Open to share" button — it opens the canonical live URL with
  // `?scores=<id>:<n>,<id>:<n>&name=<name>` so the new tab lands on the
  // exact same Results state without making the user retake the quiz.
  // After rehydration we strip the params so a refresh resets to Welcome
  // and the address bar stays clean.
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const scoresParam = params.get('scores');
    if (!scoresParam) return;

    const scoreMap = {};
    scoresParam.split(',').forEach(pair => {
      const [id, scoreStr] = pair.split(':');
      const score = parseInt(scoreStr, 10);
      if (id && Number.isFinite(score) && score >= 0) {
        scoreMap[id] = score;
      }
    });

    const knownIds = new Set(STYLES.map(s => s.id));
    if (!Object.keys(scoreMap).some(id => knownIds.has(id))) return;

    const totalQuestions = QUESTIONS.length;
    const allScores = STYLES.map(style => {
      const score = scoreMap[style.id] || 0;
      return {
        ...style,
        score,
        percentage: Math.round((score / totalQuestions) * 100),
        maxPossible: totalQuestions,
      };
    });

    let maxScore = -1;
    let topStyles = [];
    allScores.forEach(s => {
      if (s.score > maxScore) {
        maxScore = s.score;
        topStyles = [s];
      } else if (s.score === maxScore) {
        topStyles.push(s);
      }
    });

    setResultsData({ allScores, topStyles });
    setUserName(params.get('name') || '');
    setCurrentScreen('results');

    window.history.replaceState({}, '', window.location.pathname);
  }, []);

  // Universal LMS embed wiring: ready event, resize/wheel forwarding,
  // ?autostart=1 deep link, host commands, screen-transition events,
  // and Rise 360 completion fire on the results screen.
  const screenEvents = useMemo(() => ({
    quiz:    { event: 'start' },
    results: {
      event: 'results',
      payload: resultsData
        ? {
            topStyles: resultsData.topStyles?.map(s => s.name),
            allScores: resultsData.allScores?.map(s => ({ name: s.name, score: s.score })),
          }
        : {},
      complete: true,
    },
    welcome: { whenFrom: ['results'], event: 'restart' },
  }), [resultsData]);

  useIframeBridge({
    onStart: () => startQuiz(''),
    onRestart: restartQuiz,
    screen: currentScreen,
    screenEvents,
  });

  return (
    <LayoutWrapper>
      {currentScreen === 'welcome' && <WelcomeScreen onStart={startQuiz} />}
      {currentScreen === 'quiz' && <QuizScreen onComplete={handleQuizComplete} />}
      {currentScreen === 'tieBreaker' && tieBreakerCtx && (
        <TieBreakerScreen
          key={`tb-${tieBreakerCtx.attemptIdx}`}
          answers={tieBreakerCtx.answers}
          shuffledQuestions={tieBreakerCtx.shuffledQuestions}
          tiedStyleIds={tieBreakerCtx.tiedStyleIds}
          attemptIdx={tieBreakerCtx.attemptIdx}
          usedCandidates={tieBreakerCtx.usedCandidates}
          onAttemptComplete={handleTieBreakerAttempt}
          onNoCandidates={handleNoCandidates}
        />
      )}
      {currentScreen === 'results' && resultsData && (
        <ResultsScreen resultsData={resultsData} userName={userName} onRestart={restartQuiz} />
      )}
    </LayoutWrapper>
  );
}

export default App;
