import mongoose from "mongoose";

export const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI, {
        // These are options that need to be passed in to avoid warnings
        // from MongoDB
        useNewUrlParser: true,
        useUnifiedTopology: true,
        });
        console.log(`MongoDB connected: ${conn.connection.host} ${conn.connection.db.databaseName}}`);
    } catch (error) {
        console.log(`Error: ${error.message}`);
        // This will exit the process with failure
        process.exit(1);
    }
}