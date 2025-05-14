import React from "react";
import { useNavigate } from "react-router-dom";
import userImg from "../Images/users.png";
import adminImg from "../Images/admin.png";
import Header from "./Header";

const SelectUser = () => {
  const navigate = useNavigate();
  

  return (
    <>
      <Header />
      <div className="choose-login-container">
        <h2>Login As...</h2>
        <div className="role-options">
        <div className="role-card" onClick={() => navigate("/Todolist")}>
            <img src={userImg} alt="User" />
            <h3>User</h3>
          </div>
          <div className="role-card" onClick={() => navigate("/PostsNewuser")}>
            <img src={adminImg} alt="Admin" />
            <h3>Admin</h3>
          </div>
        </div>
      </div>
    </>
  );
};

export default SelectUser;



// import React from "react";
// import { useNavigate } from "react-router-dom";
// import userImg from "../Images/users.png";
// import adminImg from "../Images/admin.png";
// import Header from "./Header";

// const SelectUser = () => {
//   const navigate = useNavigate();

//   const handleLogin = (role) => {
//     navigate(`/Login?role=${role}`);
//   };

//   return (
//     <>
//       <Header />
//       <div className="choose-login-container">
//         <h2>Login As...</h2>
//         <div className="role-options">
//           <div className="role-card" onClick={() => handleLogin("user")}>
//             <img src={userImg} alt="User" />
//             <h3>User</h3>
//           </div>
//           <div className="role-card" onClick={() => handleLogin("admin")}>
//             <img src={adminImg} alt="Admin" />
//             <h3>Admin</h3>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

// export default SelectUser;
