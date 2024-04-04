const Post = require("../model/post.model");
const User = require("../model/user.model");
const { error } = require("../utils/errorHandler");

const createPost = async(req , res , next)=>{

    if(!req?.id) return next(error(400 , "Please Login First!!"));

    const userId = req.id;
    const {title , content} = req.body;

    console.log(title , content);

    if(!title || !content) return next(error(400 , "Please Provide all required fields"));

    const slug = title.split(" ").join("-").toLowerCase().replace(/[^a-z0-9]/g , '-');

    try {
        const user = await User.findById(userId);
        if(!user.isAdmin) return next(error(400 , "You are not an admin!!"));

        const newPost = await Post.create({
            ...req.body,
            postedBy : user._id,
            slug
        })

        res.status(201).json(newPost);
        
    } catch (error) {
        next(error);
    }

}

module.exports = {
    createPost
}