const Order = require("../models/Order");
const Product = require("../models/Product")
const User = require("../models/User")
const auth = require("../auth");
const mongoose = require("mongoose");


module.exports.makeOrder = async (data) => {
    if (!data.isAdmin){
        let productDetails = await Product.findById(data.productId).then(result => {
            return result
        })
        
        if (productDetails.quantity >= data.quantity){
            let bill = await Product.findById(data.productId).then(result => {
                return result.price * data.quantity
            })
            let newOrder = new Order({
                userId: data.owner,
                orderProducts: [{
                    productId: data.productId,
                    productName: productDetails.name,
                    quantity: data.quantity
                }],
                totalAmount: bill
            })
            
            
            
            let isOrderAdded = await newOrder.save().then((order, error) => {
                if (error){
                    return false
                } else {
                    return order._id
                }
            })
            let orders = {
                products: [{
                    productId: data.productId,
                    productName: productDetails.name,
                    quantity: data.quantity
                }],
                totalAmount: bill
            }
            let isUserUpdated = await User.findById(data.owner).then(user => {
                user.orders.push(orders);
                return user.save().then((user, error) => {
                    if (error){
                        return false
                    } else {
                        true
                    }
                })
            })
            let isProductUpdated = await Product.findById(data.productId).then(product => {
                product.quantity = product.quantity - data.quantity
                
                return product.save().then((product, error) => {
                    if (error){
                        return false
                    } else {
                        return true
                    }
                })
            })
            
            return "Succesfully Purchased"
            
            
            
        } else {
            return "Out of stocks"
        }
        
        
    }
    let message = Promise.resolve('Registered User only')
    return message.then((value) => {
        return {value};
    })
    
    
}
module.exports.getAllOrders = async (data) =>{
    if (data.isAdmin){
        return await Order.find().then(orders => {
            return orders
        })
    }
    let message = Promise.resolve('Admin only')
    return await message.then((value) => {
        return {value};
    })
}

module.exports.getMyOrders = async (data) => {
    return await Order.find({userId: data.id}).then(result => {
        return result
    })
}