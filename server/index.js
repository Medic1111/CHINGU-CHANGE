const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const mongoose = require("mongoose");
const axios = require("axios");
require("dotenv").config();
const path = require("path");
const app = express();

// MIDDLEWARES

app.use(express.json());
app.use(morgan("dev"));
app.use(cors({ origin: "*" }));
app.use(express.static(path.resolve(__dirname, "../client/build")));

// TEST DB CONNECTION

mongoose.connect(`${process.env.DB_URI}`, (err) =>
  err ? console.log(err) : console.log("DB Connected")
);

// POST: LOGIN
app.post("/api/login", (req, res) => {
  const { username, password } = req.body;
  res.send("login page");
});
// FETCH THIRD
// DB: ORIGINAL/CONVERTTO
// POST: REGISTER
app.post("/api/register", (req, res) => {
  const { username, password } = req.body;
  res.send("register page");
});
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

// UNHANDLED
app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "../client/build", "index.html"));
});

app.listen(process.env.PORT || 3002, () => console.log("Server Spinning"));
