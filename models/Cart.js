const mongoose = require("mongoose")


const cartSchema = mongoose.Schema({
	userId: {
        type: String,
        required: [true, "UserId is required!"],
        ref: 'User'
    },
	cart:{
		items: [{
			productId: {
				type: String,
				required: [true, "Product id is required"],
				ref: 'Product'
			},
			productName: {
				type: String,
				required: [true, "Product name is required"]
			},
			quantity: {
				type: Number,
				required: [true, "Quantity is required"]
			}
			,
			subTotal: {
				type: Number,
				required: [true, "Sub Total is required"]
			},
			addedOn: {
				type: Date,
				default: new Date()
			}
		}],
		totalAmount: {
			type: Number,
			default: 0
		}

	}


})

module.exports = mongoose.model("Cart",cartSchema)
