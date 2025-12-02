"use client";

import dynamic from "next/dynamic";
import { Spinner } from "@/components/ui";

// Dynamically import MapContainer to avoid SSR issues with Leaflet
export const DynamicMapContainer = dynamic(
  () => import("./map-container").then((mod) => mod.MapContainer),
  {
    ssr: false,
    loading: () => (
      <div className="w-full h-full min-h-[400px] flex items-center justify-center bg-gray-100 rounded-lg">
        <Spinner size="lg" />
      </div>
    ),
  }
);
