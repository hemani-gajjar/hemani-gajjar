# Coverage Visualization App

A React TypeScript application for visualizing coverage data from API responses with polygon extraction capabilities.

## Features

- **Map Visualization**: Interactive map using Leaflet to display coverage areas
- **Coverage Data Display**: Formatted table view of coverage metrics
- **Polygon Extraction**: Automatically extracts and logs `polygon_used_for_analysis` and `polygon_given` from API responses
- **Console Logging**: Polygon data is logged to the browser console for easy inspection

## Key Components

### CoveragePanel.tsx
Displays coverage data in a formatted table and **automatically extracts polygon data** from the API response.

When coverage data is received, the component logs the following to the console:
- `polygon_used_for_analysis`: The polygon that was used for the coverage analysis
- `polygon_given`: The original polygon provided in the request

### MapView.tsx
Renders an interactive map with support for:
- Custom markers
- Polygon drawing
- WKT polygon parsing
- GeoJSON overlays

### types.ts
TypeScript interfaces for the coverage API response structure, including:
- `CoverageResponse`: Main API response structure
- `CoverageItem`: Individual coverage data item with polygon fields

## Usage

When the API response is received with coverage data:

```typescript
{
  "query_type": "place",
  "query_input": "Rakuten Crimson House",
  "coverage_items": [
    {
      "date": "20250924",
      "polygon_used_for_analysis": "POLYGON ((139.6296001 35.6104949, ...))",
      "polygon_given": "POLYGON ((139.6296001 35.6104949, ...))",
      // ... other coverage data
    }
  ]
}
```

The `CoveragePanel` component will automatically:
1. Receive the data via props
2. Extract polygon fields from each coverage item
3. Log them to the console:
   ```
   Coverage Item 0:
   polygon_used_for_analysis: POLYGON ((139.6296001 35.6104949, ...))
   polygon_given: POLYGON ((139.6296001 35.6104949, ...))
   ---
   ```

## How to Check Console Output

1. Load the application in your browser
2. Trigger an API call or load sample data
3. Open browser Developer Console (F12 or Cmd+Option+I)
4. Look for the polygon data output

## Installation

```bash
cd coverage-app
npm install
```

## Development

```bash
npm run dev
```

## Build

```bash
npm run build
```

## Environment Variables

Create a `.env` file with:
```
VITE_MAPTILER_KEY=your_maptiler_api_key
```

## Technologies Used

- React 18
- TypeScript
- Leaflet (mapping library)
- Leaflet Draw (polygon drawing)
- Vite (build tool)
