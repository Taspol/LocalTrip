'use client';

import { useState, useEffect } from 'react';

interface MockMapProps {
  height?: string;
  markers?: Array<{
    id: string;
    lat: number;
    lng: number;
    label: string;
    type?: 'start' | 'end' | 'waypoint' | 'campsite' | 'water' | 'viewpoint';
  }>;
  trail?: Array<{ lat: number; lng: number }>;
  showControls?: boolean;
  animated?: boolean;
  className?: string;
}

export function MockMap({ 
  height = 'h-64', 
  markers = [], 
  trail = [], 
  showControls = true,
  animated = false,
  className = ''
}: MockMapProps) {
  const [currentPosition, setCurrentPosition] = useState({ x: 50, y: 50 });
  const [mapStyle, setMapStyle] = useState<'terrain' | 'satellite' | 'road'>('terrain');

  useEffect(() => {
    if (animated) {
      const interval = setInterval(() => {
        setCurrentPosition(prev => ({
          x: prev.x + (Math.random() - 0.5) * 2,
          y: prev.y + (Math.random() - 0.5) * 2
        }));
      }, 2000);
      return () => clearInterval(interval);
    }
  }, [animated]);

  const getMarkerIcon = (type: string) => {
    switch (type) {
      case 'start': return '🚩';
      case 'end': return '🏁';
      case 'waypoint': return '📍';
      case 'campsite': return '🏕️';
      case 'water': return '💧';
      case 'viewpoint': return '📸';
      default: return '📍';
    }
  };

  const getMapBackground = () => {
    switch (mapStyle) {
      case 'terrain':
        return 'bg-gradient-to-br from-green-100 via-green-200 to-green-300';
      case 'satellite':
        return 'bg-gradient-to-br from-gray-600 via-gray-700 to-gray-800';
      case 'road':
        return 'bg-gradient-to-br from-gray-100 via-white to-gray-200';
      default:
        return 'bg-gradient-to-br from-green-100 via-green-200 to-green-300';
    }
  };

  return (
    <div className={`relative rounded-xl border border-[var(--color-border)] overflow-hidden shadow-lg ${height} ${className}`}>
      {/* Map Background */}
      <div className={`absolute inset-0 ${getMapBackground()}`}>
        {/* Terrain Features */}
        <svg className="absolute inset-0 w-full h-full opacity-30">
          {/* Mountains */}
          <polygon points="20,80 40,40 60,80" fill="currentColor" className="text-gray-600" />
          <polygon points="45,85 70,45 95,85" fill="currentColor" className="text-gray-700" />
          <polygon points="10,90 30,60 50,90" fill="currentColor" className="text-gray-500" />
          
          {/* Trees */}
          <circle cx="25" cy="70" r="3" fill="currentColor" className="text-green-600" />
          <circle cx="75" cy="65" r="4" fill="currentColor" className="text-green-700" />
          <circle cx="85" cy="75" r="2" fill="currentColor" className="text-green-500" />
          
          {/* Rivers */}
          <path d="M0,60 Q30,65 60,55 T120,50" stroke="currentColor" strokeWidth="2" fill="none" className="text-blue-400" />
        </svg>

        {/* Grid Overlay */}
        <div className="absolute inset-0 opacity-10">
          <div className="w-full h-full" style={{
            backgroundImage: `
              linear-gradient(rgba(0,0,0,0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(0,0,0,0.1) 1px, transparent 1px)
            `,
            backgroundSize: '20px 20px'
          }} />
        </div>
      </div>

      {/* Trail Path */}
      {trail.length > 0 && (
        <svg className="absolute inset-0 w-full h-full">
          <path
            d={`M ${trail.map(point => `${point.lat},${point.lng}`).join(' L ')}`}
            stroke="#ef4444"
            strokeWidth="3"
            fill="none"
            strokeDasharray="5,5"
            className="drop-shadow-sm"
          />
        </svg>
      )}

      {/* Current Position (if animated) */}
      {animated && (
        <div 
          className="absolute w-4 h-4 bg-blue-500 rounded-full border-2 border-white shadow-lg transition-all duration-2000 z-20"
          style={{ 
            left: `${Math.max(5, Math.min(95, currentPosition.x))}%`, 
            top: `${Math.max(5, Math.min(95, currentPosition.y))}%`,
            transform: 'translate(-50%, -50%)'
          }}
        >
          <div className="absolute inset-0 bg-blue-500 rounded-full animate-ping opacity-75" />
        </div>
      )}

      {/* Markers */}
  {markers.map((marker) => (
        <div
          key={marker.id}
          className="absolute z-10 transform -translate-x-1/2 -translate-y-1/2"
          style={{ left: `${marker.lat}%`, top: `${marker.lng}%` }}
        >
          <div className="relative group">
            <div className="text-2xl drop-shadow-lg hover:scale-110 transition-transform cursor-pointer">
              {getMarkerIcon(marker.type || 'waypoint')}
            </div>
            <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 bg-black text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
              {marker.label}
            </div>
          </div>
        </div>
      ))}

      {/* Map Controls */}
      {showControls && (
        <div className="absolute top-4 right-4 flex flex-col gap-2 z-30">
          {/* Zoom Controls */}
          <div className="bg-white rounded-lg shadow-md border border-[var(--color-border)] overflow-hidden">
            <button className="block w-8 h-8 flex items-center justify-center hover:bg-gray-50 border-b border-[var(--color-border)] text-gray-600 hover:text-gray-800">
              <span className="text-sm font-bold">+</span>
            </button>
            <button className="block w-8 h-8 flex items-center justify-center hover:bg-gray-50 text-gray-600 hover:text-gray-800">
              <span className="text-sm font-bold">−</span>
            </button>
          </div>

          {/* Map Style Selector */}
          <div className="bg-white rounded-lg shadow-md border border-[var(--color-border)] overflow-hidden">
            <button
              onClick={() => setMapStyle('terrain')}
              className={`block w-8 h-8 flex items-center justify-center text-xs ${
                mapStyle === 'terrain' ? 'bg-green-50 text-green-600' : 'hover:bg-gray-50 text-gray-600'
              }`}
              title="Terrain"
            >
              🏔️
            </button>
            <button
              onClick={() => setMapStyle('satellite')}
              className={`block w-8 h-8 flex items-center justify-center text-xs border-t border-[var(--color-border)] ${
                mapStyle === 'satellite' ? 'bg-green-50 text-green-600' : 'hover:bg-gray-50 text-gray-600'
              }`}
              title="Satellite"
            >
              🛰️
            </button>
            <button
              onClick={() => setMapStyle('road')}
              className={`block w-8 h-8 flex items-center justify-center text-xs border-t border-[var(--color-border)] ${
                mapStyle === 'road' ? 'bg-green-50 text-green-600' : 'hover:bg-gray-50 text-gray-600'
              }`}
              title="Road"
            >
              🗺️
            </button>
          </div>
        </div>
      )}

      {/* Compass */}
      <div className="absolute top-4 left-4 w-12 h-12 bg-white rounded-full shadow-md border border-[var(--color-border)] flex items-center justify-center z-30">
        <div className="relative">
          <div className="w-8 h-8 flex items-center justify-center text-red-500 font-bold text-xs">
            N
          </div>
          <div className="absolute inset-0 border border-gray-300 rounded-full" />
        </div>
      </div>

      {/* Scale Bar */}
      <div className="absolute bottom-4 left-4 bg-white rounded px-2 py-1 shadow-md border border-[var(--color-border)] text-xs text-gray-600 z-30">
        0 ━━━━━ 1 km
      </div>
    </div>
  );
}
