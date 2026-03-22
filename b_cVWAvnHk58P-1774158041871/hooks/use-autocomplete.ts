"use client"

import { useState, useCallback, useRef, useEffect } from "react"
import { KIITPlace, searchPlaces } from "@/data/kiit-places"

interface UseAutocompleteOptions {
  debounceMs?: number
}

export function useAutocomplete({ debounceMs = 300 }: UseAutocompleteOptions = {}) {
  const [query, setQuery] = useState("")
  const [suggestions, setSuggestions] = useState<KIITPlace[]>([])
  const [isOpen, setIsOpen] = useState(false)
  const [selectedIndex, setSelectedIndex] = useState(-1)
  const [isLoading, setIsLoading] = useState(false)
  
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  const search = useCallback((searchQuery: string) => {
    if (debounceRef.current) {
      clearTimeout(debounceRef.current)
    }

    if (!searchQuery.trim()) {
      setSuggestions([])
      setIsOpen(false)
      setIsLoading(false)
      return
    }

    setIsLoading(true)

    debounceRef.current = setTimeout(() => {
      const results = searchPlaces(searchQuery)
      setSuggestions(results)
      setIsOpen(results.length > 0)
      setSelectedIndex(-1)
      setIsLoading(false)
    }, debounceMs)
  }, [debounceMs])

  const handleInputChange = useCallback((value: string) => {
    setQuery(value)
    search(value)
  }, [search])

  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
    if (!isOpen) return

    switch (e.key) {
      case "ArrowDown":
        e.preventDefault()
        setSelectedIndex(prev => 
          prev < suggestions.length - 1 ? prev + 1 : prev
        )
        break
      case "ArrowUp":
        e.preventDefault()
        setSelectedIndex(prev => prev > 0 ? prev - 1 : -1)
        break
      case "Enter":
        e.preventDefault()
        if (selectedIndex >= 0 && suggestions[selectedIndex]) {
          return suggestions[selectedIndex]
        }
        break
      case "Escape":
        setIsOpen(false)
        setSelectedIndex(-1)
        break
    }
    return null
  }, [isOpen, selectedIndex, suggestions])

  const selectPlace = useCallback((place: KIITPlace) => {
    setQuery(place.name)
    setIsOpen(false)
    setSelectedIndex(-1)
    return place
  }, [])

  const reset = useCallback(() => {
    setQuery("")
    setSuggestions([])
    setIsOpen(false)
    setSelectedIndex(-1)
  }, [])

  useEffect(() => {
    return () => {
      if (debounceRef.current) {
        clearTimeout(debounceRef.current)
      }
    }
  }, [])

  return {
    query,
    setQuery,
    suggestions,
    isOpen,
    setIsOpen,
    selectedIndex,
    setSelectedIndex,
    isLoading,
    handleInputChange,
    handleKeyDown,
    selectPlace,
    reset,
  }
}
