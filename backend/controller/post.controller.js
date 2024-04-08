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

const getAllPost = async(req , res , next)=>{
    try {
        const startIndex = parseInt(req.query.startIndex) || 0;
        const limit = parseInt(req.query.limit) || 9;
        const sortDirection = req.query.order === 'asc' ? 1 : -1;

        const posts = await Post.find({
            ...(req.query.postedBy && {postedBy : req.query.postedBy}),
            ...(req.query.category && {category : req.query.category}),
            ...(req.query.slug && {slug : req.query.slug}),
            ...(req.query.postId && {_id : req.query.postId}),
            ...(req.query.searchTerm && {
                $or : [
                    {title : {$regex : req.query.searchTerm , $options : 'i'}},
                    {content : {$regex : req.query.searchTerm , $options : 'i'}},
                ],
            }),
        }).sort({
            updatedAt : sortDirection
        }).skip(startIndex).limit(limit);

        const totalPosts = await Post.countDocuments();

        const now = new Date();

        const onMonthAge = new Date(
            now.getFullYear(),
            now.getMonth() - 1,
            now.getDate()
        );

        const lastMonthPosts = await Post.countDocuments({
            createdAt : {$gte : onMonthAge},
        });

        res.status(200).json({
            posts,
            totalPosts,
            lastMonthPosts
        })
    } catch (error) {
        next(error);
    }
}

const deletePost = async(req , res, next)=>{
    const {postId , userId} = req.params;
    const id = req?.id;
    try {
        const user = await User.findById(id);
        if(!user.isAdmin || id !== userId) return next(error(403 , "You are not allowed to delete this post"));

        const deletedPost = await Post.findByIdAndDelete(postId);

        res.status(200).json("The post has been deleted");
    } catch (error) {
        next(error);
    }
}

const updatePost = async(req , res , next)=>{
    const {postId} = req.params;
    const id = req?.id;
    try {

        const updatedPost = await Post.findByIdAndUpdate(postId , req.body , {new : true});

        res.status(200).json(updatedPost);
    } catch (error) {
        next(error);
    }
}

module.exports = {
    createPost,
    getAllPost,
    deletePost,
    updatePost
}