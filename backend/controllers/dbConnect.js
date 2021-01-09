//code copied form: https://github.com/sclorg/nodejs-ex/blob/master/server.js
const mongoose = require("mongoose");

let port = process.env.PORT || 8080,
  ip = process.env.IP || "0.0.0.0",
  mongoURL = "mongodb://mongo:27017/backend";

mongoose.connect(mongoURL, { useUnifiedTopology: true, useNewUrlParser: true });
mongoose.Promise = Promise;
const db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error:"));
db.once(
  "open",
  console.log.bind(console, "MongoDB connection established: @" + mongoURL)
);

module.exports = {
  ip: ip,
  port: port,
  url: mongoURL,
  db: db,
};
