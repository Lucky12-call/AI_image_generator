import mongoose from "mongoose";

const dbConnection = async () => {
  try {
    await mongoose.connect(`${process.env.MONGODB_URI}/${process.env.DB_NAME}`);
    console.log("db connection successfully!");
  } catch (error) {
    console.log(`error while connecting db ${error.message}`);
  }
};

export default dbConnection;
