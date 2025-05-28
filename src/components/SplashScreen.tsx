import React, { useEffect, useState } from 'react';

interface SplashScreenProps {
  onComplete: () => void;
}

const SplashScreen: React.FC<SplashScreenProps> = ({ onComplete }) => {
  const [isVisible, setIsVisible] = useState(true);
  const [animationPhase, setAnimationPhase] = useState(0);

  useEffect(() => {
    const timer1 = setTimeout(() => setAnimationPhase(1), 800);
    const timer2 = setTimeout(() => setAnimationPhase(2), 2000);
    const timer3 = setTimeout(() => setAnimationPhase(3), 3500);
    const timer4 = setTimeout(() => {
      setIsVisible(false);
      setTimeout(onComplete, 500);
    }, 5000);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
      clearTimeout(timer4);
    };
  }, [onComplete]);

  if (!isVisible) return null;

  return (
    <div
      className={`fixed inset-0 z-[9999] flex items-center justify-center transition-opacity duration-500 ${isVisible ? 'opacity-100' : 'opacity-0'}`}
    >
      {/* Black background with opacity */}
      <div className="absolute inset-0 bg-black/90"></div>

      {/* Floating particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-20 w-2 h-2 bg-primary-400/40 rounded-full animate-float"></div>
        <div className="absolute top-40 right-32 w-3 h-3 bg-purple-400/30 rounded-full animate-particle"></div>
        <div className="absolute bottom-40 left-1/4 w-1.5 h-1.5 bg-primary-300/50 rounded-full animate-pulse"></div>
        <div className="absolute top-60 right-1/4 w-2.5 h-2.5 bg-purple-300/25 rounded-full animate-float"></div>
        <div className="absolute bottom-60 right-1/3 w-1 h-1 bg-primary-500/60 rounded-full animate-ping"></div>
        <div className="absolute top-1/3 left-1/3 w-1.5 h-1.5 bg-purple-400/35 rounded-full animate-particle"></div>
      </div>

      {/* Main content */}
      <div className="relative z-10 text-center">
        {/* Logo container */}
        <div
          className={`relative mb-8 transition-all duration-1000 ${animationPhase >= 1 ? 'scale-100 opacity-100' : 'scale-50 opacity-0'}`}
        >
          <div className="relative">
            {/* Glowing background */}
            <div
              className={`absolute inset-0 bg-gradient-to-r from-primary-500/30 to-purple-500/30 rounded-full blur-3xl transition-all duration-1000 ${animationPhase >= 2 ? 'scale-150 opacity-100' : 'scale-100 opacity-0'}`}
            ></div>

            {/* Logo */}
            <div
              className={`relative p-8 rounded-full glass-dark backdrop-blur-xl border-2 border-primary-500/30 transition-all duration-1000 ${animationPhase >= 1 ? 'animate-glow' : ''}`}
            >
              <img
                src="/logo.png"
                alt="VSharp Logo"
                className={`w-24 h-24 md:w-32 md:h-32 transition-all duration-1000 ${animationPhase >= 2 ? 'animate-float' : ''}`}
              />
            </div>
          </div>
        </div>
        {/* Brand name */}
        <div
          className={`transition-all duration-1000 delay-500 ${animationPhase >= 2 ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}
        >
          <h1 className="text-5xl md:text-7xl font-bold mb-4">
            <span className="bg-gradient-to-r from-primary-400 via-purple-400 to-primary-400 bg-clip-text text-transparent animate-gradient">
              VSharp
            </span>
          </h1>
          <p
            className={`text-lg md:text-xl text-dark-secondary transition-all duration-1000 delay-700 ${animationPhase >= 3 ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}`}
          >
            Unleash Your Gaming Potential
          </p>
        </div>

        <div
          className={`mt-12 transition-all duration-1000 delay-1000 ${animationPhase >= 3 ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}`}
        >
          <div className="flex justify-center space-x-2">
            <div className="w-3 h-3 bg-primary-400 rounded-full animate-pulse"></div>
            <div
              className="w-3 h-3 bg-purple-400 rounded-full animate-pulse"
              style={{ animationDelay: '0.2s' }}
            ></div>
            <div
              className="w-3 h-3 bg-primary-400 rounded-full animate-pulse"
              style={{ animationDelay: '0.4s' }}
            ></div>
          </div>
          <p className="text-sm text-dark-secondary mt-4 animate-pulse">Loading...</p>
        </div>
      </div>

      {/* Radial gradient overlay */}
      {/* <div className="absolute inset-0 bg-gradient-radial from-transparent via-transparent to-dark-bg/50"></div> */}
    </div>
  );
};

export default SplashScreen;
