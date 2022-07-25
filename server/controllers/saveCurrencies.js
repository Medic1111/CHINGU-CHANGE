const saveCurrenciesRouter = require("express").Router();
const User = require("../models/user");

saveCurrenciesRouter.post("/", async (req, res) => {
  let { original, convertTo, userID } = req.body;

  User.find({ _id: userID }, (err, doc) => {
    if (err) console.log(err);

    const user = doc[0];
    user.currencies = [...user.currencies, { original, convertTo }];
    user.save();
    res.json(user);
  });
});

module.exports = saveCurrenciesRouter;
