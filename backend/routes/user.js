const express = require("express");
const bcrypt = require("bcrypt");
const { object, string, boolean } = require("zod");

const AuthController = require("../controllers/AuthController");

const router = express.Router();

// Zod schema for validating the request body of the /signup route
const signUpSchema = object({
  username: string().min(3, {
    message: "Username must be at least 3 characters long",
  }),
  email: string().email({ message: "Invalid email address" }),
  password: string().min(8, {
    message: "Password must be at least 8 characters long",
  }),
  is_admin: boolean().optional(),
}).refine((data) => !data.is_admin || data.is_admin === false, {
  message: "User can't be created as admin",
});

// Signup Route
router.post("/signup", async (req, res) => {
  try {
    const { username, email, password } = signUpSchema.parse(req.body);

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user object with the given properties
    const newUser = {
      username: username,
      password: hashedPassword,
      is_admin: false,
    };

    // Insert the new user into the database
    const createUserResult = await AuthController.createUser(newUser);

    // Get the ID of the created user
    const userId = createUserResult.id;

    // Insert the new patient into the database with the user ID
    await AuthController.createPatient({
      name: username,
      email: email,
      userId: userId,
    });

    res.status(200).json({ message: "User created successfully." });
  } catch (error) {
    console.error(error);
    res.status(400).json({ message: error.message });
  }
});

// Zod schema for validating the request body of the /login route
const loginSchema = object({
  username: string(),
  password: string().min(8, {
    message: "Password must be at least 8 characters long",
  }),
});

// Login Route
router.post("/login", async (req, res) => {
  try {
    const { username, password } = loginSchema.parse(req.body);

    // Find the user with the given username
    const user = await AuthController.getUser(username);

    if (user.success) {
      // Check if the password matches
      const isPasswordMatch = await bcrypt.compare(
        password,
        user.data.password
      );
      if (isPasswordMatch) {
        // Check if the user has admin privileges
        if (user.data.is_admin == true) {
          res.send({ success: true, message: "Admin logged in" });
        } else {
          res.send(user);
        }
      } else {
        res.status(401).send({ message: "Invalid password" });
      }
    } else {
      res.status(user.status).send({ message: "User not found" });
    }
  } catch (error) {
    console.error(error);
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;
