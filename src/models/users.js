const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    //PERSONAL INFORMATION
  firstName: {
    type: String,
    required: true,
    trim: true, // Remove leading/trailing whitespace
  },
  lastName: {
    type: String,
    required: true,
    trim: true,
  },
  dateOfBirth: {
    type: Date,
    required: true,
  },
  gender: {
    type: String,
    enum: ['Male', 'Female', 'Other'],
    required: true,
  },
  contactNumber: {
    type: String,
    // Add custom validation for phone numbers if needed
  },
  email: {
    type: String,
    required: true,
    unique: true, // Ensure email uniqueness
    trim: true,
    lowercase: true, // Store email in lowercase
    validate: {
      validator: function (value) {
        // Basic email format validation using regex
        const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/;
        return emailRegex.test(value);
      },
      message: 'Invalid email format',
    },
  },
  //RESIDENTIAL INFORMATION
  address: {
    streetAddress: String,
    city: String,
    state: String,
    postalCode: String,
  },
  studentInfo: {
    rollno: Number,
    department: String,
    program: String,
    enrollmentYear: Number,
    expectedGraduationYear: Number,
  },
  username: {
    type: String,
    required: true,
    unique: true, // Ensure username uniqueness
    trim: true,
  },
  password: {
    type: String,
    required: true,
  },
  profilePicture: String,
  emergencyContact: {
    name: String,
    relationship: String,
    contactNumber: String,
  },
  additionalInfo: String,
  roles: {
    type: [String],
    enum: ['Student', 'Faculty', 'Admin'], // Add valid roles as needed
  },
  registrationDate: {
    type: Date,
    default: Date.now,
  },
  status: {
    type: String,
    enum: ['Pending', 'Approved', 'Rejected'],
    default: 'Pending',
  },
});

const User = mongoose.model('User', userSchema);

module.exports = User;