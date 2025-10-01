import React, { useState } from "react";
import { MapView } from "./MapView";
import { CoveragePanel } from "./CoveragePanel";
import { CoverageResponse } from "./types";

// Sample API response data for testing
const sampleCoverageResponse: CoverageResponse = {
  query_type: "place",
  query_input: "Rakuten Crimson House",
  received_at: "2025-10-01T06:24:47.578826Z",
  coverage_items: [
    {
      date: "20250924",
      duration_all: 9363.9257861111,
      volume_all: 6011912.46272043,
      session_count_all: 2239320,
      unique_imsi_count_all: 10234,
      volte_drop_count: 2,
      volte_failure_count: 3,
      volte_normal_count: 2104,
      dl_throuput_max: 1.8437107084,
      unique_imsi_count_with_dl_throuput_max_lt1: 7416,
      unique_imsi_count_with_dl_throuput_max_gte1_lt3: 1288,
      unique_imsi_count_with_dl_throuput_max_gte3_lt5: 301,
      unique_imsi_count_with_dl_throuput_max_gte5_lt10: 238,
      unique_imsi_count_with_dl_throuput_max_gte10_lt20: 98,
      unique_imsi_count_with_dl_throuput_max_gte20_lt50: 52,
      unique_imsi_count_with_dl_throuput_max_gte50: 26,
      unique_imsi_count_oos: 1214,
      unique_imsi_count_oos_with_session_count_1: 937,
      unique_imsi_count_oos_with_session_count_gt1_lte5: 275,
      unique_imsi_count_oos_with_session_count_gt5_lte10: 1,
      unique_imsi_count_oos_with_session_count_gt10_lte20: null,
      unique_imsi_count_oos_with_session_count_gt20_lte50: 1,
      unique_imsi_count_oos_with_session_count_gt50_lte100: null,
      unique_imsi_count_oos_with_session_count_gt100: null,
      session_count_oos: 1642,
      unique_imsi_count_no_coverage: 2428,
      unique_imsi_count_no_coverage_with_duration_lte5min: 2404,
      unique_imsi_count_no_coverage_with_duration_gt5min_lte15min: 21,
      unique_imsi_count_no_coverage_with_duration_gt15min_lte30min: 1,
      unique_imsi_count_no_coverage_with_duration_gt30min_lte1hour: 2,
      unique_imsi_count_no_coverage_with_duration_gt1hour_lte2hour: null,
      unique_imsi_count_no_coverage_with_duration_gt2hour: null,
      duration_no_coverage: 21.2265913889,
      volume_no_coverage: 38237.803046077,
      session_count_no_coverage: 4664,
      unique_imsi_count_poor_coverage: 3158,
      unique_imsi_count_poor_coverage_with_duration_lte5min: 3035,
      unique_imsi_count_poor_coverage_with_duration_gt5min_lte15min: 103,
      unique_imsi_count_poor_coverage_with_duration_gt15min_lte30min: 16,
      unique_imsi_count_poor_coverage_with_duration_gt30min_lte1hour: 3,
      unique_imsi_count_poor_coverage_with_duration_gt1hour_lte2hour: 1,
      unique_imsi_count_poor_coverage_with_duration_gt2hour: null,
      duration_poor_coverage: 54.4753038889,
      volume_poor_coverage: 64795.1297093643,
      session_count_poor_coverage: 8909,
      unique_imsi_count_medium_coverage: 4028,
      unique_imsi_count_medium_coverage_with_duration_lte5min: 3767,
      unique_imsi_count_medium_coverage_with_duration_gt5min_lte15min: 221,
      unique_imsi_count_medium_coverage_with_duration_gt15min_lte30min: 32,
      unique_imsi_count_medium_coverage_with_duration_gt30min_lte1hour: 7,
      unique_imsi_count_medium_coverage_with_duration_gt1hour_lte2hour: null,
      unique_imsi_count_medium_coverage_with_duration_gt2hour: 1,
      duration_medium_coverage: 101.5896336111,
      volume_medium_coverage: 121159.3219797756,
      session_count_medium_coverage: 16968,
      unique_imsi_count_good_coverage: 9770,
      unique_imsi_count_good_coverage_with_duration_lte5min: 3204,
      unique_imsi_count_good_coverage_with_duration_gt5min_lte15min: 1109,
      unique_imsi_count_good_coverage_with_duration_gt15min_lte30min: 1040,
      unique_imsi_count_good_coverage_with_duration_gt30min_lte1hour: 1496,
      unique_imsi_count_good_coverage_with_duration_gt1hour_lte2hour: 1497,
      unique_imsi_count_good_coverage_with_duration_gt2hour: 1424,
      duration_good_coverage: 9160.265765,
      volume_good_coverage: 5238094.162890678,
      session_count_good_coverage: 2134064,
      session_count_kddi: 10171,
      unique_imsi_count_kddi: 2461,
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
      volume_all: 5937087.325557014,
      session_count_all: 2044108,
      unique_imsi_count_all: 10216,
      volte_drop_count: 3,
      volte_failure_count: 2,
      volte_normal_count: 1556,
      dl_throuput_max: 2.9898387683,
      unique_imsi_count_with_dl_throuput_max_lt1: 7403,
      unique_imsi_count_with_dl_throuput_max_gte1_lt3: 1325,
      unique_imsi_count_with_dl_throuput_max_gte3_lt5: 305,
      unique_imsi_count_with_dl_throuput_max_gte5_lt10: 187,
      unique_imsi_count_with_dl_throuput_max_gte10_lt20: 105,
      unique_imsi_count_with_dl_throuput_max_gte20_lt50: 56,
      unique_imsi_count_with_dl_throuput_max_gte50: 54,
      unique_imsi_count_oos: 1158,
      unique_imsi_count_oos_with_session_count_1: 892,
      unique_imsi_count_oos_with_session_count_gt1_lte5: 259,
      unique_imsi_count_oos_with_session_count_gt5_lte10: 6,
      unique_imsi_count_oos_with_session_count_gt10_lte20: null,
      unique_imsi_count_oos_with_session_count_gt20_lte50: null,
      unique_imsi_count_oos_with_session_count_gt50_lte100: 1,
      unique_imsi_count_oos_with_session_count_gt100: null,
      session_count_oos: 1589,
      unique_imsi_count_no_coverage: 2372,
      unique_imsi_count_no_coverage_with_duration_lte5min: 2354,
      unique_imsi_count_no_coverage_with_duration_gt5min_lte15min: 14,
      unique_imsi_count_no_coverage_with_duration_gt15min_lte30min: 3,
      unique_imsi_count_no_coverage_with_duration_gt30min_lte1hour: 1,
      unique_imsi_count_no_coverage_with_duration_gt1hour_lte2hour: null,
      unique_imsi_count_no_coverage_with_duration_gt2hour: null,
      duration_no_coverage: 19.6674330556,
      volume_no_coverage: 24049.7191613507,
      session_count_no_coverage: 4331,
      unique_imsi_count_poor_coverage: 3148,
      unique_imsi_count_poor_coverage_with_duration_lte5min: 3033,
      unique_imsi_count_poor_coverage_with_duration_gt5min_lte15min: 99,
      unique_imsi_count_poor_coverage_with_duration_gt15min_lte30min: 11,
      unique_imsi_count_poor_coverage_with_duration_gt30min_lte1hour: 4,
      unique_imsi_count_poor_coverage_with_duration_gt1hour_lte2hour: 1,
      unique_imsi_count_poor_coverage_with_duration_gt2hour: null,
      duration_poor_coverage: 54.4463897222,
      volume_poor_coverage: 39422.3665427467,
      session_count_poor_coverage: 8299,
      unique_imsi_count_medium_coverage: 3984,
      unique_imsi_count_medium_coverage_with_duration_lte5min: 3720,
      unique_imsi_count_medium_coverage_with_duration_gt5min_lte15min: 229,
      unique_imsi_count_medium_coverage_with_duration_gt15min_lte30min: 28,
      unique_imsi_count_medium_coverage_with_duration_gt30min_lte1hour: 6,
      unique_imsi_count_medium_coverage_with_duration_gt1hour_lte2hour: null,
      unique_imsi_count_medium_coverage_with_duration_gt2hour: 1,
      duration_medium_coverage: 103.3847011111,
      volume_medium_coverage: 102999.7257251977,
      session_count_medium_coverage: 15252,
      unique_imsi_count_good_coverage: 9780,
      unique_imsi_count_good_coverage_with_duration_lte5min: 3097,
      unique_imsi_count_good_coverage_with_duration_gt5min_lte15min: 1146,
      unique_imsi_count_good_coverage_with_duration_gt15min_lte30min: 1076,
      unique_imsi_count_good_coverage_with_duration_gt30min_lte1hour: 1537,
      unique_imsi_count_good_coverage_with_duration_gt1hour_lte2hour: 1586,
      unique_imsi_count_good_coverage_with_duration_gt2hour: 1338,
      duration_good_coverage: 8589.2629861111,
      volume_good_coverage: 5430417.615119952,
      session_count_good_coverage: 1967747,
      session_count_kddi: 8729,
      unique_imsi_count_kddi: 2461,
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

function App() {
  const [coverageData, setCoverageData] = useState<CoverageResponse | undefined>(undefined);
  const [loading, setLoading] = useState(false);

  const handlePolygonCreated = (geojson: any) => {
    console.log("Polygon created:", geojson);
  };

  const handleLoadSampleData = () => {
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      setCoverageData(sampleCoverageResponse);
      setLoading(false);
    }, 1000);
  };

  return (
    <div style={{ padding: 20, fontFamily: "system-ui, sans-serif" }}>
      <h1>Coverage Visualization App</h1>
      <p>
        This app demonstrates extracting polygon data from coverage API responses.
      </p>
      
      <button
        onClick={handleLoadSampleData}
        style={{
          padding: "10px 20px",
          marginBottom: 20,
          backgroundColor: "#3b82f6",
          color: "white",
          border: "none",
          borderRadius: 8,
          cursor: "pointer",
          fontSize: 14,
          fontWeight: 600,
        }}
      >
        Load Sample Coverage Data
      </button>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
        <div>
          <h2>Map View</h2>
          <div style={{ height: 500, border: "1px solid #e5e7eb", borderRadius: 8 }}>
            <MapView
              center={[35.6104949, 139.6296001]}
              markerLabel="Rakuten Crimson House"
              onPolygonCreated={handlePolygonCreated}
            />
          </div>
        </div>

        <div>
          <h2>Coverage Panel</h2>
          <CoveragePanel data={coverageData} loading={loading} />
        </div>
      </div>

      <div style={{ marginTop: 20, padding: 16, backgroundColor: "#f9fafb", borderRadius: 8 }}>
        <h3>Instructions:</h3>
        <ol>
          <li>Click the "Load Sample Coverage Data" button above</li>
          <li>Open your browser's developer console (F12 or Cmd+Option+I)</li>
          <li>Look for console output showing the polygon data:
            <ul>
              <li><code>polygon_used_for_analysis</code></li>
              <li><code>polygon_given</code></li>
            </ul>
          </li>
        </ol>
      </div>
    </div>
  );
}

export default App;
