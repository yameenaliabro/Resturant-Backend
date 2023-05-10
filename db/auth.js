const mongoose = require("mongoose")
let bcrypt = require("bcrypt")
let userschema = new mongoose.Schema({
  username: { type: String },
  email: { type: String, required: true,unique:true},
  password: { type: String, required: true, select: true },
  role: {
    type: String,
    enum: ['admin', 'user'],
    default: 'user',
  },
})
let Auth = mongoose.model("User", userschema);
module.exports = Auth; 