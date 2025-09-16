import Link from "next/link";
import { Card } from "@/components/ui/Card";
import { Icon } from "@/components/ui/Icon";

const featured = [
  { 
    id: "doi-inthanon", 
    name: "Doi Inthanon Summit Trail", 
    country: "Thailand", 
    distance: "8.2 km",
    difficulty: "Moderate",
    icon: "mountain",
    description: "Thailand's highest peak with stunning sunrise views and cool mountain air"
  },
  { 
    id: "erawan-falls", 
    name: "Erawan Falls 7-Tier Hike", 
    country: "Thailand", 
    distance: "3.5 km",
    difficulty: "Easy",
    icon: "droplets",
    description: "Famous emerald pools and waterfalls in Kanchanaburi province"
  },
  { 
    id: "khao-yai", 
    name: "Khao Yai Wildlife Circuit", 
    country: "Thailand", 
    distance: "12.8 km",
    difficulty: "Hard",
    icon: "trees",
    description: "UNESCO World Heritage site with elephants, gibbons, and tropical birds"
  },
];

export function FeaturedDestinations() {
  return (
    <section className="space-y-4">
      <div className="flex items-center gap-3">
        <div className="p-2 bg-wilderness-green-100 rounded-lg">
          <Icon name="star" className="text-wilderness-green-600" size={24} />
        </div>
        <h2 className="text-xl font-bold text-[var(--color-foreground)]">Featured destinations</h2>
      </div>
      
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {featured.map((destination, i) => (
          <Link key={i} href={`/trail/${destination.id}`} className="block">
            <Card hover className="h-full">
              <div className="mb-4 p-3 bg-wilderness-green-100 rounded-xl w-fit">
                <Icon name={destination.icon} className="text-wilderness-green-600" size={32} />
              </div>
              <div className="space-y-2">
                <h3 className="font-semibold text-[var(--color-foreground)]">{destination.name}</h3>
                <p className="text-sm text-[color:var(--color-foreground)/0.7]">{destination.description}</p>
                <div className="flex items-center justify-between text-xs">
                  <div className="flex items-center gap-1 text-[color:var(--color-foreground)/0.6]">
                    <Icon name="mapPin" size={14} />
                    <span>{destination.country} • {destination.distance}</span>
                  </div>
                  <span className={`rounded-full px-2 py-1 text-xs font-medium ${
                    destination.difficulty === "Easy" ? "bg-green-100 text-green-700" :
                    destination.difficulty === "Moderate" ? "bg-yellow-100 text-yellow-700" :
                    "bg-red-100 text-red-700"
                  }`}>
                    {destination.difficulty}
                  </span>
                </div>
              </div>
            </Card>
          </Link>
        ))}
      </div>
    </section>
  );
}
