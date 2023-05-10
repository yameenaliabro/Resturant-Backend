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
userschema.pre('save', async function (next) {
  const user = this;
  if (!user.isModified('password')) return next();

  try {
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(user.password, salt);
    user.password = hash;
    next();
  } catch (error) {
    return next(error);
  }
});
let Auth = mongoose.model("Auth", userschema);
module.exports = Auth; 