const express = require("express");
const authMiddleware = require("../middleware/authMiddelWare");
const { createComment , getPostComment, likeComment , editComment , deleteComment} = require("../controller/comment.controller");

const route = express.Router();

route.post('/create' , authMiddleware , createComment);
route.get('/getPostComments/:postId' , getPostComment)
route.put('/like/:id' , authMiddleware , likeComment)
route.put('/edit/:id' , authMiddleware , editComment)
route.delete('/delete/:id' , authMiddleware , deleteComment)
module.exports = route;