require("dotenv").config();
const connectDB = require("./db/connect");
const leaveApplication = require("./src/models/dayLeave");

//importing the sample data
const dayLeave_json = require("./db/sample_data/dayLeave.json");

//to connect to the database
const start = async () => {
    try{
        await connectDB(process.env.MONGODB_URI);    // for creating a connection
        await leaveApplication.create(dayLeave_json);    //
        console.log("success");
    } catch (error) {
        console.log(error);
    }
};

//startng the function
start();