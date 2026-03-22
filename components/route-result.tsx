"use client"

import { useState, useEffect, useCallback } from "react"
import { 
  ArrowLeft, 
  MapPin, 
  Navigation, 
  Clock, 
  Footprints, 
  Car, 
  Bike,
  ChevronDown,
  ChevronUp,
  Navigation2,
  CornerDownLeft,
  CornerDownRight,
  ArrowUp,
  Volume2,
  VolumeX,
  LocateFixed,
  AlertTriangle,
  Loader2
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { KIITPlace } from "@/data/kiit-places"
import { CampusMap } from "@/components/campus-map"
import { cn } from "@/lib/utils"
import { format } from "date-fns"
import { 
  useGeolocation, 
  getDistanceFromLatLng, 
  formatDistance, 
  formatDuration,
  estimateTime
} from "@/hooks/use-geolocation"

interface RouteStep {
  instruction: string
  distance: number
  duration: number
  maneuver: {
    type: string
    modifier?: string
    location: [number, number]
  }
}

interface RouteData {
  coordinates: [number, number][]
  distance: number
  duration: number
  steps: RouteStep[]
}

interface RouteResultProps {
  from: KIITPlace
  to: KIITPlace
  date?: Date
  onBack: () => void
}

function getDirectionIcon(type: string, modifier?: string) {
  if (type === "arrive" || type === "destination") {
    return <MapPin className="h-4 w-4" />
  }
  if (type === "turn") {
    if (modifier?.includes("left")) {
      return <CornerDownLeft className="h-4 w-4" />
    }
    if (modifier?.includes("right")) {
      return <CornerDownRight className="h-4 w-4" />
    }
  }
  return <ArrowUp className="h-4 w-4" />
}

export function RouteResult({ from, to, date, onBack }: RouteResultProps) {
  const [selectedMode, setSelectedMode] = useState<"walk" | "bike" | "drive">("walk")
  const [showAllSteps, setShowAllSteps] = useState(false)
  const [isNavigating, setIsNavigating] = useState(false)
  const [currentStepIndex, setCurrentStepIndex] = useState(0)
  const [voiceEnabled, setVoiceEnabled] = useState(true)
  const [routeData, setRouteData] = useState<RouteData | null>(null)
  const [remainingDistance, setRemainingDistance] = useState<number>(0)
  const [remainingTime, setRemainingTime] = useState<number>(0)
  
  const { 
    latitude, 
    longitude, 
    accuracy,
    heading,
    loading: geoLoading, 
    error: geoError,
    startWatching,
    stopWatching,
    isSupported 
  } = useGeolocation({ 
    watchPosition: isNavigating,
    enableHighAccuracy: true 
  })

  const userLocation = latitude && longitude ? { lat: latitude, lng: longitude } : null

  // Calculate basic distance if no route data
  const basicDistance = getDistanceFromLatLng(
    from.coordinates.lat,
    from.coordinates.lng,
    to.coordinates.lat,
    to.coordinates.lng
  )

  const distance = routeData?.distance || basicDistance
  const walkTime = estimateTime(distance, "walk")
  const bikeTime = estimateTime(distance, "bike")
  const driveTime = estimateTime(distance, "drive")

  const times = { walk: walkTime, bike: bikeTime, drive: driveTime }
  const selectedTime = times[selectedMode]

  // Handle route calculation callback
  const handleRouteCalculated = useCallback((route: RouteData) => {
    setRouteData(route)
    setRemainingDistance(route.distance)
    setRemainingTime(route.duration)
  }, [])

  // Update remaining distance and current step based on user location
  useEffect(() => {
    if (!isNavigating || !userLocation || !routeData?.steps?.length) return

    // Find the closest step
    let closestStepIndex = currentStepIndex
    let minDistance = Infinity

    routeData.steps.forEach((step, index) => {
      if (index >= currentStepIndex) {
        const stepDist = getDistanceFromLatLng(
          userLocation.lat,
          userLocation.lng,
          step.maneuver.location[1],
          step.maneuver.location[0]
        )
        if (stepDist < minDistance) {
          minDistance = stepDist
          closestStepIndex = index
        }
      }
    })

    // Move to next step if within 20 meters
    if (minDistance < 20 && closestStepIndex > currentStepIndex) {
      setCurrentStepIndex(closestStepIndex)
      
      // Announce step
      if (voiceEnabled && typeof window !== "undefined" && "speechSynthesis" in window) {
        const utterance = new SpeechSynthesisUtterance(routeData.steps[closestStepIndex].instruction)
        utterance.rate = 0.9
        window.speechSynthesis.cancel()
        window.speechSynthesis.speak(utterance)
      }
    }

    // Calculate remaining distance to destination
    const distToDestination = getDistanceFromLatLng(
      userLocation.lat,
      userLocation.lng,
      to.coordinates.lat,
      to.coordinates.lng
    )
    setRemainingDistance(distToDestination)
    setRemainingTime(estimateTime(distToDestination, selectedMode))

    // Check if arrived
    if (distToDestination < 15) {
      if (voiceEnabled && typeof window !== "undefined" && "speechSynthesis" in window) {
        const utterance = new SpeechSynthesisUtterance("You have arrived at your destination")
        window.speechSynthesis.speak(utterance)
      }
      setIsNavigating(false)
    }
  }, [userLocation, isNavigating, routeData, currentStepIndex, voiceEnabled, to, selectedMode])

  const handleStartNavigation = () => {
    if (!isSupported) {
      alert("Geolocation is not supported by your browser")
      return
    }
    setIsNavigating(true)
    setCurrentStepIndex(0)
    setShowAllSteps(true)
    startWatching()

    if (voiceEnabled && typeof window !== "undefined" && "speechSynthesis" in window && routeData?.steps?.[0]) {
      const utterance = new SpeechSynthesisUtterance(`Starting navigation. ${routeData.steps[0].instruction}`)
      utterance.rate = 0.9
      window.speechSynthesis.speak(utterance)
    }
  }

  const handleStopNavigation = () => {
    setIsNavigating(false)
    setCurrentStepIndex(0)
    stopWatching()
    if (typeof window !== "undefined" && "speechSynthesis" in window) {
      window.speechSynthesis.cancel()
    }
  }

  const displayDistance = isNavigating ? remainingDistance : distance
  const displayTime = isNavigating ? remainingTime : selectedTime

  return (
    <div className="w-full max-w-lg mx-auto space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Button
            variant="ghost"
            size="icon"
            onClick={onBack}
            className="rounded-full hover:bg-secondary"
            disabled={isNavigating}
          >
            <ArrowLeft className="h-5 w-5" />
            <span className="sr-only">Go back</span>
          </Button>
          <div>
            <h2 className="text-lg font-semibold text-foreground">
              {isNavigating ? "Navigating" : "Route Details"}
            </h2>
            {date && !isNavigating && (
              <p className="text-sm text-muted-foreground">
                {format(date, "EEEE, MMMM d, yyyy")}
              </p>
            )}
            {isNavigating && userLocation && (
              <p className="text-sm text-muted-foreground flex items-center gap-1">
                <LocateFixed className="h-3 w-3" />
                Live tracking {accuracy && `(${Math.round(accuracy)}m accuracy)`}
              </p>
            )}
          </div>
        </div>
        {isNavigating && heading !== null && (
          <div className="flex items-center gap-2 px-3 py-1.5 bg-secondary rounded-full">
            <Navigation2 
              className="h-4 w-4 text-primary" 
              style={{ transform: `rotate(${heading}deg)` }}
            />
            <span className="text-xs font-medium">{Math.round(heading)}°</span>
          </div>
        )}
      </div>

      {/* Interactive Map with real-time user location */}
      <Card className="border-0 shadow-xl bg-card/95 backdrop-blur-sm overflow-hidden">
        <CampusMap 
          from={from} 
          to={to} 
          isNavigating={isNavigating}
          userLocation={userLocation}
          onRouteCalculated={handleRouteCalculated}
          className="h-[320px]"
        />
      </Card>

      {/* Live Stats when navigating */}
      {isNavigating && (
        <Card className="border-0 shadow-lg bg-primary text-primary-foreground">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-3xl font-bold">{formatDistance(displayDistance)}</p>
                <p className="text-sm opacity-90">remaining</p>
              </div>
              <div className="text-right">
                <p className="text-3xl font-bold">{formatDuration(displayTime)}</p>
                <p className="text-sm opacity-90">ETA</p>
              </div>
            </div>
            {routeData?.steps && currentStepIndex < routeData.steps.length && (
              <div className="mt-4 p-3 bg-white/10 rounded-xl">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                    {getDirectionIcon(
                      routeData.steps[currentStepIndex].maneuver.type,
                      routeData.steps[currentStepIndex].maneuver.modifier
                    )}
                  </div>
                  <div className="flex-1">
                    <p className="font-medium">{routeData.steps[currentStepIndex].instruction}</p>
                    {routeData.steps[currentStepIndex].distance > 0 && (
                      <p className="text-sm opacity-75">
                        {formatDistance(routeData.steps[currentStepIndex].distance)}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      )}

      {/* Route Summary */}
      <Card className="border-0 shadow-lg bg-card/95 backdrop-blur-sm">
        <CardContent className="p-4">
          {/* From - To Display */}
          <div className="flex items-center gap-3 mb-4 pb-4 border-b border-border">
            <div className="flex flex-col items-center">
              <div className="w-3 h-3 rounded-full bg-primary" />
              <div className="w-0.5 h-8 bg-border" />
              <div className="w-3 h-3 rounded-full bg-destructive" />
            </div>
            <div className="flex-1 space-y-3">
              <div>
                <p className="text-xs text-muted-foreground">From</p>
                <p className="font-medium text-foreground">{from.name}</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground">To</p>
                <p className="font-medium text-foreground">{to.name}</p>
              </div>
            </div>
          </div>

          {/* Quick Stats */}
          {!isNavigating && (
            <>
              <div className="grid grid-cols-2 gap-3 mb-4">
                <div className="text-center p-4 bg-secondary/50 rounded-xl">
                  <p className="text-2xl font-bold text-foreground">{formatDistance(distance)}</p>
                  <p className="text-xs text-muted-foreground">Total Distance</p>
                </div>
                <div className="text-center p-4 bg-secondary/50 rounded-xl">
                  <Clock className="h-5 w-5 text-primary mx-auto mb-1" />
                  <p className="text-2xl font-bold text-foreground">{formatDuration(selectedTime)}</p>
                  <p className="text-xs text-muted-foreground">Est. Time</p>
                </div>
              </div>

              {/* Transport Mode Selector */}
              <div className="flex gap-2 mb-4">
                <TransportButton
                  icon={Footprints}
                  label="Walk"
                  time={formatDuration(walkTime)}
                  isSelected={selectedMode === "walk"}
                  onClick={() => setSelectedMode("walk")}
                  recommended
                />
                <TransportButton
                  icon={Bike}
                  label="Bike"
                  time={formatDuration(bikeTime)}
                  isSelected={selectedMode === "bike"}
                  onClick={() => setSelectedMode("bike")}
                />
                <TransportButton
                  icon={Car}
                  label="Drive"
                  time={formatDuration(driveTime)}
                  isSelected={selectedMode === "drive"}
                  onClick={() => setSelectedMode("drive")}
                />
              </div>
            </>
          )}

          {/* Turn by Turn Directions */}
          {routeData?.steps && routeData.steps.length > 0 && (
            <div className="space-y-2">
              <button
                onClick={() => setShowAllSteps(!showAllSteps)}
                className="w-full flex items-center justify-between p-2 rounded-lg hover:bg-secondary/50 transition-colors"
              >
                <div className="flex items-center gap-2">
                  <Navigation2 className="h-4 w-4 text-primary" />
                  <span className="text-sm font-semibold text-foreground">
                    Turn-by-Turn ({routeData.steps.length} steps)
                  </span>
                </div>
                {showAllSteps ? (
                  <ChevronUp className="h-4 w-4 text-muted-foreground" />
                ) : (
                  <ChevronDown className="h-4 w-4 text-muted-foreground" />
                )}
              </button>
              
              {showAllSteps && (
                <div className="space-y-1 max-h-64 overflow-y-auto">
                  {routeData.steps.map((step, index) => (
                    <div
                      key={index}
                      className={cn(
                        "flex items-start gap-3 p-3 rounded-xl transition-all",
                        isNavigating && currentStepIndex === index 
                          ? "bg-primary/10 border-2 border-primary" 
                          : "bg-secondary/30",
                        isNavigating && currentStepIndex > index && "opacity-40"
                      )}
                    >
                      <div className={cn(
                        "w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0",
                        isNavigating && currentStepIndex === index
                          ? "bg-primary text-primary-foreground"
                          : "bg-secondary"
                      )}>
                        {getDirectionIcon(step.maneuver.type, step.maneuver.modifier)}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className={cn(
                          "text-sm font-medium",
                          isNavigating && currentStepIndex === index ? "text-primary" : "text-foreground"
                        )}>
                          {step.instruction}
                        </p>
                        {step.distance > 0 && (
                          <p className="text-xs text-muted-foreground mt-1">
                            {formatDistance(step.distance)} · {formatDuration(step.duration)}
                          </p>
                        )}
                      </div>
                      {isNavigating && currentStepIndex === index && (
                        <div className="w-2 h-2 bg-primary rounded-full animate-pulse" />
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* GPS Error Warning */}
          {isNavigating && geoError && (
            <div className="mt-4 p-3 bg-amber-500/10 border border-amber-500/30 rounded-xl flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-amber-500 flex-shrink-0" />
              <div>
                <p className="text-sm font-medium text-amber-600">GPS Signal Issue</p>
                <p className="text-xs text-muted-foreground">{geoError.message}</p>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Navigation Controls */}
      <div className="flex gap-2">
        {isNavigating ? (
          <>
            <Button
              size="icon"
              variant="secondary"
              onClick={() => setVoiceEnabled(!voiceEnabled)}
              className="h-14 w-14 rounded-xl"
            >
              {voiceEnabled ? (
                <Volume2 className="h-5 w-5" />
              ) : (
                <VolumeX className="h-5 w-5" />
              )}
            </Button>
            <Button
              size="lg"
              variant="destructive"
              onClick={handleStopNavigation}
              className="flex-1 h-14 text-base font-semibold rounded-xl"
            >
              End Navigation
            </Button>
          </>
        ) : (
          <Button
            size="lg"
            onClick={handleStartNavigation}
            disabled={geoLoading || !isSupported}
            className="w-full h-14 text-base font-semibold rounded-xl bg-blue-600 hover:bg-blue-700 transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]"
          >
            {geoLoading ? (
              <>
                <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                Getting Location...
              </>
            ) : (
              <>
                <Navigation className="mr-2 h-5 w-5" />
                Start Navigation
              </>
            )}
          </Button>
        )}
      </div>

      {/* Route Info */}
      <div className="text-center text-xs text-muted-foreground py-2">
        <p>via KIIT Campus Roads · Powered by OSRM</p>
      </div>
    </div>
  )
}

interface TransportButtonProps {
  icon: React.ComponentType<{ className?: string }>
  label: string
  time: string
  isSelected: boolean
  onClick: () => void
  recommended?: boolean
}

function TransportButton({ icon: Icon, label, time, isSelected, onClick, recommended }: TransportButtonProps) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "flex-1 flex flex-col items-center gap-1 p-3 rounded-xl border transition-all relative",
        isSelected
          ? "bg-primary/10 border-primary"
          : "bg-background border-border hover:border-primary/50"
      )}
    >
      {recommended && !isSelected && (
        <span className="absolute -top-2 left-1/2 -translate-x-1/2 px-1.5 py-0.5 bg-primary text-primary-foreground text-[10px] font-medium rounded">
          Best
        </span>
      )}
      <Icon className={cn("h-5 w-5", isSelected ? "text-primary" : "text-muted-foreground")} />
      <span className={cn("text-xs font-medium", isSelected ? "text-primary" : "text-foreground")}>{label}</span>
      <span className={cn("text-xs", isSelected ? "text-primary" : "text-muted-foreground")}>{time}</span>
    </button>
  )
}
