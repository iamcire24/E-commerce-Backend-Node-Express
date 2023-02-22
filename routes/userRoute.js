const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const auth = require("../auth");
const User = require("../models/User")

router.post("/signUp", (req, res) => {
   userController.signUp(req.body).then(resultFromController => res.send(resultFromController));
    
})

router.post("/checkEmail", (req, res) => {

    userController.checkEmailExists(req.body).then(resultFromController => res.send(resultFromController));
});


router.post("/login", (req, res) => {
    userController.login(req.body).then(resultFromController => res.send(resultFromController));
})

router.patch("/:userId/admin", auth.verify, (req, res)=> {
    const data = {
        isAdmin: auth.decode(req.headers.authorization).isAdmin
    }
    userController.toAdmin(req.params, data).then(resultFromController => res.send(resultFromController))
    
    
})
router.patch("/:userId/user", auth.verify, (req, res)=> {
    const data = {
        isAdmin: auth.decode(req.headers.authorization).isAdmin
    }
    userController.toUser(req.params, data).then(resultFromController => res.send(resultFromController))
    
    
})

router.get("/userDetails", auth.verify, (req, res) => {
    const data = {
        userId: auth.decode(req.headers.authorization).id
    }
    userController.getUserDetails(data).then(resultFromController => res.send(resultFromController));
})

router.get("/allUsers", (req, res) => {
    userController.getAllUsers().then(resultFromController => res.send(resultFromController));
})

router.post('/addToCart', auth.verify, userController.addToCart);


module.exports = router;