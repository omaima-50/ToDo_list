


// import {
//   Button,
//   Container,
// } from "reactstrap";
// import { useState } from "react";
// import { useForm } from "react-hook-form";
// import { yupResolver } from "@hookform/resolvers/yup";
// import { useSelector, useDispatch } from "react-redux";
// import { useNavigate } from "react-router-dom";

// import { userSchemaValidation } from "../Validations/UserValidations"; // Consider creating separate validation for admin
// import { registerAdmin } from "../Features/AdminSlice";
// import Header from "./Header";
// import Footer from "./Footer";

// const RegisterAdmin = () => {
//   const [serverError, setServerError] = useState("");
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const { isLoading } = useSelector((state) => state.admins);

//   const {
//     register,
//     handleSubmit,
//     formState: { errors },
//     reset,
//   } = useForm({
//     resolver: yupResolver(userSchemaValidation),
//   });

//   const onSubmit = async (data) => {
//     try {
//       setServerError("");
//       const adminData = {
//         name: data.name,
//         email: data.email,
//         password: data.password,
//       };

//       const result = await dispatch(registerAdmin(adminData));
      
//       if (result.error) {
//         throw new Error(result.error.message || "Admin registration failed");
//       }

//       if (result.payload) {
//         alert("Admin registration successful!");
//         reset();
//         navigate("/LoginAdmin");
//       }
//     } catch (error) {
//       console.error("Registration error:", error);
//       setServerError(error.message || "Failed to register admin. Please try again.");
//     }
//   };

//   return (
//     <>
//       <Header />
//       <Container fluid className="register-container">
//         <div className="register-card">
//           <h3 className="register-title">Register Admin</h3>
//           {serverError && <div className="alert alert-danger">{serverError}</div>}
          
//           <form className="register-form" onSubmit={handleSubmit(onSubmit)}>
//             <div className="form-group">
//               <input
//                 type="text"
//                 className={`form-input ${errors.name ? "is-invalid" : ""}`}
//                 placeholder="Username"
//                 {...register("name")}
//               />
//               <p className="error">{errors.name?.message}</p>
//             </div>
            
//             <div className="form-group">
//               <input
//                 type="text"
//                 className={`form-input ${errors.email ? "is-invalid" : ""}`}
//                 placeholder="Email"
//                 {...register("email")}
//               />
//               <p className="error">{errors.email?.message}</p>
//             </div>
            
//             <div className="form-group">
//               <input
//                 type="password"
//                 className={`form-input ${errors.password ? "is-invalid" : ""}`}
//                 placeholder="Password"
//                 {...register("password")}
//               />
//               <p className="error">{errors.password?.message}</p>
//             </div>
            
//             <div className="form-group">
//               <input
//                 type="password"
//                 className={`form-input ${errors.confirmPassword ? "is-invalid" : ""}`}
//                 placeholder="Confirm Password"
//                 {...register("confirmPassword")}
//               />
//               <p className="error">{errors.confirmPassword?.message}</p>
//             </div>
            
//             <Button 
//               type="submit" 
//               className="register-button"
//               disabled={isLoading}
//             >
//               {isLoading ? "Registering..." : "Register Admin"}
//             </Button>
//           </form>
          
//           <p className="register-link">
//             Already have an account? <a href="/LoginAdmin">Sign in</a>
//           </p>
//         </div>
//       </Container>
//       <Footer />
//     </>
//   );
// };

// export default RegisterAdmin;


// Register.jsx
import {
  Button,
  Container,
} from "reactstrap";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import { userSchemaValidation } from "../Validations/UserValidations";
import { registerUser } from "../Features/UserSlice";
import { registerAdmin } from "../Features/AdminSlice";

import Header from "./Header";
import Footer from "./Footer";

const Register = ({ mode = "user" }) => {
  const [serverError, setServerError] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isLoading = useSelector((state) =>
    mode === "admin" ? state.admins.isLoading : state.users.isLoading
  );

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(userSchemaValidation),
  });

  const onSubmit = async (data) => {
    const userData = {
      name: data.name,
      email: data.email,
      password: data.password,
    };

    try {
      setServerError("");

      const result =
        mode === "admin"
          ? await dispatch(registerAdmin(userData))
          : await dispatch(registerUser(userData));

      if (result.error) {
        throw new Error(result.error.message || "Registration failed");
      }

      alert(`${mode === "admin" ? "Admin" : "User"} registered successfully!`);
      reset();

      navigate(mode === "admin" ? "/LoginAdmin" : "/Login");
    } catch (error) {
      setServerError(
        error.message || "Failed to register. Please try again."
      );
    }
  };

  return (
    <>
      <Header />
      <Container fluid className="register-container">
        <div className="register-card">
          <h3 className="register-title">
            {mode === "admin" ? "Register Admin" : "Register Now"}
          </h3>

          {serverError && (
            <div className="alert alert-danger">{serverError}</div>
          )}

          <form className="register-form" onSubmit={handleSubmit(onSubmit)}>
            <div className="form-group">
              <input
                type="text"
                className={`form-input ${errors.name ? "is-invalid" : ""}`}
                placeholder="Username"
                {...register("name")}
              />
              <p className="error">{errors.name?.message}</p>
            </div>

            <div className="form-group">
              <input
                type="text"
                className={`form-input ${errors.email ? "is-invalid" : ""}`}
                placeholder="Email"
                {...register("email")}
              />
              <p className="error">{errors.email?.message}</p>
            </div>

            <div className="form-group">
              <input
                type="password"
                className={`form-input ${errors.password ? "is-invalid" : ""}`}
                placeholder="Password"
                {...register("password")}
              />
              <p className="error">{errors.password?.message}</p>
            </div>

            <div className="form-group">
              <input
                type="password"
                className={`form-input ${
                  errors.confirmPassword ? "is-invalid" : ""
                }`}
                placeholder="Confirm Password"
                {...register("confirmPassword")}
              />
              <p className="error">{errors.confirmPassword?.message}</p>
            </div>

            <Button
              type="submit"
              className="register-button"
              disabled={isLoading}
            >
              {isLoading
                ? "Registering..."
                : mode === "admin"
                ? "Register Admin"
                : "Register"}
            </Button>
          </form>

          <p className="register-link">
            Already have an account?{" "}
            <a href={mode === "admin" ? "/LoginAdmin" : "/Login"}>Sign in</a>
          </p>
        </div>
      </Container>
      <Footer />
    </>
  );
};

export default Register;
