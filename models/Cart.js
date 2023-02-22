const mongoose = require('mongoose');

const cartSchema = new mongoose.Schema({
	userId: {
		type: String,
		required: true
	},
	products:[
		{
			name: {
				type: String,
				required: true
			},
			productId: {
				type:String
			},
			quantity: {
				type: Number,
				required: true,
				min: [1, 'Quantity can not be less than 1.']
			},
			price: {
				type:Number,
				default: 0
			},
			subTotal: {
				type: Number,
				default: 0
			}
		}
	],
	total: {
		type: Number,
		default: 0
	},
	isActive: {
		type: Boolean,
		default: true
	},
	modifiedOn: {
		type: Date,
		default: Date.now
	}
}, { timestamps: true }
);

module.exports = mongoose.model('Cart', cartSchema);