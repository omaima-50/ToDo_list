

import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { getPosts, likePost, deletePost, updatePost } from "../Features/PostSlice";
import moment from "moment";
import { MdCheckBoxOutlineBlank, MdOutlineCheckBox } from "react-icons/md";
import { CiEdit } from "react-icons/ci";
import { RiDeleteBin6Fill } from "react-icons/ri";


const Posts = () => {
  const posts = useSelector((state) => state.posts.posts);
  const email = useSelector((state) => state.users.user?.email);
const userId = useSelector((state) => state.users.user?._id);


  const [isEditing, setIsEditing] = useState(false);
  const [editPostData, setEditPostData] = useState({ id: "", postMsg: "" });

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLikePost = (postId) => {
    const postData = {
      postId: postId,
      userId: userId,
    };
    dispatch(likePost(postData));
  };

  const handleDeletePost = (postId) => {
    if (window.confirm("Are you sure you want to delete this post?")) {
      dispatch(deletePost(postId));
    }
  };

  const handleEditClick = (post) => {
    setEditPostData({ id: post._id, postMsg: post.postMsg });
    setIsEditing(true);
  };

  const handleEditChange = (e) => {
    setEditPostData({ ...editPostData, postMsg: e.target.value });
  };

  const handleSaveEdit = () => {
    dispatch(updatePost(editPostData));
    setIsEditing(false);
  };

  useEffect(() => {
    if (!email) {
      navigate("/");
    } else {
      dispatch(getPosts());
    }
  }, [email, dispatch, navigate]);

  return (
    <div className="posts-container">
      <div className="tasks-list">
        {posts.map((post) => {
          const userHasLiked = post.likes.users.includes(userId);



return (
  <div key={post._id} className="simple-task-item">
    <div className="simple-task-content">
      <button 
        className="simple-checkbox"
        onClick={() => handleLikePost(post._id)}
      >
        {userHasLiked ? (
          <MdOutlineCheckBox className="checked" />
        ) : (
          <MdCheckBoxOutlineBlank className="unchecked" />
        )}
      </button>
      {isEditing && editPostData.id === post._id ? (
        <div className="simple-edit-container">
          <input
            type="text"
            value={editPostData.postMsg}
            onChange={handleEditChange}
            className="simple-edit-input"
          />
          <button onClick={handleSaveEdit} className="simple-save-btn">Save</button>
        </div>
      ) : (
        <span className="simple-task-text">{post.postMsg}</span>
      )}
    </div>
    <div className="simple-task-actions">
      <CiEdit
        className="simple-edit-icon"
        onClick={() => handleEditClick(post)}
      />
      <RiDeleteBin6Fill
        className="simple-delete-icon"
        onClick={() => handleDeletePost(post._id)}
      />
    </div>
  </div>
);
})}
<div className="task-count">
         You have: <strong>{posts.length} tasks</strong>
      </div>
</div>
</div>

);
};

export default Posts;