// Initialize the map
const map = L.map('map').setView([42.6858, -73.8232], 16); // Centered on UAlbany

// Load the tile layer
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 17.5,
    attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

// Building entrance mappings
const buildingEntrances = {
    'Humanities': ['T', 'A'],
    'Taconic': ['T', 'R'],
    'Social Science Building': ['A', 'B'],
    'Catskill': ['B', 'V'], 
    'Campus Center': ['I', 'CCBase', 'CCWestEnt'],
    'Art and Sciences': ['V', 'K'],
    'Fine Arts Building': ['K', 'M'],
    'Earth Science': ['M', 'H'],
    'Chemistry Building': ['G', 'P'],
    'Physics Building': ['P', 'Z'],
    'University Library': ['W'],
    'Performing Arts': ['X'],
    'Biology Building': ['G', 'AB'],
    'Massary Center':['Massary','MassaryBack'],
    'State Quad (Dormitory)':['StateEnt','StateEnt2'],
    'Indigenous Quad (Dormitory)':['IndieEnt','IndieDr'],
    'University Hall': ['UniHall'],
    'Colonial Quad (Dormitory)': ['ColonialDr', 'ColonialDr2'],
    'Dutch Quad (Dormitory)': ['DutchDr', 'DutchDr2']
};

function populateBuildingSelectors() {
    const startSel = document.getElementById('start');
    const endSel   = document.getElementById('end');
  
    Object.keys(buildingEntrances).forEach(name => {
      // Grab the first entrance node, look up its coords
      const [lat, lng] = nodes[ buildingEntrances[name][0] ];
      const val = `${lat}, ${lng}`;               // no space for consistency
  
      // Create an <option> for this building
      const opt = new Option(name, val);
      startSel.appendChild(opt.cloneNode(true));  // start menu
      endSel  .appendChild(opt);                  //   end menu
    });
  }
  // Run it once on load:

const tunnelEntrances = {
        'Humanities': ['THumanities'],
        'Taconic': ['TTaconic'],
        'Social Science Building': ['TSS'],
        'Catskill': ['TCatSkill'],
        'Campus Center': ['CCBase', 'CCWestEnt', 'I'],
        'Art and Sciences': ['TArtScience'],
        'Fine Arts Building': ['TFineArt'],
        'Earth Science': ['TPine'],
        'Chemistry Building': ['TChem'],
        'Physics Building': ['TPhysics'],
        'Biology Building': ['TBio'],
        'Performing Arts': ['X'],
        'University Library': ['TG', 'TH'],
        'Indigenous Quad (Dormitory)': ['IndieStairs2'],
        'State Quad (Dormitory)': ['AB'],
        'Dutch Quad (Dormitory)': ['DutchCorner'],
        'Colonial Quad (Dormitory)': ['ColonialCorner'],
        'Massary Center': ['Massary', 'MassaryBack']
};


const buildingToTunnel = {
    //if closest tunnel route is an accademic building, or user starts in an academic building 
    //Transitional from ground to tunnel
    'TBio': ['G', 'AB', 'TR'],
    'TChem': ['G', 'P', 'TL'],
    'TPine': ['M', 'H', 'TO'],
    'TFineArt': ['K', 'M', 'TP'],
    'TArtScience': ['V', 'K','TI'],
    'TCatSkill': ['B', 'V', 'TD'],
    'TSS': ['A', 'B', 'TB'],
    'THumanities': ['T', 'A', 'TE'],
    'TTaconic':  ['T', 'R', 'TF'],
    'TPhysics': ['P', 'Z', 'TK'],
};



// Generic instructions for tunnel entrances based on building
const tunnelEntranceInstructions = {
    // Academic Buildings
    'Humanities': 'Enter the Humanities building through the main entrance. Take the stairs down to the basement level. The tunnel entrance is located near the vending machines.',
    'Taconic': 'Enter Taconic building and proceed to the lower level. Follow signs for the campus tunnel system.',
    'Social Science Building': 'Enter the Social Science building. Go to the basement floor using the central staircase. The tunnel entrance is located in the northeast corner.',
    'Catskill': 'Enter Catskill building. Take the elevator or stairs to the basement. The tunnel entrance is marked with "Tunnel Access" signage.',
    'Campus Center': 'Go to the lower level of the Campus Center. The tunnel entrance is located near the dining facilities. Follow the "Tunnel System" signs.',
    'Art and Sciences': 'Enter the Arts & Sciences building. Proceed to the basement level. The tunnel entrance is near the service elevators.',
    'Fine Arts Building': 'Enter the Fine Arts building. Take the staircase down to the basement. The tunnel entrance is located in the south corridor.',
    'Earth Science': 'Enter the Earth Science building. Go to the basement level. The tunnel entrance is located near the geology labs.',
    'Chemistry Building': 'Enter the Chemistry building through the main entrance. Take the elevator or stairs to the basement level. Follow the corridor to the tunnel entrance.',
    'Physics Building': 'Enter the Physics building. Proceed to the basement level using the central staircase. The tunnel entrance is located in the northwest section.',
    'Biology Building': 'Enter the Biology building. Take the elevator or stairs to the basement level. The tunnel entrance is in the eastern corridor.',
    'Performing Arts': 'Enter the Performing Arts building. Go to the lowest level. The tunnel entrance is near the practice rooms.',

    // Library
    'University Library': 'Enter the University Library. Take the elevator or stairs to the basement level. The tunnel entrance is located near the archives section.',

    // Campus Corners
    'Indigenous Quad Corner': 'Go to the Indigenous Quad. Locate the central stairwell and proceed to the basement level. The tunnel entrance is marked with directional signage.',
    'State Quad Corner': 'Enter the State Quad commons area. Take the stairs down to the basement level. The tunnel entrance is located near the laundry facilities.',
    'Dutch Quad Corner': 'Go to the Dutch Quad commons building. Proceed to the basement level. Look for the tunnel system signage near the vending area.',
    'Colonial Quad Corner': 'Enter the Colonial Quad commons. Take the stairs down to the lowest level. The tunnel entrance is located in the western corridor.',
    'Massary Center': 'Enter the Massary Center. Go to the basement level. The tunnel entrance is near the back of the building by the service area.'
};

