import React from 'react';
import { Card, CardContent } from '@/components/ui/card';

const ContentGrid: React.FC = () => {
  const gridItems = [
    {
      title: "Design System",
      description: "Consistent and scalable design tokens for better user experience.",
      size: "large" // spans 2 columns
    },
    {
      title: "Components",
      description: "Reusable UI elements built with accessibility in mind.",
      size: "small"
    },
    {
      title: "Documentation",
      description: "Clear guides to help you get started quickly.",
      size: "small"
    },
    {
      title: "Performance",
      description: "Optimized for speed and efficiency across all devices and browsers.",
      size: "medium"
    },
    {
      title: "Accessibility",
      description: "Built following WCAG guidelines for inclusive design.",
      size: "medium"
    },
    {
      title: "Customization",
      description: "Easy to theme and customize to match your brand.",
      size: "small"
    }
  ];

  return (
    <section className="w-full py-24">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center space-y-4 mb-16">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
            Everything You Need
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            A complete toolkit for building modern applications with focus on simplicity and performance.
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {gridItems.map((item, index) => (
            <Card 
              key={index} 
              className={`
                border-border shadow-minimal hover:shadow-clean transition-all duration-300
                ${item.size === 'large' ? 'md:col-span-2' : ''}
                ${item.size === 'medium' ? 'lg:col-span-2' : ''}
                ${item.size === 'small' ? 'lg:col-span-1' : ''}
              `}
            >
              <CardContent className="p-6 space-y-3">
                <h3 className="text-lg font-semibold">{item.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {item.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ContentGrid;