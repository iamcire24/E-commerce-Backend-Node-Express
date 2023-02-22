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
        required: [true, "Username is required!"],
        unique: true
    },
    email: {
        type: String,
        required: [true, "Email is required!"],
        unique: true
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
    orders: [{
        products:[{
            productId: {
                type: String,
                required: [true, "ProductId is required"],
                ref: 'Product'
            },
            productName: {
                type: String,
                required: [true, "Product Name is required"]
            },
            quantity: {
                type: Number,
                required: [true, "Quantity is required"]
                
            }
        }],
        totalAmount: {
            type: Number,
            default: 0
        },
        purchasedOn: {
            type: Date,
            default: new Date()
        } 
    }]
})

module.exports = mongoose.model("User", userSchema);