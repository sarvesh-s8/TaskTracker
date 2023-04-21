import mongoose from "mongoose";
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL);
  } catch (error) {
    console.log(error);
    if (error) throw error;
    process.exit(1);
  }
};

export default connectDB;
