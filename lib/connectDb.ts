import mongoose, { Mongoose, ConnectOptions } from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI as string;

interface CachedConnection {
    conn: Mongoose | null;
    promise: Promise<Mongoose> | null;
}

type GlobalWithMongoose = typeof globalThis & {
    mongoose: CachedConnection | undefined;
};

const globalWithMongoose = global as GlobalWithMongoose;

const createCache = (): CachedConnection => ({
    conn: null,
    promise: null,
});

const getOrCreateCache = (): CachedConnection => {
    if (!globalWithMongoose.mongoose) {
        globalWithMongoose.mongoose = createCache();
    }
    return globalWithMongoose.mongoose;
};

const createConnection = async (uri: string, options: ConnectOptions): Promise<Mongoose> => {
    const connection = await mongoose.connect(uri, options);
    return connection;
};

async function dbConnect(): Promise<Mongoose> {
    const cached = getOrCreateCache();

    if (cached.conn) {
        return cached.conn;
    }

    if (!cached.promise) {
        const opts: ConnectOptions = {
            bufferCommands: false,
        };

        cached.promise = createConnection(MONGODB_URI, opts);
    }

    try {
        cached.conn = await cached.promise;
    } catch (error) {
        cached.promise = null;
        throw error;
    }

    return cached.conn;
}

export default dbConnect;
