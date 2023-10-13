require("dotenv").config();
const express = require("express");
const bodyParser = require('body-parser');
const connectDB = require("../db/connect");
const logger = require("morgan");
const { connection } = require("mongoose");

const app = express();


const port = process.env.PORT;

//* setting up the logger middleware
const loggerMiddleware = (res, req, next) => {
    console.log(`${new Date()} ---Request [${req.method}] [${req.url}]`);
    next();
};

app.use(logger("tiny"));
// app.use(loggerMiddleware);


// path to the dayLeave route file.
const dayLeave_endpoint = require("./routes/dayLeave");
//path to the vacaLeave route file.
const vacationLeave_endpoint = require("./routes/vacationLeave");
//path to the users file.
const users_endpoint = require("./routes/users");


// don't delete it this is the default page
app.get("/", (req, res) => {
    res.send("Hi, I am live");
});

//* setting up middleware
app.use(bodyParser.json());
app.use(express.urlencoded({extended : true}))
app.use("/api/", dayLeave_endpoint);   // creating the endpoint for day leave applications
app.use("/api/", vacationLeave_endpoint);   // creating the endpoint for vacation leave applications
app.use("/api/", users_endpoint);   // creating the endpoint for USERS

const newUser_endpoint = require("./routes/newUser");
app.use("/api/", newUser_endpoint);



const start = async () => {
    try {
        app.listen(port, () => {
            console.log(`Server is listening on port ${port}.`);
            console.log(`Server running on "http://localhost:${port}"`);
        });
        await connectDB(process.env.MONGODB_URI);
        console.log(`Database connected to "${connection.host}" --- ${connection.name}`)
    } catch (error) {
        console.log(error);
    }
};

start ();