// Coordinates for the nodes
const nodes = {
    A: [42.686902, -73.826301],
    B: [42.687667, -73.825498],
    C: [42.686153, -73.825060],
    D: [42.686896, -73.824273],
    E: [42.685354, -73.823672],
    F: [42.686122, -73.822887],
    G: [42.684678, -73.822459],
    AB: [42.685505, -73.821432],
    I: [42.685732, -73.824403],
    J: [42.686578, -73.823660],
    K: [42.686659, -73.823433],
    L: [42.685932, -73.822493],
    M: [42.686057, -73.822375],
    O: [42.685165, -73.823316],
    P: [42.685072, -73.823493],
    Q: [42.686057, -73.824811],
    R: [42.685934, -73.824943],
    S: [42.686396, -73.825375],
    T: [42.686258, -73.825573],
    U: [42.687133, -73.824577],
    V: [42.687347, -73.824487],
    W: [42.686542, -73.824650],
    X: [42.685720, -73.823327],
    Y: [42.685518, -73.823975],
    Z: [42.685402, -73.824068],
    H: [42.685497, -73.821555],
    // New nodes
    StateEnt: [42.686248, -73.820511],
    StateEnt2: [42.686540, -73.821081],
    StatePath: [42.686432, -73.821507],
    StatePath2: [42.685635, -73.821123],
    StateDr1: [42.686819, -73.821543],
    StateDr2: [42.687068, -73.821937],
    StateDr3: [42.687251, -73.822306],
    UniHall: [42.686882, -73.822329],
    UniHallP: [42.686669, -73.822828],
    EntryPlaza: [42.686664, -73.822931],
    Massary: [42.687780, -73.823186],
    MassaryBack: [42.687202, -73.823828],
    EntryPlaza2: [42.687033, -73.823503],
    StairsIndie: [42.685238, -73.824204],
    StairsIndie2: [42.685127, -73.824082],
    ECenterDr: [42.685028, -73.823950],
    IndieDiagonal: [42.684258, -73.824253],
    CCBase: [42.684763, -73.824373],
    IndieDr:[42.683992, -73.823813],
    ChemLn: [42.684257, -73.822630],
    IndieEnt: [42.683646, -73.823266],
    IndieStairs2: [42.684539, -73.822343],
    Massary1: [42.688057, -73.823653],
    ColonialDr: [42.688318, -73.824114],
    ColonialDr2: [42.688675, -73.824683],
    TaconicBase: [42.685672, -73.825152],
    CCWest: [42.686057, -73.825784],
    CCWest2:[42.686647, -73.826800],
    DutchDr: [42.686082, -73.827419],
    DutchDr2: [42.685769, -73.826849],
    DutchDr3: [42.685495, -73.826372],
    CCWestEnt: [42.685736, -73.826110],
    DutchCorner: [42.686853, -73.826583],
    ColonialCorner: [42.687901, -73.825476], 
};

const tunnelNodes = {
    TA: [42.686911, -73.826280],
    TB: [42.687270, -73.825883],
    TC: [42.687633, -73.825491], 
    TD: [42.687392, -73.825040], 
    TE: [42.686663, -73.825877],
    TF: [42.686115, -73.824987],
    TG: [42.686406, -73.824697],
    TH: [42.686552, -73.824536],
    TI: [42.686891, -73.824188],
    TJ: [42.685574, -73.824053],
    TK: [42.685365, -73.823699],
    TL: [42.684932, -73.822948],
    TM: [42.684656, -73.822439],
    TN: [42.685413, -73.821634],
    TO: [42.685701, -73.822138],
    TP: [42.686142, -73.822889],
    TQ: [42.685724, -73.823324],
    TR: [42.685051, -73.822019],
};

