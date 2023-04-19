import Layout from "../components/Layout/Layout";
import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";


const Edit = () => {
    const navigate=useNavigate();
    const [userData, setUserdata] = useState([]);
    const [stud, setStud] = useState([]);
    const [id, setID] = useState(0);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        userData.map((user) => {
            if (user.mentor === id) {
                setStud(oldArray => [...oldArray, user])
            }
        })
    }, [userData]);

    useEffect(() => {
        const getUserdata = async () => {
            setLoading(true);
            const reqData = await fetch("http://localhost:8080/getStudents");
            const resData = await reqData.json();
            setUserdata(resData.allStudents);
            setID(parseInt(sessionStorage.getItem("mentorID")));
            setLoading(false);
        }
        getUserdata();
    }, []);

    const handleMarks = (e) => {
        e.preventDefault();
        console.log("something")

        axios.post("http://localhost:8080/updateMarks", { selectedStudents:stud })
            .then((response) => console.log(response))
            .catch((error) => console.log(error));
        navigate("/mentor/"+id+"/submit")
    }

    const handleChange = (e,rollno) =>{
        console.log(e.target.value,rollno);
        stud.map((item) => {
            if(item.rollno===rollno){
                item[e.target.name] = parseInt(e.target.value);
            }
        })
        setStud(stud);
    }

    return (
        (loading ? <>loading</> :
            <>
                <Layout >
                    <h1><center> Mentor Number {id} </center></h1>
                    <div className="d-grid d-md-flex justify-content-md-end mb-3">
                        <button onClick={(e) => { handleMarks(e) }} className="btn btn-warning" id="submit" >SUBMIT</button>
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
                            </tr>
                        </thead>
                        <tbody>
                            {stud.map(function (i) {
                                return (
                                    <tr key={i}>
                                        <td>{i.rollno} </td>
                                        <td style={{ width: "6rem" }}><img src={i.image} style={{ width: "6rem" }} /></td>
                                        <td>{i.firstname + " " + i.lastname} </td>
                                        <td><input type="number" name="hindi" placeholder={i.hindi} defaultvalue={i.hindi} onChange={(e) => {handleChange(e,i.rollno)}} /></td>
                                        <td><input type="number" name="english" placeholder={i.english} defaultvalue={i.english} onChange={(e) => {handleChange(e,i.rollno)}}/></td>
                                        <td><input type="number" name="maths" placeholder={i.maths} defaultvalue={i.maths} onChange={(e) => {handleChange(e,i.rollno)}}/></td>
                                        <td>{i.mentor} </td>
                                    </tr>
                                )
                            })}</tbody>
                    </table>
                </Layout>
            </>)
    )

}

export default Edit;
