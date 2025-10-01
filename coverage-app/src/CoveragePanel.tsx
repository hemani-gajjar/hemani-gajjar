import React, { useEffect } from "react";
import { CoverageResponse } from "./types";

interface Props {
  data?: CoverageResponse;
  loading: boolean;
  error?: string;
}

// Helper function to format date strings from "YYYYMMDD" to "DD MMM YYYY"
const formatDate = (dateStr: string) => {
  if (!dateStr || dateStr.length !== 8) return dateStr;
  const year = dateStr.slice(0, 4);
  const month = dateStr.slice(4, 6);
  const day = dateStr.slice(6, 8);

  // Create date object (months are 0-indexed)
  const dateObj = new Date(Number(year), Number(month) - 1, Number(day));

  // Format using Intl.DateTimeFormat or manual formatting
  return dateObj.toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
};

export const CoveragePanel: React.FC<Props> = ({ data, loading, error }) => {
  // Extract and log polygon data when data is received
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

  if (loading) {
    return (
      <div
        style={{
          background: "#ffffff",
          border: "1px solid #e5e7eb",
          borderRadius: 12,
          padding: 16,
          boxShadow: "0 8px 24px rgba(0,0,0,0.06)",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 8,
            color: "#6b7280",
            fontSize: 14,
          }}
        >
          <div
            style={{
              width: 16,
              height: 16,
              border: "2px solid #e5e7eb",
              borderTop: "2px solid #3b82f6",
              borderRadius: "50%",
              animation: "spin 1s linear infinite",
            }}
          />
          Loading coverage data...
        </div>
        <style>
          {`
            @keyframes spin {
              0% { transform: rotate(0deg); }
              100% { transform: rotate(360deg); }
            }
          `}
        </style>
      </div>
    );
  }

  if (error) {
    return (
      <div
        style={{
          background: "#fef2f2",
          border: "1px solid #fecaca",
          borderRadius: 12,
          padding: 16,
          boxShadow: "0 8px 24px rgba(0,0,0,0.06)",
        }}
      >
        <div
          style={{
            fontWeight: 600,
            color: "#dc2626",
            marginBottom: 8,
            fontSize: 14,
          }}
        >
          ⚠️ Error Loading Coverage
        </div>
        <div style={{ color: "#991b1b", fontSize: 12 }}>{error}</div>
      </div>
    );
  }

  if (!data) {
    return (
      <div
        style={{
          background: "#f8fafc",
          border: "1px solid #e2e8f0",
          borderRadius: 12,
          padding: 16,
          textAlign: "center",
          boxShadow: "0 8px 24px rgba(0,0,0,0.06)",
        }}
      >
        <div
          style={{
            color: "#64748b",
            fontSize: 14,
            fontStyle: "italic",
          }}
        >
          🔍 Search for a place or draw a polygon to see coverage data
        </div>
      </div>
    );
  }

  // Format the coverage data for table display
  const formatCoverageData = (items: any) => {
    if (!items || !Array.isArray(items)) return [];

    return items.map((item, index) => {
      const entries = Object.entries(item).filter(
        ([key]) => !["geometry", "geom", "wkt"].includes(key.toLowerCase())
      );
      return { id: index, ...Object.fromEntries(entries) };
    });
  };

  const tableData = formatCoverageData(data.coverage_items);

  return (
    <div
      style={{
        background: "#ffffff",
        border: "1px solid #e5e7eb",
        borderRadius: 12,
        padding: 16,
        boxShadow: "0 8px 24px rgba(0,0,0,0.06)",
        fontFamily:
          'system-ui, -apple-system, "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
      }}
    >
      {/* Header */}
      <div style={{ marginBottom: 12 }}>
        <div
          style={{
            fontWeight: 700,
            fontSize: 16,
            color: "#111827",
            marginBottom: 4,
          }}
        >
          📊 Coverage Results
        </div>
        <div
          style={{
            fontSize: 12,
            color: "#6b7280",
            background: "#f3f4f6",
            padding: "4px 8px",
            borderRadius: 6,
            display: "inline-block",
          }}
        >
          {data.query_type} • {data.query_input}
        </div>
      </div>

      {/* Table */}
      {tableData.length > 0 ? (
        <div
          style={{
            overflowX: "auto",
            border: "1px solid #e5e7eb",
            borderRadius: 8,
          }}
        >
          <table
            style={{
              width: "100%",
              borderCollapse: "collapse",
              fontSize: 12,
            }}
          >
            <thead>
              <tr style={{ background: "#f9fafb" }}>
                {Object.keys(tableData[0])
                  .filter((key) => key !== "id")
                  .map((key) => (
                    <th
                      key={key}
                      style={{
                        padding: "8px 10px",
                        textAlign: "left",
                        fontWeight: 600,
                        color: "#374151",
                        borderBottom: "1px solid #e5e7eb",
                        textTransform: "capitalize",
                      }}
                    >
                      {key.replace(/_/g, " ")}
                    </th>
                  ))}
              </tr>
            </thead>
            <tbody>
              {tableData.map((row, index) => (
                <tr
                  key={row.id}
                  style={{
                    background: index % 2 === 0 ? "#ffffff" : "#f9fafb",
                  }}
                >
                  {Object.entries(row)
                    .filter(([key]) => key !== "id")
                    .map(([key, value]) => (
                      <td
                        key={key}
                        style={{
                          padding: "8px 10px",
                          color: "#374151",
                          borderBottom:
                            index < tableData.length - 1
                              ? "1px solid #f3f4f6"
                              : "none",
                          maxWidth: "150px",
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                          whiteSpace: "nowrap",
                        }}
                        title={String(value)}
                      >
                        {key === "date"
                          ? formatDate(String(value))
                          : typeof value === "number"
                          ? Number(value).toLocaleString()
                          : String(value)}
                      </td>
                    ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div
          style={{
            textAlign: "center",
            color: "#9ca3af",
            fontSize: 12,
            fontStyle: "italic",
            padding: 16,
          }}
        >
          No coverage data available
        </div>
      )}

      {/* Timestamp */}
      <div
        style={{
          marginTop: 12,
          fontSize: 10,
          color: "#9ca3af",
          textAlign: "right",
        }}
      >
        Retrieved: {new Date(data.received_at).toLocaleString()}
      </div>
    </div>
  );
};
