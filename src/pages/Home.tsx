import React from 'react';
import Header from '../components/Header';
import Hero from '../components/Hero';
import TrendingApps from '../components/TrendingApps';
import Features from '../components/Features';
import Footer from '../components/Footer';
import SEOHead from '../components/SEOHead';
import FAQ from '../components/FAQ';

const Home: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <SEOHead />
      <Header />
      <main className="flex-grow">
        <Hero />
        <Features />
        <TrendingApps />
        <FAQ />
      </main>
      <Footer />
    </div>
  );
};

export default Home;
