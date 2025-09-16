"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import { ScrollReveal } from "@/components/ui/ScrollReveal";

export default function Home() {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  return (
    <main className="relative overflow-y-auto overflow-x-hidden snap-y snap-mandatory h-screen scroll-smooth">
      {/* Hero Section */}
      <section
        className="relative min-h-screen flex items-center justify-center bg-cover bg-center bg-no-repeat snap-start snap-always"
        style={{
          backgroundImage:
            'linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.6)), url("https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80")',
        }}
      >
        {/* Floating elements for visual interest */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-emerald-400 rounded-full animate-pulse opacity-70"></div>
          <div className="absolute top-1/3 right-1/4 w-1 h-1 bg-white rounded-full animate-pulse opacity-50"></div>
          <div className="absolute bottom-1/4 left-1/3 w-1.5 h-1.5 bg-emerald-300 rounded-full animate-pulse opacity-60"></div>
        </div>

        <div className="relative z-10 text-center text-white px-4 max-w-5xl mx-auto">
          <div
            className={`transition-all duration-1000 ${
              isLoaded
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-10"
            }`}
          >
            <div className="mb-6 inline-flex items-center px-4 py-2 bg-emerald-600/20 backdrop-blur-sm border border-emerald-400/30 rounded-full text-emerald-300 text-sm font-medium">
              🏔️ Southeast Asia&apos;s Premier Hiking Platform
            </div>
            <h1 className="text-5xl md:text-6xl lg:text-8xl font-black mb-8 leading-[0.9] tracking-tight">
              Plan Safer &<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-400">
                Smarter Adventures
              </span>
            </h1>
            <p className="text-xl md:text-2xl mb-12 text-gray-100 max-w-3xl mx-auto leading-relaxed font-light">
              The ultimate platform for hiking adventures in Southeast Asia.
              <br />
              <span className="text-emerald-300">
                AI-powered planning • Safety-first approach • Expert local
                guides
              </span>
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link href="/plan">
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white px-12 py-5 text-xl font-bold rounded-2xl transition-all duration-300 transform hover:scale-105 shadow-2xl shadow-emerald-600/25"
                >
                  Start Your Adventure
                  {/* <Icon name="arrowRight" size={20} className="ml-2" /> */}
                </Button>
              </Link>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute mb-8 bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-white/70 rounded-full mt-2 animate-pulse"></div>
          </div>
        </div>
      </section>

      {/* The Problem Section */}
      <section className="min-h-screen py-24 bg-gradient-to-b from-white to-gray-50 snap-start snap-always flex items-center">
        <div className="max-w-7xl mx-auto px-4 w-full">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <ScrollReveal direction="left" className="h-full">
              <div className="space-y-8">
                <div className="inline-flex items-center px-4 py-2 bg-red-100 border border-red-200 rounded-full text-red-700 text-sm font-medium">
                  ⚠️ Current Challenges
                </div>
                <h2 className="text-4xl md:text-6xl font-black text-gray-900 leading-tight">
                  The Problem
                  <br />
                  <span className="text-red-600">We&apos;re Solving</span>
                </h2>
                <div className="space-y-6">
                  <div className="flex items-start gap-4 p-4 bg-white rounded-xl shadow-sm border border-gray-100">
                    <div className="w-3 h-3 bg-red-500 rounded-full mt-2 flex-shrink-0"></div>
                    <div>
                      <h3 className="font-bold text-gray-900 mb-1">
                        Scattered Information
                      </h3>
                      <p className="text-gray-700">
                        Trail maps and reliable info are hard to find across
                        multiple sources.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4 p-4 bg-white rounded-xl shadow-sm border border-gray-100">
                    <div className="w-3 h-3 bg-red-500 rounded-full mt-2 flex-shrink-0"></div>
                    <div>
                      <h3 className="font-bold text-gray-900 mb-1">
                        Complex Booking Process
                      </h3>
                      <p className="text-gray-700">
                        Booking requires juggling multiple platforms and
                        providers.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4 p-4 bg-white rounded-xl shadow-sm border border-gray-100">
                    <div className="w-3 h-3 bg-red-500 rounded-full mt-2 flex-shrink-0"></div>
                    <div>
                      <h3 className="font-bold text-gray-900 mb-1">
                        Safety Gaps
                      </h3>
                      <p className="text-gray-700">
                        Safety registration is confusing and often skipped by
                        hikers.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4 p-4 bg-white rounded-xl shadow-sm border border-gray-100">
                    <div className="w-3 h-3 bg-red-500 rounded-full mt-2 flex-shrink-0"></div>
                    <div>
                      <h3 className="font-bold text-gray-900 mb-1">
                        Communication Breakdown
                      </h3>
                      <p className="text-gray-700">
                        Rangers lack real-time updates on hiker locations and
                        status.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </ScrollReveal>

            <ScrollReveal direction="right">
              <div className="relative">
                <div className="bg-gradient-to-br from-red-500 to-orange-600 rounded-3xl p-12 text-center text-white shadow-2xl transform rotate-3 hover:rotate-0 transition-transform duration-300">
                  <div className="text-7xl md:text-8xl font-black mb-6">
                    120K+
                  </div>
                  <p className="text-xl font-medium leading-relaxed">
                    Adventurers explore Southeast Asia yearly — but many face
                    preventable safety risks due to poor planning tools.
                  </p>
                </div>
                <div className="absolute -top-4 -right-4 w-24 h-24 bg-yellow-400 rounded-full flex items-center justify-center shadow-lg">
                  <span className="text-3xl">⚡</span>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="min-h-screen py-24 bg-gradient-to-br from-gray-50 to-gray-100 snap-start snap-always flex items-center">
        <div className="max-w-7xl mx-auto px-4 w-full">
          <ScrollReveal direction="up">
            <div className="text-center mb-20">
              <div className="inline-flex items-center px-4 py-2 bg-emerald-100 border border-emerald-200 rounded-full text-emerald-700 text-sm font-medium mb-6">
                🗺️ Simple Process
              </div>
              <h2 className="text-4xl md:text-6xl font-black text-gray-900 mb-6">
                How It{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-teal-600">
                  Works
                </span>
              </h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                From planning to completion, we&apos;ve got every step of your
                hiking journey covered.
              </p>
            </div>
          </ScrollReveal>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
            {/* Step 1 */}
            <ScrollReveal direction="up" delay={100}>
              <div className="relative text-center group">
                <div className="absolute -top-3 -right-3 w-8 h-8 bg-emerald-600 rounded-full flex items-center justify-center text-white font-bold text-sm z-10">
                  1
                </div>
                <div className="w-24 h-24 bg-gradient-to-br from-emerald-100 to-emerald-200 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:from-emerald-200 group-hover:to-emerald-300 transition-all duration-300 shadow-lg group-hover:shadow-xl transform group-hover:scale-105">
                  <Icon
                    name="mountain"
                    size={36}
                    className="text-emerald-600"
                  />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  Set Up Your Trip
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  Choose trek type, duration, interests, and budget preferences.
                </p>
              </div>
            </ScrollReveal>

            {/* Step 2 */}
            <ScrollReveal direction="up" delay={200}>
              <div className="relative text-center group">
                <div className="absolute -top-3 -right-3 w-8 h-8 bg-emerald-600 rounded-full flex items-center justify-center text-white font-bold text-sm z-10">
                  2
                </div>
                <div className="w-24 h-24 bg-gradient-to-br from-blue-100 to-blue-200 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:from-blue-200 group-hover:to-blue-300 transition-all duration-300 shadow-lg group-hover:shadow-xl transform group-hover:scale-105">
                  <Icon name="map" size={36} className="text-blue-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  AI Trip Planning
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  Get AI-powered trail info, transport & accommodation booking.
                </p>
              </div>
            </ScrollReveal>

            {/* Step 3 */}
            <ScrollReveal direction="up" delay={300}>
              <div className="relative text-center group">
                <div className="absolute -top-3 -right-3 w-8 h-8 bg-emerald-600 rounded-full flex items-center justify-center text-white font-bold text-sm z-10">
                  3
                </div>
                <div className="w-24 h-24 bg-gradient-to-br from-purple-100 to-purple-200 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:from-purple-200 group-hover:to-purple-300 transition-all duration-300 shadow-lg group-hover:shadow-xl transform group-hover:scale-105">
                  <Icon name="shield" size={36} className="text-purple-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  Safety Registration
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  Share itinerary & contacts with park rangers and authorities.
                </p>
              </div>
            </ScrollReveal>

            {/* Step 4 */}
            <ScrollReveal direction="up" delay={400}>
              <div className="relative text-center group">
                <div className="absolute -top-3 -right-3 w-8 h-8 bg-emerald-600 rounded-full flex items-center justify-center text-white font-bold text-sm z-10">
                  4
                </div>
                <div className="w-24 h-24 bg-gradient-to-br from-orange-100 to-orange-200 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:from-orange-200 group-hover:to-orange-300 transition-all duration-300 shadow-lg group-hover:shadow-xl transform group-hover:scale-105">
                  <Icon name="sun" size={36} className="text-orange-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  Pre-Trip Prep
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  Weather forecasts, checklists, safety tips, equipment rental.
                </p>
              </div>
            </ScrollReveal>
          </div>

          {/* Second Row */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Step 5 */}
            <ScrollReveal direction="up" delay={500}>
              <div className="relative text-center group">
                <div className="absolute -top-3 -right-3 w-8 h-8 bg-emerald-600 rounded-full flex items-center justify-center text-white font-bold text-sm z-10">
                  5
                </div>
                <div className="w-24 h-24 bg-gradient-to-br from-red-100 to-red-200 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:from-red-200 group-hover:to-red-300 transition-all duration-300 shadow-lg group-hover:shadow-xl transform group-hover:scale-105">
                  <Icon name="bell" size={36} className="text-red-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  Live Safety Tracking
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  Daily check-ins, GPS tracking, emergency SOS button.
                </p>
              </div>
            </ScrollReveal>

            {/* Step 6 */}
            <ScrollReveal direction="up" delay={600}>
              <div className="relative text-center group">
                <div className="absolute -top-3 -right-3 w-8 h-8 bg-emerald-600 rounded-full flex items-center justify-center text-white font-bold text-sm z-10">
                  6
                </div>
                <div className="w-24 h-24 bg-gradient-to-br from-teal-100 to-teal-200 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:from-teal-200 group-hover:to-teal-300 transition-all duration-300 shadow-lg group-hover:shadow-xl transform group-hover:scale-105">
                  <Icon
                    name="messageCircle"
                    size={36}
                    className="text-teal-600"
                  />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  AI Trail Assistant
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  Chat with AI for real-time updates & trail advice.
                </p>
              </div>
            </ScrollReveal>

            {/* Step 7 */}
            <ScrollReveal direction="up" delay={700}>
              <div className="relative text-center group">
                <div className="absolute -top-3 -right-3 w-8 h-8 bg-emerald-600 rounded-full flex items-center justify-center text-white font-bold text-sm z-10">
                  7
                </div>
                <div className="w-24 h-24 bg-gradient-to-br from-yellow-100 to-yellow-200 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:from-yellow-200 group-hover:to-yellow-300 transition-all duration-300 shadow-lg group-hover:shadow-xl transform group-hover:scale-105">
                  <Icon name="star" size={36} className="text-yellow-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  Share Experience
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  Leave reviews & share your amazing adventure story.
                </p>
              </div>
            </ScrollReveal>

            {/* Step 8 */}
            <ScrollReveal direction="up" delay={800}>
              <div className="relative text-center group">
                <div className="absolute -top-3 -right-3 w-8 h-8 bg-emerald-600 rounded-full flex items-center justify-center text-white font-bold text-sm z-10">
                  8
                </div>
                <div className="w-24 h-24 bg-gradient-to-br from-pink-100 to-pink-200 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:from-pink-200 group-hover:to-pink-300 transition-all duration-300 shadow-lg group-hover:shadow-xl transform group-hover:scale-105">
                  <Icon name="gift" size={36} className="text-pink-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  Earn Rewards
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  Gain points for safe adventures & community contributions.
                </p>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Key Features Section */}
      <section className="min-h-screen py-15 bg-white relative overflow-hidden snap-start snap-always flex items-center">
        {/* Background decoration */}
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-50/50 to-transparent"></div>
        <div className="absolute top-10 right-10 w-72 h-72 bg-emerald-100 rounded-full opacity-20 blur-3xl"></div>
        <div className="absolute bottom-10 left-10 w-72 h-72 bg-teal-100 rounded-full opacity-20 blur-3xl"></div>

        <div className="relative max-w-7xl mx-auto px-4 w-full">
          <ScrollReveal direction="up">
            <div className="text-center mb-2">
              <div className="inline-flex items-center px-4 py-2 bg-emerald-100 border border-emerald-200 rounded-full text-emerald-700 text-sm font-medium mb-6">
                ⚡ Powerful Features
              </div>
              <h2 className="text-4xl md:text-6xl font-black text-gray-900 mb-6">
                Why Choose{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-teal-600">
                  WildGuide
                </span>
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Advanced technology meets outdoor adventure. Experience the
                future of hiking with our comprehensive platform.
              </p>
            </div>
          </ScrollReveal>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Feature 1 */}
            <ScrollReveal direction="left" delay={100}>
              <div className="group relative bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-3xl p-8 text-white overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:scale-105">
                <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16"></div>
                <div className="relative z-10">
                  <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center mb-6 group-hover:bg-white/30 transition-colors">
                    <Icon name="zap" size={32} className="text-white" />
                  </div>
                  <h3 className="text-2xl font-bold mb-4">
                    AI-Powered Planning
                  </h3>
                  <p className="text-emerald-100 leading-relaxed">
                    Our advanced AI analyzes thousands of trails, weather
                    patterns, and user preferences to create the perfect
                    itinerary tailored just for you.
                  </p>
                  <div className="mt-6 flex items-center text-emerald-200 text-sm">
                    <span className="mr-2">⭐</span>
                    <span>99% user satisfaction rate</span>
                  </div>
                </div>
              </div>
            </ScrollReveal>

            {/* Feature 2 */}
            <ScrollReveal direction="right" delay={100}>
              <div className="group relative bg-gradient-to-br from-teal-500 to-teal-600 rounded-3xl p-8 text-white overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:scale-105">
                <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16"></div>
                <div className="relative z-10">
                  <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center mb-6 group-hover:bg-white/30 transition-colors">
                    <Icon name="map" size={32} className="text-white" />
                  </div>
                  <h3 className="text-2xl font-bold mb-4">
                    All-in-One Booking
                  </h3>
                  <p className="text-teal-100 leading-relaxed">
                    Book guides, transport, accommodation, and equipment all in
                    one place. No more juggling between multiple platforms and
                    providers.
                  </p>
                  <div className="mt-6 flex items-center text-teal-200 text-sm">
                    <span className="mr-2">🏆</span>
                    <span>Save 3+ hours per trip</span>
                  </div>
                </div>
              </div>
            </ScrollReveal>

            {/* Feature 3 */}
            <ScrollReveal direction="left" delay={200}>
              <div className="group relative bg-gradient-to-br from-green-600 to-green-700 rounded-3xl p-8 text-white overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:scale-105">
                <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16"></div>
                <div className="relative z-10">
                  <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center mb-6 group-hover:bg-white/30 transition-colors">
                    <Icon name="navigation" size={32} className="text-white" />
                  </div>
                  <h3 className="text-2xl font-bold mb-4">
                    Ranger-Connected Safety
                  </h3>
                  <p className="text-green-100 leading-relaxed">
                    Your safety is our priority. Real-time location sharing with
                    park rangers, automated check-ins, and instant emergency
                    response system.
                  </p>
                  <div className="mt-6 flex items-center text-green-200 text-sm">
                    <span className="mr-2">🛡️</span>
                    <span>24/7 safety monitoring</span>
                  </div>
                </div>
              </div>
            </ScrollReveal>

            {/* Feature 4 */}
            <ScrollReveal direction="right" delay={200}>
              <div className="group relative bg-gradient-to-br from-emerald-600 to-teal-700 rounded-3xl p-8 text-white overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:scale-105">
                <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16"></div>
                <div className="relative z-10">
                  <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center mb-6 group-hover:bg-white/30 transition-colors">
                    <Icon name="gift" size={32} className="text-white" />
                  </div>
                  <h3 className="text-2xl font-bold mb-4">
                    Rewards & Community
                  </h3>
                  <p className="text-emerald-100 leading-relaxed">
                    Earn points for every safe adventure, share experiences with
                    fellow hikers, and unlock exclusive perks from our partner
                    network.
                  </p>
                  <div className="mt-6 flex items-center text-emerald-200 text-sm">
                    <span className="mr-2">🎁</span>
                    <span>50,000+ active community members</span>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="min-h-screen py-24 bg-gradient-to-br from-gray-50 to-gray-100 relative overflow-hidden snap-start snap-always flex items-center">
        {/* Background decoration */}
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-50/30 to-transparent"></div>

        <div className="relative max-w-7xl mx-auto px-4 w-full">
          <ScrollReveal direction="up">
            <div className="text-center mb-20">
              <div className="inline-flex items-center px-4 py-2 bg-emerald-100 border border-emerald-200 rounded-full text-emerald-700 text-sm font-medium mb-6">
                💬 What Our Users Say
              </div>
              <h2 className="text-4xl md:text-6xl font-black text-gray-900 mb-6">
                Real Stories from
                <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-teal-600">
                  Real Travellers
                </span>
              </h2>
            </div>
          </ScrollReveal>

          <div className="grid md:grid-cols-4 gap-6 items-stretch">
            <ScrollReveal direction="left" className="h-full">
              <div className="group bg-white rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-105 relative overflow-hidden h-full flex flex-col">
                <div className="absolute top-0 right-0 w-24 h-24 bg-emerald-100 rounded-full -mr-12 -mt-12 opacity-50"></div>
                <div className="relative flex flex-col flex-1 justify-between">
                  <div className="flex items-center mb-6">
                    <div className="w-16 h-16 rounded-full bg-gradient-to-br from-emerald-400 to-teal-500 flex items-center justify-center text-white font-bold text-xl mr-4">
                      S
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-900 text-lg">
                        Spirare
                      </h4>
                      <p className="text-gray-600 text-sm">
                        Adventure Explorer
                      </p>
                      <div className="flex text-yellow-400 text-sm mt-1">
                        ⭐⭐⭐⭐⭐
                      </div>
                    </div>
                  </div>
                  <div className="text-4xl text-emerald-300 mb-4">&ldquo;</div>
                  <p className="text-lg text-gray-700 italic mb-6 leading-relaxed">
                    It was always awkward to manage trip costs in small groups.
                    The app makes it simple by showing clear cost splits, so
                    even two people can plan easily without stress.
                  </p>
                  <div className="flex items-center text-sm text-gray-500 mt-auto">
                     
                    <Icon name="mapPin" size={16} className="mr-2" />
                    Taipei, Taiwan
                  </div>
                </div>
              </div>
            </ScrollReveal>

            <ScrollReveal direction="left" className="h-full">
              <div className="group bg-white rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-105 relative overflow-hidden h-full flex flex-col">
                <div className="absolute top-0 right-0 w-24 h-24 bg-yellow-100 rounded-full -mr-12 -mt-12 opacity-50"></div>
                <div className="relative flex flex-col flex-1 justify-between">
                  <div className="flex items-center mb-6">
                    <div className="w-16 h-16 rounded-full bg-gradient-to-br from-yellow-400 to-orange-500 flex items-center justify-center text-white font-bold text-xl mr-4">
                      J
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-900 text-lg">
                        Julia Lee,
                      </h4>
                      <p className="text-gray-600 text-sm">
                        Adventure Explorer
                      </p>
                      <div className="flex text-yellow-400 text-sm mt-1">
                        ⭐⭐⭐⭐⭐
                      </div>
                    </div>
                  </div>
                  <div className="text-4xl text-emerald-300 mb-4">&ldquo;</div>
                  <p className="text-lg text-gray-700 italic mb-6 leading-relaxed">
                    I used to worry about accidents on hikes, especially when
                    there was no internet signal for emergencies. The app gave
                    me offline safety info and contact steps, which makes me
                    feel much more secure.
                  </p>
                  <div className="flex items-center text-sm text-gray-500 mt-auto">
                    <Icon name="mapPin" size={16} className="mr-2" />
                    Mount Kinabalu, Malaysia
                  </div>
                </div>
              </div>
            </ScrollReveal>

            <ScrollReveal direction="right" className="h-full">
              <div className="group bg-white rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-105 relative overflow-hidden h-full flex flex-col">
                <div className="absolute top-0 right-0 w-24 h-24 bg-red-100 rounded-full -mr-12 -mt-12 opacity-50"></div>
                <div className="relative flex flex-col flex-1 justify-between">
                  <div className="flex items-center mb-6">
                    <div className="w-16 h-16 rounded-full bg-gradient-to-br from-pink-400 to-red-500 flex items-center justify-center text-white font-bold text-xl mr-4">
                      P
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-900 text-lg">
                        Puttaraksa
                      </h4>
                      <p className="text-gray-600 text-sm">Thailand</p>
                      <div className="flex text-yellow-400 text-sm mt-1">
                        ⭐⭐⭐⭐⭐
                      </div>
                    </div>
                  </div>
                  <div className="text-4xl text-blue-300 mb-2">&ldquo;</div>
                  <p className="text-lg text-gray-700 italic mb-6 leading-relaxed">
                    Booking used to be a pain because links crashed or didn’t
                    update. Now the app keeps everything clear and up to date,
                    so I don’t waste time refreshing.
                  </p>
                  <div className="flex items-center text-sm text-gray-500 mt-auto">
                    <Icon name="mapPin" size={16} className="mr-2" />
                    Bangkok, Thailand
                  </div>
                </div>
              </div>
            </ScrollReveal>

            <ScrollReveal direction="right" className="h-full">
              <div className="group bg-white rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-105 relative overflow-hidden h-full flex flex-col">
                <div className="absolute top-0 right-0 w-24 h-24 bg-blue-100 rounded-full -mr-12 -mt-12 opacity-50"></div>
                <div className="relative flex flex-col flex-1 justify-between">
                  <div className="flex items-center mb-6">
                    <div className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-400 to-indigo-500 flex items-center justify-center text-white font-bold text-xl mr-4">
                      T
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-900 text-lg">
                        Tai Pattarawadee
                      </h4>
                      <p className="text-gray-600 text-sm">Thailand</p>
                      <div className="flex text-yellow-400 text-sm mt-1">
                        ⭐⭐⭐⭐⭐
                      </div>
                    </div>
                  </div>
                  <div className="text-4xl text-blue-300 mb-2">&ldquo;</div>
                  <p className="text-lg text-gray-700 italic mb-6 leading-relaxed">
                    Before, I had to call countless times just to get a spot.
                    The app makes the whole process smooth and direct, saving me
                    hours of effort.
                  </p>
                  <div className="flex items-center text-sm text-gray-500 mt-auto">
                    <Icon name="mapPin" size={16} className="mr-2" />
                    Thailand
                  </div>
                </div>
              </div>
            </ScrollReveal>
          </div>

          {/* Stats */}
          {/* <ScrollReveal direction="up" delay={300}>
            <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8">
              <div className="text-center">
                <div className="text-3xl font-black text-emerald-600 mb-2">
                  50K+
                </div>
                <p className="text-gray-600 text-sm">Happy Hikers</p>
              </div>
              <div className="text-center">
                <div className="text-3xl font-black text-emerald-600 mb-2">
                  1,200+
                </div>
                <p className="text-gray-600 text-sm">Trails Mapped</p>
              </div>
              <div className="text-center">
                <div className="text-3xl font-black text-emerald-600 mb-2">
                  99.8%
                </div>
                <p className="text-gray-600 text-sm">Safety Rate</p>
              </div>
              <div className="text-center">
                <div className="text-3xl font-black text-emerald-600 mb-2">
                  24/7
                </div>
                <p className="text-gray-600 text-sm">Support</p>
              </div>
            </div>
          </ScrollReveal> */}

        </div>
      </section>

      {/* Call to Action Section */}
      <section
        className="relative min-h-screen py-24 bg-cover bg-center bg-no-repeat snap-start snap-always flex items-center"
        style={{
          backgroundImage:
            'linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.6)), url("https://images.unsplash.com/photo-1551632811-561732d1e306?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80")',
        }}
      >
        {/* Overlay pattern */}
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-900/20 to-teal-900/20"></div>

        <div className="relative max-w-5xl mx-auto px-4 text-center text-white w-full">
          <ScrollReveal direction="up">
            <div className="mb-8 inline-flex items-center px-6 py-3 bg-emerald-600/20 backdrop-blur-sm border border-emerald-400/30 rounded-full text-emerald-300 text-lg font-medium">
              🚀 Join 50,000+ Adventurers
            </div>
            <h2 className="text-4xl md:text-6xl lg:text-7xl font-black mb-8 leading-tight">
              Ready to plan your
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-400">
                next adventure?
              </span>
            </h2>
            <p className="text-xl md:text-2xl mb-12 text-gray-100 max-w-3xl mx-auto leading-relaxed">
              Plan smart. Adventure safely. Explore more.
              <br />
              <span className="text-emerald-300">
                Start your Southeast Asian adventure today.
              </span>
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
              <Link href="/plan">
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white px-12 py-6 text-xl font-bold rounded-2xl transition-all duration-300 transform hover:scale-105 shadow-2xl shadow-emerald-600/25 rounded-full"
                >
                  Planning Your Adventure Now
                  {/* <Icon name="arrowRight" size={20} className="ml-3" /> */}
                </Button>
              </Link>
            </div>
            <div className="mt-8 items-center flex justify-center">
              <div className="flex items-center text-white/80 text-sm">
                <Icon
                  name="shield"
                  size={16}
                  className="mr-2 text-emerald-400"
                />
                <span>100% Free to start • No credit card required</span>
              </div>
            </div>

            {/* Trust indicators */}
            <div className="mt-16 grid grid-cols-2 md:grid-cols-3 gap-8 opacity-80">
              {/* <div className="flex flex-col items-center">
                <div className="text-2xl mb-2">🏆</div>
                <p className="text-sm text-gray-300">Award Winning</p>
              </div> */}
              <div className="flex flex-col items-center">
                <div className="text-2xl mb-2">🛡️</div>
                <p className="text-sm text-gray-300">Safety Certified</p>
              </div>
              <div className="flex flex-col items-center">
                <div className="text-2xl mb-2">⚡</div>
                <p className="text-sm text-gray-300">Instant Booking</p>
              </div>
              <div className="flex flex-col items-center">
                <div className="text-2xl mb-2">💬</div>
                <p className="text-sm text-gray-300">24/7 Support</p>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </main>
  );
}
