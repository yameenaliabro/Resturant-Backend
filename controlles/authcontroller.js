const jwt = require("jsonwebtoken")
const Auth = require("../db/auth")
let bcrypt = require("bcrypt")
let dotenv = require("dotenv").config()
let secret = process.env.JWT_SECRET
exports.CreateUser = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const existingUser = await Auth.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ message: 'User already exists' });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new Auth({
      username,
      email,
      password: hashedPassword,
    });

    // Save the user to the database
    let resp = await newUser.save();
    // Respond with a success message
    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  }
};
exports.FindUser = async (req, res) => {
  const { email, password } = req.body;
  const user = await Auth.findOne({ email });
  if (!user) return res.status(404).send('User not found');
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) return res.status(401).send('Invalid password');
  const token = jwt.sign({ userId: user._id }, secret,{expiresIn : "3h"});
  res.json({ token,user });
}