"use client";

import { useState, useEffect } from "react";
import dynamic from 'next/dynamic';
import 'leaflet/dist/leaflet.css';

const Map = dynamic(() => import('../components/components/Map'), { 
  ssr: false,
  loading: () => <p>Loading map...</p>
});

export default function BankSampah() { 
    const [currentLocation, setCurrentLocation] = useState<
      [number, number] | null
    >(null);
    const [locationError, setLocationError] = useState<string>("");

    useEffect(() => {
      if ("geolocation" in navigator) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const { latitude, longitude } = position.coords;
            setCurrentLocation([latitude, longitude]);
          },
          (error) => {
            setLocationError(error.message);
          },
        );
      } else {
        setLocationError("Geolocation not supported");
      }
    }, []);
  
    return (
      <div className="h-screen w-full">
        <h1 className="py-4 text-xl font-bold">Bank Sampah</h1>
        <div className="relative z-0 h-[calc(100vh-4rem)]">
          {locationError ? (
            <p className="text-red-500">{locationError}</p>
          ) : (
            <Map currentLocation={currentLocation} />
          )}
        </div>
      </div>
    );
}