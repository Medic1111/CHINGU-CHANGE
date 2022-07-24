require("dotenv").config();

const PORT = process.env.PORT;

const DB_URI = process.env.DB_URI;

module.exports = {
  PORT,
  DB_URI,
};
