const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: [true, "UserId is required!"],
        ref: 'User'
    },
    orderProducts:[{
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
})

module.exports = mongoose.model("Order", orderSchema);