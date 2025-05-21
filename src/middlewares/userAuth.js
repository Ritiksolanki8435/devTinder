const User = require("../models/user");
const jwt = require("jsonwebtoken");
const isUserAthenticated  = async(req , res, next) =>{
    if (!req.cookies || !req.cookies.token) {
        return res.status(401).send({ message: "unauthorized request" });
    }
  const { token } = req.cookies;
  const decoded = jwt.verify(token, "Ritik@123$dz");
  if (!decoded || !token) {
    return res.status(401).send({ message: "unauthorized request" });
  }
  const user = await User.findById(decoded.id);
    if (!user) {
        return res.status(401).send({ message: "unauthorized request" });
    }
    req.user = user;
    next()
}

module.exports = isUserAthenticated