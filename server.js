// import express from "express";
// import colors from "colors";
// import dotenv from "dotenv";
// import morgan from "morgan";
// import connectDB from "./config/db.js";
// import authRoutes from "./routes/authRoute.js";
// import cors from "cors";

const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const {students,mentor} = require("./models/userModel")
const bodyParser = require("body-parser")

//configure env
dotenv.config();

//databse config
const connectDB = require("./config/db");
const { mentors } = require("./models/mentor");
connectDB();

//rest object
const app = express();

//middelwares
app.use(cors());
app.use(bodyParser.json())
app.use(express.json());
// app.use(morgan("dev"));

//routes
// app.use("/api/v1/auth", authRoutes);

//rest api
app.get("/getStudents", async (req, res) => {
  const allStudents = await students.find();
  let finalData = [];
  //console.log("before map")
  await Promise.all(
    
    allStudents.map(async(data) =>{
      let mentorData = await mentors.findOne({number : data.mentor});
      //finalData.push({...data, ...mentorData});
      if(mentorData){
        //data.mentor = mentorData.name
        finalData.push({...data, mentor:mentorData.name});
      }
      
      
    })
    
  )
  // console.log(finalData);
  return res.json({status:"success", allStudents,finalData});
});

app.post("/updateMarks", async (req,res) => {
  const {selectedStudents} = req.body;
  //console.log("Api hit 2");
  //console.log(selectedStudents);
  for(let i=0; i<selectedStudents.length; i++){
    //console.log(selectedStudents[i].hindi)
    await students.findOneAndUpdate({rollno: selectedStudents[i].rollno}, selectedStudents[i]);

  }
  return res.json({status:"success"})
  
})

app.post("/selectedStudents", async (req, res) => {
    // console.log("Api hit");
    // console.log(req.body);
    let allStudents = req.body.arr;
    let mentorId  = req.body.id;
    //console.log(allStudents.length);

    // for(let i=0; i<allStudents.length; i++){
    //   console.log(allStudents[i], mentorId);
    //   await students.updateOne({rollno: allStudents[i]}, {mentor: mentorId});
    // }

    let mentorStudents = await students.updateMany({mentor  : mentorId}, [{
      $set : {
        mentor : 0
      }
    }]);

    let updatedStudents = await students.updateMany({rollno : {$in : allStudents}}, [{$set : {mentor : mentorId}}])

  

    return res.json({sattus:"success", message :"updated"})
});

//PORT
const PORT = 8080;

//run listen
app.listen(PORT, () => {
  console.log(
    `Server Running on ${process.env.DEV_MODE} mode on port ${PORT}`.bgCyan
      .white
  );
});
