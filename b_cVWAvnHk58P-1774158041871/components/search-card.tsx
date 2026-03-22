"use client"

import { useState, useCallback } from "react"
import { ArrowUpDown, Calendar, Search, MapPin } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { LocationInput } from "@/components/location-input"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Calendar as CalendarComponent } from "@/components/ui/calendar"
import { KIITPlace, popularDestinations } from "@/data/kiit-places"
import { format } from "date-fns"
import { cn } from "@/lib/utils"

interface SearchCardProps {
  onSearch: (from: KIITPlace, to: KIITPlace, date?: Date) => void
}

export function SearchCard({ onSearch }: SearchCardProps) {
  const [from, setFrom] = useState<KIITPlace | null>(null)
  const [to, setTo] = useState<KIITPlace | null>(null)
  const [date, setDate] = useState<Date | undefined>(undefined)
  const [calendarOpen, setCalendarOpen] = useState(false)

  const handleSwap = useCallback(() => {
    const temp = from
    setFrom(to)
    setTo(temp)
  }, [from, to])

  const handleSearch = () => {
    if (from && to) {
      onSearch(from, to, date)
    }
  }

  const handlePopularClick = (place: KIITPlace) => {
    if (!from) {
      setFrom(place)
    } else if (!to) {
      setTo(place)
    } else {
      setTo(place)
    }
  }

  const isSearchDisabled = !from || !to

  return (
    <Card className="w-full max-w-lg mx-auto shadow-xl border-0 bg-card/95 backdrop-blur-sm">
      <CardContent className="p-6">
        <div className="space-y-4">
          {/* Header */}
          <div className="text-center mb-6">
            <h2 className="text-lg font-semibold text-foreground">Where do you want to go?</h2>
            <p className="text-sm text-muted-foreground mt-1">Find your route across KIIT campus</p>
          </div>

          {/* Location Inputs */}
          <div className="relative space-y-3">
            <LocationInput
              label="From"
              placeholder="Enter starting point"
              value={from}
              onChange={setFrom}
              icon="from"
            />
            
            {/* Swap Button */}
            <div className="absolute right-0 top-1/2 -translate-y-1/2 z-10">
              <Button
                type="button"
                variant="outline"
                size="icon"
                onClick={handleSwap}
                className="h-8 w-8 rounded-full bg-background border-2 border-primary/20 hover:border-primary hover:bg-primary/5 transition-all"
              >
                <ArrowUpDown className="h-4 w-4 text-primary" />
                <span className="sr-only">Swap locations</span>
              </Button>
            </div>

            <LocationInput
              label="To"
              placeholder="Enter destination"
              value={to}
              onChange={setTo}
              icon="to"
            />
          </div>

          {/* Date Field */}
          <div>
            <label className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-1.5 block">
              Date (Optional)
            </label>
            <Popover open={calendarOpen} onOpenChange={setCalendarOpen}>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className={cn(
                    "w-full justify-start text-left font-normal rounded-xl h-12 border-input",
                    !date && "text-muted-foreground"
                  )}
                >
                  <Calendar className="mr-2 h-4 w-4 text-primary" />
                  {date ? format(date, "PPP") : "Select date"}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <CalendarComponent
                  mode="single"
                  selected={date}
                  onSelect={(d) => {
                    setDate(d)
                    setCalendarOpen(false)
                  }}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </div>

          {/* Search Button */}
          <Button
            onClick={handleSearch}
            disabled={isSearchDisabled}
            className="w-full h-14 text-base font-semibold rounded-xl mt-2 transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]"
          >
            <Search className="mr-2 h-5 w-5" />
            Search Route
          </Button>
        </div>

        {/* Popular Destinations */}
        <div className="mt-6 pt-6 border-t border-border">
          <h3 className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-3">
            Popular Destinations
          </h3>
          <div className="flex flex-wrap gap-2">
            {popularDestinations.map((place) => (
              <button
                key={place.id}
                onClick={() => handlePopularClick(place)}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-secondary text-secondary-foreground text-xs font-medium hover:bg-primary hover:text-primary-foreground transition-colors"
              >
                <MapPin className="h-3 w-3" />
                {place.name.replace("Campus 15 – ", "").replace("Central ", "")}
              </button>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
