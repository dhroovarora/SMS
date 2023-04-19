import React from "react";
import "../styles/homestyle.css"
import Layout from "./../components/Layout/Layout";
import Page from "../components/Card";

const centerDivStyle = {
  display: 'flex',
  justifyContent:'center',
  alignItems:'center',
  height: '70vh',
};
const HomePage = () => {
  return (<>
    <Layout title={"Best offers "}>
    <div>
      <div style={centerDivStyle} className="homepa">
    <Page source={"https://bcciplayerimages.s3.ap-south-1.amazonaws.com/ipl/IPLHeadshot2023/57.png"} title={"MENTOR 1"} description={"I am Mentor One"} id={1}></Page>
    <Page source={"https://bcciplayerimages.s3.ap-south-1.amazonaws.com/playerheadshot/ipl/284/164.png"} title={"MENTOR 2"} description={"I am Mentor Two"} id={2}></Page>
    <Page source={"https://bcciplayerimages.s3.ap-south-1.amazonaws.com/ipl/IPLHeadshot2022/107.png"} title={"MENTOR 3"} description={"I am Mentor Three"} id={3}></Page>
    <Page source={"https://bcciplayerimages.s3.ap-south-1.amazonaws.com/ipl/IPLHeadshot2023/54.png"} title={"MENTOR 4"} description={"I am Mentor Four"} id={4}></Page>
    <Page source={"https://bcciplayerimages.s3.ap-south-1.amazonaws.com/playerheadshot/ipl/284/41.png"} title={"MENTOR 5"} description={"I am Mentor Five"} id={5}></Page>
    </div>
    </div>
    </Layout>
   
    </>
  );
};

export default HomePage;
