const express = require("express");
const app = express();
const dotenv = require("dotenv");
const dbConnect = require("./config/dbConnect");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const authRoute = require("./router/auth.route"); 
const userRoute = require("./router/user.route");
const postRoute = require("./router/post.route");
const commentRoute = require("./router/comment.route");
const { errorHandler } = require("./utils/errorHandler");

dotenv.config();
const PORT = process.env.PORT || 8080;
dbConnect();
app.use(cors({credentials : true , origin : "http://localhost:5173"}));
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({extended : false}));

app.use('/api/auth' , authRoute);
app.use('/api/user' , userRoute);
app.use('/api/post' , postRoute);
app.use('/api/comment' , commentRoute);

app.use(errorHandler);

app.listen(PORT , ()=>{console.log(`Server is listening on port ${PORT}`)});