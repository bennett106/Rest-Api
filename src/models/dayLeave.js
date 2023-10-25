const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;


const dayLeaveSchema = new mongoose.Schema({
  dateOfLeaving: {
    type: Date,
    required: true,
  },
  timeOfLeaving: {
    // type: String,
    type: Date,
    required: true,
    // get: function(value) {
    //   return value.toTimeString().split(' ')[0]; // Extract and return the time part
    // }
    // validate: {
    //   validator: function(value) {
    //     // Use a regular expression to validate the "hh:mm" format
    //     return /^([01]\d|2[0-3]):([0-5]\d)$/.test(value);
    //   },
    //   message: 'Invalid time format (hh:mm)',
    // },
  },
  purpose: { type: String, required: true },
  timeOfReturn: { 
    type: Date,
    required: true,
  },
  PostedBy: {
    type: ObjectId,
    ref: "User",
    select: 'fullname contactNumber emailID studentInfo.rollNo studentInfo.department',
  },
  fullname: String, 
  contactNumber: String, 
  emailID: String,
  rollNo: Number, 
  department: String, 
}, {
  timestamps: true,   // adds createdAt and updatedAt fields automatically
});


const DayLeave = mongoose.model("DayLeave_Application", dayLeaveSchema);

module.exports = DayLeave;
