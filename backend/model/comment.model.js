const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema({
    postId : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "Post",
    },
    content : {
        type : String,
        required : true
    },
    userId : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "User"
    },
    likes : {
        type : Array,
        default : []
    },
    numberOfLikes : {
        type : Number , 
        default : 0
    }
},
{
    timestamps : true
});

module.exports = mongoose.model("Comment" , commentSchema);