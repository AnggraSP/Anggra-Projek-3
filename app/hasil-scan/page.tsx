"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import TempatSampah from "../components/elements/TempatSampah";
import SampahOrganik from "../components/elements/SampahOrganik";
import ScanLagi from "../components/elements/ScanLagi";


export default function HasilScan() {
  const [image, setImage] = useState<string | null>(null);
  const [prediction, setPrediction] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    // Ambil data dari sessionStorage
    setImage(sessionStorage.getItem("imageData"));
    setPrediction(sessionStorage.getItem("prediction"));
  }, []);

  return (
    <div className="flex h-screen flex-col items-center justify-start">
      {image && <img src={image} alt="Hasil Scan" className="" />}
      <div className="mb-4 mt-4 grid w-full grid-cols-6">
        <div className="col-span-1">
          <TempatSampah />
        </div>
        <div className="col-span-5 flex flex-col justify-between">
          <h3 className="text-sm font-semibold">Sampah {prediction ?? ""}</h3>
          <p className="text-xs text-black_soft">
            Sampah yang{" "}
            {prediction == "Organik" && (
              <span className="font-bold">Tidak</span>
            )}{" "}
            bisa didaurulang
          </p>
        </div>
      </div>
      <div className="grid w-full grid-cols-6">
        <div className="col-span-5 flex flex-col justify-center">
          <h5 className="font-semibold text-hijau">Tempat Sampah:</h5>
          <p className="text-xs text-black_soft">
            Waran tempat sampah berwarna{" "}
            <span className="font-semibold text-hijau">hijau</span>
          </p>
        </div>
        <div className="col-span-1">
          <SampahOrganik />
        </div>
      </div>
      <div className="fixed bottom-10">
        <ScanLagi
          onClick={() => router.push("/scan-sampah")} />
      </div>
    </div>
  );
}
