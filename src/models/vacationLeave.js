const mongoose = require("mongoose");

// creating a schema
const vacationLeaveSchema = new mongoose.Schema({
    // changes these values
    name: String,
    branch: String,
    semester: Number,
    rollNo: Number,
    roomNo: Number,
    dateOfLeaving: Date,
    timeOfLeaving: Date,
    purpose: String,
    timeOfReturn: String,
});

module.exports = mongoose.model("VacationLeave_Application", vacationLeaveSchema) // here write the name as "DayLeave_Application", it will reflect as "DayLeave_Applications" in the database.