require("dotenv").config();
const express = require("express");
const bodyParser = require('body-parser');
const connectDB = require("../db/connect");
const logger = require("morgan");
const { connection } = require("mongoose");

const app = express();

const port = process.env.PORT;

app.use(logger("tiny"));


// don't delete it this is the default page
app.get("/", (req, res) => {
    res.json({
        message: "Hi, I am live"
    });
});


//* setting up middleware
app.use(bodyParser.json());
app.use(express.urlencoded({extended : true}))


//* routes :- 
const dayLeave_endpoint = require("./routes/dayLeave");         // ? dayleave application
const vacationLeave_endpoint = require("./routes/vacationLeave");       // ? vacation leave application
const users_endpoint = require("./routes/user");        // ? register, login, and others


//* endpoints :-
app.use("/api/v1/", users_endpoint);
app.use("/api/v2/", dayLeave_endpoint);   // creating the endpoint for day leave applications
app.use("/api/v3/", vacationLeave_endpoint);   // creating the endpoint for vacation leave applications



//! connecting to database and starting the server! DO NOT MESS WITH THIS.
const start = async () => {
    try {
        app.listen(port, () => {
            console.log(`Server is listening on port ${port}.`);
            // console.log(`Server running on "http://localhost:${port}"`);
        });
        await connectDB(process.env.MONGODB_URI);
        // console.log(`Database connected to "${connection.host}" --- ${connection.name}`)
    } catch (error) {
        console.log(error);
    }
};

start ();