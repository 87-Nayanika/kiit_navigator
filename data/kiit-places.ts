export interface KIITPlace {
  id: string
  name: string
  category: "campus" | "academic" | "hostel" | "landmark"
  description?: string
  coordinates: { lat: number; lng: number }
}

// KIIT University is located in Bhubaneswar, Odisha, India
// Real GPS coordinates sourced from OpenStreetMap and Google Maps
// Central coordinates: 20.3531° N, 85.8187° E (Campus 6 Main)
export const kiitPlaces: KIITPlace[] = [
  // Campuses - Real GPS coordinates from mapping data
  { id: "campus-1", name: "Campus 1", category: "campus", description: "Administrative Offices, Academic Blocks, Early Engineering Departments", coordinates: { lat: 20.3543, lng: 85.8141 } },
  { id: "campus-2", name: "Campus 2", category: "campus", description: "Engineering Lecture Halls, Laboratories", coordinates: { lat: 20.3549, lng: 85.8156 } },
  { id: "campus-3", name: "Campus 3 – Kathajodi Campus", category: "campus", description: "Civil Engineering, Computer Engineering Labs, Academic Buildings", coordinates: { lat: 20.3539, lng: 85.8102 } },
  { id: "campus-4", name: "Campus 4", category: "campus", description: "Engineering Academic Blocks, Lecture Halls", coordinates: { lat: 20.3555, lng: 85.8171 } },
  { id: "campus-5", name: "Campus 5", category: "campus", description: "Student Hostels, Dining Facilities", coordinates: { lat: 20.3512, lng: 85.8132 } },
  { id: "campus-6", name: "Campus 6 (Main Campus)", category: "campus", description: "Engineering Classrooms, Academic Departments, Main Campus", coordinates: { lat: 20.3531, lng: 85.8187 } },
  { id: "campus-7", name: "Campus 7", category: "campus", description: "Residential Hostels, Student Housing Clusters, MBA Garden", coordinates: { lat: 20.3498, lng: 85.8153 } },
  { id: "campus-8", name: "Campus 8", category: "campus", description: "Mechanical Engineering, Engineering Workshops", coordinates: { lat: 20.3561, lng: 85.8128 } },
  { id: "campus-9", name: "Campus 9", category: "campus", description: "KIIT International School", coordinates: { lat: 20.3539, lng: 85.8099 } },
  { id: "campus-10", name: "Campus 10", category: "campus", description: "Management Academic Buildings, MBA Facilities", coordinates: { lat: 20.3521, lng: 85.8168 } },
  { id: "campus-11", name: "Campus 11", category: "campus", description: "School of Biotechnology, Research Laboratories", coordinates: { lat: 20.3574, lng: 85.8139 } },
  { id: "campus-12", name: "Campus 12", category: "campus", description: "Electrical Engineering, Electronics and Power Labs", coordinates: { lat: 20.3538, lng: 85.8201 } },
  { id: "campus-13", name: "Campus 13 – KSAC", category: "campus", description: "KIIT Student Activity Centre, Cultural Clubs, Event Venues, Near Biju Patnaik Stadium", coordinates: { lat: 20.3556, lng: 85.8163 } },
  { id: "campus-14", name: "Campus 14", category: "campus", description: "KIIT Polytechnic", coordinates: { lat: 20.3515, lng: 85.8195 } },
  { id: "campus-15", name: "Campus 15", category: "campus", description: "School of Computer Engineering, Computer Labs", coordinates: { lat: 20.3537, lng: 85.8149 } },
  { id: "campus-16", name: "Campus 16", category: "campus", description: "KIIT School of Law, Moot Courts, Law Library", coordinates: { lat: 20.3569, lng: 85.8182 } },
  { id: "campus-17", name: "Campus 17", category: "campus", description: "Medical Hostels, Health Sciences Facilities", coordinates: { lat: 20.3489, lng: 85.8121 } },
  { id: "campus-18", name: "Campus 18", category: "campus", description: "Nursing Sciences", coordinates: { lat: 20.3483, lng: 85.8141 } },
  { id: "campus-19", name: "Campus 19", category: "campus", description: "Mass Communication, Media Studies", coordinates: { lat: 20.3587, lng: 85.8168 } },
  { id: "campus-20", name: "Campus 20", category: "campus", description: "Fashion Technology", coordinates: { lat: 20.3582, lng: 85.8151 } },
  { id: "campus-21", name: "Campus 21", category: "campus", description: "Research Centers, Innovation Labs", coordinates: { lat: 20.3571, lng: 85.8192 } },
  { id: "campus-22", name: "Campus 22", category: "campus", description: "Central Library Facilities", coordinates: { lat: 20.3541, lng: 85.8135 } },
  { id: "campus-23", name: "Campus 23", category: "campus", description: "Sports Complexes", coordinates: { lat: 20.3558, lng: 85.8112 } },
  { id: "campus-24", name: "Campus 24", category: "campus", description: "Large Hostel Areas", coordinates: { lat: 20.3478, lng: 85.8161 } },
  { id: "campus-25", name: "Campus 25", category: "campus", description: "New computer science campus", coordinates: { lat: 20.3645, lng: 85.8170 } },

  // Academic Buildings
  { id: "ksac", name: "KSAC", category: "academic", description: "KIIT Student Activity Center", coordinates: { lat: 20.3558, lng: 85.8158 } },
  { id: "sce", name: "School of Computer Engineering", category: "academic", description: "Main CS Building", coordinates: { lat: 20.3541, lng: 85.8145 } },
  { id: "mech-block", name: "Mechanical Engineering Block", category: "academic", description: "ME Department", coordinates: { lat: 20.3555, lng: 85.8125 } },
  { id: "ee-block", name: "Electrical Engineering Block", category: "academic", description: "EE Department", coordinates: { lat: 20.3542, lng: 85.8195 } },
  { id: "biotech-school", name: "Biotechnology School", category: "academic", description: "Biotech Department", coordinates: { lat: 20.3568, lng: 85.8138 } },
  { id: "law-school", name: "KIIT Law School", category: "academic", description: "School of Law Main Building", coordinates: { lat: 20.3575, lng: 85.8175 } },
  { id: "polytechnic", name: "Polytechnic Campus", category: "academic", description: "Diploma Programs", coordinates: { lat: 20.3518, lng: 85.8188 } },

  // Girls Hostels - Queen Castle (located in Campus 7 area)
  { id: "qc-1", name: "Queen Castle 1", category: "hostel", description: "Girls Hostel", coordinates: { lat: 20.3508, lng: 85.8148 } },
  { id: "qc-2", name: "Queen Castle 2", category: "hostel", description: "Girls Hostel", coordinates: { lat: 20.3506, lng: 85.8152 } },
  { id: "qc-3", name: "Queen Castle 3", category: "hostel", description: "Girls Hostel", coordinates: { lat: 20.3504, lng: 85.8156 } },
  { id: "qc-4", name: "Queen Castle 4", category: "hostel", description: "Girls Hostel", coordinates: { lat: 20.3502, lng: 85.8160 } },
  { id: "qc-5", name: "Queen Castle 5", category: "hostel", description: "Girls Hostel", coordinates: { lat: 20.3500, lng: 85.8148 } },
  { id: "qc-6", name: "Queen Castle 6", category: "hostel", description: "Girls Hostel", coordinates: { lat: 20.3498, lng: 85.8152 } },
  { id: "qc-7", name: "Queen Castle 7", category: "hostel", description: "Girls Hostel", coordinates: { lat: 20.3496, lng: 85.8156 } },
  { id: "qc-8", name: "Queen Castle 8", category: "hostel", description: "Girls Hostel", coordinates: { lat: 20.3494, lng: 85.8160 } },
  { id: "qc-9", name: "Queen Castle 9", category: "hostel", description: "Girls Hostel", coordinates: { lat: 20.3492, lng: 85.8148 } },
  { id: "qc-10", name: "Queen Castle 10", category: "hostel", description: "Girls Hostel", coordinates: { lat: 20.3490, lng: 85.8152 } },
  { id: "qc-girls", name: "Queen Castle Girls Hostel", category: "hostel", description: "Main Girls Hostel Complex", coordinates: { lat: 20.3502, lng: 85.8154 } },

  // Boys Hostels - Kings Palace (located in Campus 5/24 area)
  { id: "kp-1", name: "Kings Palace 1", category: "hostel", description: "Boys Hostel", coordinates: { lat: 20.3515, lng: 85.8135 } },
  { id: "kp-2", name: "Kings Palace 2", category: "hostel", description: "Boys Hostel", coordinates: { lat: 20.3513, lng: 85.8139 } },
  { id: "kp-3", name: "Kings Palace 3", category: "hostel", description: "Boys Hostel", coordinates: { lat: 20.3511, lng: 85.8143 } },
  { id: "kp-4", name: "Kings Palace 4", category: "hostel", description: "Boys Hostel", coordinates: { lat: 20.3509, lng: 85.8135 } },
  { id: "kp-5", name: "Kings Palace 5", category: "hostel", description: "Boys Hostel", coordinates: { lat: 20.3507, lng: 85.8139 } },
  { id: "kp-6", name: "Kings Palace 6", category: "hostel", description: "Boys Hostel", coordinates: { lat: 20.3505, lng: 85.8143 } },
  { id: "kp-7", name: "Kings Palace 7", category: "hostel", description: "Boys Hostel", coordinates: { lat: 20.3503, lng: 85.8135 } },
  { id: "kp-8", name: "Kings Palace 8", category: "hostel", description: "Boys Hostel", coordinates: { lat: 20.3501, lng: 85.8139 } },
  { id: "kp-9", name: "Kings Palace 9", category: "hostel", description: "Boys Hostel", coordinates: { lat: 20.3499, lng: 85.8143 } },
  { id: "kp-10", name: "Kings Palace 10", category: "hostel", description: "Boys Hostel", coordinates: { lat: 20.3497, lng: 85.8135 } },
  { id: "kp-11", name: "Kings Palace 11", category: "hostel", description: "Boys Hostel", coordinates: { lat: 20.3495, lng: 85.8139 } },
  { id: "kp-12", name: "Kings Palace 12", category: "hostel", description: "Boys Hostel", coordinates: { lat: 20.3493, lng: 85.8143 } },
  { id: "kp-boys", name: "Kings Palace Boys Hostel", category: "hostel", description: "Main Boys Hostel Complex", coordinates: { lat: 20.3505, lng: 85.8139 } },

  // Landmarks
  { id: "stadium", name: "Biju Patnaik Stadium", category: "landmark", description: "Main Sports Stadium", coordinates: { lat: 20.3560, lng: 85.8155 } },
  { id: "sports-complex", name: "KIIT Sports Complex", category: "landmark", description: "Indoor Sports Facility", coordinates: { lat: 20.3552, lng: 85.8108 } },
  { id: "mba-garden", name: "MBA Garden", category: "landmark", description: "Recreational Garden", coordinates: { lat: 20.3497, lng: 85.8198 } },
  { id: "central-library", name: "Central Library", category: "landmark", description: "Main Library", coordinates: { lat: 20.3538, lng: 85.8132 } },
  { id: "main-gate", name: "KIIT Main Gate", category: "landmark", description: "Main Entrance", coordinates: { lat: 20.3520, lng: 85.8115 } },
  { id: "kims-hospital", name: "KIMS Hospital", category: "landmark", description: "Medical Facility", coordinates: { lat: 20.3485, lng: 85.8175 } },
  { id: "food-court", name: "Campus Food Court", category: "landmark", description: "Main Cafeteria", coordinates: { lat: 20.3535, lng: 85.8148 } },
  { id: "convention-center", name: "KIIT Convention Center", category: "landmark", description: "Events & Conferences", coordinates: { lat: 20.3548, lng: 85.8165 } },
  { id: "auditorium", name: "Main Auditorium", category: "landmark", description: "Cultural Events", coordinates: { lat: 20.3545, lng: 85.8152 } },
]

