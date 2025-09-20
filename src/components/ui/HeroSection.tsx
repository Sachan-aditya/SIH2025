import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

const HeroSection: React.FC = () => {
  return (
    <section className="w-full py-24 md:py-32">
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center text-center space-y-8">
          {/* Main Heading */}
          <div className="space-y-4 max-w-4xl">
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight">
              Simple, Clean,{' '}
              <span className="text-muted-foreground">Effective</span>
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground leading-relaxed">
              Experience the power of minimalism. Focus on what matters most with our 
              clean and efficient design approach.
            </p>
          </div>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row items-center gap-4">
            <Button size="lg" className="min-w-[160px]">
              Start Building
            </Button>
            <Button variant="outline" size="lg" className="min-w-[160px]">
              View Examples
            </Button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-8 mt-16 pt-16 border-t border-border">
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold mb-2">99%</div>
              <div className="text-sm text-muted-foreground">User Satisfaction</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold mb-2">10k+</div>
              <div className="text-sm text-muted-foreground">Active Users</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold mb-2">24/7</div>
              <div className="text-sm text-muted-foreground">Support</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;