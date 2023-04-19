// import mongoose from "mongoose";
// import colors from "colors";

const mongoose = require("mongoose");
const colors = require("colors");

const connectDB = async () => {
  try {
    const conn = await mongoose.connect("mongodb+srv://dhroov:dhroov@cluster0.yocodbh.mongodb.net/scaler");
    console.log(
      `Conneted To Mongodb Databse ${conn.connection.host}`.bgMagenta.white
    );
  } catch (error) {
    console.log(`Errro in Mongodb ${error}`.bgRed.white);
  }
};

// export default connectDB;
module.exports = connectDB;