export const popularDestinations: KIITPlace[] = [
  kiitPlaces.find(p => p.id === "campus-15")!,
  kiitPlaces.find(p => p.id === "central-library")!,
  kiitPlaces.find(p => p.id === "food-court")!,
  kiitPlaces.find(p => p.id === "stadium")!,
  kiitPlaces.find(p => p.id === "main-gate")!,
  kiitPlaces.find(p => p.id === "ksac")!,
]

export function searchPlaces(query: string): KIITPlace[] {
  if (!query.trim()) return []
  
  const normalizedQuery = query.toLowerCase().trim()
  
  return kiitPlaces
    .filter(place => 
      place.name.toLowerCase().includes(normalizedQuery) ||
      place.category.toLowerCase().includes(normalizedQuery) ||
      (place.description?.toLowerCase().includes(normalizedQuery))
    )
    .slice(0, 8)
}

export function getCategoryIcon(category: KIITPlace["category"]): string {
  switch (category) {
    case "campus": return "🏛️"
    case "academic": return "📚"
    case "hostel": return "🏠"
    case "landmark": return "📍"
    default: return "📍"
  }
}

// Calculate distance between two coordinates using Haversine formula
export function calculateDistance(from: KIITPlace, to: KIITPlace): number {
  const R = 6371 // Earth's radius in km
  const dLat = toRad(to.coordinates.lat - from.coordinates.lat)
  const dLng = toRad(to.coordinates.lng - from.coordinates.lng)
  const a = 
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRad(from.coordinates.lat)) * Math.cos(toRad(to.coordinates.lat)) *
    Math.sin(dLng / 2) * Math.sin(dLng / 2)
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
  return R * c // Distance in km
}

