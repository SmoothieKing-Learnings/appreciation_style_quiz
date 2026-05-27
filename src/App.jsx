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

  const startQuiz = () => {
    setCurrentScreen('quiz');
  };

  const handleQuizComplete = (answers) => {
    const results = calculateResults(answers, STYLES);
    setResultsData(results);
    setCurrentScreen('results');
  };

  const restartQuiz = () => {
    setResultsData(null);
    setCurrentScreen('welcome');
  };

  return (
    <LayoutWrapper>
      {currentScreen === 'welcome' && <WelcomeScreen onStart={startQuiz} />}
      {currentScreen === 'quiz' && <QuizScreen onComplete={handleQuizComplete} />}
      {currentScreen === 'results' && resultsData && (
        <ResultsScreen resultsData={resultsData} onRestart={restartQuiz} />
      )}
    </LayoutWrapper>
  );
}

export default App;
