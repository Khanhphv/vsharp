import React from 'react';
import { DISCORD_INVITE } from '../constants/links';

interface Game {
  name: string;
  status: string;
  image?: string;
}

const games: Game[] = [
  { name: 'PUBG ', status: 'Working', image: '/games/pubg.avif' },
  { name: 'Valorant', status: 'Working', image: '/games/valrorant.avif' },
  { name: 'Delta Force', status: 'Working', image: '/games/delta.avif' },
  { name: 'Fortnite', status: 'Working', image: '/games/fornite.avif' },
  { name: 'Marvel Rivals', status: 'Working', image: '/games/marvel.avif' },
  { name: 'Apex Legends', status: 'Working', image: '/games/apex.avif' },
];

const TrendingApps: React.FC = () => {
  return (
    <section
      id="games"
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
        <header className="text-center mb-20">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="bg-gradient-to-r from-primary-400 via-purple-400 to-primary-400 bg-clip-text text-transparent animate-gradient">
              Explore Games
            </span>
          </h2>
          <p className="text-lg md:text-xl dark:text-dark-secondary text-light-secondary max-w-2xl mx-auto">
            Discover our collection of supported games with cutting-edge cheats and premium features
          </p>
        </header>

        <main
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8"
          role="main"
        >
          {games.map((game, index) => (
            <article
              key={game.name}
              className="group relative glass-dark backdrop-blur-xl rounded-3xl overflow-hidden hover:transform hover:scale-105 transition-all duration-500 border border-primary-500/20 hover:border-primary-400/40 hover:shadow-2xl hover:shadow-primary-500/20"
              style={{ animationDelay: `${index * 0.1}s` }}
              itemScope
              itemType="https://schema.org/SoftwareApplication"
            >
              {/* Animated background gradient */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary-500/5 to-purple-600/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

              {/* Glowing border effect */}
              <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-primary-500/20 via-purple-500/20 to-primary-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-sm"></div>

              <div className="relative aspect-w-16 aspect-h-9">
                {game.image ? (
                  <div className="relative overflow-hidden rounded-t-3xl">
                    <img
                      src={game.image}
                      alt={`${game.name} game cover - Premium cheats and hacks available`}
                      className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-110"
                      itemProp="image"
                      loading="lazy"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.style.display = 'none';
                        const fallback = target.nextElementSibling as HTMLElement;
                        if (fallback) fallback.style.display = 'flex';
                      }}
                    />
                    {/* Image overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
                  </div>
                ) : null}

                <div className="absolute w-full bottom-0 z-10 p-6">
                  <h3
                    className="text-xl md:text-2xl font-bold dark:text-dark-primary text-light-primary mb-3 group-hover:text-primary-400 transition-colors duration-300"
                    itemProp="name"
                  >
                    {game.name}
                  </h3>
                  <div className="flex justify-between items-center">
                    <div className="flex items-center space-x-2">
                      <div
                        className="w-3 h-3 bg-green-400 rounded-full animate-pulse"
                        aria-hidden="true"
                      ></div>
                      <span
                        className="text-green-400 font-semibold text-sm md:text-base"
                        itemProp="applicationCategory"
                      >
                        {game.status}
                      </span>
                    </div>
                    <a
                      href={DISCORD_INVITE}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="relative bg-gradient-to-r from-primary-500/80 to-primary-600/80 hover:from-primary-500 hover:to-primary-600 text-white px-4 py-2 rounded-xl transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-primary-500/30 font-medium text-sm group/btn overflow-hidden"
                    >
                      <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300"></div>
                      <span className="relative z-10">View</span>
                    </a>
                  </div>
                </div>
              </div>

              {/* Floating particles on card */}
              <div
                className="absolute top-4 right-4 w-1.5 h-1.5 bg-primary-400/40 rounded-full animate-pulse opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                aria-hidden="true"
              ></div>
              <div
                className="absolute bottom-20 left-4 w-1 h-1 bg-purple-400/50 rounded-full animate-ping opacity-0 group-hover:opacity-100 transition-opacity duration-700"
                aria-hidden="true"
              ></div>
            </article>
          ))}
        </main>
      </div>
    </section>
  );
};

export default TrendingApps;
