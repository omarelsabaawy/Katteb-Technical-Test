const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    min: 3,
    max: 20,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    max: 50,
  },
  password: {
    type: String,
    required: true,
    min: 8,
    max: 16,
  },
  role: {
    type: String,
    required: true,
  },
});

userSchema.index({ username: 1, email: 1 }, { unique: true });

const User = mongoose.model('User', userSchema);

module.exports = User;
