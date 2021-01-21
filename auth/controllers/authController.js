const jwt = require("jsonwebtoken");

// tässä vielä se osa mikä tarkistaa onko oikee tokeni
exports.verify_token = function (req, res, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  if (token == null) return res.sendStatus(401);

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    console.log(err);
    if (err) return res.status(403).json("Token invalid");
    req.user = user;
    // nyt on onnisteesti tarkistettu joten voidaan siirtyä eteenpäin
    next();
  });
};

exports.generatRefreshToken = function (user) {
  let tempUser = {
    _id: user._id,
    username: user.username,
    email: user.email,
  };
  console.log("generate token payload");
  console.log({ tempUser });
  return jwt.sign(tempUser, process.env.REFRESH_TOKEN_SECRET);
};

exports.generateAccessToken = function (user) {
  let tempUser = {
    _id: user._id,
    username: user.username,
    email: user.email,
  };
  return jwt.sign(tempUser, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: "9999m",
  });
};
