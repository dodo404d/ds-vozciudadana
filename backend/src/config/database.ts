import mongoose from 'mongoose';

const DEFAULT_MONGO_URI = 'mongodb://localhost:27017/vozciudadana';

export async function connectDatabase(): Promise<void> {
  const mongoUri = process.env.MONGO_URI || DEFAULT_MONGO_URI;

  await mongoose.connect(mongoUri);
  console.log(`[DB] Conectado a MongoDB: ${mongoUri}`);
}
