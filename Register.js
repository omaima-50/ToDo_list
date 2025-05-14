


import {
  Button,
  Container,
 
} from "reactstrap";
import { useState } from "react";
import { userSchemaValidation } from "../Validations/UserValidations";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useSelector, useDispatch } from "react-redux";
import { registerUser } from "../Features/UserSlice";
import { useNavigate } from "react-router-dom";

import Header from "./Header"; 
import Footer from "./Footer";
const Register = () => {
  const userList = useSelector((state) => state.users.value);
  const [name, setname] = useState("");
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [confirmPassword, setconfirmPassword] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(userSchemaValidation),
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onSubmit = (data) => {
    try {
      const userData = {
        name: data.name,
        email: data.email,
        password: data.password,
      };

      console.log("Form Data", data);
      alert("Validation all good.");
      dispatch(registerUser(userData));
      navigate("/Login");
    } catch (error) {
      console.log("Error.");
    }
  };

  return (
    <>
    <Header/>
    <Container fluid className="register-container">
      <div className="register-card">
        <h3 className="register-title">Register Now</h3>
        <form className="register-form" onSubmit={handleSubmit(onSubmit)}>
          <div className="form-group">
            <input
              type="text"
              className="form-input"
              placeholder="Username:"
              {...register("name", {
                onChange: (e) => setname(e.target.value),
              })}
            />
            <p className="error">{errors.name?.message}</p>
          </div>
          <div className="form-group">
            <input
              type="text"
              className="form-input"
              placeholder="Email:"
              {...register("email", {
                onChange: (e) => setemail(e.target.value),
              })}
            />
            <p className="error">{errors.email?.message}</p>
          </div>
          <div className="form-group">
            <input
              type="password"
              className="form-input"
              placeholder="Password:"
              {...register("password", {
                onChange: (e) => setpassword(e.target.value),
              })}
            />
            <p className="error">{errors.password?.message}</p>
          </div>
          <div className="form-group">
            <input
              type="password"
              className="form-input"
              placeholder="Confirm Password:"
              {...register("confirmPassword", {
                onChange: (e) => setconfirmPassword(e.target.value),
              })}
            />
            <p className="error">{errors.confirmPassword?.message}</p>
          </div>
          <Button type="submit" className="register-button">
            Register
          </Button>
        </form>
        <p className="register-link">
          Already have an account? <a href="/Login">Sign in</a>
        </p>
      </div>
    </Container>
    <Footer/>
    </>
  );
};

export default Register;
