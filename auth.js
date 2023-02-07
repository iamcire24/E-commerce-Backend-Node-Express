const jwt = require("jsonwebtoken");
const secret = "E-CommerceAPICapstone"

module.exports.createAccessToken = (user) => {
    const data = {
        id: user._id,
        email: user.email,
        isAdmin: user.isAdmin
    }
    
    return jwt.sign(data, secret, {});
}

module.exports.verify = (req, res, next) => {

	let token = req.headers.authorization;
	if(typeof token !== "undefined"){
		

		token = token.slice(7, token.length);

		return jwt.verify(token, secret, (error, data) => {
			if(error){
				return res.send({auth: "failed"});
			} else {
				next();
			}
		})
	}
	else {
		return res.send({auth: "failed"});
	}
} 

// module.exports.verify = (req, res, next) => {
//     const bearerHeader = req.headers.authorization;
    
//     if (typeof bearerHeader !== "undefined"){
//         const bearer = bearerHeader.split(' ');
//         const bearerToken = bearer[1];
//         token = bearerToken;
        
//         return jwt.verify(token, secret, (error, data) => {
//             if (error){
//                 return res.sendStatus(403);
//             } else {
//                 next();
//             }
//         })
        
//     } else {
//         res.sendStatus(403);
//     }
// }

module.exports.decode = (token) => {
    if (typeof token !== "undefined"){
		token = token.slice(7, token.length);

		return jwt.verify(token, secret, (error, data) => {
			if (error){
				return null
			}else {
				return jwt.decode(token, {complete: true}).payload;
			}
		})
	} else {
		return null
	}
}

