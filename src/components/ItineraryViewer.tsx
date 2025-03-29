
import React, { useState } from 'react';
import { Itinerary, DayPlan } from '@/services/api';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { CalendarDays, MapPin, Clock, Banknote, Utensils, Home, Edit, Download, Share2 } from 'lucide-react';
import { toast } from 'sonner';
import DayPlanner from './DayPlanner';

interface ItineraryViewerProps {
  itinerary: Itinerary;
  onReset: () => void;
}

const ItineraryViewer: React.FC<ItineraryViewerProps> = ({ itinerary, onReset }) => {
  const [activeTab, setActiveTab] = useState("overview");
  const [activeDayIndex, setActiveDayIndex] = useState(0);

  const handleDownload = () => {
    // In a real app, this would generate a PDF or printable version
    toast.success("Itinerary download started!");
  };

  const handleShare = () => {
    // In a real app, this would open a share dialog
    toast.success("Share feature coming soon!");
  };

  const handleEdit = (day: number) => {
    setActiveTab("day-" + day);
    setActiveDayIndex(day - 1);
  };

  return (
    <Card className="w-full max-w-5xl mx-auto animate-fade-in">
      <CardHeader>
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <CardTitle className="text-2xl">{itinerary.destination} Itinerary</CardTitle>
            <CardDescription className="flex items-center gap-1 mt-1">
              <CalendarDays className="h-4 w-4 text-muted-foreground" />
              <span>{itinerary.duration} {itinerary.duration === 1 ? 'day' : 'days'} trip</span>
            </CardDescription>
          </div>
          
          <div className="flex flex-wrap gap-2">
            <Button variant="outline" size="sm" onClick={handleDownload}>
              <Download className="h-4 w-4 mr-1" /> Download
            </Button>
            <Button variant="outline" size="sm" onClick={handleShare}>
              <Share2 className="h-4 w-4 mr-1" /> Share
            </Button>
            <Button variant="outline" size="sm" onClick={onReset}>
              Plan Another Trip
            </Button>
          </div>
        </div>
      </CardHeader>
      
      <CardContent>
        <Tabs defaultValue="overview" value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid grid-cols-3 mb-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="days">Days</TabsTrigger>
            <TabsTrigger value={"day-" + (activeDayIndex + 1)}>
              {activeDayIndex !== undefined ? `Day ${activeDayIndex + 1}` : 'Details'}
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="overview" className="space-y-6 animate-slide-in">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">Budget Overview</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Total Budget:</span>
                    <span className="font-medium">₹{itinerary.budget.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Estimated Cost:</span>
                    <span className="font-medium">₹{itinerary.totalCost.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Remaining:</span>
                    <span className={`font-medium ${itinerary.remainingBudget < 0 ? 'text-destructive' : 'text-green-600'}`}>
                      ₹{itinerary.remainingBudget.toLocaleString()}
                    </span>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">Trip Summary</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <div className="flex gap-2">
                    <MapPin className="h-4 w-4 text-primary mt-1" />
                    <div>
                      <p className="font-medium">Destination</p>
                      <p className="text-sm text-muted-foreground">{itinerary.destination}</p>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Clock className="h-4 w-4 text-primary mt-1" />
                    <div>
                      <p className="font-medium">Duration</p>
                      <p className="text-sm text-muted-foreground">{itinerary.duration} days</p>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Home className="h-4 w-4 text-primary mt-1" />
                    <div>
                      <p className="font-medium">Accommodation</p>
                      <p className="text-sm text-muted-foreground">{itinerary.days[0].accommodation}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Day Overview</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4">
                  {itinerary.days.map((day, index) => (
                    <div key={index} className="flex justify-between items-center border-b pb-3 last:border-0 last:pb-0">
                      <div>
                        <p className="font-medium">Day {day.day}: {day.date}</p>
                        <p className="text-sm text-muted-foreground line-clamp-1">
                          {day.activities.map(a => a.name).join(' • ')}
                        </p>
                      </div>
                      <Button variant="ghost" size="sm" onClick={() => handleEdit(day.day)}>
                        <Edit className="h-4 w-4 mr-1" /> Details
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="days" className="animate-slide-in">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {itinerary.days.map((day, index) => (
                <Card key={index} className="overflow-hidden">
                  <CardHeader className="bg-muted pb-2">
                    <CardTitle className="text-md">Day {day.day}</CardTitle>
                    <CardDescription>{day.date}</CardDescription>
                  </CardHeader>
                  <CardContent className="pt-4 px-4">
                    <div className="space-y-3">
                      {day.activities.slice(0, 2).map((activity, actIdx) => (
                        <div key={actIdx} className="flex gap-2">
                          <Clock className="h-4 w-4 text-muted-foreground mt-0.5 shrink-0" />
                          <div className="text-sm">
                            <span className="text-muted-foreground">{activity.time}:</span> {activity.name}
                          </div>
                        </div>
                      ))}
                      {day.activities.length > 2 && (
                        <div className="text-sm text-muted-foreground">
                          +{day.activities.length - 2} more activities
                        </div>
                      )}
                    </div>
                  </CardContent>
                  <CardFooter className="pt-0 pb-3">
                    <Button variant="ghost" className="w-full" onClick={() => handleEdit(day.day)}>
                      View Full Day
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </TabsContent>
          
          {itinerary.days.map((day, index) => (
            <TabsContent key={index} value={`day-${day.day}`} className="animate-slide-in">
              <DayPlanner day={day} />
            </TabsContent>
          ))}
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default ItineraryViewer;
