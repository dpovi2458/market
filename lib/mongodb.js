// MongoDB native client (optional) and Mongoose connection helper
import { MongoClient } from 'mongodb';
import mongoose from 'mongoose';

const uri = process.env.MONGODB_URI;
const options = {};

let client;
let clientPromise;

if (!process.env.MONGODB_URI) {
  throw new Error('Add Mongo URI to .env.local');
}

if (process.env.NODE_ENV === 'development') {
  if (!global._mongoClientPromise) {
    client = new MongoClient(uri, options);
    global._mongoClientPromise = client.connect();
  }
  clientPromise = global._mongoClientPromise;
} else {
  client = new MongoClient(uri, options);
  clientPromise = client.connect();
}

export default clientPromise; // Native driver promise (not used by models, but available)

// Mongoose singleton connection
let mongooseConn = global._mongooseConn || null;

export async function connectDB() {
  if (mongooseConn && mongoose.connection.readyState === 1) return mongooseConn;
  mongoose.set('strictQuery', true);
  mongooseConn = await mongoose.connect(uri, { dbName: 'marketplace' });
  global._mongooseConn = mongooseConn;
  return mongooseConn;
}
