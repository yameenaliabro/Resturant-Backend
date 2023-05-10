let express = require("express");
const GetUser = require("../db/User");
let user = express.Router()
user.post("/user",(req,res)=>{
let user =  GetUser.find({
    username : req.body.username
});
let checkuser = user.save
res.send(checkuser)
})
module.exports = user