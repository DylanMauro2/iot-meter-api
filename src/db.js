import { connect } from "mongoose";

export const connectDB = async () => {
  try {
    await connect("mongodb://localhost:27017");
    console.log("Connected to db");
  } catch (error) {
    console.error(error);
  }
};