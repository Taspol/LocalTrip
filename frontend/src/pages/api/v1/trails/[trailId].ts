import type { NextApiRequest, NextApiResponse } from "next";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const { trailId } = req.query as { trailId: string };
  res.status(200).json({
    id: trailId,
    name: "Demo Trail",
    summary: "Scenic loop with moderate elevation and viewpoints.",
    distanceKm: 8.7,
    elevationGainM: 430,
    difficulty: "moderate",
    offlineAvailable: true,
    voiceNav: true,
  });
}
