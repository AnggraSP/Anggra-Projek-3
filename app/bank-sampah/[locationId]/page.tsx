"use client";

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Recycle from '../../components/elements/Recycle';
import { BankSampahModel } from '@/types/BankSampahModel';

export default function BankSampahDetail() {
  const { locationId } = useParams();
  const [location, setLocation] = useState<BankSampahModel | null>(null);
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
        <div className="flex justify-between gap-4 mb-8">
          <Recycle />

          <div className="flex flex-grow flex-col justify-around">
              <h1 className="font-poppins text-sm font-semibold">{location.nama}</h1>
              <p className="text-xs font-semibold text-black_soft">
                  {location.waktu ? "Buka pukul " + location.waktu : ""}
              </p>
          </div>
          </div>
          
        <div className="">
            <h3 className="mb-2 text-hijau font-semibold text-sm">Alamat Bank Sampah</h3>
            <p className='text-black_soft text-sm font-semibold'>
                {location.alamat}
            </p>
          </div>
      </>
  );
}