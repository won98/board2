const jwt = require("jsonwebtoken");
//const { createToken } = require("../utils/jwt");
require("dotenv").config();
const secretKey = "" + process.env.ACCESS_KEY;
const { Users } = require("../models");

module.exports = {
  Check: async (req, res, next) => {
    try {
      const token = req.headers.authorization.split("Bearer ")[1];
      console.log(token);
      const decodedToken = jwt.verify(token, secretKey);
      console.log(decodedToken);
      const { id } = decodedToken;
      console.log(id);
      const rows = await Users.findOne({
        where: { id: id },
      });
      if (rows) {
        return res.status(200).json({ result: decodedToken });
      } else {
        res.send("expired");
      }
      next();
    } catch (err) {
      console.log(err);
    }
  },
};
