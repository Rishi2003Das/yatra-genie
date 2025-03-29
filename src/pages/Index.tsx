
import React, { useState } from 'react';
import Header from '@/components/Header';
import Hero from '@/components/Hero';
import TripForm from '@/components/TripForm';
import ItineraryViewer from '@/components/ItineraryViewer';
import { TripDetails, generateItinerary, Itinerary } from '@/services/api';
import { toast } from 'sonner';
import { ThemeProvider } from '@/hooks/use-theme';

const Index = () => {
  const [step, setStep] = useState<'hero' | 'form' | 'itinerary'>('hero');
  const [isLoading, setIsLoading] = useState(false);
  const [itinerary, setItinerary] = useState<Itinerary | null>(null);

  const handleGetStarted = () => {
    setStep('form');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleFormSubmit = async (data: TripDetails) => {
    try {
      setIsLoading(true);
      const result = await generateItinerary(data);
      setItinerary(result);
      setStep('itinerary');
      toast.success("Your personalized itinerary is ready!");
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch (error) {
      toast.error("Failed to generate itinerary. Please try again.");
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleReset = () => {
    setStep('form');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <ThemeProvider defaultTheme="light">
      <div className="min-h-screen flex flex-col">
        <Header />
        
        <div className="flex-1">
          {step === 'hero' && <Hero onGetStarted={handleGetStarted} />}
          
          {step === 'form' && (
            <div className="w-full max-w-6xl mx-auto py-8 px-4">
              <TripForm onSubmit={handleFormSubmit} isLoading={isLoading} />
            </div>
          )}
          
          {step === 'itinerary' && itinerary && (
            <div className="w-full max-w-6xl mx-auto py-8 px-4">
              <ItineraryViewer itinerary={itinerary} onReset={handleReset} />
            </div>
          )}
        </div>
        
        <footer className="w-full py-6 border-t">
          <div className="container flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="text-sm text-muted-foreground">
              © {new Date().getFullYear()} Yatri Bandhu AI by Om Tours
            </div>
            <div className="flex gap-6">
              <a href="#" className="text-sm text-muted-foreground hover:text-foreground">Privacy Policy</a>
              <a href="#" className="text-sm text-muted-foreground hover:text-foreground">Terms of Service</a>
              <a href="#" className="text-sm text-muted-foreground hover:text-foreground">Contact</a>
            </div>
          </div>
        </footer>
      </div>
    </ThemeProvider>
  );
};

export default Index;
