# Solution: Extract Polygon Data from Coverage API

## Problem Statement
Extract `polygon_used_for_analysis` and `polygon_given` from the Coverage API response and print them to the console.

## Solution Overview
The solution is implemented in the `CoveragePanel` component using a React `useEffect` hook that automatically extracts and logs polygon data whenever coverage data is received.

## Implementation

### File: `coverage-app/src/CoveragePanel.tsx`

The key implementation is in lines 30-49:

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

1. **Trigger**: The `useEffect` hook runs whenever the `data` prop changes
2. **Validation**: Checks if data exists and has coverage_items
3. **Iteration**: Loops through each item in coverage_items array
4. **Extraction**: For items with polygon data:
   - Logs the item index
   - Logs `polygon_used_for_analysis` if present
   - Logs `polygon_given` if present
   - Adds a separator line for readability
5. **Output**: All data is logged to the browser console

## Example

### Input (API Response)
```json
{
  "coverage_items": [
    {
      "date": "20250924",
      "polygon_used_for_analysis": "POLYGON ((139.6296001 35.6104949, 139.6301703 35.6108793, ...))",
      "polygon_given": "POLYGON ((139.6296001 35.6104949, 139.6300485 35.6100843, ...))"
    }
  ]
}
```

### Output (Console)
```
Coverage Item 0:
polygon_used_for_analysis: POLYGON ((139.6296001 35.6104949, 139.6301703 35.6108793, ...))
polygon_given: POLYGON ((139.6296001 35.6104949, 139.6300485 35.6100843, ...))
---
```

## Testing

### Quick Test (Node.js)
```bash
node test-polygon-extraction.js
```

### Full Application Test
```bash
cd coverage-app
npm install
npm run dev
```

Open the app in browser, load sample data, and check the console (F12).

## Key Features

✅ **Automatic**: No manual intervention needed
✅ **Robust**: Handles missing or null polygon fields
✅ **Clear**: Well-formatted console output
✅ **Multiple Items**: Processes all coverage items in response
✅ **Type-Safe**: Full TypeScript support

## Files Created

1. **coverage-app/src/CoveragePanel.tsx** - Main implementation
2. **coverage-app/src/types.ts** - TypeScript type definitions
3. **coverage-app/src/MapView.tsx** - Map component
4. **coverage-app/src/App.tsx** - Demo application
5. **test-polygon-extraction.js** - Standalone test script

## Verification

✅ Implementation tested and working
✅ Console output matches requirements
✅ All code committed to repository
✅ Documentation provided

## Summary

The solution successfully extracts both `polygon_used_for_analysis` and `polygon_given` from the Coverage API response and logs them to the console with clear labels. The implementation is clean, maintainable, and handles edge cases gracefully.
