import type { Trail } from "@/lib/types/trail";

export function TrailInfoPanel({ trail }: { trail: Trail }) {
  return (
    <div className="space-y-3">
      <h2 className="text-xl font-semibold">{trail.name}</h2>
      <p className="text-sm text-gray-600">{trail.summary}</p>
      <ul className="text-sm">
        <li>Distance: {trail.distanceKm.toFixed(1)} km</li>
        <li>Elevation gain: {trail.elevationGainM} m</li>
        <li>Difficulty: {trail.difficulty}</li>
      </ul>
      <div className="text-xs text-gray-500">
        Offline: {trail.offlineAvailable ? "Yes" : "No"} • Voice nav: {trail.voiceNav ? "Yes" : "No"}
      </div>
    </div>
  );
}
