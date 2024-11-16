"use client"; // Jika Next.js 13 atau lebih baru dengan App Router

import { useEffect } from "react";
import dynamic from "next/dynamic";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

// Fix default marker icon issue
import markerIcon2x from "leaflet/dist/images/marker-icon-2x.png";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";

const MapContainer = dynamic(
  () => import("react-leaflet").then((mod) => mod.MapContainer),
  { ssr: false },
);
const TileLayer = dynamic(
  () => import("react-leaflet").then((mod) => mod.TileLayer),
  { ssr: false },
);
const Marker = dynamic(
  () => import("react-leaflet").then((mod) => mod.Marker),
  { ssr: false },
);
const Popup = dynamic(() => import("react-leaflet").then((mod) => mod.Popup), {
  ssr: false,
});

// Define icon outside component to avoid recreating it on every render
const currentLocationIcon = L.divIcon({
  className: "relative",
  html: `
    <div class="absolute -translate-x-1/2 -translate-y-1/2">
      <div class="h-4 w-4 rounded-full bg-blue-500 border-2 border-white"></div>
      <div class="absolute top-0 left-0 h-4 w-4 rounded-full bg-blue-500 animate-ping"></div>
    </div>
  `,
  iconSize: [16, 16],
  iconAnchor: [8, 8],
});

const Map = ({ currentLocation, locations }) => {
  useEffect(() => {
    // Fix marker icons
    delete L.Icon.Default.prototype._getIconUrl;

    L.Icon.Default.mergeOptions({
      iconUrl: markerIcon.src,
      iconRetinaUrl: markerIcon2x.src,
      shadowUrl: markerShadow.src,
    });
  }, []);

  return (
    <MapContainer
      center={currentLocation || [-6.2, 106.816666]}
      zoom={13}
      scrollWheelZoom={true}
      style={{ height: "100%", width: "100%" }}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      {/* Current location marker */}
      {currentLocation && (
        <Marker position={currentLocation} icon={currentLocationIcon}>
          <Popup>Lokasi Anda Saat Ini</Popup>
        </Marker>
      )}

      {/* Location markers from database */}
      {locations?.map((location) => (
        <Marker
          key={location._id}
          position={[location.latitude, location.longitude]}
        >
          <Popup>{location.nama}</Popup>
        </Marker>
      ))}
    </MapContainer>
  );
};

export default Map;
