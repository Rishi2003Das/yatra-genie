
import React from 'react';
import { DayPlan } from '@/services/api';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { MapPin, Clock, Banknote, Utensils, Home } from 'lucide-react';

interface DayPlannerProps {
  day: DayPlan;
}

const DayPlanner: React.FC<DayPlannerProps> = ({ day }) => {
  // Calculate total cost for the day
  const totalCost = [
    ...day.activities.map(a => a.cost),
    ...day.meals.map(m => m.cost)
  ].reduce((sum, cost) => sum + cost, 0);
  
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
        <div>
          <h2 className="text-2xl font-bold">Day {day.day}</h2>
          <p className="text-muted-foreground">{day.date}</p>
        </div>
        <div className="flex items-center bg-muted px-3 py-1 rounded-md">
          <Banknote className="h-4 w-4 mr-2 text-muted-foreground" />
          <span className="text-sm">Day's estimated cost: <strong>₹{totalCost.toLocaleString()}</strong></span>
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Clock className="h-5 w-5 text-primary" />
                Activities
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {day.activities.map((activity, index) => (
                <div key={index} className="border-b last:border-0 pb-4 last:pb-0">
                  <div className="flex justify-between items-start mb-1">
                    <h4 className="font-medium">{activity.name}</h4>
                    <div className="text-sm px-2 py-0.5 bg-primary/10 text-primary rounded">
                      {activity.time}
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground mb-2">{activity.description}</p>
                  <div className="flex flex-wrap gap-x-4 gap-y-1 text-sm">
                    <div className="flex items-center">
                      <MapPin className="h-3 w-3 mr-1 text-muted-foreground" />
                      <span>{activity.location}</span>
                    </div>
                    <div className="flex items-center">
                      <Clock className="h-3 w-3 mr-1 text-muted-foreground" />
                      <span>{activity.duration}</span>
                    </div>
                    <div className="flex items-center">
                      <Banknote className="h-3 w-3 mr-1 text-muted-foreground" />
                      <span>₹{activity.cost.toLocaleString()}</span>
                    </div>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
        
        <div className="space-y-6">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center gap-2 text-base">
                <Utensils className="h-4 w-4 text-primary" />
                Meals
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {day.meals.map((meal, index) => (
                <div key={index} className="border-b last:border-0 pb-3 last:pb-0">
                  <div className="flex justify-between items-start">
                    <h5 className="font-medium">{meal.type}</h5>
                    <span className="text-xs text-muted-foreground">{meal.time}</span>
                  </div>
                  <p className="text-sm">{meal.venue}</p>
                  <div className="flex justify-between text-sm mt-1">
                    <span className="text-muted-foreground">{meal.cuisine}</span>
                    <span>₹{meal.cost.toLocaleString()}</span>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center gap-2 text-base">
                <Home className="h-4 w-4 text-primary" />
                Accommodation
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm">{day.accommodation}</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-base">Notes</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm">{day.notes}</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default DayPlanner;
