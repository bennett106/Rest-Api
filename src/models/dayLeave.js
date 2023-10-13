// const mongoose = require("mongoose");

// const dayLeaveSchema = new mongoose.Schema({
//   user: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: "User", // Reference the User model
//     required: true, // Ensure a user is associated with a day leave
//   },  
//   dateOfLeaving: {type: Date, required: true},
//   timeOfLeaving: {type: Date, required: true},
//   purpose: {type: String, required: true},
//   timeOfReturn: {type: Date, required: true}
// });


// module.exports = mongoose.model("DayLeave_Application", dayLeaveSchema);




//* new code
const mongoose = require("mongoose");

const dayLeaveSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User", // Reference the User model
    required: true, // Ensure a user is associated with a day leave
  },
  // Fields to be populated from the User model
  firstName: String,
  lastName: String,
  rollno: Number,
  department: String,
  // roomno: String,
  //Fields to be taken from the front end
  dateOfLeaving: { type: Date, required: true },
  timeOfLeaving: { type: Date, required: true },
  purpose: { type: String, required: true },
  timeOfReturn: { type: Date, required: true },
});

// Pre-save middleware to populate fields from the User model
dayLeaveSchema.pre("save", function (next) {
  const User = mongoose.model("User");

  User.findById(this.user, (err, user) => {
    if (err) {
      return next(err);
    }

    if (user) {
      this.firstName = user.firstName;
      this.lastName = user.lastName;
      this.rollno = user.studentInfo.rollno;
      this.department = user.studentInfo.department;
      // this.roomno = user.address.roomno; // Update with the correct path in your User schema
    }

    next();
  });
});

module.exports = mongoose.model("DayLeave_Application", dayLeaveSchema);
