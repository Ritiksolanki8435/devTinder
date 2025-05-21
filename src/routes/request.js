const express = require('express');
const isUserAthenticated = require('../middlewares/userAuth');
const requestRouter = express.Router()

requestRouter.post("/sendConnectionRequest", isUserAthenticated, async (req, res) => {
  const { firstName } = req.user;
  console.log(firstName, "send you a connection request");
  res.status(200).send({ message: `${firstName} send you a connection request` });
});

module.exports = requestRouter