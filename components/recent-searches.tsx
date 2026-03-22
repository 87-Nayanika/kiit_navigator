"use client"

import { Clock, ArrowRight, X } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { useRecentSearches } from "@/hooks/use-recent-searches"
import { KIITPlace } from "@/data/kiit-places"

interface RecentSearchesProps {
  onSelectSearch: (from: KIITPlace, to: KIITPlace) => void
}

export function RecentSearches({ onSelectSearch }: RecentSearchesProps) {
  const { recentSearches, clearRecentSearches } = useRecentSearches()

  if (recentSearches.length === 0) return null

  return (
    <Card className="w-full max-w-lg mx-auto border-0 shadow-lg bg-card/90 backdrop-blur-sm">
      <CardContent className="p-4">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <Clock className="h-4 w-4 text-muted-foreground" />
            <h3 className="text-sm font-medium text-foreground">Recent Searches</h3>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={clearRecentSearches}
            className="h-7 text-xs text-muted-foreground hover:text-foreground"
          >
            <X className="h-3 w-3 mr-1" />
            Clear
          </Button>
        </div>
        <div className="space-y-2">
          {recentSearches.map((search, index) => (
            <button
              key={index}
              onClick={() => onSelectSearch(search.from, search.to)}
              className="w-full flex items-center gap-3 p-3 rounded-lg bg-secondary/50 hover:bg-secondary transition-colors text-left"
            >
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 text-sm">
                  <span className="font-medium text-foreground truncate max-w-[120px]">
                    {search.from.name}
                  </span>
                  <ArrowRight className="h-3 w-3 text-muted-foreground flex-shrink-0" />
                  <span className="font-medium text-foreground truncate max-w-[120px]">
                    {search.to.name}
                  </span>
                </div>
              </div>
            </button>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
