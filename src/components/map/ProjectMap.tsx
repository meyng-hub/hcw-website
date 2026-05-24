"use client";

import { useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import type { LatLngExpression } from "leaflet";
import "leaflet/dist/leaflet.css";

// Fix Leaflet default marker icons in Next.js / webpack bundling
import L from "leaflet";

const DefaultIcon = L.icon({
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  iconRetinaUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

interface ProjectPin {
  id: string;
  title: string;
  category: string;
  location: { lat: number; lng: number; city: string };
}

interface ProjectMapProps {
  projects: ProjectPin[];
  locationLabel: string;
}

const CATEGORY_COLORS: Record<string, string> = {
  education: "#3b82f6",
  girls: "#ec4899",
  digital: "#0d6e6e",
  culture: "#f5a623",
  solidarity: "#ef4444",
};

const CATEGORY_EMOJI: Record<string, string> = {
  education: "📚",
  girls: "👧",
  digital: "💻",
  culture: "🎭",
  solidarity: "❤️",
};

export default function ProjectMap({
  projects,
  locationLabel,
}: ProjectMapProps) {
  useEffect(() => {
    L.Marker.prototype.options.icon = DefaultIcon;
  }, []);

  const center: LatLngExpression = [4.3612, 18.555];

  // Spread pins slightly so overlapping markers are visible
  const getOffset = (index: number): LatLngExpression => {
    const offsets: [number, number][] = [
      [0, 0],
      [0.012, 0.015],
      [-0.012, 0.01],
      [0.008, -0.018],
      [-0.008, -0.012],
      [0.018, 0.005],
    ];
    const off = offsets[index % offsets.length] ?? [0, 0];
    return [center[0] + off[0], center[1] + off[1]];
  };

  return (
    <MapContainer
      center={center}
      zoom={13}
      className="h-96 w-full rounded-xl"
      aria-label="Map showing HCW project locations in Bangui, CAR"
    >
      <TileLayer
        attribution="© OpenStreetMap contributors"
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {projects.map((project, index) => {
        const color = CATEGORY_COLORS[project.category] ?? "#0d6e6e";
        const emoji = CATEGORY_EMOJI[project.category] ?? "📍";

        const customIcon = L.divIcon({
          className: "",
          html: `<div style="
            background:${color};
            border:3px solid white;
            border-radius:50%;
            width:36px;
            height:36px;
            display:flex;
            align-items:center;
            justify-content:center;
            font-size:16px;
            box-shadow:0 2px 8px rgba(0,0,0,0.3);
            cursor:pointer;
          ">${emoji}</div>`,
          iconSize: [36, 36],
          iconAnchor: [18, 36],
          popupAnchor: [0, -36],
        });

        return (
          <Marker
            key={project.id}
            position={getOffset(index)}
            icon={customIcon}
          >
            <Popup>
              <div className="min-w-[160px]">
                <span className="text-lg">{emoji}</span>
                <p className="mt-1 font-semibold text-charcoal-900 text-sm">
                  {project.title}
                </p>
                <p className="text-xs text-gray-500 mt-0.5">
                  📍 {project.location.city}, {locationLabel}
                </p>
              </div>
            </Popup>
          </Marker>
        );
      })}
    </MapContainer>
  );
}
