import React, { useState } from 'react';
import LayoutWrapper from './components/LayoutWrapper';
import WelcomeScreen from './components/WelcomeScreen';
import QuizScreen from './components/QuizScreen';
import ResultsScreen from './components/ResultsScreen';
import { calculateResults } from './skills/calculateResults';
import { STYLES } from './data/stylesData';

function App() {
  const [currentScreen, setCurrentScreen] = useState('welcome');
  const [resultsData, setResultsData] = useState(null);
  // Held only in memory for this session; cleared on restart and on unload.
  const [userName, setUserName] = useState('');

  const startQuiz = (name) => {
    setUserName(name || '');
    setCurrentScreen('quiz');
  };

  const handleQuizComplete = (answers) => {
    const results = calculateResults(answers, STYLES);
    setResultsData(results);
    setCurrentScreen('results');
  };

  const restartQuiz = () => {
    setResultsData(null);
    setUserName('');
    setCurrentScreen('welcome');
  };

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