const tunnelBuildingNodes = {
    TBio: [42.685066, -73.821805],
    TChem: [42.684802, -73.822937],
    TPine: [42.685768, -73.821923],
    TFineArt: [42.686300, -73.822781],
    TArtScience: [42.687010, -73.824026],
    TCatSkill: [42.687499, -73.824885],
    TSS: [42.687487, -73.825947],
    THumanities: [42.686608, -73.825973],
    TTaconic: [42.686056, -73.825061],
    TPhysics: [42.685245, -73.823746]
}

Object.assign(nodes, tunnelNodes);
Object.assign(nodes, tunnelBuildingNodes);

//Object.assign(nodes, tunnelNodes);
populateBuildingSelectors();

// Function to calculate the distance between two points (Haversine formula)
function calculateDistance([lat1, lon1], [lat2, lon2]) {
    const R = 6371;
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLon = (lon2 - lon1) * Math.PI / 180;
    const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
              Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
              Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
}

// Function to calculate bearing (heading) from point A to point B
function calculateBearing([lat1, lon1], [lat2, lon2]) {
    const toRad = Math.PI / 180;
    const toDeg = 180 / Math.PI;
    const dLon = (lon2 - lon1) * toRad;
    const y = Math.sin(dLon) * Math.cos(lat2 * toRad);
    const x = Math.cos(lat1 * toRad) * Math.sin(lat2 * toRad) -
              Math.sin(lat1 * toRad) * Math.cos(lat2 * toRad) * Math.cos(dLon);
    let brng = Math.atan2(y, x) * toDeg;
    return (brng + 360) % 360;
}

const tunnelConnections = {
    'TA': ['TB', 'TE', 'DutchCorner'],
    'TB': ['TSS', 'TA', 'TC'],
    'TC': ['TB', 'TD', 'ColonialCorner'],
    'TD': ['TC', 'TCatSkill', 'TI'],
    'TE': ['TA', 'THumanities', 'TF'],
    'TF': ['TE', 'TTaconic', 'TG', 'TJ'],
    'TG': ['TF', 'TH', 'W'],
    'TH': ['TG', 'TI', 'W'],
    'TI': ['TD', 'TArtScience', 'TH', 'TP'],
    'TJ': ['TF', 'TK'], //Campus Center entrance here
    'TK': ['TJ', 'TL', 'TQ', 'TPhysics'],
    'TL': ['TK', 'TM', 'TChem'],
    'TM': ['TL', 'TR', 'IndieStairs2'],
    'TN': ['TO', 'TR', 'AB'],
    'TO': ['TN', 'TP', 'TPine'],
    'TP': ['TO', 'TI', 'TQ', 'TFineArt'],
    'TQ': ['TK', 'TP'],
    'TR': ['TM', 'TN', 'TBio'],

    'TBio': ['TR'],
    'TChem': ['TL'],
    'TPine': ['TO'],
    'TFineArt': ['TP'],
    'TArtScience': ['TI'],
    'TCatSkill': ['TD'],
    'TSS': ['TB'],
    'THumanities': ['TE'],
    'TTaconic': ['TF'],
    'TPhysics': ['TK'],
};

// Add tunnel building nodes to the main nodes object
Object.assign(nodes, tunnelBuildingNodes);

