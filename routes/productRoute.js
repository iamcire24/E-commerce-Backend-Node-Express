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

//retrieve single product by name
router.get("/name", (req, res) =>{
    productController.getProductByName(req.body).then(resultFromController => res.send(resultFromController));
})

router.get("/code", (req, res) =>{
    productController.getProductByCode(req.body).then(resultFromController => res.send(resultFromController));
})


router.get("/:productId", (req,res) => {
    productController.getProductById(req.params).then(resultFromController => res.send(resultFromController));
})

router.patch("/updateProduct/:productId", auth.verify, (req, res) => {
    const data = {
        product: req.body,
        isAdmin: auth.decode(req.headers.authorization).isAdmin
    }
    productController.updateProductById(req.params, data).then(resultFromController => res.send(resultFromController));
})
router.patch("/updateProduct/?productName", auth.verify, (req, res) => {
    const data = {
        product: req.body,
        isAdmin: auth.decode(req.headers.authorization).isAdmin
    }
    productController.updateProductByName(req.params, data).then(resultFromController => res.send(resultFromController));
})
module.exports = router;