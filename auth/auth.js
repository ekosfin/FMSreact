require("dotenv").config();

const express = require("express");
const app = express();
const cors = require("cors");
const dbConnect = require("./controllers/dbConnect");
const signupRoute = require("./routes/signup");
const loginRoute = require("./routes/login");
const tokenRoute = require("./routes/token");
const logoutRoute = require("./routes/logout");
const userRoute = require("./routes/user");

Object.assign = require("object-assign");
app.use(cors());
app.use(express.json());

// routes
app.use("/signup", signupRoute);
app.use("/login", loginRoute);
app.use("/token", tokenRoute);
app.use("/logout", logoutRoute);
app.use("/user", userRoute);

app.listen(dbConnect.port, () => {
  console.log("Auth running on http://" + dbConnect.ip + ":" + dbConnect.port);
});
