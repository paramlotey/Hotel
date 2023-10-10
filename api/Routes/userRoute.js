const express = require("express");
const router = express.Router();
const User = require("../models/userModel");

router.post("/register", async (req, res) => {
  const newuser = new User(req.body);
  try {
    await newuser.save();
    res.send("User created successfully");
    
  } catch (err) {
    console.log(err);
  }
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email: email, password: password });
    if (user) {

      const temp={
        name: user.username,
        email: user.email,
        isAdmin: user.isAdmin,
        id: user._id
      }
      res.send(temp);
    } else {
      return res.status(401).json({ message: "login failed" });
    }
  } catch (error) {
    console.log(error);
  }
});

module.exports=router