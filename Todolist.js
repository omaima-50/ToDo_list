// import logo from "../Images/logo-t.png";
// import Posts from "./Posts";
// import SharePosts from "./SharePost";
// import User from "./User";
// import { Container, Row, Col } from "reactstrap"; //import the Reactstrap Components
// import { useSelector } from "react-redux";
// import { useNavigate } from "react-router-dom";
// import { useEffect } from "react";
// import Location from "./Location";

// const Home = () => {
//   const email = useSelector((state) => state.users.user.email);
//   const navigate = useNavigate();

//   useEffect(() => {
//     if (!email) {
//       navigate("/");
//     }
//   }, [email]);

//   return (
    
//     <>
//       <Row>
//         <Col md={3}>
//           <User />
//         </Col>
//         <Col md={9}>
//           <SharePosts />
//         </Col>
//       </Row>
//       <Row>
//         <Col md={3}>
//           <Location />
//         </Col>
//         <Col md={9}>
//           <Posts />
//         </Col>
//       </Row>
//     </>
//   );
// };

// export default Home;




import Posts from "./Posts";
import SharePosts from "./SharePost";
// import User from "./User";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import Location from "./Location";
import Header from "./Header";
import Footer from "./Footer";
// import Footer from "./Footer";


const Todolist = () => {
  const email = useSelector((state) => state.users.user?.email);


  const navigate = useNavigate();

 useEffect(() => {
  if (!email) {
    navigate("/");
  }
}, [email, navigate]);

  return (

    <>
    <Header/>
    <div className="container">
      <div className="leftPanel">
        <div className="tasksCard">
          <Location />
        </div>
      </div>
      <div className="rightPanel">
        <div className="postsContainer">
          <SharePosts />
          <Posts />
          
        </div>
      </div>
      
    </div>
    <Footer/>
    
    </>
    
  );
};

export default Todolist;