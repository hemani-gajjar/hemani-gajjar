/**
 * Simple Node.js script to demonstrate polygon extraction from coverage API response
 * Run with: node test-polygon-extraction.js
 */

// Sample API response (same structure as in the problem statement)
const coverageResponse = {
  query_type: "place",
  query_input: "Rakuten Crimson House",
  received_at: "2025-10-01T06:24:47.578826Z",
  coverage_items: [
    {
      date: "20250924",
      duration_all: 9363.9257861111,
      polygon_used_for_analysis:
        "POLYGON ((139.6296001 35.6104949, 139.6301703 35.6108793, 139.6302603 35.6107872, 139.6306098 35.6104294, 139.6300485 35.6100843, 139.6296001 35.6104949))",
      polygon_given:
        "POLYGON ((139.6296001 35.6104949, 139.6300485 35.6100843, 139.6306098 35.6104294, 139.6302603 35.6107872, 139.6301703 35.6108793, 139.6296001 35.6104949))",
      units: "duration is in hours. volume is in GB. dl_throuput_max is in Mbps",
      place_name: "rakuten crimson house",
    },
    {
      date: "20250925",
      duration_all: 8788.015925,
      polygon_used_for_analysis:
        "POLYGON ((139.6296001 35.6104949, 139.6301703 35.6108793, 139.6302603 35.6107872, 139.6306098 35.6104294, 139.6300485 35.6100843, 139.6296001 35.6104949))",
      polygon_given:
        "POLYGON ((139.6296001 35.6104949, 139.6300485 35.6100843, 139.6306098 35.6104294, 139.6302603 35.6107872, 139.6301703 35.6108793, 139.6296001 35.6104949))",
      units: "duration is in hours. volume is in GB. dl_throuput_max is in Mbps",
      place_name: "rakuten crimson house",
    },
    {},
    {},
    {},
    {},
    {},
  ],
  raw_response: [],
};

// Extract and print polygon data (same logic as in CoveragePanel.tsx)
function extractPolygonData(data) {
  if (data && data.coverage_items && data.coverage_items.length > 0) {
    console.log("=== EXTRACTING POLYGON DATA ===\n");
    
    data.coverage_items.forEach((item, index) => {
      if (item.polygon_used_for_analysis || item.polygon_given) {
        console.log(`Coverage Item ${index}:`);
        
        if (item.polygon_used_for_analysis) {
          console.log("polygon_used_for_analysis:", item.polygon_used_for_analysis);
        }
        
        if (item.polygon_given) {
          console.log("polygon_given:", item.polygon_given);
        }
        
        console.log("---\n");
      }
    });
    
    console.log("=== EXTRACTION COMPLETE ===");
  } else {
    console.log("No coverage data available");
  }
}

// Run the extraction
extractPolygonData(coverageResponse);
