// src/lib/mongodb.ts
import mongoose from 'mongoose';

if (!process.env['MONGODB_URI']) {
  throw new Error('Please add your MongoDB URI to .env.local');
}

const MONGODB_URI: string = process.env['MONGODB_URI'];

/**
 * Global is used here to maintain a cached connection across hot reloads
 * in development. This prevents connections growing exponentially
 * during API Route usage.
 */
declare global {
  // eslint-disable-next-line no-var
  var mongoose: {
    promise: Promise<typeof import('mongoose')> | null;
    conn: typeof import('mongoose') | null;
  };
}

let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

export async function connectToDatabase() {
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    const opts = {
      bufferCommands: false,
      maxPoolSize: 10,
      maxIdleTimeMS: 30000,
      serverSelectionTimeoutMS: 5000,
    };

    mongoose.set('strictQuery', true);

    cached.promise = mongoose
      .connect(MONGODB_URI, opts)
      .then((mongoose) => {
        console.log('Connected to MongoDB');
        return mongoose;
      })
      .catch((error) => {
        console.error('Error connecting to MongoDB:', error);
        throw error;
      });
  }

  try {
    cached.conn = await cached.promise;
  } catch (e) {
    cached.promise = null;
    throw e;
  }

  return cached.conn;
}

// Graceful shutdown
['SIGTERM', 'SIGINT'].forEach((signal) => {
  process.on(signal, async () => {
    if (cached.conn) {
      await cached.conn.disconnect();
      console.log('Disconnected from MongoDB');
      process.exit(0);
    }
  });
});

export default connectToDatabase;
