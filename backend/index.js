const express = require("express");
const app = express();
const dotenv = require("dotenv");
const dbConnect = require("./config/dbConnect");

dotenv.config();

const PORT = process.env.PORT || 8080;

dbConnect();
app.listen(PORT , ()=>{console.log(`Server is listening on port ${PORT}`)});