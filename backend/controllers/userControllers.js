const User = require("../models/userModel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

// Generate JWT
const generateToken = (_id) => {
  return jwt.sign({ _id }, process.env.SECRET, {
    expiresIn: "3d",
  });
};

// @desc    Register new user
// @route   POST /api/users/signup
// @access  Public
const signupUser = async (req, res) => {
  const {
    name,
    email,
    password,
    phone_number,
    gender,
    date_of_birth,
    membership_status,
  } = req.body;

  try {
    // Validate required fields
    if (
      !name ||
      !email ||
      !password ||
      !phone_number ||
      !gender ||
      !date_of_birth ||
      !membership_status
    ) {
      return res.status(400).json({ error: "Please add all fields" });
    }

    // Check if username exists
    const nameExists = await User.findOne({ name });
    if (nameExists) {
      return res.status(400).json({ error: "Name already taken" });
    }

    // Check if email exists
    const emailExists = await User.findOne({ email });
    if (emailExists) {
      return res.status(400).json({ error: "Email already exists" });
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create user
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      phone_number,
      gender,
      date_of_birth,
      membership_status,
    });

    const token = generateToken(user._id); // ✅ Correct function name + correct argument

    return res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      phone_number: user.phone_number,
      gender: user.gender,
      date_of_birth: user.date_of_birth,
      membership_status: user.membership_status,
      token,
    });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

// @desc    Authenticate a user
// @route   POST /api/users/login
// @access  Public
const loginUser = async (req, res) => {
  const { name, password } = req.body;

  if (!name || !password) {
    return res.status(400).json({ error: "Name and password are required" });
  }

  try {
    const user = await User.findOne({ name });
    if (!user) {
      return res.status(400).json({ error: "Incorrect name or password" });
    }

    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      return res.status(400).json({ error: "Incorrect name or password" });
    }

    const token = generateToken(user._id); // ✅ FIXED (was createToken)

    return res.status(200).json({
      name: user.name,
      token,
    });
  } catch (error) {
    return res.status(500).json({ error: "Server error" });
  }
};

// @desc    Get logged in user info
// @route   GET /api/users/me
// @access  Private
const getMe = async (req, res) => {
  try {
    return res.status(200).json(req.user);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

module.exports = {
  signupUser,
  loginUser,
  getMe,
};
