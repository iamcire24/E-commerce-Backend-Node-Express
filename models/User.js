const mongoose = require("moongoose");

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: [true, "First Name is required!"]
    },
    lastName: {
        type: String,
        required: [true, "Last Name is required!"]
    },
    email: {
        type: String,
        required: [true, "Email is required!"]
    },
    profileImage: {
        type: Buffer
    },
    email: {
        type: String,
        required: [true, "Email is required!"]
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
        type: Number
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