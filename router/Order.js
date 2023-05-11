let express = require("express")
const Order = require("../db/Orders")
const order = express.Router()
const { addorder, getallorder, changestatus} = require("../controlles/Order")
order.post("/user",addorder)
order.get("/allorder",getallorder)
order.patch("/setstatus/:id",changestatus)
module.exports = order; 
