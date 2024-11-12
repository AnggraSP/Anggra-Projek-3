"use client";

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import * as tf from '@tensorflow/tfjs';
import Scan from '../components/elements/Scan';

export default function ScanSampah() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [model, setModel] = useState<tf.LayersModel | null>(null);
  const [prediction, setPrediction] = useState<string | null>(null);
  const [imageData, setImageData] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    async function loadModel() {
      try {
        const loadedModel = await tf.loadLayersModel('/web_model/model.json');
        setModel(loadedModel);
      } catch (err) {
        console.error("Error loading model: ", err);
      }
    }

    async function getMedia() {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true });
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
      } catch (err) {
        console.error("Error accessing camera: ", err);
      }
    }

    loadModel();
    getMedia();

    return () => {
      if (videoRef.current && videoRef.current.srcObject) {
        const stream = videoRef.current.srcObject as MediaStream;
        const tracks = stream.getTracks();
        tracks.forEach(track => track.stop());
      }
    };
  }, []);

  const processImage = async (imageData: string) => {
    if (model) {
      const img = new Image();
      img.src = imageData;
      img.onload = async () => {
        // Preprocess image
        const tensor = tf.browser
          .fromPixels(img)
          .resizeNearestNeighbor([256, 256])
          .toFloat()
          .div(255.0) // Normalize pixels to 0-1 range
          .expandDims();

        // Get prediction probability
        const predictions = model.predict(tensor) as tf.Tensor;
        const probability = predictions.dataSync()[0]; // Get first element as probability
        console.log("Prediction probability:", probability); // Debug log

        // Calculate accuracy percentage
        const accuracy =
          probability > 0.5
            ? (probability * 100).toFixed(2)
            : ((1 - probability) * 100).toFixed(2);

        // Classify based on 0.5 threshold
        const predictionResult = probability > 0.5 ? "Anorganik" : "Organik";

        // Cleanup tensors
        tensor.dispose();
        predictions.dispose();

        // Store results and navigate
        sessionStorage.setItem("imageData", imageData);
        sessionStorage.setItem("prediction", predictionResult);
        sessionStorage.setItem("accuracy", accuracy);
        
        router.push("/hasil-scan");
      };
    }
  };

  const handleCapture = () => {
    if (videoRef.current) {
      const canvas = document.createElement('canvas');
      canvas.width = videoRef.current.videoWidth;
      canvas.height = videoRef.current.videoHeight;
      const context = canvas.getContext('2d');
      if (context) {
        context.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);
        const imageData = canvas.toDataURL('image/png');
        setImageData(imageData);
        processImage(imageData);
      }
    }
  };

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = async (e) => {
        const imageData = e.target?.result as string;
        setImageData(reader.result as string);
        processImage(imageData);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleButtonClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="w-md absolute left-1/2 top-0 w-full max-w-md -translate-x-1/2 md:max-w-md">
      <video
        ref={videoRef}
        autoPlay
        playsInline
        className="h-dvh w-full object-cover"
      ></video>
      <button
        onClick={handleCapture}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 transform rounded-full bg-hijau px-4 py-3 text-xs font-bold text-white"
      >
        Scan Gambar
      </button>
      <Link
        href={`/`}
        className="absolute left-4 top-4 rounded-lg bg-putih px-2 py-2 text-xs font-bold text-hijau"
      >
        <svg
          className="h-6 w-6"
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
            d="m15 19-7-7 7-7"
          />
        </svg>
      </Link>
      <button
        onClick={handleButtonClick}
        className="absolute right-4 top-4 flex size-10 items-center justify-center rounded-full bg-hijau px-2 py-2 text-xs font-bold text-putih"
      >
        <svg
          width={19}
          height={16}
          viewBox="0 0 19 16"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M17.625 0h-16.5A1.125 1.125 0 000 1.125v13.5a1.125 1.125 0 001.125 1.125h16.5a1.125 1.125 0 001.125-1.125v-13.5A1.125 1.125 0 0017.625 0zm-16.5.75h16.5a.375.375 0 01.375.375v10.537L14.917 8.58a1.125 1.125 0 00-1.594 0l-2.14 2.14-4.39-4.39a1.125 1.125 0 00-1.594 0L.75 10.781V1.125A.375.375 0 011.125.75zM.75 14.625v-2.78L5.735 6.86a.375.375 0 01.53 0l8.14 8.14H1.126a.375.375 0 01-.375-.375zM17.625 15h-2.156l-3.75-3.75 2.14-2.14a.374.374 0 01.53 0L18 12.723v1.902a.375.375 0 01-.375.375zM11.25 5.25a.75.75 0 111.5 0 .75.75 0 01-1.5 0z"
            fill="#FEFEFE"
          />
        </svg>
      </button>
      <div className="absolute bottom-40 left-10 right-10 top-20">
        <Scan />
        <div className="animate-bounce-vertical absolute top-0 w-full">
          <svg
            className="h-5 w-full"
            viewBox="0 0 248 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M248 20H0V0h248v20z" fill="url(#paint0_linear_197_662)" />
            <defs>
              <linearGradient
                id="paint0_linear_197_662"
                x1={123.824}
                y1={0.301548}
                x2={123.824}
                y2={20.2945}
                gradientUnits="userSpaceOnUse"
              >
                <stop stopColor="#fff" stopOpacity={0} />
                <stop offset={0.0863982} stopColor="#F6FEFB" stopOpacity={0} />
                <stop offset={1} stopColor="#EDEDED" />
              </linearGradient>
            </defs>
          </svg>
          <svg
            className="h-2 w-full"
            viewBox="0 0 282 7"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M278.499 6.25979H3.12919C1.39074 6.25979 0 4.86875 0 3.12992C0 1.39109 1.39074 0 3.12919 0H278.499C280.238 0 281.629 1.39109 281.629 3.12992C281.629 4.86875 280.238 6.25979 278.499 6.25979Z"
              fill="#FEFEFE"
            />
          </svg>
        </div>
      </div>
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={handleFileChange}
      />
    </div>
  );
}