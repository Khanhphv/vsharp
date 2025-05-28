import React from 'react';
import Header from '../components/Header';
import Hero from '../components/Hero';
import TrendingApps from '../components/TrendingApps';
import Features from '../components/Features';
import Footer from '../components/Footer';

const Home: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow">
        <Hero />
        <Features />
        <TrendingApps />
      </main>
      <Footer />
    </div>
  );
};

export default Home;
