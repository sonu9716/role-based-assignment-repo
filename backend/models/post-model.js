// models/post-model.js
const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
  title: String,
  content: String,
  category:String,
  author:String,

}, { 
  timestamps: true // Adds createdAt and updatedAt automatically
});

module.exports = mongoose.model("post", postSchema);