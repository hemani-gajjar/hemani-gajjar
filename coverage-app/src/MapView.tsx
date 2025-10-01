import React, { useEffect, useRef } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet-draw/dist/leaflet.draw.css";

interface Props {
  center: [number, number];
  markerLabel?: string;
  onPolygonCreated: (geojson: any) => void;
  overlayGeoJSON?: GeoJSON.FeatureCollection | null;
}

export const MapView: React.FC<Props> = ({
  center,
  markerLabel,
  onPolygonCreated,
  overlayGeoJSON,
}) => {
  const mapRef = useRef<L.Map | null>(null);
  const mapElRef = useRef<HTMLDivElement | null>(null);
  const drawnItemsRef = useRef<L.FeatureGroup | null>(null);
  const markerRef = useRef<L.Marker | null>(null);
  const overlayRef = useRef<L.GeoJSON | null>(null);

  useEffect(() => {
    const el = mapElRef.current;
    if (!el) return;

    if (mapRef.current) {
      // Map already initialized, just update view if needed
      mapRef.current.setView(center, 13);
      return;
    }

    (window as any).L = L;

    const map = L.map(el).setView(center, 13);
    mapRef.current = map;

    // Use MapTiler Streets raster tiles with English labels
    const key = import.meta.env.VITE_MAPTILER_KEY;
    L.tileLayer(
      `https://api.maptiler.com/maps/streets/{z}/{x}/{y}.png?key=${key}&language=en`,
      {
        attribution:
          '© <a href="https://www.maptiler.com/copyright/">MapTiler</a> © <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
        maxZoom: 20,
        tileSize: 256, // MapTiler supports both 512 and 256px tiles
        crossOrigin: true,
      }
    ).addTo(map);

    if (markerLabel) {
      markerRef.current = L.marker(center).addTo(map).bindPopup(markerLabel);
    }

    const drawnItems = new L.FeatureGroup();
    drawnItemsRef.current = drawnItems;
    map.addLayer(drawnItems);

    const wkt =
      "POLYGON ((139.6296001 35.6104949, 139.6301703 35.6108793, 139.6302603 35.6107872, 139.6306098 35.6104294, 139.6300485 35.6100843, 139.6296001 35.6104949))";

    function parseWKTPolygon(wkt: string): L.LatLngExpression[] {
      // Remove "POLYGON ((" and "))" or any parentheses with a regex
      const coordsString = wkt
        .replace(/POLYGON\s*\(\(/i, "")
        .replace(/\)\)$/, "")
        .trim();

      const coordPairs = coordsString.split(",").map((s) => s.trim());

      const latLngs = coordPairs.map((pair) => {
        // Now the pairs are clean, no parentheses
        const [lngStr, latStr] = pair.split(/\s+/);
        const lat = parseFloat(latStr);
        const lng = parseFloat(lngStr);

        if (isNaN(lat) || isNaN(lng)) {
          console.error("Invalid coordinate:", pair);
          throw new Error(`Invalid coordinate in WKT polygon: ${pair}`);
        }

        return [lat, lng] as L.LatLngExpression;
      });

      return latLngs;
    }

    // Assuming you have an initialized Leaflet map map
    const polygonCoords = parseWKTPolygon(wkt);

    // Create and add polygon layer
    const polygon = L.polygon(polygonCoords, { color: "blue" }).addTo(map);

    // Optional: fit map bounds to polygon
    map.fitBounds(polygon.getBounds());

    let removeHandlers: Array<() => void> = [];

    (async () => {
      await import("leaflet-draw");

      const drawControl = new (L as any).Control.Draw({
        draw: {
          polygon: true,
          rectangle: true,
          circle: false,
          circlemarker: false,
          marker: false,
          polyline: false,
        },
        edit: {
          featureGroup: drawnItems,
        },
      });

      map.addControl(drawControl);

      const onCreated = (e: any) => {
        const layer = e.layer;
        drawnItems.addLayer(layer);
        const gj = layer.toGeoJSON();
        if (gj?.geometry) onPolygonCreated(gj.geometry);
      };

      map.on((L as any).Draw.Event.CREATED, onCreated);

      removeHandlers.push(() =>
        map.off((L as any).Draw.Event.CREATED, onCreated)
      );
    })();

    return () => {
      try {
        removeHandlers.forEach((fn) => fn());
      } catch {}

      if (overlayRef.current) {
        overlayRef.current.remove();
        overlayRef.current = null;
      }

      map.off();
      map.remove();
      mapRef.current = null;
      drawnItemsRef.current = null;
      markerRef.current = null;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const map = mapRef.current;
    if (!map) return;

    map.setView(center);

    if (markerLabel) {
      if (!markerRef.current) {
        markerRef.current = L.marker(center).addTo(map).bindPopup(markerLabel);
      } else {
        markerRef.current.setLatLng(center).bindPopup(markerLabel);
      }
    }
  }, [center, markerLabel]);

  useEffect(() => {
    const map = mapRef.current;
    if (!map) return;

    if (overlayRef.current) {
      overlayRef.current.removeFrom(map);
      overlayRef.current = null;
    }

    if (!overlayGeoJSON) return;

    const geo = L.geoJSON(overlayGeoJSON as any, {
      style: {
        color: "#2563eb",
        weight: 2,
        opacity: 0.9,
        fillColor: "#60a5fa",
        fillOpacity: 0.15,
      },
    });

    overlayRef.current = geo;
    geo.addTo(map);

    try {
      const b = geo.getBounds();
      if (b.isValid()) {
        map.fitBounds(b.pad(0.1));
      }
    } catch {}
  }, [overlayGeoJSON]);

  return <div ref={mapElRef} style={{ width: "100%", height: "100%" }} />;
};
