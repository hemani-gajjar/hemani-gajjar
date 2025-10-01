# Polygon Extraction from Coverage API

## Overview

This project extracts `polygon_used_for_analysis` and `polygon_given` from coverage API responses and prints them to the console.

## Implementation

The extraction is implemented in `coverage-app/src/CoveragePanel.tsx` using a React `useEffect` hook:

```typescript
useEffect(() => {
  if (data && data.coverage_items && data.coverage_items.length > 0) {
    // Iterate through coverage items to find polygon data
    data.coverage_items.forEach((item, index) => {
      if (item.polygon_used_for_analysis || item.polygon_given) {
        console.log(`Coverage Item ${index}:`);
        
        if (item.polygon_used_for_analysis) {
          console.log("polygon_used_for_analysis:", item.polygon_used_for_analysis);
        }
        
        if (item.polygon_given) {
          console.log("polygon_given:", item.polygon_given);
        }
        
        console.log("---");
      }
    });
  }
}, [data]);
```

## How It Works

1. **Data Reception**: When the `CoveragePanel` component receives data via props
2. **Effect Trigger**: The `useEffect` hook is triggered whenever the `data` prop changes
3. **Iteration**: The code iterates through all items in `coverage_items` array
4. **Extraction**: For each item that has polygon data, it logs:
   - The item index
   - `polygon_used_for_analysis` (if present)
   - `polygon_given` (if present)
   - A separator line

## Example API Response

```json
{
  "query_type": "place",
  "query_input": "Rakuten Crimson House",
  "received_at": "2025-10-01T06:24:47.578826Z",
  "coverage_items": [
    {
      "date": "20250924",
      "polygon_used_for_analysis": "POLYGON ((139.6296001 35.6104949, 139.6301703 35.6108793, 139.6302603 35.6107872, 139.6306098 35.6104294, 139.6300485 35.6100843, 139.6296001 35.6104949))",
      "polygon_given": "POLYGON ((139.6296001 35.6104949, 139.6300485 35.6100843, 139.6306098 35.6104294, 139.6302603 35.6107872, 139.6301703 35.6108793, 139.6296001 35.6104949))",
      ...
    }
  ]
}
```

## Console Output

When the above API response is processed, the console will show:

```
Coverage Item 0:
polygon_used_for_analysis: POLYGON ((139.6296001 35.6104949, 139.6301703 35.6108793, 139.6302603 35.6107872, 139.6306098 35.6104294, 139.6300485 35.6100843, 139.6296001 35.6104949))
polygon_given: POLYGON ((139.6296001 35.6104949, 139.6300485 35.6100843, 139.6306098 35.6104294, 139.6302603 35.6107872, 139.6301703 35.6108793, 139.6296001 35.6104949))
---
Coverage Item 1:
polygon_used_for_analysis: POLYGON ((139.6296001 35.6104949, 139.6301703 35.6108793, 139.6302603 35.6107872, 139.6306098 35.6104294, 139.6300485 35.6100843, 139.6296001 35.6104949))
polygon_given: POLYGON ((139.6296001 35.6104949, 139.6300485 35.6100843, 139.6306098 35.6104294, 139.6302603 35.6107872, 139.6301703 35.6108793, 139.6296001 35.6104949))
---
```

## Testing

1. Navigate to the coverage-app directory
2. Install dependencies: `npm install`
3. Run the development server: `npm run dev`
4. Open the app in your browser
5. Click "Load Sample Coverage Data" button
6. Open browser Developer Console (F12 or Cmd+Option+I)
7. View the polygon data in the console output

## Files Modified/Created

- `coverage-app/src/CoveragePanel.tsx` - Main component with polygon extraction logic
- `coverage-app/src/types.ts` - TypeScript types for API response
- `coverage-app/src/MapView.tsx` - Map visualization component
- `coverage-app/src/App.tsx` - Main app component with sample data
- `coverage-app/package.json` - Project dependencies
- `coverage-app/README.md` - Project documentation
