"use client";

import { useState } from "react";
import { DashboardLayout } from "@/components/layout";
import { Card, CardHeader, CardTitle, CardContent, Button, Badge, Modal } from "@/components/ui";
import { Spinner } from "@/components/ui";
import { Layers, Download, Upload, ZoomIn, Info } from "lucide-react";
import dynamic from "next/dynamic";

// Dynamically import MapContainer to avoid SSR issues with Leaflet
const DynamicMapContainer = dynamic(
  () => import("@/components/map/map-container").then((mod) => mod.MapContainer),
  {
    ssr: false,
    loading: () => (
      <div className="w-full h-full min-h-[400px] flex items-center justify-center bg-gray-100 rounded-lg">
        <Spinner size="lg" />
      </div>
    ),
  }
);

// Sample GeoJSON data for demonstration
const sampleGeoJSON: GeoJSON.FeatureCollection = {
  type: "FeatureCollection",
  features: [
    {
      type: "Feature",
      geometry: {
        type: "Point",
        coordinates: [-0.09, 51.505],
      },
      properties: {
        name: "London City Center",
        category: "landmark",
        description: "The heart of London",
      },
    },
    {
      type: "Feature",
      geometry: {
        type: "Point",
        coordinates: [-0.12, 51.51],
      },
      properties: {
        name: "Westminster",
        category: "district",
        description: "Home of Parliament",
      },
    },
    {
      type: "Feature",
      geometry: {
        type: "Polygon",
        coordinates: [
          [
            [-0.1, 51.5],
            [-0.08, 51.5],
            [-0.08, 51.51],
            [-0.1, 51.51],
            [-0.1, 51.5],
          ],
        ],
      },
      properties: {
        name: "City of London",
        category: "area",
        area: "2.90 km²",
      },
    },
  ],
};

export default function MapPage() {
  const [geoJsonData, setGeoJsonData] = useState<GeoJSON.FeatureCollection>(sampleGeoJSON);
  const [selectedFeature, setSelectedFeature] = useState<GeoJSON.Feature | null>(null);
  const [isInfoModalOpen, setIsInfoModalOpen] = useState(false);
  const [importError, setImportError] = useState<string | null>(null);

  const handleFeatureClick = (feature: GeoJSON.Feature) => {
    setSelectedFeature(feature);
    setIsInfoModalOpen(true);
  };

  const handleExport = () => {
    const dataStr = JSON.stringify(geoJsonData, null, 2);
    const blob = new Blob([dataStr], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "map-data.geojson";
    link.click();
    URL.revokeObjectURL(url);
  };

  const handleImport = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setImportError(null);
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const data = JSON.parse(e.target?.result as string);
        if (data.type === "FeatureCollection" && Array.isArray(data.features)) {
          setGeoJsonData(data);
        } else {
          setImportError("Invalid GeoJSON: must be a FeatureCollection");
        }
      } catch {
        setImportError("Invalid GeoJSON file format");
      }
    };
    reader.readAsText(file);
  };

  return (
    <DashboardLayout>
      <div className="h-[calc(100vh-8rem)] flex flex-col">
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-6 gap-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Map</h1>
            <p className="text-gray-500 mt-1">
              Visualize and interact with geospatial data.
            </p>
            {importError && (
              <p className="text-sm text-red-600 mt-2">{importError}</p>
            )}
          </div>
          <div className="flex gap-2">
            <label>
              <input
                type="file"
                accept=".geojson,.json"
                onChange={handleImport}
                className="hidden"
              />
              <Button variant="outline" asChild>
                <span className="cursor-pointer flex items-center gap-2">
                  <Upload className="h-4 w-4" />
                  Import GeoJSON
                </span>
              </Button>
            </label>
            <Button variant="outline" onClick={handleExport}>
              <Download className="h-4 w-4" />
              Export
            </Button>
          </div>
        </div>

        <div className="flex-1 grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Map */}
          <div className="lg:col-span-3">
            <Card className="h-full">
              <CardContent className="p-0 h-full">
                <DynamicMapContainer
                  center={[51.505, -0.09]}
                  zoom={13}
                  geoJson={geoJsonData}
                  onFeatureClick={handleFeatureClick}
                  className="rounded-xl overflow-hidden h-full min-h-[500px]"
                />
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-4">
            {/* Layers */}
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm flex items-center gap-2">
                  <Layers className="h-4 w-4" />
                  Layers
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span>Base Map</span>
                  <Badge>OpenStreetMap</Badge>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span>Features</span>
                  <Badge variant="success">{geoJsonData.features.length}</Badge>
                </div>
              </CardContent>
            </Card>

            {/* Features List */}
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm flex items-center gap-2">
                  <ZoomIn className="h-4 w-4" />
                  Features
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 max-h-[300px] overflow-y-auto">
                  {geoJsonData.features.map((feature, index) => (
                    <button
                      key={index}
                      onClick={() => handleFeatureClick(feature)}
                      className="w-full text-left p-2 rounded-lg hover:bg-gray-50 transition-colors border border-gray-100"
                    >
                      <p className="text-sm font-medium">
                        {(feature.properties?.name as string) || `Feature ${index + 1}`}
                      </p>
                      <p className="text-xs text-gray-500 capitalize">
                        {feature.geometry.type}
                      </p>
                    </button>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Info */}
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm flex items-center gap-2">
                  <Info className="h-4 w-4" />
                  Info
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-xs text-gray-500">
                  Click on any feature on the map to view its properties. 
                  You can import your own GeoJSON files or export the current data.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Feature Info Modal */}
        <Modal
          isOpen={isInfoModalOpen}
          onClose={() => setIsInfoModalOpen(false)}
          title={selectedFeature?.properties?.name as string || "Feature Details"}
          size="md"
        >
          {selectedFeature && (
            <div className="space-y-4">
              <div>
                <p className="text-sm text-gray-500">Geometry Type</p>
                <p className="font-medium capitalize">{selectedFeature.geometry.type}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500 mb-2">Properties</p>
                <div className="bg-gray-50 rounded-lg p-4 space-y-2">
                  {Object.entries(selectedFeature.properties || {}).map(([key, value]) => (
                    <div key={key} className="flex justify-between text-sm">
                      <span className="text-gray-500">{key}:</span>
                      <span className="font-medium">{String(value)}</span>
                    </div>
                  ))}
                </div>
              </div>
              <Button className="w-full" onClick={() => setIsInfoModalOpen(false)}>
                Close
              </Button>
            </div>
          )}
        </Modal>
      </div>
    </DashboardLayout>
  );
}
