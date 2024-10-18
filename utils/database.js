import mongoose from "mongoose";

let isConnected = false;

export const connectToDB = async () => {
  mongoose.set('strictQuery', true);  // Enable strict query mode in Mongoose

  if (isConnected) {
    console.log("Already connected to MongoDB");
    return;
  }

  try {
    // Connect to MongoDB using the connection string stored in environment variables
    await mongoose.connect(process.env.MONGODB_URI, {
      dbName: "share_prompt",  // Specify the database name
    });

    isConnected = true;
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
  }
};
