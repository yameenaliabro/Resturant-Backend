let express = require("express")
let authrouter = express.Router()
let Usercontroller  = require("../controlles/authcontroller")
authrouter.post('/register',Usercontroller.CreateUser)
authrouter.post("/login", Usercontroller.FindUser)
module.exports = authrouter;