import Layout from "../components/Layout/Layout";
import { useState, useEffect } from "react";
import "../styles/Submit.css";
import { useNavigate } from "react-router-dom";
import { CSVLink } from "react-csv";

const Submit = () => {
    const navigate = useNavigate();
    const showStudents = (e, title) => {
        e.preventDefault();
        sessionStorage.setItem("mentorID", id);
        navigate("/mentor/" + id + "/edit");
    }
    const [userData, setUserdata] = useState([]);
    const [stud, setStud] = useState([]);
    const [id, setID] = useState(0);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        console.log(userData)
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

    //exporting to csv starts here.
    const headers = [
        { label: "Roll No.", key: "rollno" },
        { label: "First Name", key: "firstname" },
        { label: "Last Name", key: "lastname" },
        { label: "Hindi", key: "hindi" },
        { label: "English", key: "english" },
        { label: "Maths", key: "maths" },
        { label: "MENTOR NUMBER", key: "mentor" }
    ];
    const csvReport = {
        data: stud.map(({ rollno, firstname, lastname, english, hindi, maths, mentor }) => ({ rollno, firstname, lastname, english, hindi, maths, mentor })),
        headers: headers,
        filename: 'Clue_Mediator_Report.csv'
    };
    //exporting to csv ends here.


    return (
        (loading ? <>loading</> :
            <>
                <Layout >
                    <div id="yo">
                        <h1><center> Mentor Number {id} </center></h1>
                        <div>
                            <button className="btn btn-warning" id="submit" style={{ float: "right" }} onClick={(e) => { showStudents(e, id) }}>Edit</button>
                            <button className="btn btn-warning" id="submit" style={{ flex: "left" }} >
                                <CSVLink {...csvReport}>PRINT MARKSHEET</CSVLink></button>
                        </div>
                        <br></br><br></br>
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
                                            <td>{i.hindi} </td>
                                            <td>{i.english} </td>
                                            <td>{i.maths} </td>
                                            <td>{i.mentor} </td>
                                        </tr>
                                    )
                                })}</tbody>
                        </table>
                    </div>
                </Layout>
            </>)
    )

}

export default Submit;