import Image from "next/image";
import Link from "next/link";

// Utility function to convert degrees to radians
function toRad(degrees) {
  return degrees * (Math.PI / 180);
}

// Haversine formula to calculate distance
function calculateDistance(lat1, lon1, lat2, lon2) {
  const R = 6371; // Earth's radius in kilometers
  
  const dLat = toRad(lat2 - lat1);
  const dLon = toRad(lon2 - lon1);
  
  const a = 
    Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * 
    Math.sin(dLon/2) * Math.sin(dLon/2);
  
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
  const distance = R * c; // Distance in kilometers
  
  return distance.toFixed(1); // Round to 1 decimal place
}

export default function BankSampah({ 
  id,
  nama, 
  alamat, 
  latitude, 
  longitude, 
  currentLocation 
}) {
  const distance = currentLocation ? 
    calculateDistance(
      currentLocation[0], 
      currentLocation[1], 
      latitude, 
      longitude
    ) : null;

  return (
      <Link
          href={`/bank-sampah/${id}`}
          className="mb-4 flex w-full gap-4">
      <div className="flex h-[73px] w-[73px] items-center justify-center rounded-lg bg-hijau">
        <Image
          src="/images/banksampah.jpg"
          alt="Bank Sampah"
          className="rounded-md"
          width={63}
          height={63}
          objectFit="cover"
          objectPosition="center"
        />
      </div>
      <div className="">
        <h3 className="mb-2 line-clamp-1 text-xs font-semibold">{nama}</h3>
        <h6 className="mb-2 line-clamp-1 text-xs text-black_soft">{alamat}</h6>
        <span className="me-2 rounded-full border border-hijau px-5 py-1 text-xs font-medium text-hijau">
          {distance ? `${distance} km` : "Calculating..."}
        </span>
      </div>
    </Link>
  );
}