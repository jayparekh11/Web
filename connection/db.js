import mongoose from "mongoose";

// Function to establish database connection
const connectDB = async () => {
  try {
    await mongoose.connect(
      "mongodb+srv://parekhjay1:lGPPvS0GLhCbXXbY@webdesign.yhnjwjp.mongodb.net/",
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }
    );
    console.log("Established connection with mongoDB - TEST ");
  } catch (err) {
    console.error("Error connecting to MongoDB:", err.message);
    process.exit(1); // Exit process with failure
  }
  
};

export default connectDB;
