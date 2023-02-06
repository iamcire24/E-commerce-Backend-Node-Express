const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: [true, "UserId is required!"]
    },
    products:[{
        productId: {
            type: String,
            required: [true, "ProductId is required"]
        },
        quantity: {
            type: Number,
            default: 1
        }
    }],
    totalAmount: {
        type: Number
    },
    purchasedOn: {
        type: Date,
        default: new Date()
    } 
})