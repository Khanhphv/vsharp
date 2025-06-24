import React from 'react';
import Header from '../components/Header';
import Hero from '../components/Hero';
import TrendingApps from '../components/TrendingApps';
import Features from '../components/Features';
import Footer from '../components/Footer';
import SEOHead from '../components/SEOHead';
import FAQ from '../components/FAQ';
import DiscordCommunity from '../components/DiscordCommunity';
import { getSEOConfig, getStructuredData, SEO_CONFIG } from '../config/seo';

const Home: React.FC = () => {
  const seoConfig = getSEOConfig('home');
  const structuredData = [
    getStructuredData('organization'),
    getStructuredData('website'),
    getStructuredData('breadcrumbList'),
    getStructuredData('faqPage')
  ];

  return (
    <>
      <SEOHead 
        title={seoConfig.title}
        description={seoConfig.description}
        keywords={seoConfig.keywords}
        url={seoConfig.url}
        structuredData={structuredData}
        googleAnalyticsId={SEO_CONFIG.analytics.googleAnalyticsId}
        googleTagManagerId={SEO_CONFIG.analytics.googleTagManagerId}
      />
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
