const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const auth = require("../auth");
const User = require("../models/User")

router.post("/signUp", (req, res) => {
   userController.signUp(req.body).then(resultFromController => res.send(resultFromController));
    
})


router.post("/login", (req, res) => {
    userController.login(req.body).then(resultFromController => res.send(resultFromController));
})

router.patch("/:userId/admin", auth.verify, (req, res)=> {
    const userData = auth.decode(req.headers.authorization);
    if (userData.isAdmin){
        userController.changeUserVerification(req.params).then(resultFromController => res.send(resultFromController))
    }
    else {
        res.status(401).send("Only Admin can change user status!")
    }
    
})
module.exports = router;