let express = require("express")
const Order = require("../db/Orders")
const order = express.Router()
const { addorder, getallorder, acceptuser, rejectstatus, usercheck,} = require("../controlles/Order")
order.post("/user",addorder)
order.get("/allorder",getallorder)
order.patch("/setstatus/:id",acceptuser)
order.put("/rejected/:id",rejectstatus)
order.put("/accepted/:id",acceptuser)
order.get("/userorder/:id",usercheck)

module.exports = order; 