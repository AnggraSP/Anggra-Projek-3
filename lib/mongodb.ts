import { MongoClient } from 'mongodb';

if (!process.env.MONGODB_URI) {
  throw new Error('Invalid/Missing environment variable: "MONGODB_URI"');
}

const uri = process.env.MONGODB_URI;
const client = new MongoClient(uri);
const dbName = "trashpotter";
const collectionName = "bank-sampah";

export async function connectToDatabase() {
  try {
    await client.connect();
    const db = client.db(dbName);
    const collection = db.collection(collectionName);
    return { client, collection };
  } catch (error) {
    console.error('Error connecting to database:', error);
    throw error;
  }
}