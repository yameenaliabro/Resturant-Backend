const { ObjectId } = require('mongodb');
const mongoose = require('mongoose');
const { Types } = require('./models/connection');
const Auth = require('./auth');
const {Schema} = mongoose;
let getuser =  new Schema({
    user:{type : Types.ObjectId,ref:"Auth"}
})
let GetUser =  mongoose.model("Admin",getuser)
module.exports = GetUser;