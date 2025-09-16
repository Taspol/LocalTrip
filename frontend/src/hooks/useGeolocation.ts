"use client";
import { useEffect, useState } from "react";

export function useGeolocation() {
  const [coords, setCoords] = useState<GeolocationCoordinates | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!("geolocation" in navigator)) {
      setError("Geolocation not supported");
      return;
    }
    const watchId = navigator.geolocation.watchPosition(
      (pos) => setCoords(pos.coords),
      (err) => setError(err.message),
      { enableHighAccuracy: true, maximumAge: 5000, timeout: 10000 }
    );
    return () => navigator.geolocation.clearWatch(watchId);
  }, []);

  return { coords, error };
}
