const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const mongoose = require("mongoose");
const axios = require("axios");
require("dotenv").config();
const path = require("path");
const app = express();
const registerRouter = require("./controllers/register");
const loginRouter = require("./controllers/login");
const User = require("./models/user");

// MIDDLEWARES

app.use(express.json());
app.use(morgan("dev"));
app.use(cors({ origin: "*" }));
app.use(express.static(path.resolve(__dirname, "../client/build")));

// TEST DB CONNECTION

mongoose.connect(`${process.env.DB_URI}`, (err) =>
  err ? console.log(err) : console.log("DB Connected")
);

// POST: REGISTER
app.use("/api/register", registerRouter);

// POST: LOGIN
app.use("/api/login", loginRouter);

// FETCH THIRD
// GET: CURRENCY THIRD PARTY
app.get("/api/:original&:convertTo", async (req, res) => {
  let original = req.params.original;
  let convertTo = req.params.convertTo;
  await axios
    .get(
      `https://free.currconv.com/api/v7/convert?q=${original}_${convertTo},${convertTo}_${original}&compact=ultra&apiKey=d4cf3228112bfb5a29f5`
    )
    .then((response) => res.status(200).json(response.data))
    .catch((err) => console.log(err));
});

// POST: ORIGINAL/CONVERTTO
app.post("/api/saveCurrencies", async (req, res) => {
  let { original, convertTo, userID } = req.body;

  User.find({ _id: userID }, (err, doc) => {
    err ? console.log(err) : console.log(doc);

    // WORK WITH doc[0]
    const user = doc[0];
    user.currencies = [...user.currencies, { original, convertTo }];
    user.save();
    res.json(user);
  });
});

// PUT: REMOVE ENTRY FROM FAVE LIST
app.put("/api/deleteCurrency", async (req, res) => {
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

// UNHANDLED
app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "../client/build", "index.html"));
});

app.listen(process.env.PORT || 3002, () => console.log("Server Spinning"));
