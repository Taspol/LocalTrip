"use client";
import { FeatureCard } from '../ui/Card';

export function SuggestUnseenCard() {
  return (
    <FeatureCard
      icon="target"
      title="Suggest New Spots"
      description="Share your secret hiking spots with the community and help fellow adventurers discover amazing trails."
      features={[
        "Submit trail recommendations",
        "Photo and GPS verification",
        "Community rating system",
        "Recognition rewards"
      ]}
      action={{
        label: "Suggest a Trail",
        onClick: () => {
          // Navigate to suggest page
          console.log("Navigate to suggest page");
        }
      }}
    />
  );
}
