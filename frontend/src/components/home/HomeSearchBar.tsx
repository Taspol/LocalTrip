"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";

export function HomeSearchBar() {
  const [q, setQ] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  
  const handleSearch = async () => {
    if (!q.trim()) return;
    setLoading(true);
    // Simulate search delay
    await new Promise(resolve => setTimeout(resolve, 800));
    router.push(`/plan?q=${encodeURIComponent(q)}`);
  };

  const handleQuickTag = (tag: string) => {
    setQ(tag);
  };

  return (
    <div className="rounded-xl border border-[var(--color-border)] bg-gradient-to-br from-white to-[var(--color-primary-25)] p-6 shadow-sm">
      <div className="mb-4 flex items-center gap-2">
        <Icon name="search" size={20} className="text-[var(--color-primary-600)]" />
        <h2 className="text-lg font-semibold text-[var(--color-foreground)]">Find your next adventure</h2>
      </div>
      
      <div className="flex gap-3">
        <input
          className="flex-1 rounded-lg border border-[var(--color-border)] px-4 py-3 text-sm outline-none transition-all focus:border-[var(--color-primary-300)] focus:ring-2 focus:ring-[var(--color-primary-100)]"
          placeholder="Search Doi Inthanon, Erawan Falls, Khao Yai..."
          value={q}
          onChange={(e) => setQ(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSearch()}
        />
        <Button 
          onClick={handleSearch}
          variant="primary"
          size="lg"
          loading={loading}
          disabled={!q.trim()}
        >
          Search
        </Button>
      </div>
      
      <div className="mt-4">
        <p className="mb-2 text-xs font-medium text-[color:var(--color-foreground)/0.7]">Popular categories</p>
        <div className="flex flex-wrap gap-2">
          {["Mountains", "Waterfalls", "National Parks", "Temples", "Islands", "Caves"].map((tag) => (
            <button
              key={tag}
              onClick={() => handleQuickTag(tag)}
              className="rounded-full border border-[var(--color-border)] bg-white px-3 py-1 text-xs transition-all hover:border-[var(--color-primary-300)] hover:bg-[var(--color-primary-50)]"
            >
              {tag}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
