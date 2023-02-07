const moongoose = require("mongoose");

const productSchema = moongoose.Schema({
    name: {
        type: String,
        required: [true, "Product Name is required!"],
        unique: true
    },
    image: {
        type: Buffer
    },
    code: {
        type: String,
        required: [true, "Product Code is required!"]
    },
    description: {
        type: String,
        required: [true, "Product Description is required!"]
    },
    price: {
        type: Number,
        required: [true, "Price is required!"]
    },
    isActive: {
        type: Boolean,
        default: true
    },
    quantity: {
        type: Number,
        required: [true, "Product Quantity is required!"]
    },
    createdOn: {
        type: Date,
        default: new Date()
    }
    
})

module.exports = moongoose.model("Product", productSchema);