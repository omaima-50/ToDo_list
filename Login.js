
// import {
//   Form,
//   Input,
//   FormGroup,
//   Label,
//   Container,
//   Button,
// } from "reactstrap";
// import { Link } from "react-router-dom";
// import { useState, useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { login } from "../Features/UserSlice";
// import { useNavigate } from "react-router-dom";
// import Header from "./Header";
// import Footer from "./Footer";


// const Login = () => {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const dispatch = useDispatch();
//   const navigate = useNavigate();

//   const { isSuccess, isError, user } = useSelector((state) => state.users);

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     dispatch(login({ email, password }));
//   };

//   useEffect(() => {
//     if (isSuccess && user) {
//       navigate("/Todolist");
//     }
//     if (isError) {
//       alert("Invalid credentials. Please try again.");
//     }
//   }, [isSuccess, isError, user, navigate]);

//   return (
//     <>
//       <Header />
//       <div className="login-wrapper">
//         <Container className="login-container">
//           <h3>Welcome to Family</h3>
//           <Form onSubmit={handleSubmit}>
//             <FormGroup>
//               <Label for="email">Email</Label>
//               <Input
//                 id="email"
//                 name="email"
//                 type="email"
//                 placeholder="Enter email..."
//                 className="rounded-input"
//                 value={email}
//                 onChange={(e) => setEmail(e.target.value)}
//                 required
//               />
//             </FormGroup>

//             <FormGroup>
//               <Label for="password">Password</Label>
//               <Input
//                 id="password"
//                 name="password"
//                 type="password"
//                 placeholder="Enter password..."
//                 className="rounded-input"
//                 value={password}
//                 onChange={(e) => setPassword(e.target.value)}
//                 required
//               />
//             </FormGroup>

//             <Button type="submit" className="login-button" block>
//               <strong>Login</strong>
//             </Button>
//           </Form>

//           <p className="signup-text">
//             Don’t have an account?{" "}
//             <Link to="/Register">
//               <strong>Sign up</strong>
//             </Link>
//           </p>
//         </Container>
//       </div>
//       <Footer />
//     </>
//   );
// };

// export default Login;






// src/Components/Login.js
import React, { useState, useEffect } from "react";
import {
  Form,
  Input,
  FormGroup,
  Label,
  Container,
  Button,
} from "reactstrap";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../Features/UserSlice";
import Header from "./Header";
import Footer from "./Footer";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { isSuccess, isError, user } = useSelector((state) => state.users);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(login({ email, password }));
  };

  useEffect(() => {
    if (isSuccess && user) navigate("/Todolist");
    if (isError) alert("Invalid credentials. Please try again.");
  }, [isSuccess, isError, user, navigate]);

  return (
    <>
      <Header />
      <div className="login-wrapper">
        <Container className="login-container">
          <h3>User Login</h3>
          <Form onSubmit={handleSubmit}>
            <FormGroup>
              <Label for="email">Email</Label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="Enter email..."
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </FormGroup>

            <FormGroup>
              <Label for="password">Password</Label>
              <Input
                id="password"
                name="password"
                type="password"
                placeholder="Enter password..."
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </FormGroup>

            <Button type="submit" color="primary" block>
              Login
            </Button>
          </Form>
          <p className="signup-text">
            Don’t have an account? <Link to="/Register">Sign up</Link>
          </p>
        </Container>
      </div>
      <Footer />
    </>
  );
};

export default Login;