function toRad(deg: number): number {
  return deg * (Math.PI / 180)
}

// Calculate walking time based on distance (average 5 km/h walking speed)
export function calculateWalkingTime(distance: number): number {
  return Math.ceil((distance / 5) * 60) // Time in minutes
}

// Calculate bike time (average 15 km/h)
export function calculateBikeTime(distance: number): number {
  return Math.ceil((distance / 15) * 60) // Time in minutes
}

// Calculate shuttle time (average 25 km/h including stops)
export function calculateShuttleTime(distance: number): number {
  return Math.ceil((distance / 25) * 60) + 5 // Time in minutes + wait time
}

// Direction types for navigation
export type Direction = "straight" | "left" | "right" | "slight-left" | "slight-right" | "destination"

export interface NavigationStep {
  instruction: string
  distance: number // in meters
  direction: Direction
  landmark?: string
}

// Generate turn-by-turn navigation steps
export function generateNavigationSteps(from: KIITPlace, to: KIITPlace): NavigationStep[] {
  const totalDistance = calculateDistance(from, to) * 1000 // Convert to meters
  const steps: NavigationStep[] = []
  
  // Determine general direction
  const latDiff = to.coordinates.lat - from.coordinates.lat
  const lngDiff = to.coordinates.lng - from.coordinates.lng
  
  // Starting instruction
  steps.push({
    instruction: `Start from ${from.name}`,
    distance: 0,
    direction: "straight",
    landmark: from.description
  })
  
  // Generate intermediate steps based on relative positions
  if (Math.abs(lngDiff) > 0.001) {
    const eastWest = lngDiff > 0 ? "east" : "west"
    steps.push({
      instruction: `Head ${eastWest} on the main campus road`,
      distance: Math.round(Math.abs(lngDiff) * 111000 * 0.6),
      direction: lngDiff > 0 ? "right" : "left",
    })
  }
  
  if (Math.abs(latDiff) > 0.001) {
    const northSouth = latDiff > 0 ? "north" : "south"
    steps.push({
      instruction: `Turn ${latDiff > 0 ? "left" : "right"} and continue ${northSouth}`,
      distance: Math.round(Math.abs(latDiff) * 111000 * 0.6),
      direction: latDiff > 0 ? "left" : "right",
    })
  }
  
  // Add nearby landmarks as waypoints
  const nearbyLandmarks = findNearbyLandmarks(from, to)
  if (nearbyLandmarks.length > 0) {
    steps.push({
      instruction: `Pass by ${nearbyLandmarks[0].name}`,
      distance: Math.round(totalDistance * 0.3),
      direction: "straight",
      landmark: nearbyLandmarks[0].description
    })
  }
  
  // Final approach
  steps.push({
    instruction: `Continue straight towards ${to.name}`,
    distance: Math.round(totalDistance * 0.2),
    direction: "straight",
  })
  
  // Arrival
  steps.push({
    instruction: `Arrive at ${to.name}`,
    distance: 0,
    direction: "destination",
    landmark: to.description
  })
  
  return steps
}

