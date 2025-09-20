import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

const FeatureShowcase: React.FC = () => {
  const features = [
    {
      title: "Clean Design",
      description: "Minimal and focused interface that puts content first.",
    },
    {
      title: "Fast Performance",
      description: "Optimized for speed with efficient loading and smooth interactions.",
    },
    {
      title: "Responsive Layout",
      description: "Works perfectly on all devices from mobile to desktop.",
    },
    {
      title: "Easy to Use",
      description: "Intuitive navigation and user-friendly experience.",
    },
  ];

  return (
    <section className="w-full py-24 bg-muted/30">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center space-y-4 mb-16">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
            Simple by Design
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            We believe in the power of simplicity. Every element is carefully crafted to provide 
            the best possible experience without unnecessary complexity.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {features.map((feature, index) => (
            <Card key={index} className="border-border shadow-minimal hover:shadow-clean transition-all duration-300">
              <CardContent className="p-6 space-y-3">
                <div className="h-12 w-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                  <div className="h-6 w-6 bg-primary rounded-sm"></div>
                </div>
                <h3 className="text-lg font-semibold">{feature.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {feature.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* CTA Section */}
        <div className="text-center space-y-6">
          <div className="space-y-2">
            <h3 className="text-2xl font-semibold">Ready to get started?</h3>
            <p className="text-muted-foreground">
              Join thousands of users who have simplified their workflow.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button size="lg" className="min-w-[140px]">
              Get Started
            </Button>
            <Button variant="outline" size="lg" className="min-w-[140px]">
              Learn More
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeatureShowcase;