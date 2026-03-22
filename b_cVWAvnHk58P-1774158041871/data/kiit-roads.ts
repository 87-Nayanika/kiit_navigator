// KIIT Campus Road Network with real coordinates
// Based on actual KIIT University layout in Bhubaneswar, Odisha

export interface RoadNode {
  id: string
  name: string
  coordinates: { lat: number; lng: number }
  type: "intersection" | "entrance" | "exit" | "gate" | "junction"
}

export interface RoadSegment {
  id: string
  name: string
  from: string // node id
  to: string // node id
  distance: number // in meters
  walkable: boolean
  bikeable: boolean
  vehicular: boolean
  oneWay?: boolean
}

// Main road nodes - intersections, gates, and key points
// KIIT is centered around 20.3530° N, 85.8180° E
export const roadNodes: RoadNode[] = [
  // Main Gates
  { id: "gate-1", name: "KIIT Main Gate (Gate 1)", coordinates: { lat: 20.3543, lng: 85.8141 }, type: "gate" },
  { id: "gate-2", name: "KIIT Gate 2 (Patia Side)", coordinates: { lat: 20.3567, lng: 85.8213 }, type: "gate" },
  { id: "gate-3", name: "KIIT Gate 3 (Prasanti Vihar)", coordinates: { lat: 20.3489, lng: 85.8195 }, type: "gate" },
  { id: "gate-4", name: "KIIT Gate 4 (Campus 6 Entry)", coordinates: { lat: 20.3531, lng: 85.8217 }, type: "gate" },
  { id: "gate-5", name: "KIIT Gate 5 (Kathajodi Side)", coordinates: { lat: 20.3578, lng: 85.8098 }, type: "gate" },
  
  // Main Road Junctions
  { id: "junc-central", name: "Central Junction", coordinates: { lat: 20.3535, lng: 85.8165 }, type: "junction" },
  { id: "junc-ksac", name: "KSAC Junction", coordinates: { lat: 20.3555, lng: 85.8158 }, type: "junction" },
  { id: "junc-campus6", name: "Campus 6 Junction", coordinates: { lat: 20.3531, lng: 85.8195 }, type: "junction" },
  { id: "junc-hostel", name: "Hostel Area Junction", coordinates: { lat: 20.3505, lng: 85.8155 }, type: "junction" },
  { id: "junc-library", name: "Library Junction", coordinates: { lat: 20.3540, lng: 85.8135 }, type: "junction" },
  { id: "junc-stadium", name: "Stadium Junction", coordinates: { lat: 20.3558, lng: 85.8145 }, type: "junction" },
  { id: "junc-law", name: "Law School Junction", coordinates: { lat: 20.3570, lng: 85.8178 }, type: "junction" },
  { id: "junc-biotech", name: "Biotech Junction", coordinates: { lat: 20.3565, lng: 85.8135 }, type: "junction" },
  { id: "junc-kp", name: "Kings Palace Junction", coordinates: { lat: 20.3510, lng: 85.8140 }, type: "junction" },
  { id: "junc-qc", name: "Queen Castle Junction", coordinates: { lat: 20.3500, lng: 85.8160 }, type: "junction" },
  { id: "junc-mba", name: "MBA Garden Junction", coordinates: { lat: 20.3528, lng: 85.8158 }, type: "junction" },
  { id: "junc-poly", name: "Polytechnic Junction", coordinates: { lat: 20.3518, lng: 85.8185 }, type: "junction" },
  { id: "junc-kims", name: "KIMS Hospital Junction", coordinates: { lat: 20.3490, lng: 85.8175 }, type: "junction" },
  
  // Building Entrances - Campus Buildings
  { id: "ent-campus1", name: "Campus 1 Main Entrance", coordinates: { lat: 20.3537, lng: 85.8145 }, type: "entrance" },
  { id: "ent-campus2", name: "Campus 2 Entrance", coordinates: { lat: 20.3540, lng: 85.8158 }, type: "entrance" },
  { id: "ent-campus3", name: "Campus 3 Kathajodi Entrance", coordinates: { lat: 20.3565, lng: 85.8105 }, type: "entrance" },
  { id: "ent-campus4", name: "Campus 4 Entrance", coordinates: { lat: 20.3545, lng: 85.8172 }, type: "entrance" },
  { id: "ent-campus5", name: "Campus 5 Entrance", coordinates: { lat: 20.3518, lng: 85.8138 }, type: "entrance" },
  { id: "ent-campus6", name: "Campus 6 Main Entrance", coordinates: { lat: 20.3531, lng: 85.8190 }, type: "entrance" },
  { id: "ent-campus7", name: "Campus 7 Entrance", coordinates: { lat: 20.3508, lng: 85.8152 }, type: "entrance" },
  { id: "ent-campus8", name: "Campus 8 Entrance", coordinates: { lat: 20.3555, lng: 85.8128 }, type: "entrance" },
  { id: "ent-campus9", name: "Campus 9 KIS Entrance", coordinates: { lat: 20.3575, lng: 85.8108 }, type: "entrance" },
  { id: "ent-campus10", name: "Campus 10 MBA Entrance", coordinates: { lat: 20.3528, lng: 85.8168 }, type: "entrance" },
  { id: "ent-campus11", name: "Campus 11 Biotech Entrance", coordinates: { lat: 20.3568, lng: 85.8140 }, type: "entrance" },
  { id: "ent-campus12", name: "Campus 12 EE Entrance", coordinates: { lat: 20.3538, lng: 85.8198 }, type: "entrance" },
  { id: "ent-campus13", name: "Campus 13 KSAC Entrance", coordinates: { lat: 20.3556, lng: 85.8160 }, type: "entrance" },
  { id: "ent-campus14", name: "Campus 14 Polytechnic Entrance", coordinates: { lat: 20.3520, lng: 85.8188 }, type: "entrance" },
  { id: "ent-campus15", name: "Campus 15 CSE Entrance", coordinates: { lat: 20.3542, lng: 85.8148 }, type: "entrance" },
  { id: "ent-campus16", name: "Campus 16 Law School Entrance", coordinates: { lat: 20.3572, lng: 85.8175 }, type: "entrance" },
  
  // Hostel Entrances
  { id: "ent-qc1", name: "Queen Castle 1 Gate", coordinates: { lat: 20.3508, lng: 85.8150 }, type: "entrance" },
  { id: "ent-qc2", name: "Queen Castle 2 Gate", coordinates: { lat: 20.3505, lng: 85.8155 }, type: "entrance" },
  { id: "ent-qc3", name: "Queen Castle 3 Gate", coordinates: { lat: 20.3502, lng: 85.8158 }, type: "entrance" },
  { id: "ent-kp1", name: "Kings Palace 1 Gate", coordinates: { lat: 20.3515, lng: 85.8138 }, type: "entrance" },
  { id: "ent-kp2", name: "Kings Palace 2 Gate", coordinates: { lat: 20.3512, lng: 85.8142 }, type: "entrance" },
  { id: "ent-kp3", name: "Kings Palace 3 Gate", coordinates: { lat: 20.3508, lng: 85.8138 }, type: "entrance" },
  
  // Landmark Entrances
  { id: "ent-stadium", name: "Stadium Main Gate", coordinates: { lat: 20.3560, lng: 85.8152 }, type: "entrance" },
  { id: "ent-library", name: "Central Library Entrance", coordinates: { lat: 20.3540, lng: 85.8132 }, type: "entrance" },
  { id: "ent-foodcourt", name: "Food Court Entrance", coordinates: { lat: 20.3535, lng: 85.8150 }, type: "entrance" },
  { id: "ent-convention", name: "Convention Center Entrance", coordinates: { lat: 20.3548, lng: 85.8168 }, type: "entrance" },
  { id: "ent-kims", name: "KIMS Hospital Main Entrance", coordinates: { lat: 20.3488, lng: 85.8178 }, type: "entrance" },
]

// Road segments connecting nodes
export const roadSegments: RoadSegment[] = [
  // Main Road: Gate 1 to Central Junction
  { id: "road-1", name: "KIIT Road (Gate 1 - Central)", from: "gate-1", to: "junc-central", distance: 280, walkable: true, bikeable: true, vehicular: true },
  
  // Central Junction connections
  { id: "road-2", name: "KIIT Road (Central - KSAC)", from: "junc-central", to: "junc-ksac", distance: 220, walkable: true, bikeable: true, vehicular: true },
  { id: "road-3", name: "KIIT Road (Central - Campus 6)", from: "junc-central", to: "junc-campus6", distance: 350, walkable: true, bikeable: true, vehicular: true },
  { id: "road-4", name: "KIIT Road (Central - Library)", from: "junc-central", to: "junc-library", distance: 180, walkable: true, bikeable: true, vehicular: true },
  { id: "road-5", name: "KIIT Road (Central - MBA)", from: "junc-central", to: "junc-mba", distance: 150, walkable: true, bikeable: true, vehicular: true },
  
  // KSAC Junction connections
  { id: "road-6", name: "Stadium Road", from: "junc-ksac", to: "junc-stadium", distance: 150, walkable: true, bikeable: true, vehicular: true },
  { id: "road-7", name: "KSAC to Biotech Road", from: "junc-ksac", to: "junc-biotech", distance: 280, walkable: true, bikeable: true, vehicular: true },
  { id: "road-8", name: "KSAC to Law School Road", from: "junc-ksac", to: "junc-law", distance: 320, walkable: true, bikeable: true, vehicular: true },
  
  // Library Junction connections
  { id: "road-9", name: "Library to Stadium Road", from: "junc-library", to: "junc-stadium", distance: 220, walkable: true, bikeable: true, vehicular: true },
  { id: "road-10", name: "Library to KP Road", from: "junc-library", to: "junc-kp", distance: 250, walkable: true, bikeable: true, vehicular: true },
  
  // Hostel Area connections
  { id: "road-11", name: "KP to Hostel Junction", from: "junc-kp", to: "junc-hostel", distance: 180, walkable: true, bikeable: true, vehicular: true },
  { id: "road-12", name: "Hostel to QC Junction", from: "junc-hostel", to: "junc-qc", distance: 160, walkable: true, bikeable: true, vehicular: true },
  { id: "road-13", name: "QC to KIMS Junction", from: "junc-qc", to: "junc-kims", distance: 200, walkable: true, bikeable: true, vehicular: true },
  
  // Campus 6 Area connections
  { id: "road-14", name: "Campus 6 to Gate 4", from: "junc-campus6", to: "gate-4", distance: 120, walkable: true, bikeable: true, vehicular: true },
  { id: "road-15", name: "Campus 6 to Poly Junction", from: "junc-campus6", to: "junc-poly", distance: 180, walkable: true, bikeable: true, vehicular: true },
  { id: "road-16", name: "Campus 6 to Law Junction", from: "junc-campus6", to: "junc-law", distance: 280, walkable: true, bikeable: true, vehicular: true },
  
  // MBA and Poly connections
  { id: "road-17", name: "MBA to Poly Road", from: "junc-mba", to: "junc-poly", distance: 200, walkable: true, bikeable: true, vehicular: true },
  { id: "road-18", name: "MBA to Hostel Road", from: "junc-mba", to: "junc-hostel", distance: 250, walkable: true, bikeable: true, vehicular: true },
  
  // Gate connections
  { id: "road-19", name: "Gate 2 Road", from: "gate-2", to: "junc-law", distance: 150, walkable: true, bikeable: true, vehicular: true },
  { id: "road-20", name: "Gate 3 Road", from: "gate-3", to: "junc-kims", distance: 180, walkable: true, bikeable: true, vehicular: true },
  { id: "road-21", name: "Gate 5 to Campus 3", from: "gate-5", to: "junc-biotech", distance: 350, walkable: true, bikeable: true, vehicular: true },
  
  // Stadium to Biotech
  { id: "road-22", name: "Stadium to Biotech", from: "junc-stadium", to: "junc-biotech", distance: 200, walkable: true, bikeable: true, vehicular: true },
  
  // Poly to KIMS
  { id: "road-23", name: "Poly to KIMS", from: "junc-poly", to: "junc-kims", distance: 280, walkable: true, bikeable: true, vehicular: true },
  
  // Building entrance connections to nearest junctions
  { id: "ent-road-1", name: "Campus 1 Path", from: "ent-campus1", to: "junc-library", distance: 50, walkable: true, bikeable: true, vehicular: false },
  { id: "ent-road-2", name: "Campus 2 Path", from: "ent-campus2", to: "junc-central", distance: 40, walkable: true, bikeable: true, vehicular: false },
  { id: "ent-road-3", name: "Campus 6 Path", from: "ent-campus6", to: "junc-campus6", distance: 30, walkable: true, bikeable: true, vehicular: false },
  { id: "ent-road-4", name: "KSAC Path", from: "ent-campus13", to: "junc-ksac", distance: 35, walkable: true, bikeable: true, vehicular: false },
  { id: "ent-road-5", name: "Campus 15 Path", from: "ent-campus15", to: "junc-central", distance: 45, walkable: true, bikeable: true, vehicular: false },
  { id: "ent-road-6", name: "Library Path", from: "ent-library", to: "junc-library", distance: 25, walkable: true, bikeable: true, vehicular: false },
  { id: "ent-road-7", name: "Stadium Path", from: "ent-stadium", to: "junc-stadium", distance: 40, walkable: true, bikeable: true, vehicular: false },
  { id: "ent-road-8", name: "Law School Path", from: "ent-campus16", to: "junc-law", distance: 35, walkable: true, bikeable: true, vehicular: false },
  { id: "ent-road-9", name: "QC1 Path", from: "ent-qc1", to: "junc-qc", distance: 45, walkable: true, bikeable: true, vehicular: false },
  { id: "ent-road-10", name: "KP1 Path", from: "ent-kp1", to: "junc-kp", distance: 40, walkable: true, bikeable: true, vehicular: false },
  { id: "ent-road-11", name: "KIMS Path", from: "ent-kims", to: "junc-kims", distance: 30, walkable: true, bikeable: true, vehicular: false },
  { id: "ent-road-12", name: "Food Court Path", from: "ent-foodcourt", to: "junc-central", distance: 35, walkable: true, bikeable: true, vehicular: false },
  { id: "ent-road-13", name: "Convention Path", from: "ent-convention", to: "junc-mba", distance: 50, walkable: true, bikeable: true, vehicular: false },
  { id: "ent-road-14", name: "Campus 8 Path", from: "ent-campus8", to: "junc-biotech", distance: 55, walkable: true, bikeable: true, vehicular: false },
  { id: "ent-road-15", name: "Campus 10 Path", from: "ent-campus10", to: "junc-mba", distance: 45, walkable: true, bikeable: true, vehicular: false },
  { id: "ent-road-16", name: "Campus 11 Path", from: "ent-campus11", to: "junc-biotech", distance: 40, walkable: true, bikeable: true, vehicular: false },
  { id: "ent-road-17", name: "Campus 12 Path", from: "ent-campus12", to: "junc-campus6", distance: 50, walkable: true, bikeable: true, vehicular: false },
  { id: "ent-road-18", name: "Polytechnic Path", from: "ent-campus14", to: "junc-poly", distance: 35, walkable: true, bikeable: true, vehicular: false },
]

