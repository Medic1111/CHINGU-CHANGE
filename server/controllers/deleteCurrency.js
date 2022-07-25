const deleteCurrencyRouter = require("express").Router();
const User = require("../models/user");

deleteCurrencyRouter.put("/", async (req, res) => {
  let { id, original, convertTo } = req.body;
  const objToDelete = { original: original, convertTo: convertTo };

  User.find({ _id: id }, (err, doc) => {
    if (err) {
      console.log(err);
    }

    const user = doc[0];
    user.currencies = [...user.currencies].filter(
      (cur) =>
        Object.entries(cur).toString() !==
        Object.entries(objToDelete).toString()
    );
    user.save();
  });
  res.json(objToDelete);
});

module.exports = deleteCurrencyRouter;
