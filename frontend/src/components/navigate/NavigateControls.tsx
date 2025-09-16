"use client";
import { useState, useEffect } from "react";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { MockMap } from "@/components/ui/MockMap";

const trailMarkers = [
  { id: '1', lat: 20, lng: 30, label: 'Trailhead Start', type: 'start' as const },
  { id: '2', lat: 35, lng: 45, label: 'Forest Checkpoint', type: 'waypoint' as const },
  { id: '3', lat: 50, lng: 35, label: 'Mountain View', type: 'viewpoint' as const },
  { id: '4', lat: 65, lng: 55, label: 'Water Source', type: 'water' as const },
  { id: '5', lat: 80, lng: 40, label: 'Camp Site', type: 'campsite' as const },
  { id: '6', lat: 90, lng: 60, label: 'Summit Peak', type: 'end' as const }
];

const trailPath = [
  { lat: 20, lng: 30 }, { lat: 25, lng: 35 }, { lat: 35, lng: 45 },
  { lat: 45, lng: 40 }, { lat: 50, lng: 35 }, { lat: 60, lng: 50 },
  { lat: 65, lng: 55 }, { lat: 75, lng: 45 }, { lat: 80, lng: 40 },
  { lat: 85, lng: 50 }, { lat: 90, lng: 60 }
];

interface NavigateControlsProps {
  showLiveMap?: boolean;
  className?: string;
}

