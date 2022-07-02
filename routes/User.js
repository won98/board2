const express = require("express");
//const { createToken, creatRefreshToken } = require("../utils/jwt");
const { UserController: controller } = require("../controller");
const { Check } = require("../middleware/isAuth");
//const { checkToken } = require("../middleware/isAuth");
//const jwt = require("jsonwebtoken");
//const { authUtil } = require("../middleware/authJWT");
const router = express.Router();

router.post("/signup", controller.Signup);
router.post("/login", controller.Login);
router.post("/emailcheck", controller.Checkemail);
router.post("/idcheck", controller.Checkid);
router.get("/list", controller.List);
router.get("/check", Check);
//router.get("/profile", checkToken);
module.exports = router;
