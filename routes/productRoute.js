const express = require("express");
const router = express.Router();
const productController = require("../controllers/productController");
const auth = require("../auth");




router.post("/addProduct", auth.verify, (req, res) => {
    const data =  {
        product: req.body,
        isAdmin: auth.decode(req.headers.authorization).isAdmin
    }
    
    productController.addProduct(data).then(resultFromController => res.send(resultFromController));
})

router.get("/availableProducts", (req, res) => {
    productController.getAvailableProducts().then(resultFromController => res.send(resultFromController));
})



module.exports = router;