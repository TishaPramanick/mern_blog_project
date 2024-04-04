const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
    postedBy : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "User",
    },
    title :{
        type :String,
        required : true
    },
    content : {
        type : String,
        required : true
    },
    image : {
        type : String,
        default : "blog-site.png"
    },
    category : {
        type : String,
        default : "uncategorized"
    },
    slug : {
        type : String , 
        required : true ,
        unique : true,
        lowercase : true
    }
},
{
    timestamps : true
});

module.exports = mongoose.model("Post" , postSchema);