import React from 'react';
import Header from '@/components/ui/Header';
import Footer from '@/components/ui/Footer';
import HeroSection from '@/components/ui/HeroSection';
import FeatureShowcase from '@/components/ui/FeatureShowcase';
import ContentGrid from '@/components/ui/ContentGrid';

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main>
        <HeroSection />
        <FeatureShowcase />
        <ContentGrid />
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
