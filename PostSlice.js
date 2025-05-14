// import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// import axios from "axios";
// import * as ENV from "../config";

// const initialState = {
//   posts: [],
//   comments: [],
//   likes: [],
// };

// export const savePost = createAsyncThunk("posts/savePost", async (postData) => {
//   try {
//     const response = await axios.post(`${ENV.SERVER_URL}/savePost`, {
//       postMsg: postData.postMsg,
//       email: postData.email,
//     });
//     const post = response.data.post; //Response from the backend API with the post object.

//     return post; //Return the new post to Redux
//   } catch (error) {
//     console.log(error);
//   }
// });

// export const getPosts = createAsyncThunk("post/getPosts", async () => {
//   try {
//     const response = await axios.get(`${ENV.SERVER_URL}/getPosts`);
//     return response.data.posts;
//     //console.log(response);
//   } catch (error) {
//     console.log(error);
//   }
// });

// export const likePost = createAsyncThunk("posts/likePost", async (postData) => {
//   try {
//     //Pass along the URL the postId
//     const response = await axios.put(
//       `${ENV.SERVER_URL}/likePost/${postData.postId}`,
//       {
//         userId: postData.userId,
//       }
//     );
//     const post = response.data.post;
//     return post;
//   } catch (error) {
//     console.log(error);
//   }
// });

// const postSlice = createSlice({
//   name: "posts",
//   initialState: initialState,
//   reducers: { reset: () => initialState },
//   extraReducers: (builder) => {
//     builder
//       .addCase(savePost.pending, (state) => {
//         state.status = "loading";
//       })
//       .addCase(savePost.fulfilled, (state, action) => {
//         console.log(action.payload);
//         state.status = "succeeded";
//         // Update the state with fetched posts adding the latest post in the beginning
//         state.posts.unshift(action.payload);
//       })
//       .addCase(savePost.rejected, (state, action) => {
//         state.status = "failed";
//         state.error = action.error.message;
//       })
//       .addCase(getPosts.pending, (state) => {
//         state.status = "loading";
//       })
//       .addCase(getPosts.fulfilled, (state, action) => {
//         state.status = "succeeded";
//         // Update the state with fetched posts
//         //console.log(action.payload);
//         state.posts = action.payload;
//       })
//       .addCase(getPosts.rejected, (state, action) => {
//         state.status = "failed";
//         state.error = action.error.message;
//       })
//       .addCase(likePost.pending, (state) => {
//         state.status = "loading";
//       })
//       .addCase(likePost.fulfilled, (state, action) => {
//         state.status = "succeeded";
//         //Search the post id from the posts state
//         const updatedPostIndex = state.posts.findIndex(
//           (post) => post._id === action.payload._id
//         );

//         //If found, update the likes property of the found post to the current value of the likes
//         if (updatedPostIndex !== -1) {
//           state.posts[updatedPostIndex].likes = action.payload.likes;
//         }
//       })
//       .addCase(likePost.rejected, (state, action) => {
//         state.status = "failed";
//         state.error = action.error.message;
//       });
//   },
// });
// export const { reset } = postSlice.actions;

// export default postSlice.reducer;
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import * as ENV from "../config";

// Initial state
const initialState = {
  posts: [],
  comments: [],
  likes: [],
  status: "idle",
  error: null,
};

// Create Post
export const savePost = createAsyncThunk("posts/savePost", async (postData) => {
  const response = await axios.post(`${ENV.SERVER_URL}/savePost`, {
    postMsg: postData.postMsg,
    email: postData.email,
  });
  return response.data.post;
});

// Get Posts
export const getPosts = createAsyncThunk("posts/getPosts", async () => {
  const response = await axios.get(`${ENV.SERVER_URL}/getPosts`);
  return response.data.posts;
});

// Like Post
export const likePost = createAsyncThunk("posts/likePost", async (postData) => {
  const response = await axios.put(
    `${ENV.SERVER_URL}/likePost/${postData.postId}`,
    { userId: postData.userId }
  );
  return response.data.post;
});

// Delete Post
export const deletePost = createAsyncThunk("posts/deletePost", async (postId) => {
  await axios.delete(`${ENV.SERVER_URL}/deletePost/${postId}`);
  return postId;
});

// Update Post
export const updatePost = createAsyncThunk("posts/updatePost", async (editData) => {
  const response = await axios.put(
    `${ENV.SERVER_URL}/updatePost/${editData.id}`,
    { postMsg: editData.postMsg }
  );
  return response.data.post;
});

// Thunks
export const savePostadmin = createAsyncThunk("posts/savePostadmin", async (postData) => {
  try {
    const response = await axios.post(`${ENV.SERVER_URL}/savePostadmin`, {
      postMsg: postData.postMsg,
      email: postData.email,
    });
    return response.data.post;
  } catch (error) {
    console.log(error);
    throw error;
  }
});

export const getPostsadmin = createAsyncThunk("posts/getPostsadmin", async () => {
  try {
    const response = await axios.get(`${ENV.SERVER_URL}/getPostsadmin`);
    return response.data.posts;
  } catch (error) {
    console.log(error);
    throw error;
  }
});


// Slice
const postSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    reset: () => initialState,
  },
  extraReducers: (builder) => {
    builder
      // Save
      .addCase(savePost.pending, (state) => {
        state.status = "loading";
      })
      .addCase(savePost.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.posts.unshift(action.payload);
      })
      .addCase(savePost.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })

      // Get
      .addCase(getPosts.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getPosts.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.posts = action.payload;
      })
      .addCase(getPosts.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })

      // Like
      .addCase(likePost.fulfilled, (state, action) => {
        const updatedPostIndex = state.posts.findIndex(
          (post) => post._id === action.payload._id
        );
        if (updatedPostIndex !== -1) {
          state.posts[updatedPostIndex].likes = action.payload.likes;
        }
      })

      // Delete
      .addCase(deletePost.pending, (state) => {
        state.status = "loading";
      })
      .addCase(deletePost.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.posts = state.posts.filter((post) => post._id !== action.payload);
      })
      .addCase(deletePost.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })

      // Update
      .addCase(updatePost.pending, (state) => {
        state.status = "loading";
      })
      .addCase(updatePost.fulfilled, (state, action) => {
        state.status = "succeeded";
        const updatedPost = action.payload;
        const index = state.posts.findIndex((post) => post._id === updatedPost._id);
        if (index !== -1) {
          state.posts[index] = updatedPost;
        }
      })
      .addCase(updatePost.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});


export const { reset } = postSlice.actions;
export default postSlice.reducer;
