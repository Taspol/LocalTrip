'use client';

import { useState, useEffect } from "react";
import { NavigateControls } from "@/components/navigate/NavigateControls";
import { TripMap } from "@/components/map/TripMap";
import { Icon } from "@/components/ui/Icon";
import { tripStore, type TripPlanData } from "@/lib/store/tripStore";

export default function NavigatePage() {
  const [currentDay, setCurrentDay] = useState(1);
  const [tripData, setTripData] = useState<TripPlanData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Load the latest trip plan from localStorage
    const latestTrip = tripStore.getLatestTripPlan();
    if (latestTrip) {
      setTripData(latestTrip);
    }
    setLoading(false);
  }, []);

  // Fallback to mock data if no trip plan is found
  const getMockTripData = () => ({
    tripOverview: "Embark on a 4-day multi-day trekking adventure from Bangkok to Chiang Mai, immersing yourself in the serene landscapes of Phrao District and experiencing authentic hill tribe culture and off-the-beaten-path experience in northern Thailand.",
    trip_plan: {
      title: "4-day Multi-day Trekking Adventure in Chiang Mai",
      date: "2025-08-22 to 2025-08-25",
      timeline: [
        {
          day: 1,
          activities: [
            { t: "08:00", detail: "Departure from Bangkok" },
            { t: "14:00", detail: "Arrive in Chiang Mai, check-in at Phrao District Homestay" },
            { t: "16:00", detail: "Visit Community Library, explore local books and art" },
            { t: "18:00", detail: "Dinner at Phrao Night Market" }
          ]
        },
        {
          day: 2,
          activities: [
            { t: "07:00", detail: "Breakfast at homestay" },
            { t: "09:00", detail: "Start guided trek through countryside" },
            { t: "12:00", detail: "Lunch break at scenic viewpoint" },
            { t: "15:00", detail: "Continue trekking, visit local village" },
            { t: "18:00", detail: "Return to homestay, traditional dinner" }
          ]
        },
        {
          day: 3,
          activities: [
            { t: "08:00", detail: "Early morning trek to waterfall" },
            { t: "10:00", detail: "Swimming and relaxation at waterfall" },
            { t: "14:00", detail: "Cultural workshop with local artisans" },
            { t: "16:00", detail: "Explore more trekking trails" },
            { t: "19:00", detail: "Community dinner and cultural show" }
          ]
        },
        {
          day: 4,
          activities: [
            { t: "09:00", detail: "Final morning trek" },
            { t: "11:00", detail: "Pack and check-out from homestay" },
            { t: "13:00", detail: "Lunch in Chiang Mai city" },
            { t: "15:00", detail: "Departure to Bangkok" }
          ]
        }
      ],
      spots: [
        {
          name: "Phrao District Homestay",
          time: "14:00-18:00",
          notes: "Check-in and meet local hosts",
          lat: 19.3667,
          lng: 99.2167
        },
        {
          name: "Community Library",
          time: "16:00-17:00",
          notes: "Explore local books and art",
          lat: 19.3670,
          lng: 99.2170
        },
        {
          name: "Trekking Trails",
          time: "09:00-17:00",
          notes: "Guided trek through countryside",
          lat: 19.3700,
          lng: 99.2200
        },
        {
          name: "Phrao Night Market",
          time: "18:00-20:00",
          notes: "Local food and shopping",
          lat: 19.3665,
          lng: 99.2165
        }
      ]
    }
  });

  // Use loaded trip data or fallback to mock data
  const displayData = tripData || getMockTripData();
  
  // Ensure spots have coordinates for the map
  const spotsWithCoords = displayData.trip_plan.spots.map(spot => ({
    ...spot,
    lat: spot.lat || 19.3667, // Default latitude if not provided
    lng: spot.lng || 99.2167  // Default longitude if not provided
  }));

  if (loading) {
    return (
      <main className="mx-auto max-w-7xl px-4 py-8">
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p className="text-gray-600">Loading trip data...</p>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="mx-auto max-w-7xl px-4 py-8">
      <div className="mb-6">
        <div className="flex items-center gap-2 mb-2">
          <Icon
            name="compass"
            size={24}
            className="text-[var(--color-primary-600)]"
          />
          <h1 className="text-3xl font-black text-[var(--color-foreground)]">
            Navigate
          </h1>
        </div>
        <p className="text-[color:var(--color-foreground)/0.7]">
          Real-time tracking with interactive maps and step-by-step guidance
        </p>

        {/* Trip Overview */}
        <div className="mt-4 p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg border border-blue-200">
          <div className="flex justify-between items-start mb-2">
            <div>
              <h3 className="font-bold text-lg text-gray-900 mb-2">
                {displayData.trip_plan.title}
              </h3>
              <p className="text-sm text-gray-700 mb-2">
                {'date' in displayData.trip_plan ? displayData.trip_plan.date : 'Custom Trip Plan'}
              </p>
              <p className="text-sm text-gray-600">{displayData.tripOverview}</p>
            </div>
            {tripData && (
              <div className="flex items-center gap-2 text-xs text-green-700 bg-green-100 px-2 py-1 rounded-full">
                <Icon name="check" size={12} />
                <span>From Your Plan</span>
              </div>
            )}
          </div>
          {!tripData && (
            <div className="mt-3 p-2 bg-amber-100 rounded border border-amber-200">
              <p className="text-xs text-amber-700">
                No saved trip plan found. Showing sample data. 
                <a href="/plan" className="underline ml-1">Create your trip plan</a>
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Main Map Full Width */}
      <section className="relative overflow-hidden rounded-xl border border-[var(--color-border)] mb-[5vh] z-10">
        <div className="h-[70vh] w-full">
          <TripMap
            spots={spotsWithCoords}
            timeline={displayData.trip_plan.timeline}
            currentDay={currentDay}
          />
        </div>
      </section>

      {/* Controls & Panels */}
      <div className="mt-20"> {/* extra spacing below map */}
        <div className="mt-6 grid gap-6 md:grid-cols-2 xl:grid-cols-4 mb-16">
          <div className="bg-white rounded-xl border border-gray-200 p-4 xl:col-span-1">
            <h3 className="font-bold text-lg mb-3">Select Day</h3>
            <div className="grid grid-cols-2 gap-2">
              {[1, 2, 3, 4].map((day) => (
                <button
                  key={day}
                  onClick={() => setCurrentDay(day)}
                  className={`p-3 rounded-lg border-2 text-sm font-medium transition-all ${
                    currentDay === day
                      ? "border-blue-500 bg-blue-50 text-blue-700"
                      : "border-gray-200 hover:border-blue-300 text-gray-700"
                  }`}
                >
                  Day {day}
                </button>
              ))}
            </div>
          </div>

          <div className="xl:col-span-2">
            <NavigateControls showLiveMap={false} />
          </div>

          <div className="space-y-6 xl:col-span-1">
            <div className="bg-white rounded-xl border border-gray-200 p-4">
              <h3 className="font-bold text-lg mb-3">Trip Stats</h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Total Distance:</span>
                  <span className="font-semibold">~45 km</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Duration:</span>
                  <span className="font-semibold">4 days</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Spots to Visit:</span>
                  <span className="font-semibold">
                    {spotsWithCoords.length}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Difficulty:</span>
                  <span className="font-semibold text-orange-600">
                    Intermediate
                  </span>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl border border-gray-200 p-4">
              <h3 className="font-bold text-lg mb-3">Map Legend</h3>
              <div className="space-y-2 text-sm">
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 bg-green-500 rounded-full"></div>
                  <span>Starting Point</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 bg-red-500 rounded-full"></div>
                  <span>Current Location</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 bg-gray-400 rounded-full"></div>
                  <span>Visited</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 bg-blue-500 rounded-full"></div>
                  <span>Upcoming</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-8 h-1 bg-blue-500"></div>
                  <span>Route Path</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
