"use client";
import { FeatureCard } from '../ui/Card';

export function DiscoverCard() {
  return (
    <FeatureCard
      icon="sparkles"
      title="Discover Unseen"
      description="Explore hidden gems and secret trails in your area that few hikers have discovered."
      features={[
        "Off-the-beaten-path trails",
        "Local insider knowledge",
        "GPS coordinates included",
        "Difficulty ratings"
      ]}
      action={{
        label: "Find Hidden Trails",
        onClick: () => {
          // Navigate to discover page
          console.log("Navigate to discover page");
        }
      }}
    />
  );
}
