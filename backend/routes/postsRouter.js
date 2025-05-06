const express=require('express');
const router=express.Router();
const {isAdmin,verifyToken} = require('../middlewares/authMiddleware');
const { getAllPosts, getPost, createPost, updatePost, deletePost } = require('../controllers/blogController');

router.get("/",function(req,res){
    res.send("hey");
});

// Public routes (GET requests)
router.get('/allposts',verifyToken,getAllPosts);

// Protected routes (require authentication)

// Authorized routes (require specific roles)
router.post('/createpost',verifyToken,isAdmin,createPost);
router.put('/:id',verifyToken,isAdmin,updatePost);
router.delete('/:id',verifyToken,isAdmin,deletePost);

module.exports=router;