// Initialize connections with real distances
function initializeConnections() {
    const realConnections = {};
    
    // Original connection structure to maintain topology
    const connectionStructure = {
        A: ['B', 'S', 'DutchCorner'],
        B: ['U', 'V', 'A', 'ColonialCorner'],
        C: ['S', 'Q', 'W'],
        D: ['U', 'W', 'J'],
        E: ['Y', 'O', 'X'],
        F: ['L', 'X', 'J'],
        G: ['O', 'H', 'IndieStairs2'],
        H: ['G', 'L', 'AB'],
        I: ['Q', 'Y'],
        J: ['D', 'F', 'K'],
        K: ['J', 'UniHallP', 'EntryPlaza', 'EntryPlaza2'],
        L: ['F', 'M', 'H'],
        M: ['L', 'StatePath2', 'StateDr1'],
        O: ['E', 'P', 'G'],
        P: ['O'],
        Q: ['R', 'C', 'I'],
        R: ['Q','TaconicBase'],
        S: ['A', 'C', 'T'],
        T: ['S',],
        U: ['B', 'V', 'D'],
        V: ['U', 'B', 'Massary1'],
        W: ['C', 'D'],
        X: ['E', 'F'],
        Y: ['I', 'E', 'Z'],
        Z: ['Y', 'StairsIndie'],
        AB: ['H', 'StateEnt'],
        // New connections (bidirectional)
        StateEnt: ['AB', 'StateEnt2'],
        StateEnt2: ['StateEnt', 'StatePath', 'StateDr1'],
        StatePath: ['StateEnt2', 'StatePath2'],
        StatePath2: ['StatePath', 'M', 'UniHallP'],
        StateDr1: ['M', 'StateEnt2', 'StateDr2'],
        StateDr2: ['StateDr1', 'UniHall', 'StateDr3'],
        StateDr3: ['StateDr2', 'EntryPlaza','Massary'],
        UniHall: ['StateDr2', 'UniHallP'],
        UniHallP: ['UniHall', 'K', 'StatePath2', 'EntryPlaza'],
        EntryPlaza: ['StateDr3', 'UniHallP', 'K', 'EntryPlaza2'],
        Massary: ['StateDr3','MassaryBack'],
        MassaryBack: ['EntryPlaza2','Massary'],
        EntryPlaza2: ['EntryPlaza', 'K', 'MassaryBack'],
        StairsIndie: ['Z','StairsIndie2'],
        StairsIndie2: ['StairsIndie','ECenterDr'],
        ECenterDr: ['StairsIndie2','IndieDiagonal','ChemLn'],
        IndieDiagonal:['ECenterDr', 'CCBase','IndieDr'],
        CCBase: ['IndieDiagonal'],
        IndieDr: ['IndieDiagonal','IndieEnt'],
        ChemLn: ['ECenterDr', 'IndieEnt'],
        IndieStairs2:['ChemLn', 'G','IndieEnt'],
        IndieEnt: ['ChemLn','IndieDr', 'IndieStairs2'],
        Massary1: ['Massary', 'V', 'ColonialDr','StateDr3'],
        ColonialDr:['Massary1','ColonialDr2'],
        ColonialDr2:['ColonialDr','ColonialCorner'],
        TaconicBase: ['R', 'CCWest',],
        CCWest: ['TaconicBase', 'CCWest2', 'CCWestEnt'],
        CCWest2: ['DutchDr', 'CCWest','DutchCorner'],
        DutchDr: ['DutchDr2', 'CCWest2'],
        DutchDr2: ['DutchDr', 'DutchDr3'],
        DutchDr3: ['DutchDr2', 'CCWestEnt'],
        CCWestEnt: ['CCWest','DutchDr3'], 
        DutchCorner: ['CCWest2', 'A'], 
        ColonialCorner: ['B', 'ColonialDr2'],
    };

    // Add tunnel connections to the connection structure
    Object.assign(connectionStructure, tunnelConnections);

    // Calculate real distances for each connection
    for (const [startNode, connectedNodes] of Object.entries(connectionStructure)) {
        realConnections[startNode] = connectedNodes.map(endNode => ({
            node: endNode,
            distance: calculateDistance(nodes[startNode], nodes[endNode]) * 1000 // Convert to meters
        }));
    }

    return realConnections;
}

// Ensure bidirectional tunnel connections
Object.entries(tunnelConnections).forEach(([from, toList]) => {
    toList.forEach(to => {
        if (!tunnelConnections[to]) tunnelConnections[to] = [];
        if (!tunnelConnections[to].includes(from)) {
            tunnelConnections[to].push(from);
        }
    });
});

// Initialize the connections with real distances
const connections = initializeConnections();

// Building icon for fixed markers
const buildingIcon = L.icon({
    iconUrl: 'https://cdn.rawgit.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-violet.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.3.4/images/marker-shadow.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
});

// User icon for live tracking (make sure to use a rotated marker if you want to display heading)
const userIcon = L.icon({
    iconUrl: 'https://cdn.rawgit.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-blue.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.3.4/images/marker-shadow.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
});

// Global variables for live tracking
let userMarker = null;
let watchId = null;
let lastUserPosition = null;

// Function to get user's location once (for initial route calculation)
function getUserLocation() {
    return new Promise((resolve, reject) => {
        if (!navigator.geolocation) {
            resolve([42.6853, -73.8241]);
            return;
        }

        navigator.geolocation.getCurrentPosition(
            (position) => {
                const { latitude, longitude } = position.coords;
                resolve([latitude, longitude]);
            },
            (error) => {
                console.warn('Geolocation error:', error.message);
                resolve([42.6853, -73.8241]);
            },
            { 
                enableHighAccuracy: true,
                timeout: 4000,
                maximumAge: 0
            }
        );
    });
}

// Function to start live tracking if the user selects "current"
function startLiveTracking() {
    if (!navigator.geolocation) return;

    // If a previous watch exists, clear it
    if (watchId !== null) {
        navigator.geolocation.clearWatch(watchId);
    }

    watchId = navigator.geolocation.watchPosition(
        (position) => {
            const { latitude, longitude } = position.coords;
            const newPos = [latitude, longitude];

            // Calculate bearing if we have a previous position
            let bearing = 0;
            if (lastUserPosition) {
                bearing = calculateBearing(lastUserPosition, newPos);
            }
            lastUserPosition = newPos;

            // Update or create the user marker
            if (userMarker) {
                userMarker.setLatLng(newPos);
                // Update rotation if using the rotated marker plugin
                userMarker.setRotationAngle(bearing);
            } else {
                userMarker = L.rotatedMarker(newPos, { icon: userIcon, rotationAngle: bearing })
                    .addTo(map)
                    .bindPopup('Your current location');
            }
        },
        (error) => {
            console.warn('Error in watchPosition:', error.message);
        },
        {
            enableHighAccuracy: true,
            timeout: 4000,
            maximumAge: 0
        }
    );
}

