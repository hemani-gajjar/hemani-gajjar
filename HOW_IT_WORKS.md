# How The Polygon Extraction Works

## Flow Diagram

```
API Response                CoveragePanel Component              Browser Console
    │                              │                                   │
    │  Coverage Data               │                                   │
    │  (with polygons)             │                                   │
    │─────────────────────────────>│                                   │
    │                              │                                   │
    │                              │ useEffect Hook                    │
    │                              │ Triggered                         │
    │                              │                                   │
    │                              │ Check if data exists              │
    │                              │ & has coverage_items              │
    │                              │                                   │
    │                              │ Iterate through                   │
    │                              │ each coverage item                │
    │                              │                                   │
    │                              │ For each item with                │
    │                              │ polygon data:                     │
    │                              │                                   │
    │                              │ console.log(...)──────────────────>│
    │                              │                                   │ Coverage Item 0:
    │                              │                                   │ polygon_used_for_analysis: ...
    │                              │                                   │ polygon_given: ...
    │                              │                                   │ ---
    │                              │                                   │
    │                              │ console.log(...)──────────────────>│
    │                              │                                   │ Coverage Item 1:
    │                              │                                   │ polygon_used_for_analysis: ...
    │                              │                                   │ polygon_given: ...
    │                              │                                   │ ---
```

## Step-by-Step Explanation

### Step 1: API Response Received
The Coverage API returns a response like:
```json
{
  "coverage_items": [
    {
      "polygon_used_for_analysis": "POLYGON (...)",
      "polygon_given": "POLYGON (...)"
    }
  ]
}
```

### Step 2: Data Passed to Component
The response data is passed to the `CoveragePanel` component via props:
```typescript
<CoveragePanel data={coverageResponse} loading={false} />
```

### Step 3: useEffect Hook Triggers
When the `data` prop changes, the `useEffect` hook executes:
```typescript
useEffect(() => {
  if (data && data.coverage_items && data.coverage_items.length > 0) {
    // Extraction logic here
  }
}, [data]); // Dependency on data prop
```

### Step 4: Iteration Through Coverage Items
The hook iterates through each item in the `coverage_items` array:
```typescript
data.coverage_items.forEach((item, index) => {
  // Process each item
});
```

### Step 5: Check for Polygon Data
For each item, check if it has polygon fields:
```typescript
if (item.polygon_used_for_analysis || item.polygon_given) {
  // Extract and log
}
```

### Step 6: Extract and Log
If polygon data exists, log it to the console:
```typescript
console.log(`Coverage Item ${index}:`);

if (item.polygon_used_for_analysis) {
  console.log("polygon_used_for_analysis:", item.polygon_used_for_analysis);
}

if (item.polygon_given) {
  console.log("polygon_given:", item.polygon_given);
}

console.log("---");
```

### Step 7: Console Output
The browser console displays:
```
Coverage Item 0:
polygon_used_for_analysis: POLYGON ((139.6296001 35.6104949, ...))
polygon_given: POLYGON ((139.6296001 35.6104949, ...))
---
```

## Key Points

✅ **Automatic**: Happens automatically when data changes
✅ **Reactive**: Uses React's useEffect hook for reactivity
✅ **Safe**: Checks for data existence before processing
✅ **Complete**: Processes all coverage items in the response
✅ **Clear**: Provides well-formatted console output

## Code Location

**File**: `coverage-app/src/CoveragePanel.tsx`
**Lines**: 30-49

## Testing

You can test this flow by:
1. Running `node test-polygon-extraction.js` (simulated)
2. Running the full app and checking browser console (real)

Both will show the same polygon extraction behavior!
