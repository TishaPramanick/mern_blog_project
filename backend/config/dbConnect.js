const mongoose = require("mongoose");
const dbConnect = async()=>{
    try {
        await mongoose.connect(process.env.DB_URL);
        console.log("Database Connection Done!");
    } catch (error) {
        console.log(error);
        process.exit(0);
    }
}

module.exports = dbConnect;