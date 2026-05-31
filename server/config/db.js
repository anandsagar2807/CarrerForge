const mongoose = require("mongoose");

const connectDB = async () => {
  const options = {
    serverSelectionTimeoutMS: 10000,
    connectTimeoutMS: 15000,
    socketTimeoutMS: 45000,
    retryWrites: true,
    w: 'majority',
    maxPoolSize: 10,
    minPoolSize: 2,
    heartbeatFrequencyMS: 10000,
  };

  const maxRetries = 3;
  let attempt = 0;

  while (attempt < maxRetries) {
    try {
      attempt++;
      console.log(`MongoDB connection attempt ${attempt}/${maxRetries}...`);
      await mongoose.connect(process.env.MONGO_URI, options);
      console.log("MongoDB Connected ✅");
      return;
    } catch (error) {
      console.error(`MongoDB Connection Error (attempt ${attempt}/${maxRetries}) ❌`, error.message);
      if (attempt >= maxRetries) {
        console.error("All MongoDB connection attempts failed. Server cannot start without database.");
        process.exit(1);
      }
      // Wait 5 seconds before retrying
      await new Promise(resolve => setTimeout(resolve, 5000));
    }
  }
};

module.exports = connectDB;