// Build adjacency list for pathfinding
export function buildGraph(): Map<string, { nodeId: string; distance: number; roadName: string }[]> {
  const graph = new Map<string, { nodeId: string; distance: number; roadName: string }[]>()
  
  // Initialize all nodes
  roadNodes.forEach(node => {
    graph.set(node.id, [])
  })
  
  // Add edges (bidirectional unless oneWay)
  roadSegments.forEach(segment => {
    const fromList = graph.get(segment.from) || []
    fromList.push({ nodeId: segment.to, distance: segment.distance, roadName: segment.name })
    graph.set(segment.from, fromList)
    
    if (!segment.oneWay) {
      const toList = graph.get(segment.to) || []
      toList.push({ nodeId: segment.from, distance: segment.distance, roadName: segment.name })
      graph.set(segment.to, toList)
    }
  })
  
  return graph
}

// Dijkstra's algorithm for optimal path
export function findOptimalPath(fromNodeId: string, toNodeId: string): {
  path: string[]
  totalDistance: number
  roads: string[]
} | null {
  const graph = buildGraph()
  const distances = new Map<string, number>()
  const previous = new Map<string, string | null>()
  const roadUsed = new Map<string, string>()
  const unvisited = new Set<string>()
  
  // Initialize
  roadNodes.forEach(node => {
    distances.set(node.id, node.id === fromNodeId ? 0 : Infinity)
    previous.set(node.id, null)
    unvisited.add(node.id)
  })
  
  while (unvisited.size > 0) {
    // Find node with minimum distance
    let minNode: string | null = null
    let minDist = Infinity
    
    unvisited.forEach(nodeId => {
      const dist = distances.get(nodeId) || Infinity
      if (dist < minDist) {
        minDist = dist
        minNode = nodeId
      }
    })
    
    if (minNode === null || minDist === Infinity) break
    if (minNode === toNodeId) break
    
    unvisited.delete(minNode)
    
    // Update neighbors
    const neighbors = graph.get(minNode) || []
    neighbors.forEach(neighbor => {
      if (unvisited.has(neighbor.nodeId)) {
        const alt = (distances.get(minNode!) || 0) + neighbor.distance
        if (alt < (distances.get(neighbor.nodeId) || Infinity)) {
          distances.set(neighbor.nodeId, alt)
          previous.set(neighbor.nodeId, minNode)
          roadUsed.set(neighbor.nodeId, neighbor.roadName)
        }
      }
    })
  }
  
  // Reconstruct path
  const path: string[] = []
  const roads: string[] = []
  let current: string | null = toNodeId
  
  while (current !== null) {
    path.unshift(current)
    const road = roadUsed.get(current)
    if (road && !roads.includes(road)) {
      roads.unshift(road)
    }
    current = previous.get(current) || null
  }
  
  if (path[0] !== fromNodeId) {
    return null // No path found
  }
  
  return {
    path,
    totalDistance: distances.get(toNodeId) || 0,
    roads
  }
}

