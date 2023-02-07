const Product = require("../models/Product");
const auth = require("../auth");


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
                return true
            }
        })
    }
    let message = Promise.resolve("Only ADMIN can add products.")
    return await message.then((value) => {
        return {value}
    })
    
}

module.exports.getAvailableProducts = () => {
    return Product.find({isActive: true});
}