"use client";
import { useState } from "react";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { MockMap } from "@/components/ui/MockMap";

type TripInput = {
  destination: string;
  budget: string;
  style: "adventure" | "rest" | "dating" | "family" | "solo";
  durationDays: number;
  groupSize: number;
  start: string;
};

interface MapData {
  markers: Array<{ 
    id: string; 
    lat: number; 
    lng: number; 
    label: string; 
    type?: 'start' | 'end' | 'waypoint' | 'campsite' | 'water' | 'viewpoint'; 
  }>;
  trail: Array<{ lat: number; lng: number }>;
}

interface TripPlan {
  overview: string;
  steps: string[];
  mapData: MapData;
}

type QuickTrip = {
  id: string;
  title: string;
  duration: string;
  difficulty: string;
  highlight: string;
  icon: string;
  preset: Partial<TripInput>;
};

export function TripPlanner() {
  const [mode, setMode] = useState<'quick' | 'custom'>('quick');
  const [input, setInput] = useState<TripInput>({
    destination: "",
    budget: "",
    style: "adventure",
    durationDays: 3,
    groupSize: 2,
    start: "",
  });
  const [generated, setGenerated] = useState<TripPlan | null>(null);
  const [loading, setLoading] = useState(false);
  const [clickCount, setClickCount] = useState(0);

  const quickTrips: QuickTrip[] = [
    {
      id: 'doi-inthanon',
      title: 'Doi Inthanon National Park',
      duration: '3 days',
      difficulty: 'Moderate',
      highlight: 'Thailand\'s highest peak',
      icon: '🏔️',
      preset: { destination: 'Doi Inthanon National Park, Chiang Mai', style: 'adventure', durationDays: 3 }
    },
    {
      id: 'koh-samui-retreat',
      title: 'Koh Samui Island Retreat',
      duration: '2 days',
      difficulty: 'Easy',
      highlight: 'Beaches & temple hikes',
      icon: '🌊',
      preset: { destination: 'Koh Samui, Surat Thani', style: 'rest', durationDays: 2 }
    },
    {
      id: 'khao-yai-adventure',
      title: 'Khao Yai Explorer',
      duration: '4 days',
      difficulty: 'Hard',
      highlight: 'Wildlife & waterfalls',
      icon: '�',
      preset: { destination: 'Khao Yai National Park, Nakhon Ratchasima', style: 'adventure', durationDays: 4 }
    },
    {
      id: 'family-erawan',
      title: 'Erawan Falls Family Trip',
      duration: '2 days',
      difficulty: 'Easy',
      highlight: 'Famous 7-tier waterfalls',
      icon: '👨‍👩‍👧‍👦',
      preset: { destination: 'Erawan National Park, Kanchanaburi', style: 'family', durationDays: 2 }
    }
  ];

  const trackClick = () => {
    setClickCount(prev => prev + 1);
  };

  const quickGenerate = async (preset: Partial<TripInput>) => {
    trackClick();
    setInput(prev => ({ ...prev, ...preset }));
    setLoading(true);
    
    // Simulate AI generation
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    const mockMapData: MapData = {
      markers: [
        { id: '1', lat: 20, lng: 30, label: 'Trailhead Start', type: 'start' as const },
        { id: '2', lat: 50, lng: 45, label: 'Scenic Viewpoint', type: 'viewpoint' as const },
        { id: '3', lat: 75, lng: 60, label: 'Camp Site', type: 'campsite' as const },
        { id: '4', lat: 85, lng: 25, label: 'Trail End', type: 'end' as const }
      ],
      trail: [
        { lat: 20, lng: 30 }, { lat: 35, lng: 40 }, { lat: 50, lng: 45 }, 
        { lat: 65, lng: 55 }, { lat: 75, lng: 60 }, { lat: 85, lng: 25 }
      ]
    };
    
    const o = `🎯 ${preset.destination} adventure for ${preset.durationDays} days. Perfect for ${preset.style} style trips!`;
    const steps = [
      `Day 1: Arrive at ${preset.destination}, setup base camp, short acclimatization hike`,
      `Day 2: Main trail exploration with scenic stops and photo opportunities`,
      preset.durationDays! > 2 ? `Day 3: Advanced route or alternative trail, pack lunch` : null,
      preset.durationDays! > 3 ? `Day 4: Summit attempt or extended exploration, early start` : null,
      `Final Day: Pack up, return journey, celebrate completion!`
    ].filter(Boolean) as string[];
    
    setGenerated({ overview: o, steps, mapData: mockMapData });
    setLoading(false);
  };

  const customGenerate = async () => {
    trackClick();
    setLoading(true);
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    const mockMapData: MapData = {
      markers: [
        { id: '1', lat: 25, lng: 35, label: 'Start Point', type: 'start' as const },
        { id: '2', lat: 60, lng: 50, label: 'Rest Stop', type: 'waypoint' as const },
        { id: '3', lat: 80, lng: 30, label: 'Destination', type: 'end' as const }
      ],
      trail: [{ lat: 25, lng: 35 }, { lat: 60, lng: 50 }, { lat: 80, lng: 30 }]
    };
    
    const o = `Custom trip to ${input.destination || "your chosen destination"} for ${input.durationDays} day(s). Style: ${input.style}. Budget: ${input.budget || "flexible"}.`;
    const steps = [
      "Day 1: Arrival and orientation, gear check, local exploration",
      "Day 2: Main activity day with guided tour or self-exploration",
      input.durationDays > 2 ? "Day 3: Extended adventure or rest day based on preference" : null,
    ].filter(Boolean) as string[];
    
    setGenerated({ overview: o, steps, mapData: mockMapData });
    setLoading(false);
  };

  return (
    <div className="space-y-6">
      {/* Click Counter */}
      <div className="text-center">
        <div className="inline-flex items-center gap-2 bg-green-50 text-green-700 px-4 py-2 rounded-full text-sm font-medium">
          <span>🖱️</span>
          <span>Clicks: {clickCount}/5</span>
          <span className={clickCount <= 5 ? "text-green-600" : "text-red-600"}>
            {clickCount <= 5 ? "✅ On track!" : "❌ Too many clicks"}
          </span>
        </div>
      </div>

      {/* Mode Selector */}
      <Card padding="md">
        <div className="flex flex-col sm:flex-row gap-4 items-center justify-center">
          <h2 className="text-xl font-bold text-center">🎯 Get Your Perfect Trip in 4-5 Clicks!</h2>
          <div className="flex gap-2">
            <Button
              variant={mode === 'quick' ? 'primary' : 'outline'}
              onClick={() => { setMode('quick'); trackClick(); }}
              size="sm"
            >
              ⚡ Quick Picks
            </Button>
            <Button
              variant={mode === 'custom' ? 'primary' : 'outline'}
              onClick={() => { setMode('custom'); trackClick(); }}
              size="sm"
            >
              🎨 Custom Plan
            </Button>
          </div>
        </div>
      </Card>

      {mode === 'quick' ? (
        /* Quick Trip Selection */
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {quickTrips.map((trip) => (
            <Card key={trip.id} padding="md" hover>
              <button
                onClick={() => quickGenerate(trip.preset)}
                className="w-full text-left space-y-3 group"
                disabled={loading}
              >
                <div className="text-3xl text-center group-hover:scale-110 transition-transform">
                  {trip.icon}
                </div>
                <div>
                  <h3 className="font-bold text-[var(--color-foreground)] group-hover:text-[var(--color-primary)] transition-colors">
                    {trip.title}
                  </h3>
                  <div className="text-sm text-[color:var(--color-foreground)/0.7] space-y-1">
                    <div>⏱️ {trip.duration}</div>
                    <div>📊 {trip.difficulty}</div>
                    <div>✨ {trip.highlight}</div>
                  </div>
                </div>
                <div className="text-xs text-[var(--color-primary)] font-medium">
                  Click to generate plan →
                </div>
              </button>
            </Card>
          ))}
        </div>
      ) : (
        /* Custom Trip Form - Simplified */
        <Card padding="lg">
          <div className="mb-6 flex items-center gap-2">
            <div className="text-2xl">🎨</div>
            <h2 className="text-xl font-bold">Custom Trip Builder</h2>
          </div>
          
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <div>
              <label className="mb-2 block text-sm font-semibold text-[var(--color-foreground)]">
                🏔️ Where to?
              </label>
              <input 
                className="w-full rounded-lg border border-[var(--color-border)] px-3 py-2 text-sm transition-all focus:border-[var(--color-primary-300)] focus:ring-2 focus:ring-[var(--color-primary-100)]" 
                placeholder="Enter destination..."
                value={input.destination} 
                onChange={(e) => setInput({ ...input, destination: e.target.value })} 
              />
            </div>
            
            <div>
              <label className="mb-2 block text-sm font-semibold text-[var(--color-foreground)]">
                🎨 Trip Style
              </label>
              <select 
                className="w-full rounded-lg border border-[var(--color-border)] px-3 py-2 text-sm transition-all focus:border-[var(--color-primary-300)] focus:ring-2 focus:ring-[var(--color-primary-100)]" 
                value={input.style} 
                onChange={(e) => setInput({ ...input, style: e.target.value as TripInput["style"] })}
              >
                <option value="adventure">🏃‍♂️ Adventure</option>
                <option value="rest">😌 Relaxation</option>
                <option value="dating">💑 Romantic</option>
                <option value="family">👨‍👩‍👧‍👦 Family</option>
                <option value="solo">🧘‍♀️ Solo</option>
              </select>
            </div>
            
            <div>
              <label className="mb-2 block text-sm font-semibold text-[var(--color-foreground)]">
                📅 Days
              </label>
              <select 
                className="w-full rounded-lg border border-[var(--color-border)] px-3 py-2 text-sm transition-all focus:border-[var(--color-primary-300)] focus:ring-2 focus:ring-[var(--color-primary-100)]" 
                value={input.durationDays} 
                onChange={(e) => setInput({ ...input, durationDays: Number(e.target.value) })}
              >
                <option value={1}>1 day</option>
                <option value={2}>2 days</option>
                <option value={3}>3 days</option>
                <option value={4}>4 days</option>
                <option value={7}>1 week</option>
              </select>
            </div>
          </div>
          
          <div className="mt-6">
            <Button 
              onClick={customGenerate} 
              variant="primary" 
              size="lg"
              loading={loading}
              disabled={!input.destination.trim()}
            >
              ✨ Generate Custom Plan
            </Button>
          </div>
        </Card>
      )}

      {/* Generated Trip Plan */}
      {generated && (
        <div className="space-y-6">
          {/* Map Visualization */}
          <Card padding="lg">
            <div className="mb-4 flex items-center gap-2">
              <div className="text-xl">🗺️</div>
              <h3 className="font-bold text-[var(--color-foreground)]">Your Route</h3>
            </div>
            <MockMap
              height="h-80"
              markers={generated.mapData.markers}
              trail={generated.mapData.trail}
              showControls={true}
              className="mb-4"
            />
          </Card>

          {/* Trip Details */}
          <div className="grid gap-4 lg:grid-cols-2">
            <Card padding="lg">
              <div className="mb-3 flex items-center gap-2">
                <div className="text-xl">📋</div>
                <h3 className="font-bold text-[var(--color-foreground)]">Trip Overview</h3>
              </div>
              <p className="mb-4 text-sm text-[color:var(--color-foreground)/0.85] leading-relaxed">
                {generated.overview}
              </p>
              <div className="space-y-2 text-xs">
                <div className="flex items-center gap-2 text-[color:var(--color-foreground)/0.7]">
                  <span className="text-green-500">🌤️</span>
                  <span>Perfect weather conditions expected</span>
                </div>
                <div className="flex items-center gap-2 text-[color:var(--color-foreground)/0.7]">
                  <span className="text-blue-500">🎒</span>
                  <span>Gear list generated based on conditions</span>
                </div>
                <div className="flex items-center gap-2 text-[color:var(--color-foreground)/0.7]">
                  <span className="text-red-500">🚨</span>
                  <span>Emergency contacts and safety info included</span>
                </div>
              </div>
              
              {/* Quick Actions */}
              <div className="mt-4 flex flex-wrap gap-2">
                <Button variant="outline" size="sm" onClick={trackClick}>
                  📱 Save to Phone
                </Button>
                <Button variant="outline" size="sm" onClick={trackClick}>
                  📧 Email Plan
                </Button>
                <Button variant="outline" size="sm" onClick={trackClick}>
                  🗺️ Download Map
                </Button>
              </div>
            </Card>
            
            <Card padding="lg">
              <div className="mb-3 flex items-center gap-2">
                <div className="text-xl">�</div>
                <h3 className="font-bold text-[var(--color-foreground)]">Day-by-Day Plan</h3>
              </div>
              <ol className="space-y-3 text-sm">
                {generated.steps.map((step, i) => (
                  <li key={i} className="flex gap-3">
                    <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[var(--color-primary-500)] text-xs font-bold text-white">
                      {i + 1}
                    </span>
                    <span className="text-[color:var(--color-foreground)/0.85]">{step}</span>
                  </li>
                ))}
              </ol>
              
              <div className="mt-4">
                <Button variant="primary" size="lg" onClick={trackClick}>
                  🚀 Start This Adventure!
                </Button>
              </div>
            </Card>
          </div>
        </div>
      )}
    </div>
  );
}
