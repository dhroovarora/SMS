// import mongoose from "mongoose";
const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
    number: {
      type: Number,
      required: true,
    },
    students: {
      type: Array,
      required: true,
    }
  },
  { timestamps: true }
);

// export default mongoose.model("students", userSchema);
const mentors  = mongoose.model("mentors",userSchema)
module.exports = {mentors}