// Function to find the nearest entrance node for a building based on start location
function findNearestEntrance(buildingName, startCoords) {
    const entrances = buildingEntrances[buildingName];
    if (!entrances) return null;
    
    return entrances.reduce((nearest, node) => {
        if (!nearest) return node;
        const currentDist = calculateDistance(startCoords, nodes[node]);
        const nearestDist = calculateDistance(startCoords, nodes[nearest]);
        return currentDist < nearestDist ? node : nearest;
    }, null);
}

// Function to find the nearest node to coordinates
function findNearestNode(coords) {
    return Object.keys(nodes).reduce((nearest, node) => {
        const distance = calculateDistance(coords, nodes[node]);
        return distance < calculateDistance(coords, nodes[nearest]) ? node : nearest;
    });
}

// Dijkstra's shortest path algorithm
function findShortestPath(start, end) {
    const distances = {};
    const previous = {};
    const unvisited = new Set();

    // Initialize distances
    Object.keys(connections).forEach(node => {
        distances[node] = node === start ? 0 : Infinity;
        unvisited.add(node);
    });

    while (unvisited.size > 0) {
        // Find the unvisited node with the smallest distance
        const current = Array.from(unvisited).reduce((min, node) => 
            distances[node] < distances[min] ? node : min
        );

        if (current === end) break;

        unvisited.delete(current);

        // Update distances to neighbors
        connections[current].forEach(({ node, distance }) => {
            if (unvisited.has(node)) {
                const tentativeDistance = distances[current] + distance;
                if (tentativeDistance < distances[node]) {
                    distances[node] = tentativeDistance;
                    previous[node] = current;
                }
            }
        });
    }
    
    // ── EARLY EXIT ──
    // If end is still unreachable, distances[end] will be Infinity.
    if (distances[end] === Infinity) {
        console.warn(`No path found from ${start} to ${end}`);
        return { path: [], totalDistance: Infinity };
    }

    // Reconstruct path
    const path = [];
    let current = end;
    while (current) {
        path.unshift(current);
        current = previous[current];
    }

    return {
        path,
        totalDistance: distances[end]
    };
}

// Function to find nearest tunnel entrance
function findNearestTunnelEntrance(coords) {
    let nearestEntrance = null;
    let shortestDistance = Infinity;
    
    // Check all tunnel entrances
    for (const [building, entranceNodes] of Object.entries(tunnelEntrances)) {
        for (const node of entranceNodes) {
            // Skip nodes that don't exist in our nodes object
            if (!nodes[node]) {
                console.warn(`Node ${node} for building ${building} does not exist in nodes object`);
                continue;
            }
            
            const distance = calculateDistance(coords, nodes[node]);
            if (distance < shortestDistance) {
                shortestDistance = distance;
                nearestEntrance = {
                    node: node,
                    building: building,
                    distance: distance
                };
            }
        }
    }
    
    console.log(`Found nearest tunnel entrance: ${nearestEntrance?.node} in ${nearestEntrance?.building} at distance ${nearestEntrance?.distance.toFixed(3)}km`);
    return nearestEntrance;
}

// Function to update location status messages
function updateLocationStatus(message, isError = false) {
    const status = document.getElementById('locationStatus');
    status.style.display = 'block';
    status.style.backgroundColor = isError ? '#ffebee' : '#e8f5e9';
    status.style.color = isError ? '#c62828' : '#2e7d32';
    status.textContent = message;
    
    setTimeout(() => {
        status.textContent = '';
        status.style.display = 'none';
    }, 5000);
}

// Function to clear map layers (markers and polylines)
function clearMapLayers() {
    map.eachLayer((layer) => {
        if (layer instanceof L.Marker || layer instanceof L.Polyline) {
            map.removeLayer(layer);
        }
    });
}

// Helper function to get building name from coordinates (based on your end select element)
function getBuildingNameFromCoords(coords) {
    const select = document.getElementById('end');
    const options = Array.from(select.options);
    return options.find(option => option.value === `${coords[0]}, ${coords[1]}`)?.text;
}
/*
function findNearestTunnelEntrance(startCoords) {
    let nearestEntrance = null;
    let shortestDistance = Infinity;
    
    // Check all tunnel entrances
    for (const [building, entranceNodes] of Object.entries(tunnelEntrances)) {
        for (const node of entranceNodes) {
            const distance = calculateDistance(startCoords, nodes[node]);
            if (distance < shortestDistance) {
                shortestDistance = distance;
                nearestEntrance = {
                    node: node,
                    building: building,
                    distance: distance
                };
            }
        }
    }
    
    return nearestEntrance;
}
*/

