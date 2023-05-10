const jwt = require("jsonwebtoken") 
const Auth = require("../db/auth")
let bcrypt = require("bcrypt")
let dotenv = require("dotenv").config()
let secret = process.env.JWT_SECRET
exports.CreateUser = async (req, res) => {
    const { email, password,username } = req.body;
    const hashedPassword = await bcrypt.hash(password, 12);
    const user = new Auth({ email, username,password: hashedPassword });
    const resp = await user.save();
  }
  exports.FindUser = async (req, res) => {
    const { email, password } = req.body;
    const user = await Auth.findOne({ email });
    if (!user) return res.status(404).send('User not found');
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).send('Invalid password');
    const token = jwt.sign({ userId: user._id },secret);
    res.json({ token });
  }