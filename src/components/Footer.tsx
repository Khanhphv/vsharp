import React from 'react';
import { FaDiscord, FaEnvelope, FaHeart, FaTwitter, FaInstagram } from 'react-icons/fa';

const Footer: React.FC = () => {
  return (
    <footer className="relative glass-dark backdrop-blur-xl dark:text-dark-primary text-light-primary py-16 md:py-20 border-t border-primary-500/20 overflow-hidden">
      {/* Background particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-10 left-20 w-2 h-2 bg-primary-400/30 rounded-full animate-float"></div>
        <div className="absolute top-20 right-32 w-1.5 h-1.5 bg-purple-400/40 rounded-full animate-particle"></div>
        <div className="absolute bottom-20 left-1/4 w-3 h-3 bg-primary-300/20 rounded-full animate-pulse"></div>
        <div className="absolute bottom-10 right-20 w-1 h-1 bg-purple-500/50 rounded-full animate-ping"></div>
      </div>

      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-primary-900/10 via-transparent to-purple-900/10"></div>

      <div className="mx-auto w-full lg:max-w-[64rem] px-4 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12">
          <div className="group">
            <h3 className="text-xl md:text-2xl font-bold mb-6 bg-gradient-to-r from-primary-400 to-purple-400 bg-clip-text text-transparent">
              About Us
            </h3>
            <p className="dark:text-dark-secondary text-light-secondary text-sm md:text-base leading-relaxed group-hover:text-dark-primary dark:group-hover:text-dark-primary group-hover:text-light-primary transition-colors duration-300">
              We provide high-quality game cheats and hacks to enhance your gaming experience with
              cutting-edge technology.
            </p>
          </div>

          <div className="group"></div>

          <div className="group">
            <h3 className="text-xl md:text-2xl font-bold mb-6 bg-gradient-to-r from-primary-400 to-purple-400 bg-clip-text text-transparent">
              Social Networks
            </h3>
            <div className="flex space-x-4">
              <a
                href="https://discord.com/invite/jBfN9C6g55"
                target="_blank"
                rel="noopener noreferrer"
                className="relative p-3 rounded-2xl glass-dark backdrop-blur-xl border border-primary-500/20 hover:border-primary-400/40 dark:text-dark-secondary text-light-secondary hover:text-primary-400 transition-all duration-300 hover:scale-110 group/social"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-primary-500/10 to-purple-500/10 opacity-0 group-hover/social:opacity-100 transition-opacity duration-300 rounded-2xl"></div>
                <FaDiscord className="w-6 h-6 md:w-7 md:h-7 relative z-10 group-hover/social:rotate-12 transition-transform duration-300" />
              </a>
              <a
                href="https://discord.com/invite/jBfN9C6g55"
                target="_blank"
                rel="noopener noreferrer"
                className="relative p-3 rounded-2xl glass-dark backdrop-blur-xl border border-primary-500/20 hover:border-primary-400/40 dark:text-dark-secondary text-light-secondary hover:text-primary-400 transition-all duration-300 hover:scale-110 group/social"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-primary-500/10 to-purple-500/10 opacity-0 group-hover/social:opacity-100 transition-opacity duration-300 rounded-2xl"></div>
                <FaTwitter className="w-6 h-6 md:w-7 md:h-7 relative z-10 group-hover/social:rotate-12 transition-transform duration-300" />
              </a>
              <a
                href="https://discord.com/invite/jBfN9C6g55"
                target="_blank"
                rel="noopener noreferrer"
                className="relative p-3 rounded-2xl glass-dark backdrop-blur-xl border border-primary-500/20 hover:border-primary-400/40 dark:text-dark-secondary text-light-secondary hover:text-primary-400 transition-all duration-300 hover:scale-110 group/social"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-primary-500/10 to-purple-500/10 opacity-0 group-hover/social:opacity-100 transition-opacity duration-300 rounded-2xl"></div>
                <FaInstagram className="w-6 h-6 md:w-7 md:h-7 relative z-10 group-hover/social:rotate-12 transition-transform duration-300" />
              </a>
            </div>
          </div>

          <div className="group">
            <h3 className="text-xl md:text-2xl font-bold mb-6 bg-gradient-to-r from-primary-400 to-purple-400 bg-clip-text text-transparent">
              Contact
            </h3>
            <a
              href="https://discord.com/invite/jBfN9C6g55"
              target="_blank"
              rel="noopener noreferrer"
              className="relative group/btn bg-gradient-to-r from-primary-500 to-primary-600 hover:from-primary-600 hover:to-primary-700 text-white px-8 py-4 rounded-2xl text-base font-semibold transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-primary-500/40 flex items-center overflow-hidden animate-glow"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300"></div>
              <div className="absolute inset-0 animate-shimmer opacity-0 group-hover/btn:opacity-100"></div>
              <FaEnvelope className="mr-3 text-xl group-hover/btn:rotate-12 group-hover/btn:scale-110 transition-transform duration-300 relative z-10" />
              <span className="relative z-10">Contact Us</span>
            </a>
          </div>
        </div>

        <div className="border-t border-primary-500/20 mt-16 pt-8 text-center">
          <p className="dark:text-dark-secondary text-light-secondary text-sm md:text-base">
            © 2024 VSharp. All rights reserved. Made with{' '}
            <FaHeart className="inline text-red-500 mx-1 animate-pulse" /> by the VSharp Team
          </p>
          <div className="mt-4 flex justify-center space-x-2">
            <div className="w-2 h-2 bg-primary-400/40 rounded-full animate-pulse"></div>
            <div
              className="w-2 h-2 bg-purple-400/40 rounded-full animate-pulse"
              style={{ animationDelay: '0.2s' }}
            ></div>
            <div
              className="w-2 h-2 bg-primary-400/40 rounded-full animate-pulse"
              style={{ animationDelay: '0.4s' }}
            ></div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
