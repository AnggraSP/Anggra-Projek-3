import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const lat = parseFloat(searchParams.get('lat') || '0');
    const lng = parseFloat(searchParams.get('lng') || '0');
    
    const { collection } = await connectToDatabase();

    // If location provided, sort by distance
    if (lat && lng) {
      // $geoNear must be first stage in pipeline
      const locations = await collection
        .aggregate([
          {
            $geoNear: {
              near: {
                type: "Point",
                coordinates: [lng, lat]
              },
              distanceField: "distance",
              spherical: true,
              maxDistance: 50000, // 50km in meters
              query: {}, // Optional additional query conditions
              distanceMultiplier: 0.001 // Convert meters to kilometers
            }
          },
          {
            $project: {
              nama: 1,
              alamat: 1,
              latitude: 1,
              longitude: 1,
              gambar: 1,
              waktu: 1,
              distance: 1
            }
          },
          {
            $limit: 5
          }
        ]).toArray();

      return NextResponse.json(locations);
    }

    // Fallback if no location
    const locations = await collection
      .find({})
      .limit(5)
      .project({ 
        nama: 1, 
        alamat: 1, 
        latitude: 1, 
        longitude: 1, 
        gambar: 1,
        waktu: 1
      })
      .toArray();

    return NextResponse.json(locations);
  } catch (error) {
    console.error("Detailed error:", error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Failed to fetch locations" },
      { status: 500 }
    );
  }
}
