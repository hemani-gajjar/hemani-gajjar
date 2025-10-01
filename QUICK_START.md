# Quick Start Guide

## Problem
Extract `polygon_used_for_analysis` and `polygon_given` from Coverage API response and print them to the console.

## Solution
The extraction is implemented in the `CoveragePanel` component using a React `useEffect` hook.

## Location
**File**: `coverage-app/src/CoveragePanel.tsx`
**Lines**: 30-49

## How to Use

### Option 1: Run the Test Script
```bash
node test-polygon-extraction.js
```

### Option 2: Use the React App
```bash
cd coverage-app
npm install
npm run dev
```

Then:
1. Open the app in your browser
2. Click "Load Sample Coverage Data"
3. Open browser console (F12)
4. See the polygon data logged

## What Gets Logged

When the API returns coverage data like this:
```json
{
  "coverage_items": [
    {
      "polygon_used_for_analysis": "POLYGON ((139.6296001 35.6104949, ...))",
      "polygon_given": "POLYGON ((139.6296001 35.6104949, ...))"
    }
  ]
}
```

The console will show:
```
Coverage Item 0:
polygon_used_for_analysis: POLYGON ((139.6296001 35.6104949, ...))
polygon_given: POLYGON ((139.6296001 35.6104949, ...))
---
```

## Code Snippet

```typescript
useEffect(() => {
  if (data && data.coverage_items && data.coverage_items.length > 0) {
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

## Key Points

✅ Automatic extraction when data is received
✅ Handles multiple coverage items
✅ Clear console output with labels
✅ Handles missing/null polygon fields gracefully
✅ No manual intervention required

## Files to Review

1. `coverage-app/src/CoveragePanel.tsx` - Main implementation
2. `coverage-app/src/types.ts` - TypeScript types
3. `test-polygon-extraction.js` - Test script
4. `IMPLEMENTATION_SUMMARY.md` - Complete details

## Verification

Run the test to verify it works:
```bash
node test-polygon-extraction.js
```

Expected output shows polygon data from 2 coverage items! ✅
