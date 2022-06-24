const { Board } = require("../models");
const { Op } = require("sequelize");

module.exports = {
  Post: async (req, res) => {
    try {
      let { content } = req.body;
      let image = "/img/" + req.files.image[0].fileName;
      let { title } = req.body;
      console.log(req.files);
      const rows = await Board.create({
        title: title,
        content: content,
        image: image,
      });
      if (rows) return res.status(200).json({ result: rows });
    } catch (err) {
      console.log(err);
    }
  },
  Delete: async (req, res) => {
    try {
      let { idx } = req.body;
      //console.log(idx);
      const rows = await Board.destroy({
        where: { idx: idx },
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
      let { title, n_title } = req.body;
      let { content, n_content } = req.body;
      // let image = "/img/" + req.files.image[0].filename;
      // let n_image = "/img/" + req.files.image[0].filename;
      const rows = await Board.update(
        {
          title: n_title,
          content: n_content,
          //image: n_image,
        },
        {
          where: {
            title: title,
            content: content,
            //image: image,
          },
        }
      );
      if (rows) return res.status(200);
      else {
        res.send(0);
      }
    } catch (err) {
      console.log(err);
    }
  },
  Updatcontent: async (req, res) => {
    try {
      let { content, n_content } = req.body;
      const rows = await Board.update(
        { content: n_content },
        {
          where: {
            content: content,
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
      let { title, n_title } = req.body;
      const rows = await Board.update(
        { title: n_title },
        {
          where: {
            title: title,
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
  // Updatimage: async (req, res) => {
  //   try {
  //     const obj = JSON.parse(JSON.stringify(req.files));
  //     console.log(JSON.parse(JSON.stringify(req.files)));
  //     var image;
  //     //let image = "/img/" + req.files.image[0].filename;
  //     //let n_image = "/img/" + req.files.image[0].filename;
  //     if (obj.image) {
  //       console.log("1");
  //       image = "/img/" + req.files.image[0].filename;
  //     } else {
  //       console.log("0");
  //       // image = req.body.image;
  //     }
  //     //let { image, n_image } = "/img/" + req.files.image[0].filename;
  //     //console.log(image);
  //     //let n_image = "/img/" + req.files.image[0].filename;
  //     const rows = await Board.update(
  //       { image: image },
  //       {
  //         where: {
  //           image: n_image,
  //         },
  //       }
  //     );
  //     if (rows) return res.status(200).json({ result: rows });
  //   } catch (err) {
  //     console.log(err);
  //   }
  // },
  // Deleteimage: async (req, res) => {
  //   try {
  //     let image = JSON.parse(
  //       JSON.stringify("/img/" + req.files.image[0].filename)
  //     );
  //     //console.log(idx);
  //     const rows = await Board.destroy(
  //       { image: image },
  //       {
  //         where: { image: image },
  //       }
  //     );
  //     if (rows) return res.status(200).json({ result: rows });
  //   } catch (err) {
  //     console.log(err);
  //   }
  // },
};
