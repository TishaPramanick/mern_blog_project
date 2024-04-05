const express = require("express");
const authMiddleware = require("../middleware/authMiddelWare");
const { createPost, getAllPost } = require("../controller/post.controller");

const router = express.Router();

router.post('/' , authMiddleware , createPost);
router.get('/posts' , getAllPost);


module.exports = router