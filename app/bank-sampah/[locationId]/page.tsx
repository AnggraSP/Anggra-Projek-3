"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Recycle from '../../components/elements/Recycle';

// Define interface for location data
interface LocationData {
  _id: string;
  nama: string;
  alamat: string;
  waktu: string;
  latitude: number;
  longitude: number;
  gambar: string;
}

export default function BankSampahDetail() {
  const { locationId } = useParams();
  const [location, setLocation] = useState<LocationData | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchLocation() {
      try {
        const response = await fetch(`/api/bank-sampah/${locationId}`);
        if (!response.ok) throw new Error('Location not found');
        const data = await response.json();
        setLocation(data);
      } catch (err) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError('An unknown error occurred');
        }
      }
    }

    fetchLocation();
  }, [locationId]);

  if (error) return <div>Error: {error}</div>;
  if (!location) return <div>Loading...</div>;

  return (
    <>
      <div className="w-full mb-4">
        <img
          className="aspect-video w-full object-cover rounded-lg"
          src={location.gambar}
          alt={location.nama}
        />
      </div>
      <div className="mb-8 flex justify-between gap-4">
        <Recycle />

        <div className="flex flex-grow flex-col justify-around">
          <h1 className="font-poppins text-sm font-semibold">
            {location.nama}
          </h1>
          <p className="text-xs font-semibold text-black_soft">
            {location.waktu ? "Buka pukul " + location.waktu : ""}
          </p>
        </div>
      </div>

      <div className="">
        <h3 className="mb-2 text-sm font-semibold text-hijau">
          Alamat Bank Sampah
        </h3>
        <p className="text-sm font-semibold text-black_soft">
          {location.alamat}
        </p>
      </div>
    </>
  );
}