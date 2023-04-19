import React, { useState } from "react";
import Layout from "./../../components/Layout/Layout";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import "../../styles/AuthStyles.css";
const Register = () => {
  const [rollno, setRollno] = useState("");
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [hindi, setHindi] = useState("");
  const [english, setEnglish] = useState("");
  const [maths, setMaths] = useState("");
  const navigate = useNavigate();

  // form function
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("/api/v1/auth/register", {
        rollno,
        firstname,
        lastname,
        hindi,
        english,
        maths
      });
      if (res && res.data.success) {
        toast.success(res.data && res.data.message);
        navigate("/home");
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };

  return (
    <Layout title="Register - Students">
      <div className="form-container ">
        <form onSubmit={handleSubmit}>
          <h4 className="title">REGISTER FORM</h4>
          <div className="mb-3">
            <input
              type="number"
              value={rollno}
              onChange={(e) => setRollno(e.target.value)}
              className="form-control"
              id="rollno"
              placeholder="Enter Your Roll Number"
              required
              autoFocus
            />
          </div>
          <div className="mb-3">
            <input
              type="string"
              value={firstname}
              onChange={(e) => setFirstname(e.target.value)}
              className="form-control"
              id="firstname"
              placeholder="First Name "
              required
            />
          </div>
          <div className="mb-3">
            <input
              type="string"
              value={lastname}
              onChange={(e) => setLastname(e.target.value)}
              className="form-control"
              id="lastname"
              placeholder="Last Name "
              required
            />
          </div>
          <div className="mb-3">
            <input
              type="number"
              value={hindi}
              onChange={(e) => setHindi(e.target.value)}
              className="form-control"
              id="hindi"
              placeholder="Hindi Marks"
              required
            />
          </div>
          <div className="mb-3">
            <input
              type="number"
              value={english}
              onChange={(e) => setEnglish(e.target.value)}
              className="form-control"
              id="english"
              placeholder="English Marks"
              required
            />
          </div>
          <div className="mb-3">
            <input
              type="number"
              value={maths}
              onChange={(e) => setMaths(e.target.value)}
              className="form-control"
              id="maths"
              placeholder="Maths Marks"
              required
            />
          </div>
          <button type="submit" className="btn btn-primary">
            REGISTER
          </button>
        </form>
      </div>
    </Layout>
  );
};

export default Register;
