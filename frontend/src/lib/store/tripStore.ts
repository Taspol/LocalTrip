'use client';

// Types for trip data
interface Activity {
  t: string;
  detail: string;
}

interface TimelineDay {
  day: number;
  activities: Activity[];
}

interface Spot {
  name: string;
  time: string;
  notes: string;
  lat: number;
  lng: number;
}

interface Budget {
  total: number;
  [key: string]: number;
}

interface SafetyContact {
  name: string;
  phone: string;
}

interface Safety {
  registration: string;
  checkins: string;
  sos: string;
  contacts: Record<string, SafetyContact>;
}

interface TripPlan {
  title: string;
  timeline: TimelineDay[];
  spots: Spot[];
  budget: Budget;
  safety: Safety;
}

export interface TripPlanData {
  id: string;
  tripOverview: string;
  trip_plan: TripPlan;
  createdAt: string;
  updatedAt: string;
}

class TripStore {
  private storageKey = 'hiking-app-trips';

  // Save trip plan to localStorage
  saveTripPlan(tripPlan: Omit<TripPlanData, 'id' | 'createdAt' | 'updatedAt'>): string {
    if (typeof window === 'undefined') return '';
    
    const id = this.generateId();
    const now = new Date().toISOString();
    
    const tripData: TripPlanData = {
      ...tripPlan,
      id,
      createdAt: now,
      updatedAt: now
    };

    try {
      const existingTrips = this.getAllTrips();
      const updatedTrips = [...existingTrips, tripData];
      localStorage.setItem(this.storageKey, JSON.stringify(updatedTrips));
      return id;
    } catch (error) {
      console.error('Error saving trip plan:', error);
      return '';
    }
  }

  // Get all trip plans
  getAllTrips(): TripPlanData[] {
    if (typeof window === 'undefined') return [];
    
    try {
      const data = localStorage.getItem(this.storageKey);
      return data ? JSON.parse(data) : [];
    } catch (error) {
      console.error('Error loading trip plans:', error);
      return [];
    }
  }

  // Get specific trip plan by ID
  getTripPlan(id: string): TripPlanData | null {
    const trips = this.getAllTrips();
    return trips.find(trip => trip.id === id) || null;
  }

  // Get the most recent trip plan
  getLatestTripPlan(): TripPlanData | null {
    const trips = this.getAllTrips();
    if (trips.length === 0) return null;
    
    return trips.sort((a, b) => 
      new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
    )[0];
  }

  // Update existing trip plan
  updateTripPlan(id: string, updates: Partial<TripPlanData>): boolean {
    if (typeof window === 'undefined') return false;
    
    try {
      const trips = this.getAllTrips();
      const index = trips.findIndex(trip => trip.id === id);
      
      if (index === -1) return false;
      
      trips[index] = {
        ...trips[index],
        ...updates,
        updatedAt: new Date().toISOString()
      };
      
      localStorage.setItem(this.storageKey, JSON.stringify(trips));
      return true;
    } catch (error) {
      console.error('Error updating trip plan:', error);
      return false;
    }
  }

  // Delete trip plan
  deleteTripPlan(id: string): boolean {
    if (typeof window === 'undefined') return false;
    
    try {
      const trips = this.getAllTrips();
      const filteredTrips = trips.filter(trip => trip.id !== id);
      localStorage.setItem(this.storageKey, JSON.stringify(filteredTrips));
      return true;
    } catch (error) {
      console.error('Error deleting trip plan:', error);
      return false;
    }
  }

  // Clear all trip plans
  clearAllTrips(): boolean {
    if (typeof window === 'undefined') return false;
    
    try {
      localStorage.removeItem(this.storageKey);
      return true;
    } catch (error) {
      console.error('Error clearing trip plans:', error);
      return false;
    }
  }

  // Generate a unique ID
  private generateId(): string {
    return `trip_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }

  // Format trip plan for chat context
  formatTripForChat(tripData: TripPlanData): string {
    const { trip_plan, tripOverview } = tripData;
    
    let context = `Current Trip Plan: ${trip_plan.title}\n\n`;
    context += `Overview: ${tripOverview}\n\n`;
    
    // Add timeline information
    context += `Itinerary:\n`;
    trip_plan.timeline.forEach(day => {
      context += `Day ${day.day}:\n`;
      day.activities.forEach(activity => {
        context += `  ${activity.t} - ${activity.detail}\n`;
      });
      context += '\n';
    });
    
    // Add key spots
    if (trip_plan.spots && trip_plan.spots.length > 0) {
      context += `Key Destinations:\n`;
      trip_plan.spots.forEach(spot => {
        context += `- ${spot.name} (${spot.time}): ${spot.notes}\n`;
      });
      context += '\n';
    }
    
    // Add budget info
    if (trip_plan.budget) {
      context += `Budget: Total ฿${trip_plan.budget.total?.toLocaleString() || 'N/A'}\n\n`;
    }
    
    return context;
  }
}

export const tripStore = new TripStore();
export default tripStore;
