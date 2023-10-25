const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
    //* Personal Details
    fullname: {
        type: String,
        required: [true, "Please add your name"],
    },
    dateOfBirth: {
        type: Date,
        required: [true, "Please enter a valid date of birth"],
    },
    gender: {
        type:String ,
        enum:[ 'Female', 'Male', 'Other'],
        required: [true, "Please select your gender"],
        ifGenderIsOther: {
            type: String,
            required: false, // This field is optional
          }
    },
    contactNumber: {
        type: String,
        maxlength: 10,
        minLength: 10,
    },
    emailID: {
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
            message: 'Invalid email format or email address already in use',
        },
    },
    //* Parent Information
    parentDetails: {
        fatherName: {
            type:String,
            required: true,
        },
        motherName : {
            type:String,
            required: true,
        },
        parentContactNo: {
            type: Number,
            minLength: 10,
            maxlength: 10,
        },
        parentEmailID: {
            type: String,
            required: true,
            unique: true, // Ensure email uniqueness
            trim: true,
            lowercase: true, // Store email in lowercase
            validate: {
            validator: function (value) {
                // Basic email format validation using regular expression
                const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/;
                return emailRegex.test(value);
                },
            message: 'Invalid email format',
            },
        },
    },
    //* Residential Details
    address: {
        streetAddress: {
            type: String,
            required: true,
        },
        city: {
            type : String,
            required : true,
        },
        state: {
            type : String,
            required : true,
        },
        postalCode: {
            type: Number,
            required: true,
        },
    },
    //* Student Information 
    studentInfo: {
        rollNo: {
            type: Number,
            required: true,
            unique: true,
        },
        department: {
            type: String,
            required: true,
            enum: ['IT', 'COMP-A', 'COMP-B', 'MECH-A', 'MECH-B', 'EXTC', 'ELEC'],
        },
        semester: {
            type: Number,
            required: true,
            enum: [1, 2, 3, 4, 5, 6, 7, 8],
        },
        enrollmentYear: {
            type: String,     //store it as a string
            required: true,
        },
        expectedGraduationYear: {
            type: String,       // store it as a string
            required: true,
        },
    },
    //* user credentials
    username: {
        type:String ,
        required:true,
        unique:true,
    },
    password: {
        type:String ,
        required:true,
        minLength: 6,
    },
    confirmPassword: {
        type:String ,
        required:true,
        minLength: 6,
    },
}, {
    timestamps: true, // adds createdAt and updatedAt fields automatically
});

const User = mongoose.model("User", userSchema);

module.exports = User;

// module.exports = mongoose.model("New_User", new_userSchema);