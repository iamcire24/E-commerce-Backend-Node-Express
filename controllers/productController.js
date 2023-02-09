const Product = require("../models/Product");
const auth = require("../auth");
const mongoose = require("mongoose");
const { findOneAndUpdate } = require("../models/Order");

module.exports.addProduct = async (data) => {
    const {name, code} = data.product
    const productExist = await Product.findOne({name: data.product.name});
    if (!name || !code){
        return "Please put product name and code!"
    }
    if (productExist){
        return  "Product already exist in the database"
    }
    if(data.isAdmin){
        let newProduct = new Product({
            name: data.product.name,
            code: data.product.code,
            description: data.product.description,
            price: data.product.price,
            quantity: data.product.quantity
            
        })
        return await newProduct.save().then((product,error) => {
            if(error){
                return false
            } else {
                return "Product added"
            }
        })
    }
    let message = Promise.resolve("Only ADMIN can add products.")
    return await message
    
}

module.exports.getAvailableProducts = () => {
    return Product.find({isActive: true});
}

module.exports.getProductByName = async (input) => {
    const productExist = await Product.findOne({name: input.name});
    if (!productExist){
        return "Product not found."
    }
    return await Product.find({name: input.name}).then(result=> {
        return result
    })
}
module.exports.getProductByCode = async (input) => {
    const productExist = await Product.findOne({code: input.code});
    if (!productExist){
        return "Product not found."
    }
    return await Product.find({code: input.code}).then(result=> {
        return result
    })
}

module.exports.getProductById = async (input) => {
   let prodId = {
    id: input.prodId
   }
    return await Product.findOne(prodId.id).then(result=> {
        return result
    })
}

module.exports.updateProductById = async (reqParams, data) => {
    if (data.isAdmin){
        let updatedProduct = {
            name: data.product.name,
            code: data.product.code,
            description: data.product.description,
            price: data.product.price,
            quantity: data.product.quantity
        } 
        
        return await Product.findByIdAndUpdate(reqParams.productId, updatedProduct).then((product, error)=> {
            if (error){
                return false
            } else {
                return "Succesfully Update"
            }
        })
        
    }
    let message = Promise.resolve("Only ADMIN can update products.")
    return await message
}

module.exports.archiveProduct = async (reqParams, data) => {
    if (data.isAdmin){
        let archivedProduct = {
            isActive: false
        }
        return await Product.findByIdAndUpdate(reqParams.productId, archivedProduct).then((product, error) => {
            if (error){
                return false
            } else {
                return "Product is archived"
            }
        
        })
    }  
    let message = Promise.resolve("Only ADMIN can archive a product!")
    return await message 
 
};
module.exports.addStocks = async (reqParams, data) => {
    if (data.isAdmin){
        const prodQuantity = await Product.findById(reqParams.prodId).then(product => {
            return product.quantity
        })
        let updatedStocks = {
            quantity: prodQuantity + data.quantity.quantity
        }
        return await Product.findByIdAndUpdate(reqParams.prodId, updatedStocks).then((product, error) => {
            if (error){
                return false
            } else {
                return "Stocks has been Succesfully Updated"
            }
        })
    }
    let message = Promise.resolve("Only ADMIN can add stocks to a product!")
    return await message 

}