const commentModel = require("../model/comment.model");
const userModel = require("../model/user.model");

const createComment = async(req , res , next)=>{
    try {
        const newComment = await commentModel.create(req.body);
        res.status(200).json(newComment);
    } catch (error) {
        next(error);
    }

}

const getPostComment = async(req , res , next)=>{
    try {
        const comments = await commentModel.find({postId : req.params.postId}).sort({createdAt : -1});
        res.status(200).json(comments);
    } catch (error) {
        next(error);
    }

}

const likeComment = async(req , res, next)=>{
    try {
        const comment = await commentModel.findById(req.params.id);
        if(!comment) return next(error(404 , "Comment not found"));

        const userIndex = comment.likes.indexOf(req?.id);

        if(userIndex === -1)
        {
            comment.numberOfLikes += 1;
            comment.likes.push(req?.id);
        }
        else
        {
            comment.numberOfLikes -= 1;
            comment.likes.splice(userIndex , 1);
        }

        await comment.save();

        res.status(200).json(comment);
    } catch (error) {
        next(error);
    }
}

const editComment = async(req , res , next) => { 
    try {
        const comment = await commentModel.findById(req.params.id);
        if(!comment) return next(error(404 , "Comment not found"));

        const user = await userModel.findById(comment.userId);

        if(!user.isAdmin) return next(error(404 , "User not found"));

        const updatedComment = await commentModel.findByIdAndUpdate(req.params.id , {
            content : req.body.content
        } ,
        {
            new : true
        });
        res.status(200).json(updatedComment);
    } catch (error) {
        next(error);
    }
}

const deleteComment = async(req , res , next) => { 
    try {
        const comment = await commentModel.findById(req.params.id);
        if(!comment) return next(error(404 , "Comment not found"));

        const user = await userModel.findById(comment.userId);

        if(!user.isAdmin) return next(error(404 , "User not found"));

        const deletedComment = await commentModel.findByIdAndDelete(req.params.id);
        res.status(200).json("Deleted Comment");
    } catch (error) {
        next(error);
    }
}

const getAllComments = async (req, res, next) => {
    try {
        const user = await userModel.findById(req?.id);
        if(!user.isAdmin) return next(error(403, 'You are not allowed to get all comments'));
      
      const startIndex = parseInt(req.query.startIndex) || 0;
      const limit = parseInt(req.query.limit) || 9;
      const sortDirection = req.query.sort === 'desc' ? -1 : 1;
      const comments = await commentModel.find()
        .sort({ createdAt: sortDirection })
        .skip(startIndex)
        .limit(limit);
      const totalComments = await commentModel.countDocuments();
      const now = new Date();
      const oneMonthAgo = new Date(
        now.getFullYear(),
        now.getMonth() - 1,
        now.getDate()
      );
      const lastMonthComments = await commentModel.countDocuments({
        createdAt: { $gte: oneMonthAgo },
      });
      res.status(200).json({ comments, totalComments, lastMonthComments });
    } catch (error) {
      next(error);
    }
  };
module.exports = {createComment , getPostComment , likeComment , editComment , deleteComment , getAllComments};