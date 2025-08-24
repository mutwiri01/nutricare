/* eslint-disable no-undef */
import mongoose from "mongoose";

const connectDB = async () => {
  try {
    // Use the MONGO_URI directly, not DB_NAME separately
    const conn = await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

export default connectDB;
