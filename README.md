### Hey there 👋

## Coverage Visualization App

This repository contains a React TypeScript application for visualizing coverage data from API responses.

### 📋 Main Feature: Polygon Extraction

The application automatically extracts and logs `polygon_used_for_analysis` and `polygon_given` fields from coverage API responses to the browser console.

### 📂 Project Structure

```
coverage-app/
├── src/
│   ├── CoveragePanel.tsx  # Main component with polygon extraction logic
│   ├── MapView.tsx        # Map visualization component
│   ├── App.tsx            # Sample application
│   └── types.ts           # TypeScript interfaces
├── package.json
└── README.md
```

### 🚀 Quick Start

1. Navigate to the coverage-app directory:
   ```bash
   cd coverage-app
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Run the development server:
   ```bash
   npm run dev
   ```

4. Open your browser and check the console for polygon data

### 📖 Documentation

- [Polygon Extraction Implementation](POLYGON_EXTRACTION.md) - Detailed implementation guide
- [Expected Output](EXPECTED_OUTPUT.md) - Example of console output
- [Coverage App README](coverage-app/README.md) - Full project documentation

### 🧪 Testing

Run the test script to verify polygon extraction:
```bash
node test-polygon-extraction.js
```

### ✨ Key Implementation

The polygon extraction is implemented in `CoveragePanel.tsx` using a React useEffect hook that:
1. Monitors the `data` prop for changes
2. Iterates through coverage_items
3. Extracts and logs polygon fields to console

```typescript
useEffect(() => {
  if (data && data.coverage_items && data.coverage_items.length > 0) {
    data.coverage_items.forEach((item, index) => {
      if (item.polygon_used_for_analysis || item.polygon_given) {
        console.log(`Coverage Item ${index}:`);
        console.log("polygon_used_for_analysis:", item.polygon_used_for_analysis);
        console.log("polygon_given:", item.polygon_given);
        console.log("---");
      }
    });
  }
}, [data]);
```
