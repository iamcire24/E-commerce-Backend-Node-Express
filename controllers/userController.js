const User = require("../models/User");
const bcrypt = require("bcrypt");
const auth = require("../auth");


module.exports.signUp = (reqBody) => {

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
            
            return newUser.save().then((user,error) =>{
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
                let token = auth.createAccessToken(result)
                message = message = `Welcome ${result.firstName} ${result.lastName}`
                return `${message} 
                access token: ${token}`
            } else {
                return message = "Password is incorrect!"
            }
        }
    })

}
    
    
    
    
