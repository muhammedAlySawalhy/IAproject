const express = require("express");

import UserModel from "../models/UserModel";
const AuthController = require("../controllers/AuthController");
const router = express.Router();

// Signup Route

router.post("/signup", async (req, res) => {
  const { username, email, password } = req.body;

  // Create a new user object with the given properties
  const newUser = new UserModel(username, email, password);
  // Insert the new user into the database
  const result = await AuthController.createUser(newUser);
  res.send(result);
});

// Login Route
router.post("/login", async (req, res) => {
  const { username, password } = req.body;
  // Find the user with the given username
  console.log("req", password);
  const user = await AuthController.getUser(username);
  console.log("user get", user.data);
  if (user.success) {
    // Check if the password matches
    if (user.data.password == password) {
      res.send(user);
    } else {
      res.status(401).send({ message: "Invalid password" });
    }
  } else {
    res.status(user.status).send({ message: "User not found" });
  }
});

module.exports = router;
