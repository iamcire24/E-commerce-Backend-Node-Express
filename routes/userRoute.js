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

module.exports = router;