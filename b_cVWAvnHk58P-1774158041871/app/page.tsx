"use client"

import { useState, useCallback } from "react"
import { MapPin, Navigation2 } from "lucide-react"
import { SearchCard } from "@/components/search-card"
import { RouteResult } from "@/components/route-result"
import { RecentSearches } from "@/components/recent-searches"
import { ThemeToggle } from "@/components/theme-toggle"
import { KIITPlace } from "@/data/kiit-places"
import { useRecentSearches } from "@/hooks/use-recent-searches"

interface SearchResult {
  from: KIITPlace
  to: KIITPlace
  date?: Date
}

export default function HomePage() {
  const [searchResult, setSearchResult] = useState<SearchResult | null>(null)
  const { addRecentSearch } = useRecentSearches()

  const handleSearch = useCallback((from: KIITPlace, to: KIITPlace, date?: Date) => {
    addRecentSearch(from, to)
    setSearchResult({ from, to, date })
  }, [addRecentSearch])

  const handleBack = useCallback(() => {
    setSearchResult(null)
  }, [])

  const handleSelectRecentSearch = useCallback((from: KIITPlace, to: KIITPlace) => {
    handleSearch(from, to)
  }, [handleSearch])

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-secondary/20">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
        <div className="container max-w-lg mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="p-2 bg-primary rounded-lg">
              <Navigation2 className="h-5 w-5 text-primary-foreground" />
            </div>
            <div>
              <h1 className="font-bold text-foreground leading-tight">KIIT Navigate</h1>
              <p className="text-xs text-muted-foreground">Smart Campus Navigation</p>
            </div>
          </div>
          <ThemeToggle />
        </div>
      </header>

      {/* Main Content */}
      <main className="container max-w-lg mx-auto px-4 py-6">
        {searchResult ? (
          <RouteResult
            from={searchResult.from}
            to={searchResult.to}
            date={searchResult.date}
            onBack={handleBack}
          />
        ) : (
          <div className="space-y-6">
            {/* Hero Section */}
            <div className="text-center py-8">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
                <MapPin className="h-4 w-4" />
                Beta Version
              </div>
              <h2 className="text-3xl font-bold text-foreground text-balance">
                Navigate KIIT Campus
              </h2>
              <p className="mt-2 text-muted-foreground text-balance max-w-sm mx-auto">
                Find the fastest route between buildings, hostels, and landmarks on campus
              </p>
            </div>

            {/* Search Card */}
            <SearchCard onSearch={handleSearch} />

            {/* Recent Searches */}
            <RecentSearches onSelectSearch={handleSelectRecentSearch} />

            {/* Features Preview */}
            <div className="grid grid-cols-3 gap-3 pt-4">
              <FeatureCard
                icon="🗺️"
                title="Smart Routes"
                description="AI-powered"
              />
              <FeatureCard
                icon="⚡"
                title="Real-time"
                description="Live updates"
              />
              <FeatureCard
                icon="📱"
                title="Offline"
                description="Maps saved"
              />
            </div>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="fixed bottom-0 left-0 right-0 py-3 text-center text-xs text-muted-foreground bg-background/80 backdrop-blur-sm border-t border-border">
        <p>Built for KIIT University • Smart Campus Initiative</p>
      </footer>
    </div>
  )
}

function FeatureCard({ icon, title, description }: { icon: string; title: string; description: string }) {
  return (
    <div className="p-4 rounded-xl bg-card border border-border text-center">
      <span className="text-2xl">{icon}</span>
      <h3 className="text-sm font-semibold text-foreground mt-2">{title}</h3>
      <p className="text-xs text-muted-foreground">{description}</p>
    </div>
  )
}
