const mongoose = require('mongoose');

const connectToDB = async()=>{
    try{
        await mongoose.connect(process.env.MONGOURI)
        console.log("Successfully connected to database.")
    }
    catch(error){
        console.error("Failed to connect to Database. ",error);
        process.exit(1);
    }
}

module.exports = connectToDB;