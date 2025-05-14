














/*---------------------------------------------------*/
import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import UserModel from "./Models/UserModel.js";
import PostModel from "./Models/Posts.js";
import bcrypt from "bcrypt";
import multer from "multer";
import { fileURLToPath } from "url";
import { dirname } from "path";
import fs from "fs";
import path from "path";
import * as ENV from "./config.js";

const app = express();
app.use(express.json());

// CORS
const corsOptions = {
  origin: ENV.CLIENT_URL,
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  credentials: true,
};
app.use(cors(corsOptions));

// Test Route
app.get("/", (_, res) => res.send("API is working"));

// MongoDB Connection
const dbURL = `mongodb+srv://${ENV.DB_USER}:${ENV.DB_PASSWORD}@${ENV.DB_CLUSTER}/${ENV.DB_NAME}?retryWrites=true&w=majority&appName=postITDb`;

mongoose
  .connect(dbURL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err));

// File paths
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const uploadsDir = path.join(__dirname, "uploads");

// Ensure uploads folder exists
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir);
}

app.use("/uploads", express.static(uploadsDir));

// Multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/"),
  filename: (req, file, cb) => cb(null, Date.now() + "-" + file.originalname),
});
const upload = multer({ storage });

// -------------------- Routes -------------------- //

// Register User
app.post("/registerUser", async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new UserModel({ name, email, password: hashedPassword });
    await user.save();
    res.send({ user, msg: "User added." });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "An error occurred" });
  }
});

// Register User
app.post("/registerAdmin", async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new UserModel({ name, email, password: hashedPassword });
    await user.save();
    res.send({ user, msg: "Admin added." });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "An error occurred" });
  }
});
// Login User
app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await UserModel.findOne({ email });
    if (!user) return res.status(404).json({ error: "User not found." });

    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) return res.status(401).json({ error: "Authentication failed" });

    res.status(200).json({ user, message: "Login successful." });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Logout User
app.post("/logout", (_, res) => res.status(200).json({ message: "User logged out successfully" }));

// Admin Login
app.post("/loginadmin", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await UserModel.findOne({ email });
    if (!user) return res.status(500).json({ error: "Admin not found." });

    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) return res.status(401).json({ error: "Authentication failed" });

    res.status(200).json({ user, message: "Success." });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Logout Admin
app.post("/logoutadmin", (_, res) => res.status(200).json({ message: "Admin logged out successfully" }));

// Create Post
app.post("/savePost", async (req, res) => {
  try {
    const { postMsg, email } = req.body;
    const post = new PostModel({ postMsg, email });
    await post.save();
    res.send({ post, msg: "Post added." });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "An error occurred" });
  }
});

//POST API - savePost
app.post("/savePostadmin", async (req, res) => {
  try {
    const postMsg = req.body.postMsg;
    const email = req.body.email;

    console.log(email);
    const post = new PostModel({
      postMsg: postMsg,
      email: email,
    });

    await post.save();
    res.send({ post: post, msg: "Added." }); //send to the client the JSON object
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "An error occurred" });
  }
});


// Get Posts
app.get("/getPosts", async (_, res) => {
  try {
    const posts = await PostModel.find({}).sort({ createdAt: -1 });
    const countPost = await PostModel.countDocuments({});
    res.send({ posts, count: countPost });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "An error occurred" });
  }
});

// Like/Unlike Post
app.put("/likePost/:postId", async (req, res) => {
  const { postId } = req.params;
  const { userId } = req.body;

  try {
    const post = await PostModel.findById(postId);
    if (!post) return res.status(404).json({ msg: "Post not found." });

    const userIndex = post.likes.users.indexOf(userId);
    let updatedPost;

    if (userIndex !== -1) {
      updatedPost = await PostModel.findByIdAndUpdate(
        postId,
        {
          $inc: { "likes.count": -1 },
          $pull: { "likes.users": userId },
        },
        { new: true }
      );
    } else {
      updatedPost = await PostModel.findByIdAndUpdate(
        postId,
        {
          $inc: { "likes.count": 1 },
          $addToSet: { "likes.users": userId },
        },
        { new: true }
      );
    }

    res.json({ post: updatedPost, msg: userIndex !== -1 ? "Post unliked." : "Post liked." });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "An error occurred" });
  }
});

// Update User Profile
app.put("/updateUserProfile/:email", upload.single("profilePic"), async (req, res) => {
  const { email } = req.params;
  const { name, password } = req.body;

  try {
    const user = await UserModel.findOne({ email });
    if (!user) return res.status(404).json({ error: "User not found" });

    if (req.file) {
      const profilePic = req.file.filename;
      if (user.profilePic) {
        const oldFilePath = path.join(__dirname, "uploads", user.profilePic);
        fs.unlink(oldFilePath, (err) => {
          if (err) console.error("Error deleting file:", err);
        });
      }
      user.profilePic = profilePic;
    }

    user.name = name;

    if (password !== user.password) {
      const hashedPassword = await bcrypt.hash(password, 10);
      user.password = hashedPassword;
    }

    await user.save();
    res.send({ user, msg: "Updated." });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Delete Post
app.delete("/deletePost/:postId", async (req, res) => {
  try {
    const deletedPost = await PostModel.findByIdAndDelete(req.params.postId);
    if (!deletedPost) return res.status(404).json({ msg: "Post not found." });
    res.status(200).json({ msg: "Post deleted.", post: deletedPost });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to delete post." });
  }
});

// Update Post
app.put("/updatePost/:postId", async (req, res) => {
  try {
    const updatedPost = await PostModel.findByIdAndUpdate(
      req.params.postId,
      { postMsg: req.body.postMsg },
      { new: true }
    );
    if (!updatedPost) return res.status(404).json({ msg: "Post not found." });
    res.status(200).json({ msg: "Post updated.", post: updatedPost });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to update post." });
  }
});

// -------------------- Start Server -------------------- //
const port = ENV.PORT || 3001;
app.listen(port, () => console.log(`✅ Server running at http://localhost:${port}`));
