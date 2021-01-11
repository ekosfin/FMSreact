require("dotenv").config();

const express = require("express");
const app = express();
const jwt = require("jsonwebtoken");
const dbConnect = require("./controllers/dbConnect");
const cors = require("cors");

app.use(express.json());

Object.assign = require("object-assign");
app.use(morgan("combined"));
app.use(cors());

app.listen(dbConnect.port, dbConnect.ip);
console.log("Running on http://" + dbConnect.ip + ":" + dbConnect.port);
