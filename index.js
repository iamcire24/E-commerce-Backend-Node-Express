const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const userRoute = require("./routes/userRoute")
const productRoute = require("./routes/productRoute")
const port = 8080;

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

app.listen(port, () => {
    console.log(`Connected at port ${port}`);
})