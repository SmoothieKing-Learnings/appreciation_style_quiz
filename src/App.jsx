import React, { useState, useCallback, useMemo } from 'react';
import LayoutWrapper from './components/LayoutWrapper';
import WelcomeScreen from './components/WelcomeScreen';
import QuizScreen from './components/QuizScreen';
import ResultsScreen from './components/ResultsScreen';
import { calculateResults } from './skills/calculateResults';
import { STYLES } from './data/stylesData';
import { useIframeBridge } from './utils/iframeBridge';

function App() {
  const [currentScreen, setCurrentScreen] = useState('welcome');
  const [resultsData, setResultsData] = useState(null);
  // Held only in memory for this session; cleared on restart and on unload.
  const [userName, setUserName] = useState('');

  const startQuiz = useCallback((name) => {
    setUserName(name || '');
    setCurrentScreen('quiz');
  }, []);

  const handleQuizComplete = useCallback((answers) => {
    const results = calculateResults(answers, STYLES);
    setResultsData(results);
    setCurrentScreen('results');
  }, []);

  const restartQuiz = useCallback(() => {
    setResultsData(null);
    setUserName('');
    setCurrentScreen('welcome');
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
      {currentScreen === 'results' && resultsData && (
        <ResultsScreen resultsData={resultsData} userName={userName} onRestart={restartQuiz} />
      )}
    </LayoutWrapper>
  );
}

export default App;
