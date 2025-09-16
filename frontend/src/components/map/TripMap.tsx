'use client';

import { useEffect, useState, useMemo } from 'react';
import dynamic from 'next/dynamic';

// Dynamically import map components to avoid SSR issues
const MapContainer = dynamic(() => import('react-leaflet').then(mod => mod.MapContainer), { ssr: false });
const TileLayer = dynamic(() => import('react-leaflet').then(mod => mod.TileLayer), { ssr: false });
const Marker = dynamic(() => import('react-leaflet').then(mod => mod.Marker), { ssr: false });
const Popup = dynamic(() => import('react-leaflet').then(mod => mod.Popup), { ssr: false });
const Polyline = dynamic(() => import('react-leaflet').then(mod => mod.Polyline), { ssr: false });

interface TripSpot {
  name: string;
  time: string;
  notes: string;
  lat: number;
  lng: number;
}

interface TimelineDay {
  day: number;
  activities: Array<{
    t: string;
    detail: string;
  }>;
}

interface TripMapProps {
  spots: TripSpot[];
  timeline: TimelineDay[];
  currentDay?: number;
}

// Mock coordinates for the locations (in real app, these would come from a geocoding service)
const locationCoordinates: { [key: string]: [number, number] } = {
  'Bangkok': [13.7563, 100.5018],
  'Chiang Mai': [18.7883, 98.9853],
  'Phrao District Homestay': [19.3667, 99.2167],
  'Community Library': [19.3670, 99.2170],
  'Trekking Trails': [19.3700, 99.2200],
  'Phrao Night Market': [19.3665, 99.2165]
};

