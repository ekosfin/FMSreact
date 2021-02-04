const express = require("express");
const app = express();
const morgan = require("morgan");
const dbConnect = require("./controllers/dbConnect");
const cors = require("cors");
const newtaskRoute = require("./routes/newtask");
const removetaskRoute = require("./routes/removetask");
const gettasksRoute = require("./routes/gettasks");
const doneTaskRoute = require("./routes/donetask");

Object.assign = require("object-assign");
app.use(express.json());
app.use(morgan("combined"));
app.use(cors());
app.use(require("./middleware/auth"));

app.use("/newtask", newtaskRoute);
app.use("/removetask", removetaskRoute);
app.use("/gettasks", gettasksRoute);
app.use("/donetasks", doneTaskRoute);
app.get("/", (req, res) => {
  res.send("Hello World");
});

// error handling
app.use(function (err, req, res, next) {
  console.error(err.stack);
  res.status(500).send("Something bad happened!");
});

app.listen(dbConnect.port, dbConnect.ip);
console.log("Running on http://" + dbConnect.ip + ":" + dbConnect.port);