// Find nearest road node to a place
export function findNearestNode(lat: number, lng: number): RoadNode {
  let nearest = roadNodes[0]
  let minDist = Infinity
  
  roadNodes.forEach(node => {
    const dist = Math.sqrt(
      Math.pow(node.coordinates.lat - lat, 2) +
      Math.pow(node.coordinates.lng - lng, 2)
    )
    if (dist < minDist) {
      minDist = dist
      nearest = node
    }
  })
  
  return nearest
}

// Get coordinates along the path
export function getPathCoordinates(path: string[]): { lat: number; lng: number }[] {
  return path.map(nodeId => {
    const node = roadNodes.find(n => n.id === nodeId)
    return node ? node.coordinates : { lat: 0, lng: 0 }
  }).filter(coord => coord.lat !== 0)
}

// Generate detailed navigation instructions
export interface NavigationInstruction {
  instruction: string
  distance: number
  coordinates: { lat: number; lng: number }
  direction: "straight" | "left" | "right" | "slight-left" | "slight-right" | "arrive" | "depart"
  roadName: string
}

export function generateNavigationInstructions(path: string[]): NavigationInstruction[] {
  const instructions: NavigationInstruction[] = []
  
  for (let i = 0; i < path.length; i++) {
    const currentNode = roadNodes.find(n => n.id === path[i])
    if (!currentNode) continue
    
    if (i === 0) {
      instructions.push({
        instruction: `Start from ${currentNode.name}`,
        distance: 0,
        coordinates: currentNode.coordinates,
        direction: "depart",
        roadName: ""
      })
      continue
    }
    
    const prevNode = roadNodes.find(n => n.id === path[i - 1])
    if (!prevNode) continue
    
    // Find the road segment
    const segment = roadSegments.find(s => 
      (s.from === path[i - 1] && s.to === path[i]) ||
      (s.to === path[i - 1] && s.from === path[i])
    )
    
    // Calculate direction
    let direction: NavigationInstruction["direction"] = "straight"
    
    if (i >= 2) {
      const prevPrevNode = roadNodes.find(n => n.id === path[i - 2])
      if (prevPrevNode) {
        const prevBearing = Math.atan2(
          prevNode.coordinates.lng - prevPrevNode.coordinates.lng,
          prevNode.coordinates.lat - prevPrevNode.coordinates.lat
        )
        const currentBearing = Math.atan2(
          currentNode.coordinates.lng - prevNode.coordinates.lng,
          currentNode.coordinates.lat - prevNode.coordinates.lat
        )
        
        let turnAngle = (currentBearing - prevBearing) * (180 / Math.PI)
        if (turnAngle > 180) turnAngle -= 360
        if (turnAngle < -180) turnAngle += 360
        
        if (turnAngle > 45) direction = "right"
        else if (turnAngle < -45) direction = "left"
        else if (turnAngle > 15) direction = "slight-right"
        else if (turnAngle < -15) direction = "slight-left"
      }
    }
    
    if (i === path.length - 1) {
      direction = "arrive"
    }
    
    const turnText = direction === "left" ? "Turn left" :
                     direction === "right" ? "Turn right" :
                     direction === "slight-left" ? "Bear left" :
                     direction === "slight-right" ? "Bear right" :
                     direction === "arrive" ? "Arrive at" :
                     "Continue straight"
    
    instructions.push({
      instruction: direction === "arrive" 
        ? `${turnText} ${currentNode.name}` 
        : `${turnText} onto ${segment?.name || "the path"} towards ${currentNode.name}`,
      distance: segment?.distance || 0,
      coordinates: currentNode.coordinates,
      direction,
      roadName: segment?.name || ""
    })
  }
  
  return instructions
}
