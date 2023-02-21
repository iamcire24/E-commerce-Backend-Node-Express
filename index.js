const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const userRoute = require("./routes/userRoute")
const productRoute = require("./routes/productRoute")
const orderRoute = require("./routes/orderRoute")
const cartRoute = require("./routes/cartRoute")
const port = 4000;
const fs = require('fs');
const path = require('path')
const multer = require('multer');
const productModel = require("./models/Product")
 
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads')
    },
    filename: (req, file, cb) => {
        cb(null, file.fieldname + '-' + Date.now())
    }
});
 
const upload = multer({ storage: storage });

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cors());



mongoose.set("strictQuery", true);
mongoose.connect("mongodb+srv://admin123:admin123@cluster0.bfuvdfn.mongodb.net/Casptone-2-Andales?retryWrites=true&w=majority", {
	useNewUrlParser: true,
	useUnifiedTopology: true
})

let db = mongoose.connection;

db.on("error", console.log.bind(console, "Connection Error"));
db.once("open", () => console.log("Connected in the Atlas"));


app.use("/users", userRoute);
app.use("/products", productRoute);
app.use("/order", orderRoute);
app.use("/cart", cartRoute);

app.listen(port, () => {
    console.log(`Connected at port ${port}`);
})