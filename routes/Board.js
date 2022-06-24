const express = require("express");
const multer = require("multer");
const upload = multer({ dest: "uploads/" });
const { BoardController: controller } = require("../controller");
const router = express.Router();

router.post("/post", upload.fields([{ name: "image" }]), controller.Post);
router.post("/search", controller.Search);
router.post("/delete", controller.Delete);
router.post("/update", controller.Update);
router.get("/get", controller.Get);
router.post("/updatecontent", controller.Updatcontent);
router.post("/updatetitle", controller.Updatetitle);
//router.post("/deleteimage", controller.Deleteimage);
module.exports = router;
