"use client";

import dynamic from 'next/dynamic';
import 'leaflet/dist/leaflet.css';

const Map = dynamic(() => import('../components/components/Map'), { 
  ssr: false,
  loading: () => <p>Loading map...</p>
});

export default function BankSampah() { 
    return (
      <div className="h-screen w-full">
        <h1 className="py-4 text-xl font-bold">
          Bank Sampah
        </h1>
        <div className="relative z-0 h-[calc(100vh-4rem)]">
          <Map />
        </div>
      </div>
    );
}