export function NavigateControls({ showLiveMap = true, className }: NavigateControlsProps) {
  const [tracking, setTracking] = useState(false);
  const [checkpoints, setCheckpoints] = useState<string[]>(["🚩 Trailhead"]);
  const [cpName, setCpName] = useState("");
  const [voice, setVoice] = useState(true);
  const [distance, setDistance] = useState("0.0");
  const [elevation, setElevation] = useState("0");

  useEffect(() => {
    if (tracking) {
      const interval = setInterval(() => {
        setDistance(prev => (parseFloat(prev) + 0.1).toFixed(1));
        setElevation(prev => (parseInt(prev) + Math.floor(Math.random() * 10)).toString());
      }, 2000);
      
      return () => clearInterval(interval);
    }
  }, [tracking, distance]);

  const addCp = () => {
    if (!cpName.trim()) return;
    setCheckpoints((c) => [...c, `📍 ${cpName.trim()}`]);
    setCpName("");
  };

  const toggleTracking = () => {
    setTracking(!tracking);
  };

  return (
    <div className={"space-y-6 " + (className || "")}>        
      {showLiveMap && (
      <Card padding="lg">
        <div className="mb-4 flex items-center gap-2">
          <div className="text-xl">🗺️</div>
          <h2 className="text-lg font-bold">Live Trail Map</h2>
          <div className={`ml-auto h-3 w-3 rounded-full ${tracking ? 'bg-green-500 animate-pulse' : 'bg-gray-300'}`} />
        </div>
        
        <MockMap
          height="h-80"
          markers={trailMarkers}
          trail={trailPath}
          showControls={true}
          animated={tracking}
          className="border-2 border-green-200"
        />

        {/* Quick Stats */}
        <div className="mt-4 grid grid-cols-3 gap-4 text-center">
          <div className="rounded-lg bg-green-50 p-3">
            <div className="text-xs text-green-600">Distance</div>
            <div className="text-lg font-bold text-green-700">{distance} km</div>
          </div>
          <div className="rounded-lg bg-blue-50 p-3">
            <div className="text-xs text-blue-600">Elevation</div>
            <div className="text-lg font-bold text-blue-700">{elevation} m</div>
          </div>
          <div className="rounded-lg bg-purple-50 p-3">
            <div className="text-xs text-purple-600">Progress</div>
            <div className="text-lg font-bold text-purple-700">
              {Math.min(100, Math.round((parseFloat(distance) / 5) * 100))}%
            </div>
          </div>
        </div>
  </Card>
  )}

      {/* Navigation Controls */}
      <Card padding="lg">
        <div className="mb-4 flex items-center gap-2">
          <div className="text-xl">🧭</div>
          <h2 className="text-lg font-bold">Navigation Control</h2>
        </div>
        
        <div className="mb-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className={`h-4 w-4 rounded-full ${tracking ? 'bg-green-500 animate-pulse' : 'bg-gray-300'}`} />
            <span className="text-sm font-medium">
              {tracking ? "🟢 Live Tracking" : "⚪ Tracking Paused"}
            </span>
            {tracking && (
              <span className="text-xs text-green-600 bg-green-50 px-2 py-1 rounded-full">
                GPS Strong
              </span>
            )}
          </div>
          
          <div className="flex gap-2">
            <Button 
              onClick={toggleTracking}
              variant={tracking ? "danger" : "success"}
              size="sm"
            >
              {tracking ? "⏸️ Pause" : "▶️ Start"}
            </Button>
            <Button 
              onClick={() => setVoice(!voice)}
              variant={voice ? "primary" : "outline"}
              size="sm"
            >
              {voice ? "🔊" : "🔇"}
            </Button>
          </div>
        </div>

        {/* Trail Progress */}
        <div className="mb-4">
          <div className="flex justify-between text-sm mb-2">
            <span>Trail Progress</span>
            <span>{Math.min(100, Math.round((parseFloat(distance) / 5) * 100))}% Complete</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className="bg-green-500 h-2 rounded-full transition-all duration-500"
              style={{ width: `${Math.min(100, (parseFloat(distance) / 5) * 100)}%` }}
            />
          </div>
        </div>
      </Card>

      {/* Checkpoints & Waypoints */}
      <Card padding="lg">
        <div className="mb-3 flex items-center gap-2">
          <div className="text-lg">📋</div>
          <h3 className="font-bold">Waypoints & Checkpoints</h3>
        </div>
        
        <div className="mb-4 flex gap-2">
          <input 
            className="flex-1 rounded-lg border border-[var(--color-border)] px-3 py-2 text-sm transition-all focus:border-[var(--color-primary-300)] focus:ring-2 focus:ring-[var(--color-primary-100)]" 
            placeholder="Add custom checkpoint..."
            value={cpName} 
            onChange={(e) => setCpName(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && addCp()}
          />
          <Button onClick={addCp} variant="primary" size="sm">
            ➕ Add
          </Button>
        </div>
        
        <div className="space-y-2 max-h-48 overflow-y-auto">
          {[...trailMarkers.map(m => `${m.type === 'start' ? '🚩' : m.type === 'end' ? '🏁' : m.type === 'viewpoint' ? '📸' : m.type === 'water' ? '💧' : m.type === 'campsite' ? '🏕️' : '📍'} ${m.label}`), ...checkpoints.slice(1)].map((checkpoint, i) => (
            <div key={i} className="flex items-center justify-between rounded-lg bg-[var(--color-primary-25)] p-3 border border-[var(--color-border)]">
              <span className="text-sm">{checkpoint}</span>
              {i === 0 && (
                <span className="rounded-full bg-green-100 px-2 py-1 text-xs text-green-700 font-medium">
                  Current
                </span>
              )}
              {i < 3 && i > 0 && (
                <span className="rounded-full bg-blue-100 px-2 py-1 text-xs text-blue-700 font-medium">
                  Next
                </span>
              )}
            </div>
          ))}
        </div>
      </Card>
      
      {/* Safety Dashboard */}
      <Card padding="lg">
        <div className="mb-3 flex items-center gap-2">
          <div className="text-lg">🛡️</div>
          <h3 className="font-bold">Safety Dashboard</h3>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4">
          <div className="flex items-center gap-2 p-2 bg-green-50 rounded-lg">
            <span className="text-green-500 text-lg">✓</span>
            <div className="text-sm">
              <div className="font-medium text-green-700">GPS Signal</div>
              <div className="text-green-600">Strong (8 satellites)</div>
            </div>
          </div>
          
          <div className="flex items-center gap-2 p-2 bg-green-50 rounded-lg">
            <span className="text-green-500 text-lg">✓</span>
            <div className="text-sm">
              <div className="font-medium text-green-700">Offline Maps</div>
              <div className="text-green-600">Downloaded (5.2 MB)</div>
            </div>
          </div>
          
          <div className="flex items-center gap-2 p-2 bg-yellow-50 rounded-lg">
            <span className="text-yellow-500 text-lg">⚠</span>
            <div className="text-sm">
              <div className="font-medium text-yellow-700">Weather Alert</div>
              <div className="text-yellow-600">Rain expected 3:00 PM</div>
            </div>
          </div>
          
          <div className="flex items-center gap-2 p-2 bg-blue-50 rounded-lg">
            <span className="text-blue-500 text-lg">🔋</span>
            <div className="text-sm">
              <div className="font-medium text-blue-700">Battery</div>
              <div className="text-blue-600">78% (6 hrs remaining)</div>
            </div>
          </div>
        </div>
        
        <div className="flex gap-2">
          <Button variant="outline" size="sm" className="flex-1">
            🆘 Emergency
          </Button>
          <Button variant="outline" size="sm" className="flex-1">
            📞 Call Ranger
          </Button>
          <Button variant="outline" size="sm" className="flex-1">
            📍 Share Location
          </Button>
        </div>
      </Card>
    </div>
  );
}
