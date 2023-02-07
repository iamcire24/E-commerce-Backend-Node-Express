const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: [true, "First Name is required!"]
    },
    lastName: {
        type: String,
        required: [true, "Last Name is required!"]
    },
    username: {
        type: String,
        required: [true, "Username is required!"]
    },
    email: {
        type: String,
        required: [true, "Email is required!"],
        unique: true
    },
    profileImage: {
        type: Buffer
    },
    password: {
        type: String,
        required: [true, "Password is required!"]
    },
    isAdmin: {
        type: Boolean,
        default: false
    },
    mobileNo: {
        type: Number,
        required: [true, "Mobile Number is required!"]
    },
    address: {
        type: String,
        required: [true, "Address is required!"]
    },
    deliveryAddress: {
        type: String,
        default: this.address
    },
    dateRegistered: {
        type: Date,
        default: new Date()
    }
})

module.exports = mongoose.model("User", userSchema);