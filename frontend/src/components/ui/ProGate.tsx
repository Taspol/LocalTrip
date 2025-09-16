"use client";
import { useState } from "react";
import { Modal } from "@/components/ui/Modal";
import { Button } from "@/components/ui/Button";
import { isPro, type FeatureFlag } from "@/lib/feature/flags";

export function ProGate({ feature, children }: { feature: FeatureFlag; children: React.ReactNode }) {
  const [open, setOpen] = useState(false);

  if (!isPro(feature)) return <>{children}</>;

  return (
    <div>
      <div className="opacity-60 pointer-events-none">{children}</div>
      <div className="mt-2 text-xs text-gray-500">Pro feature</div>
      <Button className="mt-2" onClick={() => setOpen(true)}>Unlock Pro</Button>
      <Modal open={open} onClose={() => setOpen(false)}>
        <h2 className="text-lg font-semibold">Go Pro</h2>
        <p className="mt-2 text-sm text-gray-600">Unlock offline maps, voice nav, live tracking, and AR view.</p>
        <div className="mt-4 flex justify-end gap-2">
          <Button onClick={() => setOpen(false)}>Later</Button>
          <Button className="bg-blue-600 text-white hover:bg-blue-700">Upgrade</Button>
        </div>
      </Modal>
    </div>
  );
}
