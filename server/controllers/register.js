const bcrypt = require("bcrypt");
const registerRouter = require("express").Router();
const User = require("../models/user");

registerRouter.post("/", async (req, res) => {
  const { username, email, password } = req.body;

  if (!(username && email && password)) {
    return res.status(400).json({
      error: "all fields required",
    });
  }

  const emailInUse = await User.findOne({ email });
  if (emailInUse) {
    return res.status(409).json({
      error: "email is already in use",
    });
  }

  const existingUser = await User.findOne({ username });
  if (existingUser) {
    return res.status(409).json({
      error: "uername is already taken",
    });
  }

  const saltRounds = 10;
  const passwordHash = await bcrypt.hash(password, saltRounds);
  const user = new User({
    username,
    email,
    passwordHash,
  });

  const savedUser = await user.save();

  res.status(201).json(savedUser);
});

module.exports = registerRouter;
