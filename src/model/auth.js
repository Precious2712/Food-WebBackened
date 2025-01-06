const mongoose = require("mongoose");

const { Schema } = mongoose;

const validateEmail = function (email) {
    let re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return re.test(email);
};

const ApplicantSchema = Schema({
    userName: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: "Email address is required",
        trim: true,
        unique: true,
        validate: [validateEmail, "Please fill a valid email address"],
        lowercase: true,
    },
    password: {
        type: String,
        required: true,
    },
    address: {
        type: String,
        required: true,
    },


});
const User = mongoose.model("applicant", ApplicantSchema)

module.exports = User;