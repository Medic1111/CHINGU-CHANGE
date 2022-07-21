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

userSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
    delete returnedObject.passwordHash;
    delete returnedObject.username;
    delete returnedObject.email;
  },
});

const User = mongoose.model("User", userSchema);

module.exports = User;

// USER:
// BCRYPT

// USERNAME, EMAIL, PASSWORD, LIST: [{objs: original, convertTo}]
