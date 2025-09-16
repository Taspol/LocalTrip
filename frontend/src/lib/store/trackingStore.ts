import { create, StateCreator } from "zustand";

type Point = { lat: number; lng: number; ts: number };

type TrackingState = {
  isTracking: boolean;
  path: Point[];
  start: () => void;
  stop: () => void;
  addPoint: (p: Point) => void;
  clear: () => void;
};

const creator: StateCreator<TrackingState> = (set: (partial: Partial<TrackingState> | ((state: TrackingState) => Partial<TrackingState>)) => void) => ({
  isTracking: false,
  path: [],
  start: () => set({ isTracking: true, path: [] }),
  stop: () => set({ isTracking: false }),
  addPoint: (p: Point) => set((s: TrackingState) => ({ path: [...s.path, p] })),
  clear: () => set({ path: [] }),
});

export const useTrackingStore = create<TrackingState>(creator);
