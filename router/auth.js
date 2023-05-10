let express = require("express")
let authrouter = express.Router()
let Usercontroller  = require("../controlles/authcontroller")
let bcrypt  = require("bcrypt")
const Auth = require("../db/auth")
const { adminMiddleware } = require("../middleware/middleware")
authrouter.post('/register',Usercontroller.CreateUser)
authrouter.post("/login", Usercontroller.FindUser)
module.exports = authrouter;