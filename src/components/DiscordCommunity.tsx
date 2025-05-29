import React from 'react';
import { FaDiscord, FaUsers, FaRocket, FaShieldAlt } from 'react-icons/fa';
import { DISCORD_INVITE } from '../constants/links';

const features = [
  {
    icon: <FaUsers className="w-8 h-8" />,
    title: 'Active Community',
    description: 'Join thousands of gamers in our vibrant Discord community',
  },
  {
    icon: <FaRocket className="w-8 h-8" />,
    title: 'Instant Updates',
    description: 'Get notified about new features, updates, and exclusive offers',
  },
  {
    icon: <FaShieldAlt className="w-8 h-8" />,
    title: '24/7 Support',
    description: 'Access our dedicated support team anytime you need help',
  },
];

const DiscordCommunity: React.FC = () => {
  return (
    <section
      id="community"
      className="py-20 dark:bg-dark-bg bg-light-bg dark:text-dark-primary text-light-primary relative overflow-hidden"
    >
      {/* Background particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-20 w-2 h-2 bg-primary-400/30 rounded-full animate-float"></div>
        <div className="absolute top-40 right-32 w-1.5 h-1.5 bg-purple-400/40 rounded-full animate-particle"></div>
        <div className="absolute bottom-40 left-1/3 w-3 h-3 bg-primary-300/20 rounded-full animate-pulse"></div>
        <div className="absolute bottom-20 right-20 w-1 h-1 bg-purple-500/50 rounded-full animate-ping"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left side - Content */}
            <div className="text-center lg:text-left">
              <h2 className="text-4xl md:text-5xl font-bold mb-6">
                <span className="bg-gradient-to-r from-primary-400 via-purple-400 to-primary-400 bg-clip-text text-transparent animate-gradient">
                  Join Our Discord Community
                </span>
              </h2>
              <p className="text-lg md:text-xl dark:text-dark-secondary text-light-secondary mb-8">
                Connect with fellow gamers, get instant support, and stay updated with the latest
                features and updates.
              </p>

              {/* Features */}
              <div className="space-y-6 mb-8">
                {features.map((feature, index) => (
                  <div key={index} className="flex items-center space-x-4 group">
                    <div className="p-3 rounded-2xl bg-primary-500/10 group-hover:bg-primary-500/20 transition-colors duration-300">
                      <div className="text-primary-400 group-hover:text-primary-300 transition-colors duration-300">
                        {feature.icon}
                      </div>
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold mb-1 group-hover:text-primary-400 transition-colors duration-300">
                        {feature.title}
                      </h3>
                      <p className="text-dark-secondary dark:text-dark-secondary text-light-secondary">
                        {feature.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* CTA Button */}
              <a
                href={DISCORD_INVITE}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center space-x-3 bg-[#5865F2] hover:bg-[#4752C4] text-white px-8 py-4 rounded-2xl text-lg font-semibold transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-[#5865F2]/40 group"
              >
                <FaDiscord className="w-6 h-6 group-hover:rotate-12 transition-transform duration-300" />
                <span>Join Discord</span>
              </a>
            </div>

            {/* Right side - Discord Preview */}
            <div className="relative">
              <div className="glass-dark backdrop-blur-xl rounded-3xl overflow-hidden border border-primary-500/20 p-6 transform hover:scale-105 transition-all duration-500">
                <div className="aspect-w-16 aspect-h-9 rounded-2xl overflow-hidden">
                  <img
                    src="/images/discord-preview.png"
                    alt="Discord Community Preview"
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.style.display = 'none';
                    }}
                  />
                </div>
                <div className="mt-6 flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 rounded-full bg-[#5865F2] flex items-center justify-center">
                      <FaDiscord className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="font-semibold">VSharp Community</h3>
                      <p className="text-sm text-dark-secondary dark:text-dark-secondary text-light-secondary">
                        Join our growing community
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                    <span className="text-sm text-green-400">Online</span>
                  </div>
                </div>
              </div>

              {/* Decorative elements */}
              <div className="absolute -top-4 -right-4 w-24 h-24 bg-primary-400/20 rounded-full blur-2xl"></div>
              <div className="absolute -bottom-4 -left-4 w-24 h-24 bg-purple-400/20 rounded-full blur-2xl"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DiscordCommunity;
