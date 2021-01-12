require("dotenv").config();

const express = require("express");
const app = express();
const cors = require("cors");
const dbConnect = require("./controllers/dbConnect");
const signupRoute = require("./routes/signup");
const loginRoute = require("./routes/login");
const tokenRoute = require("./routes/token");

app.use(express.json());

Object.assign = require("object-assign");
app.use(cors());

// routes
app.use("/signup", signupRoute);
app.use("/login", loginRoute);
app.use("/token", tokenRoute);

app.listen(dbConnect.port, dbConnect.ip);
console.log("Auth running on http://" + dbConnect.ip + ":" + dbConnect.port);
