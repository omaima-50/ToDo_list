// import {
//   Button,
//   Col,
//   Label,
//   Container,
//   Row,
//   FormGroup,
//   Input,
// } from "reactstrap";

// import { useSelector, useDispatch } from "react-redux";
// import { useNavigate } from "react-router-dom";
// import { useState, useEffect } from "react";
// import { savePost } from "../Features/PostSlice";

// const SharePosts = () => {
//   const [postMsg, setpostMsg] = useState("");

//   const navigate = useNavigate();
//   const dispatch = useDispatch();

//   const email = useSelector((state) => state.users.user.email);

//   const handlePost = async () => {
//     // Validate that postMsg is not empty
//     if (!postMsg.trim()) {
//       alert("Post message is required."); // Display an alert or set an error state
//       return; // Exit the function early if validation fails
//     }

//     const postData = {
//       postMsg: postMsg,
//       email: email,
//     };

//     dispatch(savePost(postData)); // Dispatch the savePost thunk from the Posts Slice.
//     setpostMsg(""); //clear the text area after posting
//   };
//   useEffect(() => {
//     if (!email) {
//       navigate("/");
//     }
//   }, [email]);
//   return (
//     <Container>
//       <Row>
//         <Col md={8} className="sharePosts">
//           <Input
//             id="share"
//             name="share"
//             placeholder="Share your thoughts..."
//             type="textarea"
//             value={postMsg}
//             onChange={(e) => setpostMsg(e.target.value)}
//           />
//           <Button onClick={() => handlePost()} className="button postButton">
//             PostIT
//           </Button>
//         </Col>
//         <hr></hr>
//       </Row>
//     </Container>
//   );
// };

// export default SharePosts;

// import {
//   Button,
//   Col,
//   Label,
//   Container,
//   Row,
//   FormGroup,
//   Input,
// } from "reactstrap";
// import { useState } from "react";
// import { useDispatch } from "react-redux";
// import { savePost } from "../Features/PostSlice";


// const AddUser = () => {
//   const [username, setUsername] = useState("");
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");

//   const dispatch = useDispatch();

//   const handleAddUser = async () => {
//     if (!username.trim() || !email.trim() || !password.trim()) {
//       alert("All fields are required.");
//       return;
//     }

//     // ✅ Dispatch post creation
//     dispatch(savePost({ postMsg: username, email }));

//     // Clear fields
//     setUsername("");
//     setEmail("");
//     setPassword("");
//   };

//   return (
//     <Container className="add-user-container">
//       <Row className="justify-content-center">
//         <Col md={6} className="add-user-col">
//           <h2 className="form-title">Add New User</h2>

//           <FormGroup className="form-group">
//             <Label for="username" className="form-label">
//               Username:
//             </Label>
//             <Input
//               id="username"
//               name="username"
//               placeholder="Enter username..."
//               type="text"
//               value={username}
//               onChange={(e) => setUsername(e.target.value)}
//               className="form-input"
//             />
//           </FormGroup>

//           <FormGroup className="form-group">
//             <Label for="email" className="form-label">
//               Email:
//             </Label>
//             <Input
//               id="email"
//               name="email"
//               placeholder="Enter email..."
//               type="email"
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//               className="form-input"
//             />
//           </FormGroup>

//           <FormGroup className="form-group">
//             <Label for="password" className="form-label">
//               Password:
//             </Label>
//             <Input
//               id="password"
//               name="password"
//               placeholder="Enter password..."
//               type="password"
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//               className="form-input"
//             />
//           </FormGroup>

//           <Button
//             onClick={handleAddUser}
//             className="add-user-button"
//             color="primary"
//           >
//             Add User
//           </Button>
//         </Col>
//       </Row>
//     </Container>
//   );
// };

// export default AddUser;



import {
  Button,
  Col,
  Label,
  Container,
  Row,
  FormGroup,
  Input,
} from "reactstrap";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { savePost } from "../Features/PostSlice";
import Header from "../Components/Header";


const AddUser = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();

  const handleAddUser = () => {
    if (!username.trim() || !email.trim() || !password.trim()) {
      alert("All fields are required.");
      return;
    }

    dispatch(savePost({ postMsg: username, email }));

    setUsername("");
    setEmail("");
    setPassword("");
  };

  return (
    <>
    <Header/>
    <Container className="add-user-container">
      <Row className="justify-content-center">
        <Col md={100} className="form-box">
          <h2 className="form-title">Add New User</h2>

          <FormGroup className="form-group">
            <Label for="username" className="form-label">
              Username:
            </Label>
            <Input
              id="username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="form-input"
            />
          </FormGroup>

          <FormGroup className="form-group">
            <Label for="email" className="form-label">
              Email:
            </Label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="form-input"
            />
          </FormGroup>

          <FormGroup className="form-group">
            <Label for="password" className="form-label">
              Password:
            </Label>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="form-input"
            />
          </FormGroup>

          <Button onClick={handleAddUser} className="add-button">
            Add
          </Button>
        </Col>
      </Row>
    </Container>
    </>
  );
};

export default AddUser;
