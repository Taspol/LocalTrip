'use client';

import Link from "next/link";
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { Logo } from './Logo';

export function Navbar() {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const isActive = (path: string) => pathname === path;

  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);

  const navigation = [
    { name: 'Home', href: '/' },
    { name: 'Plan Trip', href: '/plan' },
    { name: 'Navigate', href: '/navigate' },
    { name: 'Chat', href: '/chat' },
    { name: 'Profile', href: '/profile' },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b border-[var(--color-border)] bg-white shadow-lg">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4">
        {/* Logo */}
        <Link href="/" className="group">
          <Logo variant="full" className="hover:scale-105 transition-transform" />
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-2 text-sm">
          {navigation.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className={`relative flex items-center gap-2 rounded-lg px-4 py-2.5 font-medium transition-all duration-300 ease-smooth transform hover:scale-105 ${
                isActive(item.href)
                  ? 'bg-primary-500 text-white shadow-lg scale-105'
                  : 'text-gray-700 hover:bg-primary-50 hover:text-primary-600 hover:shadow-md'
              }`}
            >
              <span className="relative z-10">{item.name}</span>
              {isActive(item.href) && (
                <div className="absolute inset-0 bg-primary-500 rounded-lg animate-scale-in" />
              )}
            </Link>
          ))}
        </nav>

        {/* Desktop Profile */}
        <div className="hidden lg:flex items-center gap-3">
          <Link 
            href="/profile" 
            aria-label="Open profile" 
            className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-primary-100 to-primary-200 border-2 border-primary-300 text-sm font-bold text-primary-700 shadow-sm hover:shadow-md hover:scale-105 transition-all duration-300 hover:from-primary-200 hover:to-primary-300"
          >
            H
          </Link>
        </div>

        {/* Mobile menu button */}
        <button
          onClick={toggleMobileMenu}
          className="lg:hidden inline-flex items-center justify-center p-2 rounded-lg text-gray-700 hover:bg-primary-50 hover:text-primary-600 transition-colors-transform duration-300"
          aria-expanded={isMobileMenuOpen}
          aria-label="Toggle main menu"
        >
          <div className="relative w-6 h-6">
            <svg 
              className={`absolute inset-0 w-6 h-6 transition-all duration-300 ${!isMobileMenuOpen ? 'opacity-100 rotate-0' : 'opacity-0 rotate-45'}`} 
              xmlns="http://www.w3.org/2000/svg" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
            <svg 
              className={`absolute inset-0 w-6 h-6 transition-all duration-300 ${isMobileMenuOpen ? 'opacity-100 rotate-0' : 'opacity-0 -rotate-45'}`} 
              xmlns="http://www.w3.org/2000/svg" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </div>
        </button>
      </div>

      {/* Mobile menu */}
      <div className={`lg:hidden transition-all duration-400 ease-smooth ${
        isMobileMenuOpen ? 'max-h-80 opacity-100' : 'max-h-0 opacity-0 overflow-hidden'
      }`}>
        <div className="border-t border-gray-200 bg-white px-4 py-3 animate-slide-down">
          <nav className="space-y-1">
            {navigation.map((item, index) => (
              <Link
                key={item.name}
                href={item.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className={`flex items-center gap-3 rounded-lg px-4 py-3 text-base font-medium transition-all duration-300 transform hover:scale-105 ${
                  isActive(item.href)
                    ? 'bg-primary-500 text-white shadow-lg'
                    : 'text-gray-700 hover:bg-primary-50 hover:text-primary-600'
                }`}
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <span>{item.name}</span>
              </Link>
            ))}
            <div className="pt-3 border-t border-gray-200 mt-3">
              <Link
                href="/profile"
                onClick={() => setIsMobileMenuOpen(false)}
                className="flex items-center gap-3 rounded-lg px-4 py-3 text-base font-medium text-gray-700 hover:bg-primary-50 hover:text-primary-600 transition-colors-transform duration-300"
              >
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary-100 to-primary-200 border-2 border-primary-300 flex items-center justify-center text-sm font-bold text-primary-700 transition-transform duration-300 hover:scale-110">
                  H
                </div>
                <span>Your Profile</span>
              </Link>
            </div>
          </nav>
        </div>
      </div>
    </header>
  );
}
