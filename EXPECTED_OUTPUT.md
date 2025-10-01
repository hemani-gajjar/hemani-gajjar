# Polygon Extraction - Expected Output

## Test Scenario

When the Coverage API returns a response with coverage data, the application will automatically extract and log the polygon fields to the console.

## Sample Input (API Response)

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
      ...other fields...
    },
    {
      "date": "20250925",
      "polygon_used_for_analysis": "POLYGON ((139.6296001 35.6104949, 139.6301703 35.6108793, 139.6302603 35.6107872, 139.6306098 35.6104294, 139.6300485 35.6100843, 139.6296001 35.6104949))",
      "polygon_given": "POLYGON ((139.6296001 35.6104949, 139.6300485 35.6100843, 139.6306098 35.6104294, 139.6302603 35.6107872, 139.6301703 35.6108793, 139.6296001 35.6104949))",
      ...other fields...
    }
  ]
}
```

## Expected Console Output

When the CoveragePanel component receives the above data:

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

## Verification

Run the test script to verify:

```bash
node test-polygon-extraction.js
```

This will simulate the extraction and display the expected output.

## Implementation Details

The extraction logic is located in:
- **File**: `coverage-app/src/CoveragePanel.tsx`
- **Method**: `useEffect` hook that runs when `data` prop changes
- **Lines**: 30-49

The logic:
1. Checks if data and coverage_items exist
2. Iterates through each item in coverage_items
3. For items with polygon data, logs:
   - Item index
   - polygon_used_for_analysis (if present)
   - polygon_given (if present)
   - Separator line

## Key Points

✅ Automatically extracts polygon data when API response is received
✅ Handles multiple coverage items
✅ Only logs items that actually have polygon data
✅ Clearly labels each polygon field
✅ Works with empty or null polygon fields gracefully
