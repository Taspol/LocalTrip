export type FeatureFlag = "offlineMaps" | "voiceNav" | "liveTracking" | "arView";

export const freeFeatures: FeatureFlag[] = [];
export const proFeatures: FeatureFlag[] = ["offlineMaps", "voiceNav", "liveTracking", "arView"];

export function isPro(feature: FeatureFlag) {
  return proFeatures.includes(feature);
}
