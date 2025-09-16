export type Trail = {
  id: string;
  name: string;
  summary: string;
  distanceKm: number;
  elevationGainM: number;
  difficulty: "easy" | "moderate" | "hard";
  offlineAvailable: boolean;
  voiceNav: boolean;
};
