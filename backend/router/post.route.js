const express = require("express");
const authMiddleware = require("../middleware/authMiddelWare");
const { createPost, getAllPost  , deletePost , updatePost} = require("../controller/post.controller");

const router = express.Router();

router.post('/' , authMiddleware , createPost);
router.get('/posts' , getAllPost);
router.delete('/delete/:postId/:userId' ,authMiddleware , deletePost);
router.put('/update/:postId' ,authMiddleware , updatePost);


module.exports = router