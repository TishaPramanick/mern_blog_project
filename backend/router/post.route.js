const express = require("express");
const authMiddleware = require("../middleware/authMiddelWare");
const { createPost } = require("../controller/post.controller");

const router = express.Router();

router.post('/' , authMiddleware , createPost);


module.exports = router