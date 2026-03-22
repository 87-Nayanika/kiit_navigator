"use client"

import { useState, useCallback, useEffect } from "react"
import { KIITPlace } from "@/data/kiit-places"

const STORAGE_KEY = "kiit-nav-recent-searches"
const MAX_RECENT_SEARCHES = 5

interface RecentSearch {
  from: KIITPlace
  to: KIITPlace
  timestamp: number
}

export function useRecentSearches() {
  const [recentSearches, setRecentSearches] = useState<RecentSearch[]>([])

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY)
      if (stored) {
        setRecentSearches(JSON.parse(stored))
      }
    } catch {
      // Ignore localStorage errors
    }
  }, [])

  const addRecentSearch = useCallback((from: KIITPlace, to: KIITPlace) => {
    setRecentSearches(prev => {
      const filtered = prev.filter(
        s => !(s.from.id === from.id && s.to.id === to.id)
      )
      const newSearches = [
        { from, to, timestamp: Date.now() },
        ...filtered,
      ].slice(0, MAX_RECENT_SEARCHES)
      
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(newSearches))
      } catch {
        // Ignore localStorage errors
      }
      
      return newSearches
    })
  }, [])

  const clearRecentSearches = useCallback(() => {
    setRecentSearches([])
    try {
      localStorage.removeItem(STORAGE_KEY)
    } catch {
      // Ignore localStorage errors
    }
  }, [])

  return {
    recentSearches,
    addRecentSearch,
    clearRecentSearches,
  }
}
