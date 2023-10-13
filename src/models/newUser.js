const mongoose = require("mongoose");

const new_userSchema = mongoose.Schema({
    username: {
        type: String,
        required : [true, "Please add the username"],
    },
    email: {
        type: String,
        required: [true, "Please add the email id"],
        unique: [true, "email address already taken"],
    },
    password: {
        type: String,
        required: [true, "Please add the user Password"],
    },
},{
    timestamps: true,
});

module.exports = mongoose.model("New_User", new_userSchema);