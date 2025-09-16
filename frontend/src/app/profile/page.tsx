import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";

export default function ProfilePage() {
  const achievements = [
    { icon: "🏔️", title: "Peak Bagger", description: "Summited 5+ mountains", progress: 60 },
    { icon: "🥾", title: "Trail Blazer", description: "Completed 50km+ trails", progress: 80 },
    { icon: "📸", title: "Explorer", description: "Visited 10+ locations", progress: 40 },
  ];

  const recentTrips = [
    { name: "Scenic Ridge Loop", date: "3 days ago", distance: "12.4 km", status: "completed" },
    { name: "Emerald Falls Track", date: "1 week ago", distance: "8.7 km", status: "completed" },
    { name: "Azure Lake Circuit", date: "2 weeks ago", distance: "15.2 km", status: "completed" },
    { name: "Mountain Vista Trail", date: "Next week", distance: "18.5 km", status: "planned" },
  ];

  return (
    <main className="mx-auto max-w-6xl px-4 py-8">
      <div className="mb-6">
        <div className="flex items-center gap-2 mb-2">
          <div className="text-2xl">👤</div>
          <h1 className="text-3xl font-black text-[var(--color-foreground)]">Profile</h1>
        </div>
        <p className="text-[color:var(--color-foreground)/0.7]">
          Track your adventures and hiking progress
        </p>
      </div>

      {/* Stats Overview */}
      <Card padding="lg" className="mb-6">
        <div className="mb-4 flex items-center gap-2">
          {/* <div className="text-xl">📊</div> */}
          <h2 className="text-3xl font-bold">Adventure Stats</h2>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <div className="rounded-xl border border-[var(--color-primary-200)] bg-gradient-to-br from-[var(--color-primary-25)] to-[var(--color-primary-50)] p-4 text-center">
            <div className="text-xs text-[color:var(--color-foreground)/0.6]">Total Distance</div>
            <div className="text-2xl font-black text-[var(--color-primary-600)]">127.3 km</div>
          </div>
          <div className="rounded-xl border border-green-200 bg-gradient-to-br from-green-25 to-green-50 p-4 text-center">
            <div className="text-xs text-[color:var(--color-foreground)/0.6]">Trails Completed</div>
            <div className="text-2xl font-black text-green-600">23</div>
          </div>
          <div className="rounded-xl border border-yellow-200 bg-gradient-to-br from-yellow-25 to-yellow-50 p-4 text-center">
            <div className="text-xs text-[color:var(--color-foreground)/0.6]">Adventure Points</div>
            <div className="text-2xl font-black text-yellow-600">1,850</div>
          </div>
          <div className="rounded-xl border border-purple-200 bg-gradient-to-br from-purple-25 to-purple-50 p-4 text-center">
            <div className="text-xs text-[color:var(--color-foreground)/0.6]">Travel Style</div>
            <div className="text-lg font-black text-purple-600">🏃‍♂️ Adventurer</div>
          </div>
        </div>
      </Card>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Recent Trips */}
        <Card className="lg:col-span-2" padding="lg">
          <div className="mb-4 flex items-center justify-between">
            <div className="flex items-center gap-2">
              {/* <div className="text-xl">📅</div> */}
              <h2 className="text-3xl font-bold">Recent Trips</h2>
            </div>
            <Button variant="outline" size="sm">View All</Button>
          </div>
          <div className="space-y-3">
            {recentTrips.map((trip, i) => (
              <div key={i} className="flex items-center justify-between rounded-lg border border-[var(--color-border)] bg-[var(--color-primary-25)] p-4">
                <div className="flex items-center gap-3">
                  <div className={`h-3 w-3 rounded-full ${
                    trip.status === "completed" ? "bg-green-500" : 
                    trip.status === "planned" ? "bg-blue-500" : "bg-gray-300"
                  }`} />
                  <div>
                    <div className="font-semibold text-[var(--color-foreground)]">{trip.name}</div>
                    <div className="text-xs text-[color:var(--color-foreground)/0.6]">
                      {trip.date} • {trip.distance}
                    </div>
                  </div>
                </div>
                <Button variant="outline" size="sm">
                  {trip.status === "planned" ? "View Plan" : "Details"}
                </Button>
              </div>
            ))}
          </div>
        </Card>

        {/* Achievements & Preferences */}
        <div className="space-y-6">
          <Card padding="lg">
            <div className="mb-4 flex items-center gap-2">
              <div className="text-xl">🏆</div>
              <h3 className="text-lg font-bold">Achievements</h3>
            </div>
            <div className="space-y-4">
              {achievements.map((achievement, i) => (
                <div key={i} className="space-y-2">
                  <div className="flex items-center gap-2">
                    <span className="text-lg">{achievement.icon}</span>
                    <div className="flex-1">
                      <div className="text-sm font-semibold">{achievement.title}</div>
                      <div className="text-xs text-[color:var(--color-foreground)/0.6]">
                        {achievement.description}
                      </div>
                    </div>
                  </div>
                  <div className="w-full rounded-full bg-gray-200">
                    <div 
                      className="h-2 rounded-full bg-[var(--color-primary-500)] transition-all"
                      style={{ width: `${achievement.progress}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </Card>

          <Card padding="lg">
            <div className="mb-4 flex items-center gap-2">
              <div className="text-xl">⚙️</div>
              <h3 className="text-lg font-bold">Preferences</h3>
            </div>
            <div className="space-y-3">
              <label className="flex items-center justify-between">
                <span className="text-sm">Enable voice guidance</span>
                <input type="checkbox" defaultChecked className="rounded" />
              </label>
              <label className="flex items-center justify-between">
                <span className="text-sm">Offline mode by default</span>
                <input type="checkbox" defaultChecked className="rounded" />
              </label>
              <label className="flex items-center justify-between">
                <span className="text-sm">Share progress with friends</span>
                <input type="checkbox" className="rounded" />
              </label>
              <label className="flex items-center justify-between">
                <span className="text-sm">Weather alerts</span>
                <input type="checkbox" defaultChecked className="rounded" />
              </label>
            </div>
            <Button variant="primary" size="sm" className="mt-4 w-full">
              Save Preferences
            </Button>
          </Card>
        </div>
      </div>
    </main>
  );
}
