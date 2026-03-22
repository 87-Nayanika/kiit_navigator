"use client"

import { useRef, useEffect } from "react"
import { MapPin, Clock, Building2, Home, Landmark } from "lucide-react"
import { cn } from "@/lib/utils"
import { KIITPlace } from "@/data/kiit-places"
import { useAutocomplete } from "@/hooks/use-autocomplete"
import { Spinner } from "@/components/ui/spinner"

interface LocationInputProps {
  label: string
  placeholder: string
  value: KIITPlace | null
  onChange: (place: KIITPlace) => void
  icon?: "from" | "to"
  className?: string
}

function getCategoryIcon(category: KIITPlace["category"]) {
  switch (category) {
    case "campus":
      return <Building2 className="h-4 w-4 text-primary" />
    case "academic":
      return <Building2 className="h-4 w-4 text-primary" />
    case "hostel":
      return <Home className="h-4 w-4 text-primary" />
    case "landmark":
      return <Landmark className="h-4 w-4 text-primary" />
    default:
      return <MapPin className="h-4 w-4 text-primary" />
  }
}

function highlightMatch(text: string, query: string) {
  if (!query.trim()) return text
  
  const regex = new RegExp(`(${query.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")})`, "gi")
  const parts = text.split(regex)
  
  return parts.map((part, i) => 
    regex.test(part) ? (
      <span key={i} className="font-semibold text-primary">{part}</span>
    ) : (
      part
    )
  )
}

export function LocationInput({
  label,
  placeholder,
  value,
  onChange,
  icon = "from",
  className,
}: LocationInputProps) {
  const inputRef = useRef<HTMLInputElement>(null)
  const dropdownRef = useRef<HTMLDivElement>(null)
  
  const {
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
  } = useAutocomplete()

  useEffect(() => {
    if (value) {
      setQuery(value.name)
    }
  }, [value, setQuery])

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node) &&
        inputRef.current &&
        !inputRef.current.contains(e.target as Node)
      ) {
        setIsOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [setIsOpen])

  const handleSelect = (place: KIITPlace) => {
    selectPlace(place)
    onChange(place)
  }

  const onKeyDown = (e: React.KeyboardEvent) => {
    const result = handleKeyDown(e)
    if (e.key === "Enter" && selectedIndex >= 0 && suggestions[selectedIndex]) {
      handleSelect(suggestions[selectedIndex])
    }
  }

  return (
    <div className={cn("relative", className)}>
      <label className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-1.5 block">
        {label}
      </label>
      <div className="relative">
        <div className="absolute left-3 top-1/2 -translate-y-1/2 flex items-center justify-center">
          {icon === "from" ? (
            <div className="h-3 w-3 rounded-full border-2 border-primary bg-background" />
          ) : (
            <MapPin className="h-4 w-4 text-primary" />
          )}
        </div>
        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={(e) => handleInputChange(e.target.value)}
          onKeyDown={onKeyDown}
          onFocus={() => {
            if (suggestions.length > 0) setIsOpen(true)
          }}
          placeholder={placeholder}
          className={cn(
            "w-full rounded-xl border border-input bg-background pl-10 pr-10 py-3",
            "text-sm placeholder:text-muted-foreground",
            "focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary",
            "transition-all duration-200"
          )}
        />
        {isLoading && (
          <div className="absolute right-3 top-1/2 -translate-y-1/2">
            <Spinner className="h-4 w-4 text-muted-foreground" />
          </div>
        )}
      </div>

      {isOpen && suggestions.length > 0 && (
        <div
          ref={dropdownRef}
          className="absolute z-50 top-full mt-2 w-full bg-popover border border-border rounded-xl shadow-lg overflow-hidden"
        >
          <ul className="py-2 max-h-64 overflow-y-auto">
            {suggestions.map((place, index) => (
              <li key={place.id}>
                <button
                  type="button"
                  onClick={() => handleSelect(place)}
                  onMouseEnter={() => setSelectedIndex(index)}
                  className={cn(
                    "w-full px-4 py-2.5 flex items-center gap-3 text-left transition-colors",
                    selectedIndex === index
                      ? "bg-accent"
                      : "hover:bg-accent/50"
                  )}
                >
                  <div className="flex-shrink-0">
                    {getCategoryIcon(place.category)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-medium text-foreground truncate">
                      {highlightMatch(place.name, query)}
                    </div>
                    {place.description && (
                      <div className="text-xs text-muted-foreground truncate">
                        {place.description}
                      </div>
                    )}
                  </div>
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}
