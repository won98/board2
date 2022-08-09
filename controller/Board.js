const { Board } = require("../models");
const { Op } = require("sequelize");
const { Users } = require("../models");
const jwt = require("../utils/jwt");
const { sequelize, QueryTypes } = require("../models");
module.exports = {
  Post: async (req, res) => {
    try {
      let { title } = req.body;
      console.log(req.files);
      let { content } = req.body;
      let { xauth } = req.body;
      let decoded = jwt.verifyToken(xauth);
      let image = "/img/" + req.files.image[0].fileName;
      const rows = await Board.create({
        title: title,
        content: content,
        image: image,
        id: decoded.id,
      });
      if (rows) return res.status(200).json({ result: rows });
    } catch (err) {
      console.log(err);
    }
  },
  Delete: async (req, res) => {
    try {
      let { xauth } = req.body;
      let decoded = jwt.verifyToken(xauth);

      //console.log(idx);
      const rows = await Board.destroy({
        where: { id: decoded.id },
      });
      if (rows) return res.status(200).json({ result: rows });
      else {
        res.send(0);
      }
    } catch (err) {
      console.log(err);
    }
  },
  Get: async (req, res) => {
    try {
      const rows = await Board.findAll();
      if (rows) return res.status(200).json({ result: rows });
    } catch (err) {
      console.log(err);
    }
  },
  Search: async (req, res) => {
    try {
      //let { title } = req.body;
      const rows = await Board.findAndCountAll({
        attribute: ["title", "content"],
        //where: ({ title, content } = req.body),
        where: {
          title: {
            [Op.like]: "%" + req.body.title + "%",
          },
        },
        where: {
          content: {
            [Op.like]: "%" + req.body.content + "%",
          },
        },
      });
      if (rows) return res.status(200).json({ result: rows });
      else {
        res.send(0);
      }
    } catch (err) {
      console.log(err);
    }
  },
  Update: async (req, res) => {
    try {
      let { xauth } = req.body;
      let decoded = jwt.verifyToken(xauth);
      let { n_title, n_content } = req.body;
      const rows = await Board.update(
        {
          title: n_title,
          content: n_content,
        },
        {
          where: {
            id: decoded.id,
          },
        }
      );
      if (rows) return res.status(200).json({ result: rows });
      else {
        res.send(0);
      }
    } catch (err) {
      console.log(err);
    }
  },
  Updatcontent: async (req, res) => {
    try {
      let { n_content } = req.body;
      let { xauth } = req.body;
      let decoded = jwt.verifyToken(xauth);
      const rows = await Board.update(
        { content: n_content },
        {
          where: {
            id: decoded.id,
          },
        }
      );
      if (rows) return res.status(200).json({ result: rows });
      else {
        res.send(0);
      }
    } catch (err) {
      console.log(err);
    }
  },
  Updatetitle: async (req, res) => {
    try {
      let { n_title } = req.body;
      let { xauth } = req.body;
      let decoded = jwt.verifyToken(xauth);
      const rows = await Board.update(
        { title: n_title },
        {
          where: {
            id: decoded.id,
          },
        }
      );
      if (rows) return res.status(200).json({ result: rows });
      else {
        res.send(0);
      }
    } catch (err) {
      console.log(err);
    }
  },
};
