





import {
  Form,
  FormGroup,
  Input,
  Label,
  Button,
  Container,
  Row,
  Col,
} from "reactstrap";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BrowserRouter as Router, useNavigate } from "react-router-dom";
import User from "./User";
import { updateUserProfile } from "../Features/UserSlice";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { userSchemaValidation } from "../Validations/UserValidations";
import Header from "./Header";
 
const Profile = () => {
  const user = useSelector((state) => state.users.user || {});
const [userName, setUserName] = useState(user.name || "");
 
  const [pwd, setPwd] = useState(user.password);
  const [confirmPassword, setConfirmPassword] = useState(user.password);
  const [profilePic, setProfilePic] = useState(user.profilePic);
 
  const navigate = useNavigate();
  const dispatch = useDispatch();
 
  //For form validation using react-hook-form
  const {
    register,
    handleSubmit, // Submit the form when this is called
    formState: { errors },
  } = useForm({
    resolver: yupResolver(userSchemaValidation), //Associate your Yup validation schema using the resolver
  });
 
  const handleUpdate = (event) => {
    // Prevent the default form submission behavior
    event.preventDefault();
 
    // Prepare the user data object with the current user's email and updated details
    const userData = {
      email: user.email, // Retrieve email from the Redux store
      name: userName, // Get the updated name from the state variable
      password: pwd, // Get the updated password from the state variable
      profilePic: profilePic,
    };
    console.log(userData);
    // Dispatch the updateUserProfile action to update the user profile in the Redux store
    dispatch(updateUserProfile(userData));
    alert("Profile Updated.");
    // Navigate back to the profile page after the update is completed
    navigate("/profile");
  };
 
  // Function to handle file input change
  const handleFileChange = (event) => {
    // Use e.target.files[0] to get the file itself
    const uploadFile = event.target.files[0];
    if (!uploadFile) alert("No file uploaded");
    else setProfilePic(event.target.files[0]);
  };
 
  useEffect(() => {
    if (!user.email) {
      navigate("/");
    }
  }, [user.email, navigate]);
 
  return (
    <>
   <Header/>
        <div className="profile-page-wrapper">
      <div className="profile-container">
        <div className="profile-avatar">
          <img
            src={profilePic || "/default-avatar.svg"}
            alt="Profile"
            style={{ width: "100px", height: "100px", borderRadius: "50%" }}
          />
        </div>
 
        <Form className="profile-form" onSubmit={handleUpdate}>
          <Input type="file" name="profilePic" onChange={handleFileChange} />
          <Input
            id="name"
            name="name"
            placeholder="Name..."
            type="text"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
          />
          <Input
            id="password"
            name="password"
            placeholder="Password..."
            type="password"
            value={pwd}
            onChange={(e) => setPwd(e.target.value)}
          />
          <Input
            id="confirmPassword"
            name="confirmPassword"
            placeholder="Confirm Password..."
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          <Button color="primary" type="submit">
            Update Profile
          </Button>
        </Form>
      </div>
    </div>
    </>
  );
 
};
 
export default Profile;