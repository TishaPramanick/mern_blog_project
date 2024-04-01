const express = require("express");
const app = express();
const dotenv = require("dotenv");
const dbConnect = require("./config/dbConnect");
const authRoute = require("./router/auth.route"); 
const { errorHandler } = require("./utils/errorHandler");

dotenv.config();
const PORT = process.env.PORT || 8080;
dbConnect();
app.use(express.json());

app.use('/api/auth' , authRoute);

app.use(errorHandler);

app.listen(PORT , ()=>{console.log(`Server is listening on port ${PORT}`)});