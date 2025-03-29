
import React from 'react';
import { Button } from '@/components/ui/button';
import { Plane, Map, Clock } from 'lucide-react';

interface HeroProps {
  onGetStarted: () => void;
}

const Hero: React.FC<HeroProps> = ({ onGetStarted }) => {
  return (
    <div className="w-full max-w-6xl mx-auto py-12 md:py-24 px-6 text-center hero-pattern">
      <div className="mb-8 animate-fade-in">
        <div className="inline-flex items-center gap-2 mb-4 px-4 py-2 bg-primary/10 text-primary rounded-full">
          <Plane className="h-4 w-4" />
          <span className="text-sm font-medium">AI-Powered Travel Planning</span>
        </div>
        <h1 className="text-4xl md:text-6xl font-bold mb-4">
          Your Personal <span className="text-primary">Travel Companion</span>
        </h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-6">
          Experience hassle-free travel planning with personalized itineraries tailored to your preferences and budget.
        </p>
        <Button size="lg" onClick={onGetStarted}>
          Plan Your Next Adventure
        </Button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16 animate-slide-in">
        <div className="bg-card border rounded-lg p-6 text-left">
          <div className="bg-primary/10 p-3 rounded-full w-12 h-12 flex items-center justify-center mb-4">
            <Map className="h-6 w-6 text-primary" />
          </div>
          <h3 className="text-xl font-bold mb-2">Personalized Itineraries</h3>
          <p className="text-muted-foreground">
            Tell us your preferences and get a custom travel plan that matches exactly what you're looking for.
          </p>
        </div>
        
        <div className="bg-card border rounded-lg p-6 text-left">
          <div className="bg-primary/10 p-3 rounded-full w-12 h-12 flex items-center justify-center mb-4">
            <Clock className="h-6 w-6 text-primary" />
          </div>
          <h3 className="text-xl font-bold mb-2">Real-Time Adjustments</h3>
          <p className="text-muted-foreground">
            Plans that adapt to changing conditions, weather, and your feedback in real-time.
          </p>
        </div>
        
        <div className="bg-card border rounded-lg p-6 text-left">
          <div className="bg-primary/10 p-3 rounded-full w-12 h-12 flex items-center justify-center mb-4">
            <Plane className="h-6 w-6 text-primary" />
          </div>
          <h3 className="text-xl font-bold mb-2">Budget Optimization</h3>
          <p className="text-muted-foreground">
            Make the most of your travel budget with optimized recommendations and cost estimates.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Hero;
