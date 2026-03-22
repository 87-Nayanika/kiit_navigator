"use client"

import { useEffect, useRef, useState, useCallback } from "react"
import { KIITPlace } from "@/data/kiit-places"
import { 
  roadNodes, 
  roadSegments,
  findNearestNode, 
  findOptimalPath, 
  getPathCoordinates,
  generateNavigationInstructions,
  type NavigationInstruction 
} from "@/data/kiit-roads"
import { cn } from "@/lib/utils"
import { Maximize2, Minus, Plus, Layers, LocateFixed, AlertCircle, Navigation2, MapPin } from "lucide-react"
import { Button } from "@/components/ui/button"

export function formatDistance(meters: number): string {
  if (meters < 1000) {
    return `${Math.round(meters)} m`
  }
  return `${(meters / 1000).toFixed(1)} km`
}

export interface RouteData {
  coordinates: [number, number][]
  distance: number
  duration: number
  steps: RouteStep[]
  optimalPath?: string[]
  instructions?: NavigationInstruction[]
}

export interface RouteStep {
  instruction: string
  distance: number
  duration: number
  maneuver: {
    type: string
    modifier?: string
    location: [number, number]
  }
}

interface CampusMapProps {
  from: KIITPlace
  to: KIITPlace
  isNavigating?: boolean
  userLocation?: { lat: number; lng: number; accuracy?: number; heading?: number } | null
  className?: string
  onRouteCalculated?: (route: RouteData) => void
  onDistanceUpdate?: (remainingDistance: number, remainingTime: number) => void
  showRoadNetwork?: boolean
}

declare global {
  interface Window {
    L: typeof import("leaflet")
  }
}

