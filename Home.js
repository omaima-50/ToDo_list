import React from "react";
import todoImg from "../Images/homeimage.jpg"; 
import Header from "./Header"; 
import Footer from "./Footer";

const Home = () => {
  return (
    <>
    <Header/>
    <div className="home-container">
      <img src={todoImg} alt="Todo List" className="homeimage" />
      <h2 className="home-text">Organize your time with TODO List Website</h2>
    </div>
    <Footer/>
   </>
  );
};

export default Home;