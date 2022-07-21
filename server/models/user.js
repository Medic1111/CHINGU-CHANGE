const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  passwordHash: {
    type: String,
    required: true,
  },
  currencies: Array,
});

const User = mongoose.model("User", userSchema);

module.exports = User;

// USER:
// BCRYPT

// USERNAME, EMAIL, PASSWORD, LIST: [{objs: original, convertTo}]
