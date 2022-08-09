const jwt = require("jsonwebtoken");
require("dotenv").config();
//const { Users } = require("../models");
const { ACCESS_KEY, REFRESH_KEY } = process.env;

module.exports = {
  createToken: (payload) => {
    //const { id } = req.body;
    const token = jwt.sign(
      {
        user_id: payload.user_id,
        id: payload.id,
      },
      ACCESS_KEY,
      {
        algorithm: "HS256",
        expiresIn: "10m",
      }
    );
    return token;
  },
  verifyToken: (token) => {
    if (!token) {
      return "";
    }
    let decoded = jwt.verify(token, ACCESS_KEY);
    return decoded;
  },
  createRefreshToken: (payload) => {
    const retoken = jwt.sign({ user_id: payload.id }, REFRESH_KEY, {
      algorithm: "HS256",
      expiresIn: "7d",
    });
    return retoken;
  },
  verifyRefreshToken: (token) => {
    if (!token) {
      return "";
    }
    let decoded = jwt.verify(token, REFRESH_KEY);
    return decoded;
  },
};
