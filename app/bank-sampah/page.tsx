"use client";

import { useState, useEffect } from "react";
import dynamic from 'next/dynamic';
import 'leaflet/dist/leaflet.css';

const Map = dynamic(() => import('../components/components/Map'), { 
  ssr: false,
  loading: () => <p>Loading map...</p>
});

export default function BankSampah() { 
    const [currentLocation, setCurrentLocation] = useState<[number, number] | null>(null);
    const [locations, setLocations] = useState<Location[]>([]);
    const [locationError, setLocationError] = useState<string>("");

    useEffect(() => {
      // Get current location
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
      }

      // Fetch locations from API
      const fetchLocations = async () => {
        try {
          const response = await fetch('/api/locations');
          const data = await response.json();
          setLocations(data);
        } catch (error) {
          console.error('Error fetching locations:', error);
        }
      };

      fetchLocations();
    }, []);
  
    return (
      <div className="h-screen w-full">
        <h1 className="py-4 text-xl font-bold">Bank Sampah</h1>
        <div className="relative z-0 h-[calc(100vh-4rem)]">
          {locationError ? (
            <p className="text-red-500">{locationError}</p>
          ) : (
            <Map currentLocation={currentLocation} locations={locations} />
          )}
        </div>
      </div>
    );
}