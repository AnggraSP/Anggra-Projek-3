import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";

export async function GET() {
  try {
    const { collection } = await connectToDatabase();
    
    const locations = await collection
      .find({})
      .project({ nama: 1, alamat: 1, latitude: 1, longitude: 1 })
      .toArray();

    return NextResponse.json(locations);
  } catch (error) {
    console.error('Error:', error);
    return NextResponse.json(
      { error: "Failed to fetch locations" },
      { status: 500 },
    );
  }
}
