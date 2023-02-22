const User = require("../models/User");
const Product = require("../models/Product");
const Cart = require("../models/Cart");
const bcrypt = require("bcrypt");
const auth = require("../auth");


module.exports.signUp = async (reqBody) => {

        const {username, email, password} = reqBody;
        const emailExist = await User.findOne({email});
        const usernameExist = await User.findOne({username});
        if (!username){
            return ("Please put username!")
        }
        if (!email){
            return ("Please put email!")
        }
        if (!password){
            return ("Please put password!")
        }
        
        if (usernameExist){
            return ("User with that username already exists!");
        }
        if (emailExist){
            return ("User with that email already exists!");
        }
        
            let newUser = new User({
                firstName: reqBody.firstName,
                lastName: reqBody.lastName,
                username: reqBody.username,
                email: reqBody.email,
                profileImage: reqBody.profileImage,
                password: bcrypt.hashSync(reqBody.password , 10),
                mobileNo: reqBody.mobileNo,
                address: reqBody.address
            })
            
            return await newUser.save().then((user,error) =>{
                if(error){
                    //return console.log("Registration Failed!")
                    return false
                } else {
                    //return console.log(`You have succesfully registered with the following information: ${user}`)
                    return user
                }
            })

        
        
    }

module.exports.login = (reqBody) => {
    return User.findOne({email: reqBody.email}).then(result => {
        let message;
        if (result == null){
            return false
        } else {
            const isPasswordCorrect = bcrypt.compareSync(reqBody.password, result.password);
            if (isPasswordCorrect){

                return {access: auth.createAccessToken(result)}
            } else {
                return false
            }
        }
    })
}
module.exports.toAdmin = async (reqParams, data) => {
    if (data.isAdmin){
        let updatedUser = {
            isAdmin: true
        }
        return User.findByIdAndUpdate(reqParams.userId, updatedUser).then((user,error) => {
            if (error){
                return false
            } else {
                return true
            }
        })

    }
    let message = Promise.resolve("Only ADMIN can change user status.")
    return await message
    
}

module.exports.toUser = async (reqParams, data) => {
    if (data.isAdmin){
        let updatedUser = {
            isAdmin: false
        }
        return User.findByIdAndUpdate(reqParams.userId, updatedUser).then((user,error) => {
            if (error){
                return false
            } else {
                return true
            }
        })

    }
    let message = Promise.resolve("Only ADMIN can change user status.")
    return await message
    
}
module.exports.getUserDetails = async (data) => {
    return await User.findById(data.userId).then(user => {
        return user
    })
    
}


module.exports.getAllUsers = () => {
    return User.find({}).then(result => {
        return result;
    });
}
module.exports.checkEmailExists = (reqBody) => {

    return User.find({email:reqBody.email}).then( result => {

        if(result.length > 0) {
            return true

        } else {
            return false
        }
    })
}

module.exports.addToCart = async (req, res) => {
    let userId = auth.decode(req.headers.authorization).id;

    try {
        let cart = await Cart.findOne({userId: userId});
        console.log(!cart);
        let product = await Product.findById(req.body.productId);
        console.log('product ' + product)
        if(!cart) {
            let newCart = new Cart({
                userId: userId,
                products: [
                    {
                        name: product.name,
                        productId: req.body.productId,
                        quantity: req.body.quantity,
                        price: product.price,
                        subTotal: product.price * req.body.quantity
                    }
                    ],
                total: product.price * req.body.quantity  
            });
            let savedCart = await newCart.save();
            res.status(201).json(savedCart);
        } else {
            cart.products.push(
            {
                name: product.name,
                productId: req.body.productId,
                quantity: req.body.quantity,
                price: product.price,
                subTotal: product.price * req.body.quantity
            });
           
            cart.total = cart.products.map(product => product.subTotal).reduce((a, b) => a + b,0);
            let savedCart = await cart.save();
            res.status(201).json(savedCart);
        }
    } catch(err) {
        console.log(err.message)
    }
};

    
    
