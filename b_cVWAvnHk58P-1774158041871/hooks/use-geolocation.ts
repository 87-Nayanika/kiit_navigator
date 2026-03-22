"use client"

import { useState, useEffect, useCallback, useRef } from "react"

export interface GeolocationState {
  latitude: number | null
  longitude: number | null
  accuracy: number | null
  heading: number | null
  speed: number | null
  timestamp: number | null
  error: GeolocationPositionError | null
  loading: boolean
}

interface UseGeolocationOptions {
  enableHighAccuracy?: boolean
  timeout?: number
  maximumAge?: number
  watchPosition?: boolean
}

export function useGeolocation(options: UseGeolocationOptions = {}) {
  const {
    enableHighAccuracy = true,
    timeout = 10000,
    maximumAge = 0,
    watchPosition = false,
  } = options

  const [state, setState] = useState<GeolocationState>({
    latitude: null,
    longitude: null,
    accuracy: null,
    heading: null,
    speed: null,
    timestamp: null,
    error: null,
    loading: true,
  })

  const watchIdRef = useRef<number | null>(null)

  const onSuccess = useCallback((position: GeolocationPosition) => {
    setState({
      latitude: position.coords.latitude,
      longitude: position.coords.longitude,
      accuracy: position.coords.accuracy,
      heading: position.coords.heading,
      speed: position.coords.speed,
      timestamp: position.timestamp,
      error: null,
      loading: false,
    })
  }, [])

  const onError = useCallback((error: GeolocationPositionError) => {
    setState(prev => ({
      ...prev,
      error,
      loading: false,
    }))
  }, [])

  const getCurrentPosition = useCallback(() => {
    if (!navigator.geolocation) {
      setState(prev => ({
        ...prev,
        error: {
          code: 2,
          message: "Geolocation is not supported by this browser",
          PERMISSION_DENIED: 1,
          POSITION_UNAVAILABLE: 2,
          TIMEOUT: 3,
        } as GeolocationPositionError,
        loading: false,
      }))
      return
    }

    setState(prev => ({ ...prev, loading: true }))
    navigator.geolocation.getCurrentPosition(onSuccess, onError, {
      enableHighAccuracy,
      timeout,
      maximumAge,
    })
  }, [enableHighAccuracy, timeout, maximumAge, onSuccess, onError])

  const startWatching = useCallback(() => {
    if (!navigator.geolocation) return

    if (watchIdRef.current !== null) {
      navigator.geolocation.clearWatch(watchIdRef.current)
    }

    setState(prev => ({ ...prev, loading: true }))
    watchIdRef.current = navigator.geolocation.watchPosition(onSuccess, onError, {
      enableHighAccuracy,
      timeout,
      maximumAge,
    })
  }, [enableHighAccuracy, timeout, maximumAge, onSuccess, onError])

  const stopWatching = useCallback(() => {
    if (watchIdRef.current !== null) {
      navigator.geolocation.clearWatch(watchIdRef.current)
      watchIdRef.current = null
    }
  }, [])

  useEffect(() => {
    if (watchPosition) {
      startWatching()
    } else {
      getCurrentPosition()
    }

    return () => {
      stopWatching()
    }
  }, [watchPosition, getCurrentPosition, startWatching, stopWatching])

  return {
    ...state,
    getCurrentPosition,
    startWatching,
    stopWatching,
    isSupported: typeof navigator !== "undefined" && "geolocation" in navigator,
  }
}

// Calculate distance between two coordinates in meters
export function getDistanceFromLatLng(
  lat1: number,
  lng1: number,
  lat2: number,
  lng2: number
): number {
  const R = 6371000 // Earth's radius in meters
  const dLat = toRad(lat2 - lat1)
  const dLng = toRad(lng2 - lng1)
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) *
    Math.sin(dLng / 2) * Math.sin(dLng / 2)
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
  return R * c
}

function toRad(deg: number): number {
  return deg * (Math.PI / 180)
}

// Calculate bearing between two points
export function getBearingFromLatLng(
  lat1: number,
  lng1: number,
  lat2: number,
  lng2: number
): number {
  const dLng = toRad(lng2 - lng1)
  const y = Math.sin(dLng) * Math.cos(toRad(lat2))
  const x =
    Math.cos(toRad(lat1)) * Math.sin(toRad(lat2)) -
    Math.sin(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.cos(dLng)
  const bearing = Math.atan2(y, x) * (180 / Math.PI)
  return (bearing + 360) % 360
}

// Get compass direction from bearing
export function getCompassDirection(bearing: number): string {
  const directions = ["N", "NE", "E", "SE", "S", "SW", "W", "NW"]
  const index = Math.round(bearing / 45) % 8
  return directions[index]
}

// Format distance for display
export function formatDistance(meters: number): string {
  if (meters < 1000) {
    return `${Math.round(meters)} m`
  }
  return `${(meters / 1000).toFixed(1)} km`
}

// Format duration for display
export function formatDuration(seconds: number): string {
  if (seconds < 60) {
    return `${Math.round(seconds)} sec`
  }
  const minutes = Math.floor(seconds / 60)
  if (minutes < 60) {
    return `${minutes} min`
  }
  const hours = Math.floor(minutes / 60)
  const remainingMinutes = minutes % 60
  return `${hours}h ${remainingMinutes}m`
}

// Estimate time based on transport mode
export function estimateTime(meters: number, mode: "walk" | "bike" | "drive"): number {
  const speeds = {
    walk: 1.4, // 5 km/h in m/s
    bike: 4.2, // 15 km/h in m/s
    drive: 8.3, // 30 km/h in m/s (campus speed)
  }
  return meters / speeds[mode]
}
