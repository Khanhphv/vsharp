import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaBars, FaTimes } from 'react-icons/fa';
import { DISCORD_INVITE } from '../constants/links';
import { useNavigate } from 'react-router-dom';

const Header: React.FC = () => {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [isScrolled, setIsScrolled] = useState(false);

  const smoothScrollTo = (targetId: string) => {
    const currentUrl = window.location.pathname;
    console.log(currentUrl);
    if (currentUrl === '/tools') {
      navigate('/');
    }
    const element = document.getElementById(targetId);
    if (element) {
      element.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    }
  };

  useEffect(() => {
    let lastScrollY = window.scrollY;
    let timeoutId: ReturnType<typeof setTimeout>;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      // Update scrolled state
      setIsScrolled(currentScrollY > 50);

      // Handle hide/show on scroll
      if (currentScrollY > lastScrollY) {
        // Scrolling down
        setIsVisible(false);
      } else {
        // Scrolling up
        setIsVisible(true);
      }

      lastScrollY = currentScrollY;

      // Clear previous timeout
      clearTimeout(timeoutId);

      // Set new timeout to show header after 1 second
      if (!isVisible) {
        timeoutId = setTimeout(() => {
          setIsVisible(true);
        }, 1000);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      clearTimeout(timeoutId);
    };
  }, [isVisible]);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isVisible ? 'translate-y-0' : '-translate-y-full'
      } ${isScrolled ? 'backdrop-blur-xl shadow-lg shadow-primary-500/20' : 'bg-transparent'}`}
    >
      {/* Animated background particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-2 left-10 w-1 h-1 bg-primary-400/60 rounded-full animate-particle"></div>
        <div className="absolute top-6 right-20 w-2 h-2 bg-purple-400/40 rounded-full animate-float"></div>
        <div className="absolute bottom-2 left-1/3 w-1.5 h-1.5 bg-primary-300/50 rounded-full animate-pulse"></div>
      </div>

      <div className="mx-auto w-full lg:max-w-[64rem] px-4 relative">
        <div className="flex items-center justify-between h-16 md:h-20">
          <Link
            to="/"
            className="text-2xl md:text-3xl font-bold dark:text-dark-primary text-light-primary flex items-center group"
          >
            <div className="relative mr-3">
              <img
                src="/logo.png"
                alt="VSharp Logo"
                className="h-10 w-auto sm:h-12 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-6"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-primary-500/20 to-purple-500/20 rounded-full blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </div>
            <span className="bg-gradient-to-r from-primary-400 via-purple-400 to-primary-400 bg-clip-text text-transparent animate-gradient">
              VSharp
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-2">
            <button
              onClick={() => smoothScrollTo('hero')}
              className="relative dark:text-dark-primary text-light-primary hover:text-primary-400 px-6 py-3 rounded-2xl transition-all duration-300 hover:scale-105 group overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-primary-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl"></div>
              <div className="absolute inset-0 animate-shimmer opacity-0 group-hover:opacity-100"></div>
              <span className="relative z-10">Home</span>
            </button>
            <button
              onClick={() => smoothScrollTo('games')}
              className="relative dark:text-dark-primary text-light-primary hover:text-primary-400 px-6 py-3 rounded-2xl transition-all duration-300 hover:scale-105 group overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-primary-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl"></div>
              <div className="absolute inset-0 animate-shimmer opacity-0 group-hover:opacity-100"></div>
              <span className="relative z-10">Games</span>
            </button>
            <button
              onClick={() => smoothScrollTo('features')}
              className="relative dark:text-dark-primary text-light-primary hover:text-primary-400 px-6 py-3 rounded-2xl transition-all duration-300 hover:scale-105 group overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-primary-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl"></div>
              <div className="absolute inset-0 animate-shimmer opacity-0 group-hover:opacity-100"></div>
              <span className="relative z-10">About</span>
            </button>

            <a
              href={DISCORD_INVITE}
              target="_blank"
              rel="noopener noreferrer"
              className="relative bg-gradient-to-r from-primary-500 to-primary-600 hover:from-primary-600 hover:to-primary-700 text-white px-8 py-4 rounded-2xl text-base font-semibold transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-primary-500/40 group overflow-hidden animate-glow"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <span className="relative z-10">Get Started</span>
            </a>
          </nav>

          {/* Mobile Menu Button */}
          <div className="flex items-center space-x-4 md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="relative p-4 rounded-2xl dark:text-dark-primary text-light-primary transition-all duration-300 hover:scale-110 group glass-dark"
              aria-label="Toggle menu"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-primary-500/20 to-purple-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl"></div>
              <div className="relative z-10">
                {isMenuOpen ? <FaTimes className="w-6 h-6" /> : <FaBars className="w-6 h-6" />}
              </div>
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-6 glass-dark backdrop-blur-xl border-t border-primary-500/20 rounded-b-3xl shadow-2xl shadow-primary-500/10">
            <nav className="flex flex-col space-y-2">
              <button
                onClick={() => {
                  smoothScrollTo('hero');
                  setIsMenuOpen(false);
                }}
                className="relative dark:text-dark-primary text-light-primary hover:text-primary-400 transition-all duration-300 hover:scale-105 px-6 py-4 text-left rounded-2xl group overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-primary-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl"></div>
                <span className="relative z-10">Home</span>
              </button>
              <button
                onClick={() => {
                  smoothScrollTo('games');
                  setIsMenuOpen(false);
                }}
                className="relative dark:text-dark-primary text-light-primary hover:text-primary-400 transition-all duration-300 hover:scale-105 px-6 py-4 text-left rounded-2xl group overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-primary-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl"></div>
                <span className="relative z-10">Games</span>
              </button>
              <button
                onClick={() => {
                  smoothScrollTo('features');
                  setIsMenuOpen(false);
                }}
                className="relative dark:text-dark-primary text-light-primary hover:text-primary-400 transition-all duration-300 hover:scale-105 px-6 py-4 text-left rounded-2xl group overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-primary-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl"></div>
                <span className="relative z-10">About</span>
              </button>
              <a
                href={DISCORD_INVITE}
                target="_blank"
                rel="noopener noreferrer"
                className="relative bg-gradient-to-r from-primary-500 to-primary-600 hover:from-primary-600 hover:to-primary-700 text-white px-6 py-4 rounded-2xl text-sm font-semibold transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-primary-500/40 mx-4 mt-4 group overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <span className="relative z-10">Get Started</span>
              </a>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
