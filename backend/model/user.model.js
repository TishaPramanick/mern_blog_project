const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    name : {
        type : String,
        required : true,
    },
    email : {
        type : String,
        required : true,
        unique : true
    },
    password : {
        type : String,
        required : true
    },
    profilePhoto : {
        type : String,
        default : "https://www.shareicon.net/download/2017/05/24/886412_user_512x512.png"
        
    },
    isAdmin : {
        type : Boolean ,
        default : false
    }

},
{
    timestamps : true
});

module.exports = mongoose.model("User" , userSchema);