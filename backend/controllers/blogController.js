const isAdmin = require('../middlewares/isAdmin');
let postModel=require('../models/post-model');
// Create a new post
// route   POST /API_URL/posts/createpost
// access  Private (Admin)
let createPost = async (req, res) => {
  try {
    let { title, content,category,author } = req.body;
    
    let post = await postModel.create({
      title,
      content,
      category,
       author, // Attach authenticated user as author
      publishedAt: new Date()
    });

    res.status(201).json({
      success: true,
      data: post
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      error: err.message
    });
  }
};

//     Update a post
// route   PUT /API_URL/posts/:id
// access  Private (Admin/Author)
const updatePost = async (req, res) => {
  try {

    const updatedPost = await postModel.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true } // ✅ Return updated post & validate input
    );

    if (!updatedPost) {
      return res.status(404).json({ success: false, message: "Post not found" });
    }

    res.status(200).json({ success: true, message: "Post updated successfully", data: updatedPost });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error updating post" });
  }
};

// desc    Delete a post
// route   DELETE /API_URL/posts/:id
// access  Private (Admin)
const deletePost = async (req, res) => {
  try {

    const deletedPost = await postModel.findByIdAndDelete(req.params.id);

    if (!deletedPost) {
      return res.status(404).json({
        success: false,
        error: "Post not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Post deleted successfully",
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      error: "Internal server error",
    });
  }
};

//     Get all posts
// route   GET /API_URL/posts/allposts
// access  Public
const getAllPosts = async (req, res) => {
  try {
    const posts = await postModel.find().sort({ publishedAt: -1 });

    if (!posts.length) {
      return res.status(404).json({ success: false, message: "No posts found." });
    }

    // 🔍 Convert array of posts into an object using `_id` as the key
    const postsObject = Object.fromEntries(posts.map(post => [post._id.toString(), post]));

    res.status(200).json({
      success: true,
      count: posts.length,
      data: postsObject, // ✅ Returning posts as an object
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message || "Server Error",
    });
  }
};




module.exports = {
  createPost,
  updatePost,
  deletePost,
  getAllPosts
};