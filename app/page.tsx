"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Title from "./components/elements/Title";
import SampahOrganik from "./components/elements/SampahOrganik";
import SampahAnorganik from "./components/elements/SampahAnorganik";
import Plastik from "./components/elements/Plastik";
import Organik from "./components/elements/Organik";
import Kertas from "./components/elements/Kertas";
import Berbahaya from "./components/elements/Berbahaya.jsx";
import BankSampah from "./components/components/BankSampah";
import ScanFloating from "./components/elements/ScanFloating";
import Link from "next/link";

interface Coordinates {
  lat: number;
  lng: number;
}

interface BankSampahData {
  _id: string;
  nama: string;
  alamat: string;
  latitude: number;
  longitude: number;
  gambar: string;
}

export default function Home() {
  const [bankSampahs, setBankSampahs] = useState<BankSampahData[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentLocation, setCurrentLocation] = useState<Coordinates | null>(
    null,
  );

  // Separate location effect
  useEffect(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setCurrentLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          });
        },
        (error) => console.error(error),
      );
    }
  }, []); // Run only once on mount

  // Data fetching effect
  useEffect(() => {
    let isMounted = true;

    const fetchBankSampahs = async () => {
      if (!isMounted) return;

      try {
        setIsLoading(true);
        const url = currentLocation
          ? `/api/bank-sampah?lat=${currentLocation.lat}&lng=${currentLocation.lng}`
          : "/api/bank-sampah";

        const response = await fetch(url);
        if (!response.ok) throw new Error("Failed to fetch");
        const data = await response.json();

        if (isMounted) {
          setBankSampahs(data);
        }
      } catch (err) {
        if (isMounted) {
          setError(
            err instanceof Error ? err.message : "An unknown error occurred",
          );
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };

    fetchBankSampahs();

    return () => {
      isMounted = false;
    };
  }, [currentLocation]);
  return (
    <>
      <div className="mb-4 flex gap-8 rounded-md bg-hijau p-4">
        <div className="">
          <h1 className="mb-3 text-sm font-black text-putih">
            Scan Sampahmu yuk!
          </h1>
          <p className="mb-3 font-poppins text-xs text-putih">
            Scan semua sampah yang kamu pegang pada fitur scan traspoter ya!
          </p>
          <Link
            href={"/scan-sampah"}
            className="inline-flex items-center gap-3 font-poppins text-xs text-putih"
          >
            <span>Mulai Scan</span>
            <svg
              className="size-6 text-putih"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              fill="none"
              viewBox="0 0 24 24"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M19 12H5m14 0-4 4m4-4-4-4"
              />
            </svg>
          </Link>
        </div>
        <Image
          src="/images/Component 1.png" // path ke gambar
          alt="Scan sampah"
          width={132} // lebar gambar
          height={132} // tinggi gambar
          priority={true}
        />
      </div>

      <div className="">
        <Title text="Kategori Sampah" />
        <div className="flex justify-around p-8">
          <SampahOrganik />
          <SampahAnorganik />
        </div>
      </div>

      {/* <div className="">
        <Title text="Kategori Sampah" />
        <div className="flex w-full justify-between p-4">
          <Plastik />
          <Organik />
          <Kertas />
          <Berbahaya />
        </div>
      </div> */}

      <div className="">
        <div className="flex w-full justify-between">
          <Title text="Bank Sampah" />
          <Link
            href="/bank-sampah"
            className="text-xs font-semibold text-hijau"
          >
            Lihat semua
          </Link>
        </div>
        <div className="mt-4 flex w-full flex-col">
          {isLoading ? (
            <div className="flex h-56 w-full items-center justify-center rounded-lg">
              <div role="status">
                <svg
                  aria-hidden="true"
                  className="h-8 w-8 animate-spin fill-hijau text-gray-200"
                  viewBox="0 0 100 101"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                    fill="currentColor"
                  />
                  <path
                    d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                    fill="currentFill"
                  />
                </svg>
                <span className="sr-only">Loading...</span>
              </div>
            </div>
          ) : error ? (
            <p>Error: {error}</p>
          ) : (
            bankSampahs.map((bankSampah) => (
              <BankSampah
                key={bankSampah._id}
                id={bankSampah._id}
                nama={bankSampah.nama}
                alamat={bankSampah.alamat}
                latitude={bankSampah.latitude}
                longitude={bankSampah.longitude}
                gambar={bankSampah.gambar}
                currentLocation={currentLocation}
              />
            ))
          )}
        </div>
      </div>
      <Link
        href={"/scan-sampah"}
        className="fixed bottom-5 left-1/2 -translate-x-1/2"
      >
        <ScanFloating />
      </Link>
    </>
  );
}
