/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
// db.js - Updated with ES Module syntax
import dotenv from "dotenv";
import mongoose from "mongoose";

// Load environment variables
dotenv.config();

// Set strictQuery option to suppress deprecation warning
mongoose.set("strictQuery", true);

// Define connectDB function to establish connection with MongoDB
const connectDB = async () => {
  try {
    // Connect to MongoDB using the connection URL from environment variables
    const conn = await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    // Log a success message upon successful connection
    console.log(` DATABASE CONNECTED`);
  } catch (error) {
    // Log an error message if connection fails
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

// Export the connectDB function to make it accessible from other modules
export default connectDB;
