import mongoose, { connect } from "mongoose";

export const connectDb = async () => {
  try {
    // Replace 'your-mongodb-uri' with your MongoDB URI
    const MONGODB_URI =
          "mongodb+srv://abhaycodegaragetech:SUd17IJhjbZatDsB@cluster0.e4losvi.mongodb.net/"
    // Connect to MongoDB
    const { connection } = await mongoose.connect(MONGODB_URI);

    console.log("db connect");

    // console.log(connection);
  } catch (error) {
    console.log(error);
    console.log("failed to connect with Db");
  }
};
