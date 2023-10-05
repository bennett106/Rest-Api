require("dotenv").config();
const express = require("express");
const bodyParser = require('body-parser');
const app = express();
const connectDB = require("../db/connect");

const port = process.env.PORT || 5000;


// path to the dayLeave route file.
const dayLeave_routes = require("./routes/dayLeave");
//path to the vacaLeave route file.
const vacationLeave_routes = require("./routes/vacationLeave");


// don't delete it this is the default page
app.get("/", (req, res) => {
    res.send("Hi, I am live");
});

// setting up middleware
app.use(bodyParser.json());
app.use("/api/v1/", dayLeave_routes);   // creating the endpoint for day leave applications
app.use("/api/v1/", vacationLeave_routes);   // creating the endpoint for vacation leave applications


const start = async () => {
    try {
        await connectDB(process.env.MONGODB_URI);
        app.listen(port, () => {
            console.log(`Server is listening on port no. ${port}`);
            console.log(`http://localhost:${port}`);
        });
    } catch (error) {
        console.log(error);
    }
};

start ();