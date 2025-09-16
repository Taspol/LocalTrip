"use client";
import { useEffect, useRef, useState } from 'react';

interface ScrollRevealProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  threshold?: number;
  direction?: 'up' | 'down' | 'left' | 'right' | 'scale';
}

export function ScrollReveal({ 
  children, 
  className = '', 
  delay = 0, 
  threshold = 0.1,
  direction = 'up'
}: ScrollRevealProps) {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => setIsVisible(true), delay);
        }
      },
      { threshold }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, [delay, threshold]);

  const getAnimationClass = () => {
    if (!isVisible) return 'opacity-0';
    
    switch (direction) {
      case 'up': return 'animate-fade-in-up';
      case 'down': return 'animate-slide-down';
      case 'left': return 'animate-slide-in-left';
      case 'right': return 'animate-slide-in-right';
      case 'scale': return 'animate-scale-in';
      default: return 'animate-fade-in';
    }
  };

  return (
    <div 
      ref={ref}
      className={`transition-all duration-700 ease-out ${getAnimationClass()} ${className}`}
    >
      {children}
    </div>
  );
}
