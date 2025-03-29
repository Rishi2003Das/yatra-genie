
import { toast } from "sonner";

// Types
export interface TripDetails {
  destination: string;
  startDate: Date;
  endDate: Date;
  budget: number;
  purpose: string;
  interests: string[];
  accommodation: string;
  transportation: string;
  dietaryRestrictions: string;
  specialRequests: string;
}

export interface DayPlan {
  day: number;
  date: string;
  activities: Activity[];
  meals: Meal[];
  accommodation: string;
  notes: string;
}

export interface Activity {
  time: string;
  name: string;
  description: string;
  location: string;
  cost: number;
  duration: string;
}

export interface Meal {
  time: string;
  type: string;
  venue: string;
  cuisine: string;
  cost: number;
}

export interface Itinerary {
  destination: string;
  duration: number;
  budget: number;
  totalCost: number;
  remainingBudget: number;
  days: DayPlan[];
}

// This would typically call the OpenAI API with proper error handling
// For now, we'll mock the response to demonstrate the UI
export const generateItinerary = async (tripDetails: TripDetails): Promise<Itinerary> => {
  try {
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Calculate trip duration in days
    const start = new Date(tripDetails.startDate);
    const end = new Date(tripDetails.endDate);
    const duration = Math.ceil((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24));
    
    // Generate mock data based on user input
    const days: DayPlan[] = [];
    let totalCost = 0;
    
    for (let i = 0; i < duration; i++) {
      const date = new Date(start);
      date.setDate(date.getDate() + i);
      
      const activities: Activity[] = [
        {
          time: "10:00 AM",
          name: `Visit ${tripDetails.interests.includes("History") ? "Historical Monument" : "Local Attraction"}`,
          description: `Explore the beautiful sights of ${tripDetails.destination}`,
          location: `Central ${tripDetails.destination}`,
          cost: Math.round(tripDetails.budget * 0.05),
          duration: "2 hours"
        },
        {
          time: "1:00 PM",
          name: "Lunch at local restaurant",
          description: "Enjoy authentic local cuisine",
          location: `Downtown ${tripDetails.destination}`,
          cost: Math.round(tripDetails.budget * 0.03),
          duration: "1 hour"
        },
        {
          time: "3:00 PM",
          name: tripDetails.interests.includes("Adventure") ? "Adventure Activity" : "Relaxing Activity",
          description: tripDetails.interests.includes("Adventure") ? "Experience thrilling adventure" : "Relax and enjoy the atmosphere",
          location: `${tripDetails.destination} outskirts`,
          cost: Math.round(tripDetails.budget * 0.07),
          duration: "3 hours"
        }
      ];
      
      const meals: Meal[] = [
        {
          time: "8:00 AM",
          type: "Breakfast",
          venue: "Hotel restaurant",
          cuisine: "Continental",
          cost: Math.round(tripDetails.budget * 0.02)
        },
        {
          time: "1:00 PM",
          type: "Lunch",
          venue: "Local restaurant",
          cuisine: tripDetails.interests.includes("Food") ? "Gourmet local" : "Casual dining",
          cost: Math.round(tripDetails.budget * 0.03)
        },
        {
          time: "8:00 PM",
          type: "Dinner",
          venue: tripDetails.interests.includes("Culture") ? "Cultural experience restaurant" : "Popular restaurant",
          cuisine: "Local specialties",
          cost: Math.round(tripDetails.budget * 0.04)
        }
      ];
      
      const dayCost = [...activities.map(a => a.cost), ...meals.map(m => m.cost)].reduce((a, b) => a + b, 0);
      totalCost += dayCost;
      
      days.push({
        day: i + 1,
        date: date.toLocaleDateString("en-US", { weekday: 'long', month: 'long', day: 'numeric' }),
        activities,
        meals,
        accommodation: tripDetails.accommodation || "Standard hotel",
        notes: i === 0 ? "First day in the city - take it easy and get oriented." : 
               i === duration - 1 ? "Last day - make sure to pack and check out on time." : 
               `Day ${i + 1} of your adventure!`
      });
    }
    
    // Add accommodation cost
    const accommodationCost = Math.round(tripDetails.budget * 0.2);
    totalCost += accommodationCost * duration;
    
    // Add transportation cost
    const transportationCost = Math.round(tripDetails.budget * 0.1);
    totalCost += transportationCost;
    
    return {
      destination: tripDetails.destination,
      duration,
      budget: tripDetails.budget,
      totalCost,
      remainingBudget: tripDetails.budget - totalCost,
      days
    };
    
  } catch (error) {
    toast.error("Failed to generate itinerary. Please try again.");
    console.error("Error generating itinerary:", error);
    throw error;
  }
};