// ground route event listener
document.getElementById('groundRouteBtn').addEventListener('click', async () => {
    try {
        clearMapLayers();

        // Get start and end locations
        let startCoords, endCoords;
        const startValue = document.getElementById('start').value;
        const endValue = document.getElementById('end').value;
    
        // ✅ Prevent same start and end
        if (startValue === endValue) {
            updateLocationStatus("You're already at your destination!", true);
            return;
        }

        // Handle start location
        if (startValue === 'current') {
            // Use one-time getUserLocation for route calculation
            startCoords = await getUserLocation();
            updateLocationStatus('📍 Using your current location');
        } else {
            startCoords = startValue.split(',').map(Number);
        }

        // Handle end location (building name and find nearest entrance)
        const endBuildingName = getBuildingNameFromCoords(endValue.split(',').map(Number));
        if (!endBuildingName) {
            updateLocationStatus('Invalid end location. Select a valid building.', true);
            return;
        }

        const endNode = findNearestEntrance(endBuildingName, startCoords);
        if (!endNode) {
            updateLocationStatus(`No entrance found for ${endBuildingName}.`, true);
            return;
        }

        endCoords = nodes[endNode];

        // Add markers for start and end locations
        // For start, if the user chose "current", we will later use live tracking
        if (startValue !== 'current') {
            L.marker(startCoords, { icon: buildingIcon })
                .addTo(map)
                .bindPopup('Start Location');
        }
        L.marker(endCoords, { icon: buildingIcon })
            .addTo(map)
            .bindPopup(`Entrance of ${endBuildingName}`);

        /* Find nearest node for start location
        let startNode;

        // Check if user selected a building (i.e., not current location)
        if (startValue !== 'current') {
            const startBuildingName = getBuildingNameFromCoords(startCoords);
            const tunnelStartNode = 'T' + startBuildingName.replace(/\s+/g, '');
    
        if (nodes[tunnelStartNode]) {
            startNode = tunnelStartNode;
            startCoords = nodes[tunnelStartNode]; // Override for proper marker placement
            console.log(`Start inside academic building. Using tunnel node: ${startNode}`);
        } else {
            startNode = findNearestNode(startCoords);
            console.log(`Start is a building but no tunnel node found. Using nearest node: ${startNode}`);
        }
        } else {
            startNode = findNearestNode(startCoords);
        }   
        */

        // Find nearest surface node for start location
        const surfaceKeys = Object.keys(nodes).filter(k => !/^T/.test(k));
        const startNode = surfaceKeys.reduce((nearest, node) => {
            const dNode    = calculateDistance(startCoords, nodes[node]);
            const dNearest = calculateDistance(startCoords, nodes[nearest]);
            return dNode < dNearest ? node : nearest;
        }, surfaceKeys[0]);
        console.log(`Nearest surface node to start: ${startNode}`);

        // Draw lines to nearest nodes
        L.polyline([startCoords, nodes[startNode]], { 
            color: 'purple', 
            weight: 3
        }).addTo(map);
        L.polyline([endCoords, nodes[endNode]], { 
            color: 'purple', 
            weight: 3
        }).addTo(map);

        // Find and draw the shortest path
        const { path, totalDistance } = findShortestPath(startNode, endNode);
        const route = path.map(node => nodes[node]);
        
        L.polyline(route, {
            color: '#46166B',
            weight: 4,
            opacity: 0.7
        }).addTo(map);

        // Calculate estimated walking time (assuming walking speed of 1.2 m/s)
        const walkingSpeed = 1.2;
        const estimatedTime = Math.round(totalDistance / walkingSpeed);
        const minutes = Math.floor(estimatedTime / 60);
        const seconds = estimatedTime % 60;

        // Display route information with distance and estimated time
        updateLocationStatus(
            `Ground route found! Distance: ${Math.round(totalDistance)} meters (Est. ${minutes}m ${seconds}s)`
        );

        // Fit map to show entire route
        map.fitBounds([startCoords, endCoords, ...route], { padding: [50, 50] });

        // If the user selected "current" as their start, enable live tracking
        if (startValue === 'current') {
            startLiveTracking();
        }

    } catch (error) {
        updateLocationStatus('Ground route calculation error. Please try again.', true);
        console.error(error);
    }
});

