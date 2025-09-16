import { Card } from "@/components/ui/Card";
import { MockMap } from "@/components/ui/MockMap";

export function HowItWorks() {
  const steps = [
    { 
      icon: "🎯", 
      title: "Plan", 
      description: "Tell us your dates, style, and budget. Get a personalized trip overview with routes and gear recommendations." 
    },
    { 
      icon: "🧭", 
      title: "Navigate", 
      description: "Use offline maps and voice guidance with real-time checkpoints and safety alerts to stay on track." 
    },
    { 
      icon: "🤝", 
      title: "Share", 
      description: "Invite friends, track progress together, and export your plan for offline use anywhere." 
    },
  ];

  const demoMarkers = [
    { id: '1', lat: 20, lng: 25, label: 'Start Your Adventure', type: 'start' as const },
    { id: '2', lat: 50, lng: 40, label: 'Scenic Viewpoint', type: 'viewpoint' as const },
    { id: '3', lat: 80, lng: 30, label: 'Destination', type: 'end' as const }
  ];

  const demoTrail = [
    { lat: 20, lng: 25 }, { lat: 35, lng: 32 }, { lat: 50, lng: 40 }, 
    { lat: 65, lng: 35 }, { lat: 80, lng: 30 }
  ];

  return (
    <section className="space-y-8">
      <div className="flex items-center gap-2">
        <div className="text-2xl">✨</div>
        <h2 className="text-xl font-bold text-[var(--color-foreground)]">How it works</h2>
      </div>
      
      {/* Interactive Demo */}
      <Card padding="lg" className="mb-8">
        <div className="mb-4 text-center">
          <h3 className="text-lg font-semibold mb-2">🗺️ Interactive Trail Preview</h3>
          <p className="text-sm text-[color:var(--color-foreground)/0.7]">
            Experience our mapping technology - plan routes, view waypoints, and navigate with confidence
          </p>
        </div>
        <MockMap
          height="h-64"
          markers={demoMarkers}
          trail={demoTrail}
          showControls={true}
          animated={false}
          className="border border-green-200"
        />
      </Card>
      
      <div className="grid gap-4 md:grid-cols-3">
        {steps.map((step, i) => (
          <Card key={i} className="text-center" hover>
            <div className="mb-4 text-4xl">{step.icon}</div>
            <div className="mb-2 flex items-center justify-center gap-2">
              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[var(--color-primary-500)] text-xs font-bold text-white">
                {i + 1}
              </span>
              <h3 className="font-semibold text-[var(--color-foreground)]">{step.title}</h3>
            </div>
            <p className="text-sm text-[color:var(--color-foreground)/0.7] leading-relaxed">
              {step.description}
            </p>
          </Card>
        ))}
      </div>
    </section>
  );
}