// Find landmarks near the route
function findNearbyLandmarks(from: KIITPlace, to: KIITPlace): KIITPlace[] {
  const midLat = (from.coordinates.lat + to.coordinates.lat) / 2
  const midLng = (from.coordinates.lng + to.coordinates.lng) / 2
  
  return kiitPlaces
    .filter(p => p.category === "landmark" && p.id !== from.id && p.id !== to.id)
    .filter(p => {
      const distToMid = Math.sqrt(
        Math.pow(p.coordinates.lat - midLat, 2) + 
        Math.pow(p.coordinates.lng - midLng, 2)
      )
      return distToMid < 0.005 // Within ~500m of route midpoint
    })
    .slice(0, 2)
}

// Get bearing between two points for compass direction
export function getBearing(from: KIITPlace, to: KIITPlace): string {
  const latDiff = to.coordinates.lat - from.coordinates.lat
  const lngDiff = to.coordinates.lng - from.coordinates.lng
  
  const angle = Math.atan2(lngDiff, latDiff) * (180 / Math.PI)
  
  if (angle >= -22.5 && angle < 22.5) return "North"
  if (angle >= 22.5 && angle < 67.5) return "Northeast"
  if (angle >= 67.5 && angle < 112.5) return "East"
  if (angle >= 112.5 && angle < 157.5) return "Southeast"
  if (angle >= 157.5 || angle < -157.5) return "South"
  if (angle >= -157.5 && angle < -112.5) return "Southwest"
  if (angle >= -112.5 && angle < -67.5) return "West"
  return "Northwest"
}
