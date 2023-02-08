const User = require("../models/User");
const bcrypt = require("bcrypt");
const auth = require("../auth");


module.exports.signUp = async (reqBody) => {

        const {username, email, password} = reqBody;
        const userExist = await User.findOne({email});
        if (!username || !email || !password){
            return ("Please put username, email and password!")
        }
        
        if (userExist){
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
            return message = "Email is not yet registered!"
        } else {
            const isPasswordCorrect = bcrypt.compareSync(reqBody.password, result.password);
            if (isPasswordCorrect){

                return {access: auth.createAccessToken(result)}
            } else {
                return message = "Password is incorrect!"
            }
        }
    })
}
module.exports.changeUserVerification = async (reqParams, data) => {
    if (data.isAdmin){
        let updatedUser = {
            isAdmin: true
        }
        return User.findOneAndUpdate(reqParams.userId, updatedUser).then((user,error) => {
            if (error){
                return false
            } else {
                return true
            }
        })

    }
    let message = Promise.resolve("Only ADMIN can view change user status.")
    return await message
    
}
module.exports.getUserDetails = async (data) => {
    return await User.findOne(data.id).then(user => {
        return user
    })
    
}

module.exports.getAllUsers = async (data) => {
    if (data.isAdmin){
         return await User.find().then(users => {
            return users
         })
    }
    let message = Promise.resolve("Only ADMIN can view all users.")
    return await message
}
    
    
    
    