// Updated tunnel route button event listener
document.getElementById('tunnelRouteBtn').addEventListener('click', async () => {
    try {
        clearMapLayers();
        console.log("Starting tunnel route calculation...");

        // Get start and end locations
        const startValue = document.getElementById('start').value;
        const endValue = document.getElementById('end').value;
        
        if (startValue === endValue) {
            updateLocationStatus("You're already at your destination!", true);
            return;
        }

        let startCoords, startBuildingName, startTunnelNode = null;
        
        // Handle start location
        if (startValue === 'current') {
            startCoords = await getUserLocation();
            startBuildingName = null;
        } else {
            startCoords = startValue.split(',').map(Number);
            startBuildingName = getBuildingNameFromCoords(startCoords);
            
            // Check if this building has a tunnel node (excluding Campus Center)
            if (startBuildingName && startBuildingName !== 'Campus Center') {
                // Look for corresponding T node
                const possibleTunnelNodes = [
                    'T' + startBuildingName.replace(/\s+/g, ''),
                    'T' + startBuildingName.replace(/\s+Building$/g, '').replace(/\s+/g, '')
                ];
                
                // Check specific mappings
                const tunnelNodeMappings = {
                    'Biology Building': 'TBio',
                    'Chemistry Building': 'TChem',
                    'Earth Science': 'TPine',
                    'Fine Arts Building': 'TFineArt',
                    'Art and Sciences': 'TArtScience',
                    'Catskill': 'TCatSkill',
                    'Social Science Building': 'TSS',
                    'Humanities': 'THumanities',
                    'Taconic': 'TTaconic',
                    'Physics Building': 'TPhysics'
                };
                
                if (tunnelNodeMappings[startBuildingName]) {
                    startTunnelNode = tunnelNodeMappings[startBuildingName];
                } else {
                    // Try the generated names
                    for (const tunnelNode of possibleTunnelNodes) {
                        if (nodes[tunnelNode]) {
                            startTunnelNode = tunnelNode;
                            break;
                        }
                    }
                }
                
                if (startTunnelNode && nodes[startTunnelNode]) {
                    console.log(`Starting from building ${startBuildingName}, using tunnel node: ${startTunnelNode}`);
                    // Override start coordinates to use tunnel node coordinates
                    startCoords = nodes[startTunnelNode];
                }
            }
        }
        
        // Get end location building name
        const endCoords = endValue.split(',').map(Number);
        const endBuildingName = getBuildingNameFromCoords(endCoords);
        
        console.log("Start coordinates:", startCoords);
        console.log("Start building:", startBuildingName);
        console.log("Start tunnel node:", startTunnelNode);
        console.log("End building name:", endBuildingName);
        
        if (!endBuildingName) {
            updateLocationStatus('Invalid end location. Select a valid building.', true);
            return;
        }

        let nearestTunnelEntrance;
        let groundPathResult = null;
        let groundDistance = 0;

        // Determine starting point for tunnel routing
        if (startTunnelNode) {
            // We're starting from inside a building with tunnel access
            nearestTunnelEntrance = {
                node: startTunnelNode,
                building: startBuildingName,
                distance: 0
            };
            console.log("Starting directly from tunnel node:", startTunnelNode);
        } else {
            // Handle special case for Library
            if (startBuildingName === 'University Library') {
                const surfaceNode = buildingEntrances['University Library'][0]; // always "W"
                L.polyline([startCoords, nodes[surfaceNode]], { color: 'purple', weight: 3 })
                 .addTo(map);
                console.log('Library start: routed on surface to W first');
                nearestTunnelEntrance = findNearestTunnelEntrance(nodes[surfaceNode]);
            } else {
                // Normal case: find nearest tunnel entrance and route to it
                nearestTunnelEntrance = findNearestTunnelEntrance(startCoords);
                
                if (!nearestTunnelEntrance || !nearestTunnelEntrance.node) {
                    updateLocationStatus('Could not find a tunnel entrance. Try the ground route.', true);
                    return;
                }
                
                // Find ground path to tunnel entrance
                const startNode = findNearestNode(startCoords);
                const entranceGroundNode = nearestTunnelEntrance.node;
                
                if (!connections[startNode] || !connections[entranceGroundNode]) {
                    updateLocationStatus('Could not connect to tunnel network.', true);
                    return;
                }
                
                groundPathResult = findShortestPath(startNode, entranceGroundNode);
                if (!groundPathResult || !groundPathResult.path || groundPathResult.path.length === 0) {
                    updateLocationStatus('Could not find a ground path to tunnel entrance.', true);
                    return;
                }
                
                groundDistance = groundPathResult.totalDistance;
                console.log("Ground path to tunnel entrance found:", groundPathResult.path);
            }
        }
        
        // Check if the entrance node exists in connections
        if (!connections[nearestTunnelEntrance.node]) {
            console.error("Tunnel entrance node not found in connections:", nearestTunnelEntrance.node);
            updateLocationStatus('Tunnel entrance not properly connected to network.', true);
            return;
        }
        
        // Find the destination's tunnel entrance or exit
        let destinationTunnelNode = null;
        const normalizedEndBuildingName = endBuildingName.trim();
        
        // Check if building has tunnel entrances
        if (tunnelEntrances[normalizedEndBuildingName] && tunnelEntrances[normalizedEndBuildingName].length > 0) {
            const exits = tunnelEntrances[normalizedEndBuildingName];
            let closestExit = exits[0];
            let minDist = calculateDistance(endCoords, nodes[closestExit]);

            for (const exit of exits) {
                const dist = calculateDistance(endCoords, nodes[exit]);
                if (dist < minDist) {
                    closestExit = exit;
                    minDist = dist;
                }
            }
            destinationTunnelNode = closestExit;
        } else {
            // Find the closest tunnel exit to this building
            let closestExit = null;
            let shortestDistance = Infinity;
            
            for (const tunnelNode in tunnelNodes) {
                const distance = calculateDistance(endCoords, nodes[tunnelNode]);
                if (distance < shortestDistance) {
                    shortestDistance = distance;
                    closestExit = tunnelNode;
                }
            }
            destinationTunnelNode = closestExit;
        }
        
        if (!destinationTunnelNode || !connections[destinationTunnelNode]) {
            updateLocationStatus('Could not find a tunnel exit near destination.', true);
            return;
        }
        
        // Find tunnel path from entrance to destination
        console.log("Finding tunnel path from", nearestTunnelEntrance.node, "to", destinationTunnelNode);
        
        const tunnelPathResult = findShortestPath(nearestTunnelEntrance.node, destinationTunnelNode);
        if (!tunnelPathResult || !tunnelPathResult.path || tunnelPathResult.path.length === 0) {
            updateLocationStatus('Could not find a path through the tunnels.', true);
            return;
        }
        
        const tunnelPath = tunnelPathResult.path;
        const tunnelDistance = tunnelPathResult.totalDistance;
        
        // Calculate total distance and time
        const totalDistance = groundDistance + tunnelDistance;
        const walkingSpeed = 1.2; // m/s
        const tunnelWalkingSpeed = 1.5; // m/s
        const groundTimeSeconds = groundDistance / walkingSpeed;
        const tunnelTimeSeconds = tunnelDistance / tunnelWalkingSpeed;
        const totalTimeSeconds = groundTimeSeconds + tunnelTimeSeconds;
        const totalMinutes = Math.floor(totalTimeSeconds / 60);
        const totalSeconds = Math.round(totalTimeSeconds % 60);
        
        // Visualize the routes
        
        // Ground route to tunnel entrance (if applicable)
        if (groundPathResult && groundPathResult.path.length > 0) {
            const groundRouteCoords = groundPathResult.path.map(node => nodes[node]);
            L.polyline([startCoords, ...groundRouteCoords], {
                color: '#46166B',
                weight: 4,
                opacity: 0.7
            }).addTo(map);
        }
        
        // Tunnel route
        const tunnelRouteCoords = tunnelPath.map(node => nodes[node]);
        L.polyline(tunnelRouteCoords, {
            color: '#8B4513',
            weight: 4,
            dashArray: '10, 5',
            opacity: 0.8
        }).addTo(map);
        
        // Add markers
        if (startValue !== 'current') {
            L.marker(startCoords, { icon: userIcon })
                .addTo(map)
                .bindPopup(startTunnelNode ? 
                    `Starting from tunnel entrance in ${startBuildingName}` : 
                    'Starting Position')
                .openPopup();
        }
        
        // Tunnel entrance marker (only if not starting from tunnel)
        if (!startTunnelNode) {
            const entranceBuilding = nearestTunnelEntrance.building || "Tunnel Entrance";
            const entranceInstructions = tunnelEntranceInstructions[entranceBuilding] || 
                `Enter ${entranceBuilding} and look for tunnel access signs in the basement level.`;
                
            L.marker(nodes[nearestTunnelEntrance.node], { 
                icon: buildingIcon,
                zIndexOffset: 1000
            })
                .addTo(map)
                .bindPopup(`
                    <div style="max-width: 250px">
                        <h3>Tunnel Entrance</h3>
                        <p><strong>${entranceBuilding}</strong></p>
                        <p>${entranceInstructions}</p>
                    </div>
                `, { maxWidth: 300 });
        }
        
        // Exit marker
        L.marker(nodes[destinationTunnelNode], { 
            icon: buildingIcon 
        })
            .addTo(map)
            .bindPopup(`
                <div style="max-width: 250px">
                    <h3>Tunnel Exit</h3>
                    <p>Exit the tunnel system here.</p>
                    <p><strong>Destination:</strong> ${endBuildingName}</p>
                </div>
            `, { maxWidth: 300 });
            
        // Final destination marker if different from tunnel exit
        const distanceFromExitToDest = calculateDistance(nodes[destinationTunnelNode], endCoords) * 1000;
        
        if (distanceFromExitToDest > 10) {
            L.marker(endCoords, { icon: buildingIcon })
                .addTo(map)
                .bindPopup(`<strong>${endBuildingName}</strong><br>Your final destination`);
                
            L.polyline([nodes[destinationTunnelNode], endCoords], {
                color: '#46166B',
                weight: 3,
                opacity: 0.7,
                dashArray: '5, 5'
            }).addTo(map);
        }
        
        // Show route information
        const routeInfo = startTunnelNode ? 
            `Tunnel route: ${Math.round(tunnelDistance)}m through tunnels (${totalMinutes}m ${totalSeconds}s)` :
            `Tunnel route: ${Math.round(groundDistance)}m to entrance + ${Math.round(tunnelDistance)}m in tunnels (${totalMinutes}m ${totalSeconds}s)`;
            
        updateLocationStatus(routeInfo);
        
        // Fit map to show the entire route
        const allCoords = [startCoords, ...tunnelRouteCoords, endCoords];
        if (groundPathResult && groundPathResult.path.length > 0) {
            allCoords.push(...groundPathResult.path.map(node => nodes[node]));
        }
        
        map.fitBounds(allCoords, { padding: [50, 50] });
        
        // Enable live tracking if using current location
        if (startValue === 'current') startLiveTracking();

    } catch (error) {
        updateLocationStatus('Error finding tunnel route', true);
        console.error("Tunnel routing error:", error);
    }
});