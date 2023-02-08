const express = require("express");
const router = express.Router();
const orderController = require("../controllers/orderController");
const auth = require("../auth");

router.post("/addCart", auth.verify,(req,res)=>{
	let data = {
		id: auth.decode(req.headers.authorization).id,
		productId: req.body.productId,
		quantity: req.body.quantity,
		isAdmin: auth.decode(req.headers.authorization).isAdmin
	}

	orderController.addToCart(data).then(resultFromController => res.send(resultFromController))

})


module.exports = router;