export function CampusMap({ 
  from, 
  to, 
  isNavigating = false, 
  userLocation,
  className,
  onRouteCalculated,
  onDistanceUpdate,
  showRoadNetwork = false
}: CampusMapProps) {
  const mapContainerRef = useRef<HTMLDivElement>(null)
  const mapRef = useRef<L.Map | null>(null)
  const routeLineRef = useRef<L.Polyline | null>(null)
  const userMarkerRef = useRef<L.Marker | null>(null)
  const accuracyCircleRef = useRef<L.Circle | null>(null)
  const startMarkerRef = useRef<L.Marker | null>(null)
  const endMarkerRef = useRef<L.Marker | null>(null)
  const roadNetworkLayerRef = useRef<L.LayerGroup | null>(null)
  const [mapLoaded, setMapLoaded] = useState(false)
  const [mapStyle, setMapStyle] = useState<"street" | "satellite">("street")
  const [routeData, setRouteData] = useState<RouteData | null>(null)
  const [routeError, setRouteError] = useState<string | null>(null)
  const [showNodes, setShowNodes] = useState(false)
  const tileLayerRef = useRef<L.TileLayer | null>(null)

  // Fetch real route from OSRM API
  const fetchRoute = useCallback(async (
    startLat: number, 
    startLng: number, 
    endLat: number, 
    endLng: number
  ): Promise<RouteData | null> => {
    try {
      setRouteError(null)
      const url = `https://router.project-osrm.org/route/v1/foot/${startLng},${startLat};${endLng},${endLat}?overview=full&geometries=geojson&steps=true`
      
      const response = await fetch(url)
      const data = await response.json()
      
      if (data.code !== "Ok" || !data.routes?.[0]) {
        throw new Error("Route not found")
      }
      
      const route = data.routes[0]
      const coordinates = route.geometry.coordinates.map((coord: [number, number]) => [coord[1], coord[0]] as [number, number])
      
      const steps: RouteStep[] = route.legs[0].steps.map((step: { maneuver: { type: string; modifier?: string; location: [number, number] }; name: string; distance: number; duration: number }) => ({
        instruction: formatStepInstruction(step.maneuver.type, step.maneuver.modifier, step.name),
        distance: step.distance,
        duration: step.duration,
        maneuver: step.maneuver
      }))
      
      const routeResult: RouteData = {
        coordinates,
        distance: route.distance,
        duration: route.duration,
        steps
      }
      
      setRouteData(routeResult)
      onRouteCalculated?.(routeResult)
      return routeResult
    } catch {
      setRouteError("Could not calculate route. Using direct path.")
      // Fallback to direct line
      return null
    }
  }, [onRouteCalculated])

  // Format step instruction
  function formatStepInstruction(type: string, modifier?: string, name?: string): string {
    const streetName = name || "the road"
    
    switch (type) {
      case "depart":
        return `Start on ${streetName}`
      case "arrive":
        return "You have arrived at your destination"
      case "turn":
        return `Turn ${modifier || ""} onto ${streetName}`
      case "continue":
        return `Continue on ${streetName}`
      case "merge":
        return `Merge onto ${streetName}`
      case "fork":
        return `Take the ${modifier || ""} fork onto ${streetName}`
      case "roundabout":
        return `At the roundabout, take the exit onto ${streetName}`
      default:
        return `Continue on ${streetName}`
    }
  }

  // Load Leaflet
  useEffect(() => {
    if (typeof window === "undefined") return

    if (window.L) {
      setMapLoaded(true)
      return
    }

    const cssLink = document.createElement("link")
    cssLink.rel = "stylesheet"
    cssLink.href = "https://unpkg.com/leaflet@1.9.4/dist/leaflet.css"
    document.head.appendChild(cssLink)

    const script = document.createElement("script")
    script.src = "https://unpkg.com/leaflet@1.9.4/dist/leaflet.js"
    script.onload = () => setMapLoaded(true)
    document.head.appendChild(script)
  }, [])

  // Initialize map
  useEffect(() => {
    if (!mapLoaded || !mapContainerRef.current || !window.L) return
    if (mapRef.current) return

    const L = window.L

    const centerLat = (from.coordinates.lat + to.coordinates.lat) / 2
    const centerLng = (from.coordinates.lng + to.coordinates.lng) / 2

    const map = L.map(mapContainerRef.current, {
      center: [centerLat, centerLng],
      zoom: 16,
      zoomControl: false,
      attributionControl: true,
    })

    mapRef.current = map

    // Add tile layer
    tileLayerRef.current = L.tileLayer("https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png", {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OSM</a> &copy; <a href="https://carto.com/attributions">CARTO</a>',
      maxZoom: 20,
    }).addTo(map)

    // Custom start marker (blue)
    const startIcon = L.divIcon({
      html: `
        <div style="
          width: 28px;
          height: 28px;
          background: #3b82f6;
          border: 4px solid white;
          border-radius: 50%;
          box-shadow: 0 2px 10px rgba(0,0,0,0.3);
          display: flex;
          align-items: center;
          justify-content: center;
        ">
          <div style="width: 10px; height: 10px; background: white; border-radius: 50%;"></div>
        </div>
      `,
      className: "custom-marker",
      iconSize: [28, 28],
      iconAnchor: [14, 14],
    })

    // Custom end marker (red pin)
    const endIcon = L.divIcon({
      html: `
        <div style="position: relative; width: 36px; height: 48px;">
          <svg viewBox="0 0 36 48" width="36" height="48">
            <path d="M18 0C8.06 0 0 8.06 0 18c0 12.6 18 30 18 30s18-17.4 18-30c0-9.94-8.06-18-18-18z" fill="#ef4444"/>
            <circle cx="18" cy="18" r="8" fill="white"/>
          </svg>
        </div>
      `,
      className: "custom-marker",
      iconSize: [36, 48],
      iconAnchor: [18, 48],
    })

    startMarkerRef.current = L.marker([from.coordinates.lat, from.coordinates.lng], { icon: startIcon })
      .addTo(map)
      .bindPopup(`<b>${from.name}</b><br>${from.description || "Start Point"}`)

    endMarkerRef.current = L.marker([to.coordinates.lat, to.coordinates.lng], { icon: endIcon })
      .addTo(map)
      .bindPopup(`<b>${to.name}</b><br>${to.description || "Destination"}`)

    // Fetch real route
    fetchRoute(
      from.coordinates.lat,
      from.coordinates.lng,
      to.coordinates.lat,
      to.coordinates.lng
    )

    // Fit map to bounds
    const bounds = L.latLngBounds([
      [from.coordinates.lat, from.coordinates.lng],
      [to.coordinates.lat, to.coordinates.lng]
    ])
    map.fitBounds(bounds.pad(0.3))

    return () => {
      if (mapRef.current) {
        mapRef.current.remove()
        mapRef.current = null
      }
    }
  }, [mapLoaded, from, to, fetchRoute])

  // Draw route line when route data is available
  useEffect(() => {
    if (!mapRef.current || !window.L) return

    const L = window.L

    // Remove existing route line
    if (routeLineRef.current) {
      mapRef.current.removeLayer(routeLineRef.current)
    }

    if (routeData?.coordinates) {
      // Draw shadow line
      L.polyline(routeData.coordinates, {
        color: "#1e40af",
        weight: 10,
        opacity: 0.3,
        lineCap: "round",
        lineJoin: "round",
      }).addTo(mapRef.current)

      // Draw main route line (blue like Google Maps)
      routeLineRef.current = L.polyline(routeData.coordinates, {
        color: "#4285f4",
        weight: 6,
        opacity: 1,
        lineCap: "round",
        lineJoin: "round",
      }).addTo(mapRef.current)
    } else if (!routeError) {
      // Fallback: direct line
      const directRoute: [number, number][] = [
        [from.coordinates.lat, from.coordinates.lng],
        [to.coordinates.lat, to.coordinates.lng]
      ]
      
      routeLineRef.current = L.polyline(directRoute, {
        color: "#4285f4",
        weight: 5,
        opacity: 0.8,
        dashArray: "10, 10",
        lineCap: "round",
        lineJoin: "round",
      }).addTo(mapRef.current)
    }
  }, [routeData, routeError, from, to])

  // Update user location marker
  useEffect(() => {
    if (!mapRef.current || !window.L || !userLocation) return

    const L = window.L

    // Create pulsing user marker
    const userIcon = L.divIcon({
      html: `
        <div style="position: relative;">
          <div style="
            width: 24px;
            height: 24px;
            background: #4285f4;
            border: 4px solid white;
            border-radius: 50%;
            box-shadow: 0 0 0 0 rgba(66, 133, 244, 0.4), 0 3px 10px rgba(0,0,0,0.3);
            animation: userPulse 2s ease-in-out infinite;
            position: relative;
            z-index: 1000;
          "></div>
          <div style="
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -70%) rotate(0deg);
            width: 0;
            height: 0;
            border-left: 8px solid transparent;
            border-right: 8px solid transparent;
            border-bottom: 14px solid #4285f4;
            filter: drop-shadow(0 1px 2px rgba(0,0,0,0.3));
            z-index: 1001;
          "></div>
        </div>
        <style>
          @keyframes userPulse {
            0%, 100% { box-shadow: 0 0 0 0 rgba(66, 133, 244, 0.4); }
            50% { box-shadow: 0 0 0 20px rgba(66, 133, 244, 0); }
          }
        </style>
      `,
      className: "user-location-marker",
      iconSize: [24, 24],
      iconAnchor: [12, 12],
    })

    if (userMarkerRef.current) {
      userMarkerRef.current.setLatLng([userLocation.lat, userLocation.lng])
    } else {
      userMarkerRef.current = L.marker([userLocation.lat, userLocation.lng], { 
        icon: userIcon,
        zIndexOffset: 1000 
      }).addTo(mapRef.current)
    }

    // Add accuracy circle
    if (accuracyCircleRef.current) {
      accuracyCircleRef.current.setLatLng([userLocation.lat, userLocation.lng])
    } else {
      accuracyCircleRef.current = L.circle([userLocation.lat, userLocation.lng], {
        radius: 30,
        color: "#4285f4",
        fillColor: "#4285f4",
        fillOpacity: 0.1,
        weight: 1,
      }).addTo(mapRef.current)
    }

    // Pan to user when navigating
    if (isNavigating) {
      mapRef.current.panTo([userLocation.lat, userLocation.lng], { animate: true, duration: 0.5 })
    }

  }, [userLocation, isNavigating])

  // Cleanup user marker when location is null
  useEffect(() => {
    if (!userLocation && mapRef.current) {
      if (userMarkerRef.current) {
        mapRef.current.removeLayer(userMarkerRef.current)
        userMarkerRef.current = null
      }
      if (accuracyCircleRef.current) {
        mapRef.current.removeLayer(accuracyCircleRef.current)
        accuracyCircleRef.current = null
      }
    }
  }, [userLocation])

  const handleZoomIn = () => mapRef.current?.zoomIn()
  const handleZoomOut = () => mapRef.current?.zoomOut()
  
  const handleRecenter = () => {
    if (!mapRef.current || !window.L) return
    
    if (userLocation && isNavigating) {
      mapRef.current.setView([userLocation.lat, userLocation.lng], 17, { animate: true })
    } else {
      const bounds = window.L.latLngBounds([
        [from.coordinates.lat, from.coordinates.lng],
        [to.coordinates.lat, to.coordinates.lng]
      ])
      mapRef.current.fitBounds(bounds.pad(0.3))
    }
  }

  const toggleMapStyle = () => {
    if (!mapRef.current || !window.L) return
    
    const newStyle = mapStyle === "street" ? "satellite" : "street"
    setMapStyle(newStyle)
    
    if (tileLayerRef.current) {
      mapRef.current.removeLayer(tileLayerRef.current)
    }

    const tileUrl = newStyle === "satellite" 
      ? "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
      : "https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"

    tileLayerRef.current = window.L.tileLayer(tileUrl, {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OSM</a>',
      maxZoom: 20,
    }).addTo(mapRef.current)
  }

  const distance = routeData?.distance || Math.round(
    Math.sqrt(
      Math.pow((to.coordinates.lat - from.coordinates.lat) * 111000, 2) +
      Math.pow((to.coordinates.lng - from.coordinates.lng) * 111000 * Math.cos(from.coordinates.lat * Math.PI / 180), 2)
    )
  )

  return (
    <div className={cn("relative rounded-xl overflow-hidden bg-muted", className)}>
      <div 
        ref={mapContainerRef} 
        className="w-full h-full min-h-[300px]"
        style={{ zIndex: 0 }}
      />

      {!mapLoaded && (
        <div className="absolute inset-0 flex items-center justify-center bg-muted">
          <div className="text-center">
            <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-2" />
            <p className="text-sm text-muted-foreground">Loading map...</p>
          </div>
        </div>
      )}

      {/* Map Controls */}
      <div className="absolute top-3 right-3 flex flex-col gap-2 z-10">
        <Button 
          size="icon" 
          variant="secondary" 
          className="h-10 w-10 rounded-lg shadow-lg bg-card/95 backdrop-blur-sm"
          onClick={handleZoomIn}
        >
          <Plus className="h-5 w-5" />
        </Button>
        <Button 
          size="icon" 
          variant="secondary" 
          className="h-10 w-10 rounded-lg shadow-lg bg-card/95 backdrop-blur-sm"
          onClick={handleZoomOut}
        >
          <Minus className="h-5 w-5" />
        </Button>
        <Button 
          size="icon" 
          variant="secondary" 
          className="h-10 w-10 rounded-lg shadow-lg bg-card/95 backdrop-blur-sm"
          onClick={toggleMapStyle}
        >
          <Layers className="h-5 w-5" />
        </Button>
        <Button 
          size="icon" 
          variant="secondary" 
          className="h-10 w-10 rounded-lg shadow-lg bg-card/95 backdrop-blur-sm"
          onClick={handleRecenter}
        >
          {isNavigating && userLocation ? (
            <LocateFixed className="h-5 w-5 text-primary" />
          ) : (
            <Maximize2 className="h-5 w-5" />
          )}
        </Button>
      </div>

      {/* Distance Badge */}
      <div className="absolute bottom-3 left-3 z-10">
        <div className="px-3 py-2 bg-card/95 backdrop-blur-sm rounded-lg shadow-lg">
          <p className="text-lg font-bold text-primary">{formatDistance(distance)}</p>
          {routeData && (
            <p className="text-xs text-muted-foreground">
              ~{Math.ceil(routeData.duration / 60)} min walk
            </p>
          )}
        </div>
      </div>

      {/* Navigation Status */}
      {isNavigating && userLocation && (
        <div className="absolute top-3 left-3 z-10">
          <div className="px-3 py-2 bg-primary text-primary-foreground rounded-lg shadow-lg flex items-center gap-2">
            <div className="w-2 h-2 bg-white rounded-full animate-pulse" />
            <span className="text-sm font-medium">Live Navigation</span>
          </div>
        </div>
      )}

      {/* Route Error */}
      {routeError && (
        <div className="absolute bottom-3 right-3 z-10">
          <div className="px-3 py-2 bg-amber-500/90 text-white rounded-lg shadow-lg flex items-center gap-2 text-xs">
            <AlertCircle className="h-4 w-4" />
            <span>Direct path shown</span>
          </div>
        </div>
      )}
    </div>
  )
}
