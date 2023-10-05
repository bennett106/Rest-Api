const mongoose = require("mongoose");

// creating a schema
const dayLeaveSchema = new mongoose.Schema({
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

module.exports = mongoose.model("DayLeave_Application", dayLeaveSchema) // here write the name as "DayLeave_Application", it will reflect as "DayLeave_Applications" in the database.