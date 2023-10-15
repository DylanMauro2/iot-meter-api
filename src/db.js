import { connect } from "mongoose";

export const connectDB = async () => {
  try {
    await connect("mongodb://127.0.0.1:27017");
    console.log("Connected to db");
  } catch (error) {
    console.error(error);
  }
};