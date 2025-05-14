// import "./App.css";
// import Footer from "./Components/Footer";
// import Header from "./Components/Header";
// import "bootstrap/dist/css/bootstrap.min.css";
// import { Container, Row} from "reactstrap"; //import the Reactstrap Components
// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// // import Login from "./Components/Login";
// import Profile from "./Components/Profile";
// // import Register from "./Components/Register";
// import SelectUser from "./Components/SelectUser";
// import SharePost from "./Components/SharePost";
// import Home from "./Components/Home"; 
// import Todolist from "./Components/Todolist";

// import { useSelector } from "react-redux";
// // import LoginAdmin from "./Components/LoginAdmin";
// // import RegisterAdmin from "./Components/RegisterAdmin";
// import PostsNewuser from "./Components/PostsNewuser";
// import AddUser from "./Components/AddUser";
// // import LoginAdmin from "./Components/LoginAdmin";

// const App = () => {
//   // const email = useSelector((state) => state.users.user.email);
//   const email = useSelector((state) => state.admins?.email || "");
  
  

//   return (
//     <Container fluid>
//       <Router>
//         <Row>
//           {email ? (
//             <>
//               <Header />
//             </>
//           ) : null}
//         </Row>
//         <Row className="main">
//           <Routes>
//             <Route path="/Home" element={<Home />} />         
//             <Route path="/" element={<Todolist />} /> 
//             {/* <Route path="/login" element={<Login />} /> */}
//             {/* <Route path="/login" element={<Login mode="user" />} />
//             <Route path="/admins/loginadmin" element={<Login mode="admin" />} /> */}

//             {/* <Route path="/LoginAdmin" element={<LoginAdmin />} /> */}
//             <Route path="/profile" element={<Profile />}/>

//             {/* <Route path="/register" element={<Register />}/> */}
            
//              {/* <Route path="/Register" element={<Register mode="user" />} />
//              <Route path="/admins/registerAdmin" element={<Register mode="admin" />} /> */}

//             <Route path="/SharePost" element={<SharePost />}/>
//             <Route path="/SelectUser" element={<SelectUser />}/>

//             {/* <Route path="/RegisterAdmin" element={<RegisterAdmin/>}/> */}

//              <Route path="/PostsNewuser" element={<PostsNewuser/>}/>
//              <Route path="/AddUser" element={<AddUser/>}/>
          
            
            
//           </Routes>
//         </Row>
//         <Row>
//           {email ? (
//             <>
//               <Footer />
//             </>
//           ) : null}
//         </Row>
//       </Router>
//     </Container>
//   );
// };

// export default App;


// src/App.js
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { Container, Row } from "reactstrap";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useSelector } from "react-redux";

import Header from "./Components/Header";
import Footer from "./Components/Footer";
import Home from "./Components/Home";
import Todolist from "./Components/Todolist";
import Profile from "./Components/Profile";
import SharePost from "./Components/SharePost";
import SelectUser from "./Components/SelectUser";
import PostsNewuser from "./Components/PostsNewuser";
import AddUser from "./Components/AddUser";
import Login from "./Components/Login";
import LoginAdmin from "./Components/LoginAdmin";
import Register from "./Components/Register";

const App = () => {
  const adminEmail = useSelector((state) => state.admins.admin?.email);

  return (
    <Container fluid>
      <Router>
        <Row>{adminEmail && <Header />}</Row>
        <Row className="main">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/Home" element={<Home />} />
            <Route path="/Todolist" element={<Todolist />} />
            <Route path="/Login" element={<Login />} />
            <Route path="/LoginAdmin" element={<LoginAdmin mode="admin" />} />
            <Route path="/Register" element={<Register mode="user" />} />
            <Route path="/RegisterAdmin" element={<Register mode="admin" />} />
            <Route path="/Profile" element={<Profile />} />
            <Route path="/SharePost" element={<SharePost />} />
            <Route path="/SelectUser" element={<SelectUser />} />
            <Route path="/PostsNewuser" element={<PostsNewuser />} />
            <Route path="/AddUser" element={<AddUser />} />
          </Routes>
        </Row>
        <Row>{adminEmail && <Footer />}</Row>
      </Router>
    </Container>
  );
};

export default App;