export function TripMap({ spots, timeline, currentDay = 1 }: TripMapProps) {
  const [isClient, setIsClient] = useState(false);
  const [leafletLoaded, setLeafletLoaded] = useState(false);
  const [L, setL] = useState<typeof import('leaflet') | null>(null);
  // progressIndex represents position along routePath: 0 = start, n = nth coordinate in routePath
  const [progressIndex, setProgressIndex] = useState(0);

  useEffect(() => {
    setIsClient(true);
    
    // Dynamically import and configure Leaflet on client side only
    if (typeof window !== 'undefined') {
      import('leaflet').then((leaflet) => {
        try {
          // Fix for default icons in Leaflet
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          delete (leaflet.Icon.Default.prototype as any)._getIconUrl;
          leaflet.Icon.Default.mergeOptions({
            iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png',
            iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png',
            shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png',
          });
          setL(leaflet);
          setLeafletLoaded(true);
        } catch (error) {
          console.warn('Leaflet configuration error:', error);
        }
      });
    }
  }, []);

  // Create icon factory function to ensure fresh icons
  const createIcon = useMemo(() => {
    if (!leafletLoaded || !L) return null;
    
    return (color: string) => new L.Icon({
      iconUrl: `https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-${color}.png`,
      shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png',
      iconSize: [25, 41],
      iconAnchor: [12, 41],
      popupAnchor: [1, -34],
      shadowSize: [41, 41]
    });
  }, [leafletLoaded, L]);

  // Memoize icons to prevent recreation on every render
  const icons = useMemo(() => {
    if (!createIcon) return null;
    
    return {
      start: createIcon('green'),
      current: createIcon('red'),
      visited: createIcon('grey'),
      upcoming: createIcon('blue')
    };
  }, [createIcon]);

  // Full route path: start + all spot coordinates
  const routePath: [number, number][] = useMemo(() => [
    locationCoordinates['Bangkok'],
    ...spots.map(spot => locationCoordinates[spot.name] || [0, 0]).filter(c => c[0] !== 0)
  ], [spots]);

  // Current visible portion of path (progressive reveal)
  const visibleRoute = useMemo(() => routePath.slice(0, progressIndex + 1), [routePath, progressIndex]);

  if (!isClient || !leafletLoaded || !icons) {
    return (
      <div className="h-full w-full flex items-center justify-center bg-gray-100 rounded-xl">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-2"></div>
          <p className="text-gray-600">Loading map...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="h-full w-full relative">
      {/* Map Controls */}
  <div className="absolute top-4 left-4 z-[1000] bg-white rounded-lg shadow-lg p-4 max-w-xs">
        <h3 className="font-bold text-lg mb-2">Trip Progress</h3>
        <div className="space-y-2">
          <button
    onClick={() => setProgressIndex(i => Math.max(0, i - 1))}
    disabled={progressIndex === 0}
            className="w-full px-3 py-1 bg-blue-600 text-white rounded disabled:bg-gray-300 text-sm"
          >
            Previous Step
          </button>
          <p className="text-sm text-center">
    Step {progressIndex + 1} of {routePath.length}
          </p>
          <button
    onClick={() => setProgressIndex(i => Math.min(routePath.length - 1, i + 1))}
    disabled={progressIndex === routePath.length - 1}
            className="w-full px-3 py-1 bg-blue-600 text-white rounded disabled:bg-gray-300 text-sm"
          >
            Next Step
          </button>
        </div>
        
        {/* Current Activity */}
        <div className="mt-4 p-3 bg-blue-50 rounded">
          <h4 className="font-semibold text-sm">Current Activity:</h4>
      {progressIndex === 0 ? (
            <p className="text-xs text-gray-600">Starting from Bangkok</p>
          ) : (
            <div className="text-xs">
        <p className="font-medium">{spots[progressIndex - 1]?.name}</p>
        <p className="text-gray-600">{spots[progressIndex - 1]?.time}</p>
        <p className="text-gray-600">{spots[progressIndex - 1]?.notes}</p>
            </div>
          )}
        </div>
      </div>

      {/* Day Timeline */}
      <div className="absolute top-4 right-4 z-[1000] bg-white rounded-lg shadow-lg p-4 max-w-sm">
        <h3 className="font-bold text-lg mb-2">Day {currentDay} Timeline</h3>
        <div className="space-y-2 max-h-40 overflow-y-auto">
          {timeline.find(day => day.day === currentDay)?.activities.map((activity, index) => (
            <div key={index} className="flex gap-2 text-xs">
              <span className="font-medium text-blue-600 min-w-[50px]">{activity.t}</span>
              <span className="text-gray-700">{activity.detail}</span>
            </div>
          ))}
        </div>
      </div>

      <MapContainer
        center={[16.7563, 99.5018]} // Center between Bangkok and Chiang Mai
        zoom={7}
        style={{ height: '100%', width: '100%' }}
        className="rounded-xl"
  key={`map-${progressIndex}`} // Force re-render when step changes
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {/* Route Path */}
        {visibleRoute.length > 1 && (
          <Polyline
            key={`route-${progressIndex}`}
            positions={visibleRoute}
            color="#3b82f6"
            weight={4}
            opacity={0.7}
          />
        )}

        {/* Start Marker (Bangkok) */}
        <Marker 
          key="start-bangkok"
          position={locationCoordinates['Bangkok']} 
          icon={icons.start}
        >
          <Popup>
            <div className="text-center">
              <h3 className="font-bold">Bangkok</h3>
              <p className="text-sm">Starting Point</p>
              <p className="text-xs text-gray-600">Your journey begins here!</p>
            </div>
          </Popup>
        </Marker>

        {/* Trip Spots with dynamic icons based on current step */}
        {spots.map((spot, index) => {
          const coords = locationCoordinates[spot.name];
          if (!coords) return null;

          // routePath index for this spot is index + 1
          const spotRouteIdx = index + 1;
          let icon = icons.upcoming;
          let status = '⏳ Upcoming';

          if (spotRouteIdx < progressIndex) {
            icon = icons.visited;
            status = '✅ Visited';
          } else if (spotRouteIdx === progressIndex) {
            icon = icons.current;
            status = '📍 Current';
          }

          return (
            <Marker 
              key={`spot-${index}-${progressIndex}`} // Include progressIndex in key to force re-render
              position={coords} 
              icon={icon}
            >
              <Popup>
                <div>
                  <h3 className="font-bold">{spot.name}</h3>
                  <p className="text-sm font-medium text-blue-600">{spot.time}</p>
                  <p className="text-sm text-gray-600">{spot.notes}</p>
                  <div className="mt-2 text-xs">
                    Status: {status}
                  </div>
                </div>
              </Popup>
            </Marker>
          );
        })}
      </MapContainer>
    </div>
  );
}
