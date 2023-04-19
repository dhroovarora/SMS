import userModel from "../models/userModel.js";
import { comparePassword, hashPassword } from "./../helpers/authHelper.js";
import JWT from "jsonwebtoken";

export const registerController = async (req, res) => {
  try {
    const { rollno, firstname, lastname, hindi, english, maths } = req.body;
    //validations
    if (!rollno) {
      return res.send({ error: "Roll Number is Required" });
    }
    if (!firstname) {
      return res.send({ message: "firstname is Required" });
    }
    if (!lastname) {
      return res.send({ message: "Lastname is Required" });
    }
    if (!hindi) {
      return res.send({ message: "Hindi No is Required" });
    }
    if (!english) {
      return res.send({ message: "English No is Required" });
    }
    if (!maths) {
      return res.send({ message: "Maths No is Required" });
    }
    //check user
    const exisitingUser = await userModel.findOne({ rollno });
    //exisiting user
    if (exisitingUser) {
      return res.status(200).send({
        success: false,
        message: "Already Register",
      });
    }
    //register user
    // const hashedPassword = await hashPassword(password);
    //save
    const user = await new userModel({
      rollno,
        firstname,
        lastname,
        hindi,
        english,
        maths
    }).save();

    res.status(201).send({
      success: true,
      message: "User Register Successfully",
      user,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Errro in Registeration",
      error,
    });
  }
};




//test controller
export const testController = (req, res) => {
  try {
    res.send("Protected Routes");
  } catch (error) {
    console.log(error);
    res.send({ error });
  }
};
