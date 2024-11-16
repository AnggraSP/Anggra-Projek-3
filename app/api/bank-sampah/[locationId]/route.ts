// app/api/bank-sampah/[locationId]/route.ts
import { NextResponse } from "next/server";
import { ObjectId } from "mongodb";
import { connectToDatabase } from "@/lib/mongodb";

export async function GET(
  request: Request,
  { params }: { params: { locationId: string } }
) {
  try {
    const { collection } = await connectToDatabase();
    const { locationId } = params;

    // Convert string ID to MongoDB ObjectId
    const location = await collection.findOne({
      _id: new ObjectId(locationId)
    });

    if (!location) {
      return NextResponse.json(
        { error: "Location not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(location);
  } catch (error) {
    console.error('Error:', error);
    return NextResponse.json(
      { error: "Failed to fetch location" },
      { status: 500 }
    );
  }
}