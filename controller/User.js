const { Users } = require("../models");
const { createToken, creatRefreshToken } = require("../utils/jwt");
const { checkToken } = require("../middleware/isAuth");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const secretKey = "" + process.env.ACCESS_KEY;

module.exports = {
  Signup: async (req, res) => {
    try {
      const data = await Users.findOne({ where: { email: req.body.email } });
      if (data) {
        // 반환 데이터가 있다면 이미 존재하는 이메일
        res.status(400).json({
          result: false,
          message: "이미 존재하는 이메일입니다.",
        });
        if (rows) return res.status(200).json({ result: rows });
      }
      const iddata = await Users.findOne({ where: { id: req.body.id } });
      if (iddata) {
        // 반환 데이터가 있다면 이미 존재하는 이메일
        res.status(400).json({
          result: false,
          message: "이미 존재하는 아이디입니다.",
        });
        if (rows) return res.status(200).json({ result: rows });
      } else {
        res.send(200);
      }
      let { name, email, id, passwd } = req.body;
      const hash = await bcrypt.hash(passwd, 10);
      const rows = await Users.create({
        name: name,
        email: email,
        id: id,
        passwd: hash,
      });
      if (rows) return res.status(200).json({ result: rows });
    } catch (err) {
      console.log(err);
    }
  },
  Login: async (req, res) => {
    try {
      const { id, passwd } = req.body;
      const user = await Users.findOne({
        where: { id: id },
      });
      const compare = await bcrypt.compare(passwd, user.passwd);
      if (compare == true) {
        //const token = createToken(Users.id);
        const token = createToken(user);
        const retoken = creatRefreshToken(user);
        //const decodedToken = checkToken(id);
        return res.send({ token, retoken });
      } else {
        throw res.send(err);
      }
    } catch (err) {
      console.log(err);
    }

    // controller.get("/test", checkToken, (req, res) => {
    //   res.json(req.decoded);
    // });
  },

  List: async (req, res) => {
    try {
      const rows = await Users.findAll();
      if (rows) return res.status(200).json({ result: rows });
      else throw console.log(error);
    } catch (err) {
      console.log(err);
    }
  },
  Checkemail: async (req, res) => {
    try {
      const data = await Users.findOne({ where: { email: req.body.email } });
      if (data) {
        // 반환 데이터가 있다면 이미 존재하는 이메일
        res.status(400).json({
          result: false,
          message: "이미 존재하는 이메일입니다.",
        });
        if (rows) return res.status(200).json({ result: rows });
      } else {
        res.send(200);
      }
    } catch (err) {
      console.log(err);
    }
  },
  Checkid: async (req, res) => {
    try {
      const data = await Users.findOne({ where: { id: req.body.id } });
      if (data) {
        // 반환 데이터가 있다면 이미 존재하는 이메일
        res.status(400).json({
          result: false,
          message: "이미 존재하는 아이디입니다.",
        });
        if (rows) return res.status(200).json({ result: rows });
      } else {
        res.send(200);
      }
    } catch (err) {
      console.log(err);
    }
  },
  TokenCh: async (req, res) => {
    try {
      let auth = req.get("x_auth");
      console.log(auth);
      const token = authorization(" ", " ")[1];
      jwt.verify(token, secretKey, (err, encode) => {
        if (err) console.error(err);
        else {
          console.log(encode);
        }
      });
    } catch (err) {
      console.log(err);
    }
  },
};
