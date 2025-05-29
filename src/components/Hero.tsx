import React from 'react';
import { FaGamepad, FaDiscord, FaChevronDown } from 'react-icons/fa';
import { DISCORD_INVITE_LINK } from '../constants/links';

const Hero: React.FC = () => {
  const scrollDown = () => {
    window.scrollBy({
      top: window.innerHeight,
      behavior: 'smooth',
    });
  };

  return (
    <section
      id="hero"
      className="min-h-screen relative flex items-center justify-center text-dark-primary dark:text-dark-primary text-light-primary py-12 md:py-24 overflow-hidden"
      style={{
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.85)), url('https://images.unsplash.com/photo-1511512578047-dfb367046420?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }}
    >
      {/* Animated background particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-2 h-2 bg-primary-400/60 rounded-full animate-float"></div>
        <div className="absolute top-40 right-20 w-3 h-3 bg-purple-400/40 rounded-full animate-particle"></div>
        <div className="absolute bottom-40 left-1/4 w-1.5 h-1.5 bg-primary-300/50 rounded-full animate-pulse"></div>
        <div className="absolute top-60 left-3/4 w-2.5 h-2.5 bg-purple-300/30 rounded-full animate-float"></div>
        <div className="absolute bottom-60 right-1/3 w-1 h-1 bg-primary-500/70 rounded-full animate-ping"></div>
      </div>

      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary-900/20 via-transparent to-purple-900/20"></div>

      <div className="mx-auto w-full lg:max-w-[64rem] px-4 text-center relative z-10">
        <header>
          <h1
            className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 md:mb-8 animate-slide-up-from-bottom"
            style={{ animationDelay: '0.2s' }}
          >
            <span className="bg-gradient-to-r from-white via-primary-200 to-purple-200 bg-clip-text text-transparent animate-gradient">
              Become unstoppable
            </span>
            <br />
            <span
              className="bg-gradient-to-r from-primary-400 via-purple-400 to-primary-400 bg-clip-text text-transparent animate-gradient animate-slide-up-from-bottom"
              style={{ animationDelay: '0.4s' }}
            >
              in every game!
            </span>
          </h1>
          <p
            className="dark:text-dark-secondary text-light-secondary text-lg md:text-2xl mb-10 md:mb-16 max-w-3xl mx-auto px-4 leading-relaxed animate-slide-up-from-bottom"
            style={{ animationDelay: '0.6s' }}
          >
            Unlock powerful cheats to easily defeat skilled players and take control of every match
            with <span className="text-primary-400 font-semibold animate-pulse">confidence</span>.
          </p>
        </header>

        <nav
          className="flex flex-col md:flex-row justify-center space-y-6 md:space-y-0 md:space-x-8 px-4 animate-slide-up-from-bottom"
          style={{ animationDelay: '0.8s' }}
          aria-label="Main actions"
        >
          <a
            href="#games"
            className="group relative w-full sm:w-auto bg-gradient-to-r from-primary-500 to-primary-600 hover:from-primary-600 hover:to-primary-700 text-white px-10 md:px-12 py-5 md:py-6 rounded-3xl text-lg md:text-xl font-semibold transition-all duration-500 hover:scale-110 hover:shadow-2xl hover:shadow-primary-500/50 flex items-center justify-center overflow-hidden animate-glow animate-slide-up-from-bottom"
            style={{ animationDelay: '1s' }}
            aria-label="Browse our game catalog"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            <div className="absolute inset-0 animate-shimmer opacity-0 group-hover:opacity-100"></div>
            <FaGamepad
              className="mr-4 text-4xl group-hover:rotate-12 group-hover:scale-125 transition-transform duration-500"
              aria-hidden="true"
            />
            <span className="relative z-10">Game Catalog</span>
          </a>
          <a
            href={DISCORD_INVITE_LINK}
            target="_blank"
            rel="noopener noreferrer"
            className="group relative w-full sm:w-auto text-white px-10 md:px-12 py-5 md:py-6 rounded-3xl text-lg md:text-xl font-semibold transition-all duration-500 hover:scale-110 hover:shadow-2xl hover:shadow-purple-500/50 flex items-center justify-center border-2 border-purple-400 glass-dark backdrop-blur-xl overflow-hidden animate-slide-up-from-bottom"
            style={{ animationDelay: '1.2s' }}
            aria-label="Join our Discord community"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-primary-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            <div className="absolute inset-0 animate-shimmer opacity-0 group-hover:opacity-100"></div>
            <FaDiscord
              className="mr-4 text-4xl group-hover:bounce group-hover:scale-125 transition-transform duration-500"
              aria-hidden="true"
            />
            <span className="relative z-10">Join Discord</span>
          </a>
        </nav>
      </div>

      {/* Enhanced Scroll Down Arrow */}
      <button
        onClick={scrollDown}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-dark-secondary dark:text-dark-secondary text-light-secondary hover:text-primary-400 transition-all duration-500 hover:scale-125 animate-bounce group animate-slide-up-from-bottom"
        style={{ animationDelay: '1.4s' }}
        aria-label="Scroll down"
      >
        <div className="relative p-4 rounded-full glass-dark backdrop-blur-xl border border-primary-500/30 group-hover:border-primary-400/60 transition-all duration-500">
          <div className="absolute inset-0 bg-gradient-to-r from-primary-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-full"></div>
          <FaChevronDown className="text-3xl md:text-4xl relative z-10 group-hover:text-primary-400 transition-colors duration-500" />
        </div>
      </button>
    </section>
  );
};

export default Hero;
