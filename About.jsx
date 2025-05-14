import React from "react";
import userImage from "../Images/user.png";
 
const About = () => {
  return (
    <div className="aboutContainer" data-testid="about-container">
      <h1>About this project</h1>
      <p>This project is developed by: Rawida And 2 Omima.</p>
      <p>Email: Alia.estudillo@utas.edu.om</p>
      <img src={userImage} alt="devimage" className="userImage" />
      <button>Contact developer</button>
    </div>
  );
};
 
export default About;