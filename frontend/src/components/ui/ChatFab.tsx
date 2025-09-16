'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export function ChatFab() {
  const [isHovered, setIsHovered] = useState(false);
  const pathname = usePathname();
  
  // Don't show on chat page
  if (pathname === '/chat') return null;

  return (
    <div className="fixed bottom-6 right-6 z-40">
      <Link 
        href="/chat"
        className="group"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className="flex items-center gap-3">
          {/* Tooltip */}
          <div className={`px-4 py-2 bg-gray-900 text-white text-sm rounded-lg shadow-lg transition-all duration-300 ${
            isHovered ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-2 pointer-events-none'
          }`}>
            Chat with AI Guide 🤖
          </div>
          
          {/* FAB Button */}
          <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 rounded-full shadow-lg hover:shadow-xl flex items-center justify-center transition-all duration-300 hover:scale-110 group-active:scale-95">
            <div className="relative">
              {/* Chat Icon */}
              <svg 
                className="w-8 h-8 text-white" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" 
                />
              </svg>
              
              {/* Notification Dot */}
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full border-2 border-white animate-pulse" />
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
}
