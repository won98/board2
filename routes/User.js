const express = require("express");
const { createToken, creatRefreshToken } = require("../utils/jwt");
const { UserController: controller } = require("../controller");
const router = express.Router();

router.post("/signup", controller.Signup);
router.post("/login", controller.Login);
router.post("/emailcheck", controller.Checkemail);
router.post("/idcheck", controller.Checkid);
router.get("/list", controller.List);
module.exports = router;
