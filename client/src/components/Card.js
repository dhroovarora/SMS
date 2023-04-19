import React from "react";
import "./cardstyle.css"
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

import { useNavigate } from "react-router-dom";
const Page = ({title, description,source, id}) => {
  const navigate = useNavigate();
  const showStudents = (e,title) => {
    e.preventDefault();
    sessionStorage.setItem("mentorID",id);
    navigate("/mentor/"+id);
  }

  return (
    

      <div className="card cardst" >
            <img src={source} class="card-img-top" alt="pic"height="200px"/>
            <div class="card-body">
              <h5 class="card-title">{title}</h5>
              <p class="card-text">{description}</p>
              <Button variant="primary" onClick={(e) => {showStudents(e,id)}}>Profile</Button>
            </div>
      </div>
  
  );
};

Page.defaultProps = {
  title: "Student Management System",
  description: "scaler project",
  source:"www.scaler.com"
};

export default Page;