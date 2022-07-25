const config = require("./utils/config");
const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const mongoose = require("mongoose");
const path = require("path");
const app = express();
const registerRouter = require("./controllers/register");
const loginRouter = require("./controllers/login");
const getConversionRouter = require("./controllers/getConversion");
const saveCurrenciesRouter = require("./controllers/saveCurrencies");
const deleteCurrencyRouter = require("./controllers/deleteCurrency");

// MIDDLEWARES
app.use(express.json());
app.use(morgan("dev"));
app.use(cors({ origin: "*" }));
app.use(express.static(path.resolve(__dirname, "../client/build")));

// TEST DB CONNECTION
mongoose.connect(config.DB_URI, (err) =>
  err ? console.log(err) : console.log("DB Connected")
);

// CONTROLLERS
app.use("/api/register", registerRouter);
app.use("/api/login", loginRouter);
app.use("/api", getConversionRouter);
app.use("/api/saveCurrencies", saveCurrenciesRouter);
app.use("/api/deleteCurrency", deleteCurrencyRouter);

// UNHANDLED
app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "../client/build", "index.html"));
});

module.exports = app;
