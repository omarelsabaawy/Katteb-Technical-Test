const User = require("../models/user");
const bcrypt = require("bcrypt");
const generateToken = require('../config/generateToken');

exports.login = async (req, res, next) => {
  try {
    const { username, password } = req.body;

    // Find the user by username
    const user = await User.findOne({ username });

    // Check if the user exists
    if (!user) {
      return res.json({
        msg: "Incorrect Username or Password",
        status: false
      });
    }

    // Compare the provided password with the hashed password in the database
    const isPasswordValid = await bcrypt.compare(password, user.password);

    // If the password is not valid, return an error message
    if (!isPasswordValid) {
      return res.json({
        msg: "Incorrect Username or Password",
        status: false
      });
    }

    // If the authentication is successful, generate a token
    const tokenPayload = { userId: user._id, username: user.username };
    const token = generateToken(tokenPayload);

    // Remove the password field from the user object before sending it in the response
    const sanitizedUser = { ...user.toObject(), password: undefined };

    // Return the token and user information
    return res.json({
      status: true,
      token,
      user: sanitizedUser
    });
  } catch (error) {
    next(error);
  }
};
exports.register = async (req, res, next) => {
  try {
    const { username, email, role, password } = req.body;

    // Check if username is already in use
    const existingUsername = await User.findOne({ username });
    if (existingUsername) {
      return res.json({ msg: "Username already in use", status: false });
    }

    // Check if email is already in use
    const existingEmail = await User.findOne({ email });
    if (existingEmail) {
      return res.json({ msg: "Email already in use", status: false });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create the user
    const user = await User.create({
      email,
      username,
      role,
      password: hashedPassword,
    });

    // Generate a token for the newly registered user
    const tokenPayload = { userId: user._id, username: user.username };
    const token = generateToken(tokenPayload);

    // Sanitize the user object before sending it in the response
    const sanitizedUser = { ...user.toObject(), password: undefined };

    // Return the token and sanitized user information
    return res.json({
      status: true,
      token,
      user: sanitizedUser
    });
  } catch (error) {
    next(error);
  }
};
exports.getAllUsers = async (req, res, next) => {
  try {
    const users = await User.find({ _id: { $ne: req.user._id } }).select([
      "email",
      "username",
      "role",
      "_id",
    ]);
    return res.json(users);
  } catch (ex) {
    next(ex);
  }
};

exports.logOut = (req, res, next) => {
  try {
    if (!req.user._id)
      return res.json({ msg: "User id is required " });
    onlineUsers.delete(req.params.id);
    return res.status(200).send();
  } catch (ex) {
    next(ex);
  }
};
