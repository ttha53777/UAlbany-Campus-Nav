# UAlbany Campus Routing App

UAlbany Campus Routing is a lightweight web app that helps students navigate the University at Albany campus using an interactive map. The app supports both regular surface walking routes and tunnel-based routes, making it easier to get around campus in different weather conditions.

## Features

- Interactive campus map built with Leaflet and OpenStreetMap
- Surface walking routes across campus
- Tunnel routing using UAlbany’s tunnel network
- Building-to-building navigation
- Optional live location support
- Distance and estimated walking time display
- Static site setup with no build step required

## Demo / Run Locally

This project is a static site, so it does not require a build process.

### Option 1: Open directly

Open `index.html` in your browser.

### Option 2: Run with a local server

This is recommended to avoid browser issues with permissions, assets, or local file restrictions.

Using Python:

```bash
python3 -m http.server 5173
```

Then open:

```bash
http://localhost:5173
```

## How to Use

1. Select a start location.
2. Select an end location.
3. Choose a route type:
   - **Ground** for normal surface walking paths
   - **Tunnel** to prioritize UAlbany’s tunnel network
4. The app will draw the route on the map and show the estimated distance and walking time.

You can also choose **Use My Current Location** as the starting point. The browser will ask for location permission before tracking your position.

## How It Works

The app uses a custom graph-based routing system built around campus nodes and paths.

### Map Rendering

The map is rendered with Leaflet and OpenStreetMap tiles. Leaflet assets are loaded through CDNs in `index.html`.

### Graph Model

Campus locations are represented as nodes with latitude and longitude coordinates. These nodes include:

- Surface path nodes
- Tunnel entrance nodes
- Tunnel network nodes
- Building entrance nodes

Connections between nodes are stored in an adjacency list and initialized through `initializeConnections()`.

### Routing Algorithm

Routes are calculated using Dijkstra’s shortest path algorithm through:

```js
findShortestPath(start, end)
```

Each connection is weighted by real-world distance in meters, allowing the app to choose the shortest available route.

### Building Selection

Buildings are mapped to one or more nearby entrance nodes using `buildingEntrances`.

When a user selects a building, the app chooses the most appropriate entrance node based on the route context.

### Tunnel Routing

For tunnel routes, the app finds a suitable tunnel entrance near the start location, travels through the tunnel network, and exits near the destination when needed. This allows tunnel routes to combine tunnel paths with required surface segments.

## Project Structure

```txt
UAlbany-nav-app/
├── index.html      # Main page layout, controls, Leaflet imports
├── style.css       # Styling for the map, control panel, and UI
└── script.js       # Routing logic, graph data, markers, and map drawing
```

## Requirements

An internet connection is required by default for:

- Leaflet assets loaded through CDN
- OpenStreetMap map tiles

A modern browser is recommended, especially when using geolocation features.

## Geolocation Notes

If the user selects **Use My Current Location**, the browser will request location permission.

If permission is denied or location is unavailable, the app falls back to a default campus coordinate.

