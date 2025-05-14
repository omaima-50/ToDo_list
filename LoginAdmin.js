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



// Login.jsx
import {
  Form,
  Input,
  FormGroup,
  Label,
  Container,
  Button,
} from "reactstrap";
import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login as userLogin } from "../Features/UserSlice";
import { loginadmin as adminLogin } from "../Features/AdminSlice";
import Header from "./Header";
import Footer from "./Footer";

const LoginAdmin = ({ mode = "user" }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Select correct slice
  const state = useSelector((state) =>
    mode === "admin" ? state.admins : state.users
  );

  const { isSuccess, isError, user, admin } = state;

  const handleSubmit = (e) => {
    e.preventDefault();

    if (mode === "admin") {
      dispatch(adminLogin({ email, password }));
    } else {
      dispatch(userLogin({ email, password }));
    }
  };

  useEffect(() => {
    if (isSuccess && (user || admin)) {
      navigate("/PostsNewuser");
    }
    if (isError) {
      alert("Invalid credentials. Please try again.");
    }
  }, [isSuccess, isError, user, admin, navigate]);

  return (
    <>
      <Header />
      <div className="login-wrapper">
        <Container className="login-container">
          <h3>{mode === "admin" ? "Admin Login" : "Welcome to Family"}</h3>
          <Form onSubmit={handleSubmit}>
            <FormGroup>
              <Label for="email">Email</Label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="Enter email..."
                className="rounded-input"
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
                className="rounded-input"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </FormGroup>

            <Button type="submit" className="login-button" block>
              <strong>Login</strong>
            </Button>
          </Form>

          {mode !== "admin" && (
            <p className="signup-text">
              Don’t have an account?{" "}
              <Link to="/Register">
                <strong>Sign up</strong>
              </Link>
            </p>
          )}
        </Container>
      </div>
      <Footer />
    </>
  );
};

export default LoginAdmin;
