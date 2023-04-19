import Layout from "../components/Layout/Layout";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../styles/AuthStyles.css";
import React, { useEffect, useState, useRef } from "react";

function Userdata() {


  const [userData, setUserdata] = useState([]);
  const [id, setID] = useState(0);
  const [loading, setLoading] = useState(true);
  const [arr, setarr] = useState([]);
  const navigate = useNavigate();


  useEffect(() => {
    const getUserdata = async () => {
      setLoading(true)
      const reqData = await fetch("http://localhost:8080/getStudents");
      const resData = await reqData.json();
      setUserdata(resData.allStudents);
      setID(parseInt(sessionStorage.getItem("mentorID")));
      resData.allStudents.map((user) => {
        if ((user.mentor === parseInt(sessionStorage.getItem("mentorID")))) {
          arr.push(user.rollno);
          setarr(arr);
        }
      })
      setarr(arr);
      setLoading(false)
    }
    getUserdata();
  }, []);

  const handleMentor = (e) => {
    e.preventDefault();
    axios.post("http://localhost:8080/selectedStudents", { arr: arr, id: id })
      .then((response) => console.log(response))
      .catch((error) => console.log(error));
    navigate("/mentor/" + id + "/submit")
  }

  const checkboxesRef = useRef([]);
  function change(e) {
    let count = 0;
    checkboxesRef.current.forEach(el => {
      if (el.checked) {
        count++;
      }
    });

    if (e.target.checked == true) {
      arr.push(parseInt(e.target.value))
      setarr(arr);
    }
    else if (e.target.checked == false) {
      var j = arr.indexOf(parseInt(e.target.value));
      arr.splice(j, 1)
      setarr(arr);
    }
    else { }
    if (count < 3 || count > 4 || count == 0) {
      document.getElementById("submit").disabled = true
    }
    else {
      document.getElementById("submit").disabled = false
    }
  }



  return (
    (loading ? <>loading</> :
      <React.Fragment>
        <Layout title={"Students"} >

          <div className="container">
            <div className="row">
              <div className="col-md-12">
                <h5 className="mt-2">Mentor Number {id}</h5>
                <div className="d-grid d-md-flex justify-content-md-end mb-3">
                  <button onClick={(e) => { handleMentor(e) }} className="btn btn-warning" id="submit">SUBMIT</button>
                </div>
                <table className="table table-bordered table-striped">
                  <thead>
                    <tr>
                      <th>Roll. No</th>
                      <th>DP</th>
                      <th>Student Name</th>
                      <th>Hindi</th>
                      <th>English</th>
                      <th>Maths</th>
                      <th>Mentor</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {userData.map((userData, index) => (
                      <tr key={index}>
                        <td>{userData.rollno} </td>
                        <td style={{ width: "6rem" }}><img src={userData.image} className="imgcard" /></td>
                        <td>{userData.firstname + " " + userData.lastname} </td>
                        <td>{userData.hindi} </td>
                        <td>{userData.english} </td>
                        <td>{userData.maths} </td>
                        <td>{userData.mentor} </td>
                        <td>
                          {userData.mentor === 0 ? <input className="form-check-input" type="checkbox" value={userData.rollno} id="flexCheckDefault" onChange={(e) => { change(e) }} ref={el => checkboxesRef.current.push(el)}></input> : (userData.mentor === id) ? <input className="form-check-input" type="checkbox" value={userData.rollno} id="flexCheckDefault" onChange={(e) => { change(e) }} defaultChecked={true} ref={el => checkboxesRef.current.push(el)}></input> : <input className="form-check-input" type="checkbox" value="" id="flexCheckCheckedDisabled" checked disabled></input>}
                        </td>
                      </tr>
                    ))
                    }
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </Layout>
      </React.Fragment>)
  );
}

export default Userdata;