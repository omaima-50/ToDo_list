


import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { getPosts, deletePost } from "../Features/PostSlice";
import Header from "../Components/Header"; 
import Footer from "./Footer";

const PostsNewuser = () => {
  const posts = useSelector((state) => state.posts.posts);
  const email = useSelector((state) => state.admins.admin.email);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (!email) {
      navigate("/");
    } else {
      dispatch(getPosts());
    }
  }, [email, dispatch, navigate]);

  const handleDeletePost = (postId) => {
    dispatch(deletePost(postId));
  };

  return (
    <>
   <Header/>
    <div className="posts-container">
      <Link to="/AddUser" className="add-user-link">
        Add New User
      </Link>
      <div className="user-list">
        {posts.map((post) => (
          <div key={post._id} className="user-item">
            <div className="email-box">{post.email}</div>
            <button
              className="delete-button"
              onClick={() => handleDeletePost(post._id)}
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
    <Footer/>
    </>
   
  );
};

export default PostsNewuser;
