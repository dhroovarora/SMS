// import mongoose from "mongoose";
const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    rollno: {
      type: Number,
      required: true,
      trim: true,
      unique: true,
    },
    firstname: {
      type: String,
      required: true,
    },
    lastname: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      default:"www.instagram.com"
    },
    english: {
      type: Number,
      required: true,
    },
    hindi: {
      type: Number,
      required: true,
    },
    maths: {
      type: Number,
      required: true,
    },
    mentor: {
      type:Number,
      default:0,
    }
  },
  { timestamps: true }
);

// export default mongoose.model("students", userSchema);
const students  = mongoose.model("students",userSchema)
module.exports = {students}
