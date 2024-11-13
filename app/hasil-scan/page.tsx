"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import TempatSampah from "../components/elements/TempatSampah";
import SampahOrganik from "../components/elements/SampahOrganik";
import ScanLagi from "../components/elements/ScanLagi";
import SampahAnorganik from "../components/elements/SampahAnorganik";
import Link from "next/link";


export default function HasilScan() {
  const [image, setImage] = useState<string | null>(null);
  const [prediction, setPrediction] = useState<string | null>(null);
  const [accuracy, setAccuracy] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    // Ambil data dari sessionStorage
    setImage(sessionStorage.getItem("imageData"));
    setPrediction(sessionStorage.getItem("prediction"));
    setAccuracy(sessionStorage.getItem("accuracy"));
  }, []);

  return (
    <div className="flex flex-col items-center justify-start">
      {image && <img src={image} alt="Hasil Scan" className="" />}
      <div className="mb-4 mt-4 grid w-full grid-cols-6">
        <div className="col-span-1">
          <TempatSampah
            color={prediction == "Organik" ? "#057a55" : "#faca15"}
          />
        </div>
        <div className="col-span-5 flex flex-col justify-between">
          <h3 className="text-sm font-semibold">Sampah {prediction ?? ""}</h3>
          <p className="text-xs text-black_soft">
            Akurasi <span className="font-bold">{accuracy ?? ""}%</span>
          </p>
        </div>
      </div>
      <div className="grid w-full grid-cols-6">
        <div className="col-span-5 flex flex-col justify-center">
          <h5 className="font-semibold text-hijau">Tempat Sampah:</h5>
          <p className="text-xs text-black_soft">
            Waran tempat sampah berwarna{" "}
            {prediction == "Organik" ? (
                <span className="font-semibold text-green-600">hijau</span>
            ) : (
                <span>
                    <span className="font-semibold text-yellow-300">kuning</span>
                    {" atau "}
                    <span className="font-semibold text-blue-400">biru</span>
                </span>
            )}
          </p>
        </div>
        <div className="col-span-1">
          {prediction == "Organik" ? <SampahOrganik /> : <SampahAnorganik />}
        </div>
      </div>
      <Link
        href={"/scan-sampah"}
        className="fixed bottom-10">
        <ScanLagi />
      </Link>
    </div>
  );
}
