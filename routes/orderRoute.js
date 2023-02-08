const express = require("express");
const router = express.Router();
const orderController = require("../controllers/orderController");
const auth = require("../auth");



router.post("/addOrder", auth.verify, (req, res) => {
    const data = {
        owner: auth.decode(req.headers.authorization).id,
        productId: req.body.productId,
        quantity: req.body.quantity,
        reqbody: req.body,
        isAdmin: auth.decode(req.headers.authorization).isAdmin
    }
    orderController.makeOrder(data).then(resultFromController => res.send(resultFromController));
})

router.get("/allOrders", auth.verify, (req, res) => {
    const data = {
        isAdmin: auth.decode(req.headers.authorization).isAdmin
    }
    orderController.getAllOrders(data).then(resultFromController => res.send(resultFromController));
})

router.get("/myOrders", auth.verify, (req, res) => {
    const data = {
        id: auth.decode(req.headers.authorization).id
    }
    orderController.getMyOrders(data).then(resultFromController => res.send(resultFromController));
})




module.exports = router;