import { MongoClient } from "mongodb";

const uri = process.env.MONGODB_URI || "";
const options = {};

let client;
let clientPromise: Promise<any>;

if (!uri) {
  // Return a rejected promise instead of crashing at the top-level
  // This allows db.ts to gracefully catch the error and fallback to db.json
  clientPromise = Promise.reject(new Error("Missing MONGODB_URI environment variable"));
} else {

if (process.env.NODE_ENV === "development") {
  // In development mode, use a global variable so that the value
  // is preserved across module reloads caused by HMR (Hot Module Replacement).
  let globalWithMongo = global as typeof globalThis & {
    _mongoClientPromise?: Promise<MongoClient>;
  };

  if (!globalWithMongo._mongoClientPromise) {
    client = new MongoClient(uri, options);
    globalWithMongo._mongoClientPromise = client.connect().catch((err: any) => {
      console.warn("MongoDB setup: Local server not detected. Switching to local memory mode.");
      throw err;
    });
  }
  clientPromise = globalWithMongo._mongoClientPromise;
} else {
  // In production mode, it's best to not use a global variable.
  client = new MongoClient(uri, options);
  clientPromise = client.connect().catch((err: any) => {
    console.error("MongoDB production connection failed:", err.message);
    throw err;
  });
}

}

// Export a module-scoped MongoClient promise. By doing this in a
// separate module, the client can be shared across functions.
export default clientPromise;
