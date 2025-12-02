"use client";

import { useEffect, useRef } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

interface MapContainerProps {
  center?: [number, number];
  zoom?: number;
  geoJson?: GeoJSON.FeatureCollection;
  className?: string;
  onMapReady?: (map: L.Map) => void;
  onFeatureClick?: (feature: GeoJSON.Feature) => void;
}

export function MapContainer({
  center = [51.505, -0.09],
  zoom = 13,
  geoJson,
  className = "",
  onMapReady,
  onFeatureClick,
}: MapContainerProps) {
  const mapRef = useRef<L.Map | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current || mapRef.current) return;

    // Initialize map
    const map = L.map(containerRef.current).setView(center, zoom);

    // Add tile layer
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(map);

    mapRef.current = map;

    if (onMapReady) {
      onMapReady(map);
    }

    return () => {
      map.remove();
      mapRef.current = null;
    };
  }, [center, zoom, onMapReady]);

  // Handle GeoJSON data
  useEffect(() => {
    if (!mapRef.current || !geoJson) return;

    const geoJsonLayer = L.geoJSON(geoJson as GeoJSON.GeoJsonObject, {
      style: {
        color: "#3b82f6",
        weight: 2,
        opacity: 0.8,
        fillOpacity: 0.4,
      },
      onEachFeature: (feature, layer) => {
        if (onFeatureClick) {
          layer.on("click", () => onFeatureClick(feature));
        }

        // Add popup if properties exist
        if (feature.properties) {
          const popupContent = Object.entries(feature.properties)
            .map(([key, value]) => `<strong>${key}:</strong> ${value}`)
            .join("<br>");
          layer.bindPopup(popupContent);
        }
      },
    }).addTo(mapRef.current);

    // Fit bounds to GeoJSON
    if (geoJson.features.length > 0) {
      mapRef.current.fitBounds(geoJsonLayer.getBounds());
    }

    return () => {
      geoJsonLayer.remove();
    };
  }, [geoJson, onFeatureClick]);

  return (
    <div
      ref={containerRef}
      className={`w-full h-full min-h-[400px] rounded-lg ${className}`}
      style={{ zIndex: 0 }}
    />
  );
}
