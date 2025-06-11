import React from 'react';
import Header from '../components/Header';
import Hero from '../components/Hero';
import TrendingApps from '../components/TrendingApps';
import Features from '../components/Features';
import Footer from '../components/Footer';
import SEOHead from '../components/SEOHead';
import FAQ from '../components/FAQ';
import DiscordCommunity from '../components/DiscordCommunity';

const Home: React.FC = () => {
  return (
    <>
      <SEOHead />
      <Header />
      <main className="flex-grow">
        <Hero />
        <Features />
        <TrendingApps />
        <FAQ />
        <DiscordCommunity />
      </main>
      <Footer />
    </>
  );
};

export default Home;
