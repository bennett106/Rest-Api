const mongoose = require("mongoose");

// const new_userSchema = mongoose.Schema({
//     username: {
//         type: String,
//         required : [true, "Please add the username"],
//     },
//     email: {
//         type: String,
//         required: [true, "Please add the email id"],
//         unique: [true, "email address already taken"],
//     },
//     password: {
//         type: String,
//         required: [true, "Please add the user Password"],
//     },
// },{
//     timestamps: true,
// });

//*-------------------------------------------------------TRIAL CODE-----------------------------------------------------------------------------


const userSchema = mongoose.Schema({
    //* Personal Details
    fullname: {
        type: String,
        required: [true, "Please add your name"],
    },
    dateOfBirth: {
        type: Date,
        required: [true, "Please enter a valid dob"],
    },
    gender: {
        type:String ,
        enum:[ 'female', 'male'],
        required: [true, "Please select your gender"],
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
        FatherName: {
            type:String,
            required: true,
        },
        MotherName : {
            type:String,
            required: true,
        },
        parentContactNo:{
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
                // Basic email format validation using regex
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
        },
        program: {
            type: String,
            required: true,
            enum: ['IT', 'COMP-A', 'COMP-B', 'MECH-A', 'MECH-B', 'EXTC', 'ELEC'],
        },
        enrollmentYear: {
            type: Date,
            required: true,
        },
        expectedGraduationYear: {
            type: Date,
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
});

const User = mongoose.model("User", userSchema);

module.exports = User;


// module.exports = mongoose.model("New_User", new_userSchema);