import { TrailInfoPanel } from "@/components/trail/TrailInfoPanel";
import { MapView } from "@/components/map/MapView";
import { getTrail } from "@/lib/api/client";
import { ChatPanel } from "@/components/chat/ChatPanel";
import { ProGate } from "@/components/ui/ProGate";

export default async function TrailPage({ params }: { params: Promise<{ trailId: string }> }) {
  const { trailId } = await params;
  const trail = await getTrail(trailId);
  return (
    <main className="grid lg:grid-cols-[2fr_1fr] gap-4 p-4">
      <section className="h-[70vh] lg:h-[calc(100vh-2rem)] rounded-lg border overflow-hidden">
        <MapView trail={trail} />
      </section>
      <aside className="space-y-4">
        <div className="rounded-lg border p-4 bg-white shadow-sm">
          <TrailInfoPanel trail={trail} />
        </div>
        <ProGate feature="voiceNav">
          <div className="rounded-lg border p-4 bg-white shadow-sm">
            <p className="text-sm text-gray-600">Voice navigation controls would appear here during tracking.</p>
          </div>
        </ProGate>
        <ChatPanel />
      </aside>
    </main>
  );
}
