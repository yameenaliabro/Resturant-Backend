let express = require("express")
let app = express()
let path = require("path")
let bodyparser  = require("body-parser");
const mongoose = require("./db/models/connection");
let cors = require("cors");
const authrouter = require("./router/auth");
const product = require("./router/Product");
const order = require("./router/Order");
const user = require("./router/User");
const { config } = require("dotenv");
app.use(cors())
app.use(bodyparser.urlencoded({extended: false}))
app.use(bodyparser.json());
app.use(express.static(path.join(process.cwd(),"public")))
app.use('/thumbnails', express.static(path.join(__dirname, 'public', 'thumbnails')));
app.set("view engine", "ejs")
app.set("views","views")
app.use("/auth",authrouter)
app.use("/food",product);
app.use("/order",order)
app.use("/",user)
app.listen(2000)