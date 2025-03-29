
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { format } from 'date-fns';
import { Calendar as CalendarIcon, Plane } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Slider } from '@/components/ui/slider';
import { Checkbox } from '@/components/ui/checkbox';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { cn } from '@/lib/utils';
import { TripDetails } from '@/services/api';

const interestItems = [
  { id: "adventure", label: "Adventure" },
  { id: "culture", label: "Culture" },
  { id: "food", label: "Food" },
  { id: "history", label: "History" },
  { id: "nature", label: "Nature" },
  { id: "relaxation", label: "Relaxation" },
  { id: "shopping", label: "Shopping" },
  { id: "wildlife", label: "Wildlife" },
];

const formSchema = z.object({
  destination: z.string().min(2, { message: "Destination must be at least 2 characters." }),
  dateRange: z.object({
    from: z.date(),
    to: z.date(),
  }),
  budget: z.number().min(1000, { message: "Budget must be at least ₹1000" }),
  purpose: z.string().min(2, { message: "Purpose must be at least 2 characters." }),
  interests: z.array(z.string()).min(1, { message: "Select at least one interest" }),
  accommodation: z.string().optional(),
  transportation: z.string().optional(),
  dietaryRestrictions: z.string().optional(),
  specialRequests: z.string().optional(),
});

interface TripFormProps {
  onSubmit: (data: TripDetails) => void;
  isLoading: boolean;
}

const TripForm: React.FC<TripFormProps> = ({ onSubmit, isLoading }) => {
  const [budget, setBudget] = useState(20000);
  
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      destination: "",
      dateRange: {
        from: undefined,
        to: undefined,
      },
      budget: 20000,
      purpose: "",
      interests: [],
      accommodation: "",
      transportation: "",
      dietaryRestrictions: "",
      specialRequests: "",
    },
  });

  const handleSubmit = (values: z.infer<typeof formSchema>) => {
    // Convert form data to TripDetails format
    const tripDetails: TripDetails = {
      destination: values.destination,
      startDate: values.dateRange.from,
      endDate: values.dateRange.to,
      budget: values.budget,
      purpose: values.purpose,
      interests: values.interests,
      accommodation: values.accommodation || '',
      transportation: values.transportation || '',
      dietaryRestrictions: values.dietaryRestrictions || '',
      specialRequests: values.specialRequests || '',
    };
    
    onSubmit(tripDetails);
  };
  
  return (
    <Card className="w-full max-w-3xl mx-auto animate-fade-in">
      <CardHeader>
        <div className="flex items-center gap-2">
          <Plane className="h-5 w-5 text-primary" />
          <CardTitle>Plan Your Trip</CardTitle>
        </div>
        <CardDescription>
          Fill in your travel details and preferences to get a personalized itinerary
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="destination"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Destination</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g. Jaipur, Rajasthan" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="dateRange"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel>Date Range</FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant={"outline"}
                            className={cn(
                              "w-full justify-start text-left font-normal",
                              !field.value.from && "text-muted-foreground"
                            )}
                          >
                            <CalendarIcon className="mr-2 h-4 w-4" />
                            {field.value.from ? (
                              field.value.to ? (
                                <>
                                  {format(field.value.from, "PPP")} - {format(field.value.to, "PPP")}
                                </>
                              ) : (
                                format(field.value.from, "PPP")
                              )
                            ) : (
                              <span>Pick a date range</span>
                            )}
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="range"
                          selected={field.value}
                          onSelect={field.onChange}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="budget"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Budget (₹)</FormLabel>
                    <FormControl>
                      <div className="space-y-2">
                        <Slider
                          defaultValue={[budget]}
                          min={1000}
                          max={200000}
                          step={1000}
                          onValueChange={(value) => {
                            setBudget(value[0]);
                            field.onChange(value[0]);
                          }}
                        />
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-muted-foreground">₹1,000</span>
                          <span className="text-sm font-medium">₹{budget.toLocaleString()}</span>
                          <span className="text-sm text-muted-foreground">₹200,000</span>
                        </div>
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="purpose"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Purpose of Trip</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select purpose" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="leisure">Leisure</SelectItem>
                        <SelectItem value="business">Business</SelectItem>
                        <SelectItem value="family">Family Vacation</SelectItem>
                        <SelectItem value="honeymoon">Honeymoon</SelectItem>
                        <SelectItem value="adventure">Adventure</SelectItem>
                        <SelectItem value="spiritual">Spiritual</SelectItem>
                        <SelectItem value="education">Educational</SelectItem>
                        <SelectItem value="medical">Medical</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            
            <FormField
              control={form.control}
              name="interests"
              render={() => (
                <FormItem>
                  <div className="mb-4">
                    <FormLabel>Interests</FormLabel>
                    <FormDescription>
                      Select your interests to personalize your itinerary
                    </FormDescription>
                  </div>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                    {interestItems.map((item) => (
                      <FormField
                        key={item.id}
                        control={form.control}
                        name="interests"
                        render={({ field }) => {
                          return (
                            <FormItem
                              key={item.id}
                              className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4"
                            >
                              <FormControl>
                                <Checkbox
                                  checked={field.value?.includes(item.label)}
                                  onCheckedChange={(checked) => {
                                    return checked
                                      ? field.onChange([...field.value, item.label])
                                      : field.onChange(
                                          field.value?.filter(
                                            (value) => value !== item.label
                                          )
                                        );
                                  }}
                                />
                              </FormControl>
                              <FormLabel className="font-normal cursor-pointer">
                                {item.label}
                              </FormLabel>
                            </FormItem>
                          );
                        }}
                      />
                    ))}
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="accommodation"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Preferred Accommodation</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select accommodation type" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="budget">Budget</SelectItem>
                        <SelectItem value="midrange">Mid-range</SelectItem>
                        <SelectItem value="luxury">Luxury</SelectItem>
                        <SelectItem value="homestay">Homestay</SelectItem>
                        <SelectItem value="resort">Resort</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="transportation"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Preferred Transportation</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select transportation type" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="public">Public Transport</SelectItem>
                        <SelectItem value="private">Private Vehicle</SelectItem>
                        <SelectItem value="rental">Rental Car</SelectItem>
                        <SelectItem value="walking">Walking</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            
            <FormField
              control={form.control}
              name="dietaryRestrictions"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Dietary Restrictions</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g. Vegetarian, Gluten-free, etc." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="specialRequests"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Special Requests</FormLabel>
                  <FormControl>
                    <Textarea 
                      placeholder="Any special requirements or activities you're particularly interested in?"
                      className="resize-none" 
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <CardFooter className="flex justify-end px-0 pb-0">
              <Button type="submit" disabled={isLoading}>
                {isLoading ? "Generating Itinerary..." : "Generate Itinerary"}
              </Button>
            </CardFooter>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default TripForm;
