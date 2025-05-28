import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Home from './pages/Home';
import { ThemeProvider } from './context/ThemeContext';
import SplashScreen from './components/SplashScreen';

function App() {
  const [showSplash, setShowSplash] = useState(true);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Check if splash has been shown before (persists across sessions)
    const splashShown = localStorage.getItem('splashShown');
    if (splashShown) {
      setShowSplash(false);
      setIsLoaded(true);
    }
  }, []);

  const handleSplashComplete = () => {
    localStorage.setItem('splashShown', 'true');
    setShowSplash(false);
    setIsLoaded(true);
  };

  return (
    <ThemeProvider>
      <Router>
        {showSplash && <SplashScreen onComplete={handleSplashComplete} />}

        <div
          className={`min-h-screen relative dark:bg-dark-bg bg-light-bg dark:text-dark-primary text-light-primary overflow-hidden transition-opacity duration-500 ${isLoaded ? 'opacity-100' : 'opacity-100'}`}
        >
          {/* Global background effects */}
          <div className="fixed inset-0 pointer-events-none overflow-hidden">
            {/* Animated gradient background */}
            <div className="absolute inset-0 bg-gradient-to-br from-primary-900/5 via-transparent to-purple-900/5 animate-gradient"></div>

            {/* Floating particles */}
            <div className="absolute top-1/4 left-1/4 w-1 h-1 bg-primary-400/20 rounded-full animate-float"></div>
            <div className="absolute top-3/4 right-1/4 w-2 h-2 bg-purple-400/15 rounded-full animate-particle"></div>
            <div className="absolute top-1/2 left-3/4 w-1.5 h-1.5 bg-primary-300/25 rounded-full animate-pulse"></div>
            <div className="absolute bottom-1/4 left-1/2 w-1 h-1 bg-purple-500/30 rounded-full animate-ping"></div>
          </div>

          <Routes>
            <Route path="/" element={<Home />} />
          </Routes>
        </div>
      </Router>
    </ThemeProvider>
  );
}

export default App;
