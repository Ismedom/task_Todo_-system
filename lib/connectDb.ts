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
    try {
        const connection = await mongoose.connect(uri, {
            ...options,
            maxPoolSize: 10,
            minPoolSize: 5,
            connectTimeoutMS: 10000,
            socketTimeoutMS: 45000,
            serverSelectionTimeoutMS: 10000,
            heartbeatFrequencyMS: 30000,
            retryWrites: true,
            writeConcern: {
                w: "majority",
            },
            maxIdleTimeMS: 10000,
        });

        // Set up connection error handlers
        connection.connection.on("error", (error) => {
            console.error("MongoDB connection error:", error);
        });

        connection.connection.on("disconnected", () => {
            console.warn("MongoDB disconnected");
        });

        connection.connection.on("connected", () => {
            console.log("MongoDB connected successfully");
        });

        return connection;
    } catch (error) {
        console.error("Error creating MongoDB connection:", error);
        throw error;
    }
};

async function dbConnect(): Promise<Mongoose> {
    const cached = getOrCreateCache();

    if (cached.conn) {
        if (mongoose.connection.readyState === 1) {
            return cached.conn;
        }

        cached.conn = null;
        cached.promise = null;
    }

    if (!cached.promise) {
        const opts: ConnectOptions = {
            bufferCommands: true,
            autoIndex: true,
            autoCreate: true,
        };

        cached.promise = createConnection(MONGODB_URI, opts);
    }

    try {
        cached.conn = await cached.promise;
    } catch (error) {
        cached.promise = null;
        console.error("Failed to establish MongoDB connection:", error);
        throw error;
    }

    return cached.conn;
}

let isConnected = false;

mongoose.connection.on("connected", () => {
    isConnected = true;
    console.log("MongoDB connected successfully");
});

mongoose.connection.on("error", (err) => {
    isConnected = false;
    console.error("MongoDB connection error:", err);
});

mongoose.connection.on("disconnected", () => {
    isConnected = false;
    console.log("MongoDB disconnected");
});

process.on("SIGINT", async () => {
    if (mongoose.connection.readyState === 1) {
        await mongoose.connection.close();
        console.log("MongoDB connection closed through app termination");
        process.exit(0);
    }
});

export default dbConnect;
