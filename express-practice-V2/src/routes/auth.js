const express = require("express");
const { authController } = require("../controllers");
const router = express.Router();

router.post("/", authController.registerUser)
router.get("/", authController.loginUser)

module.exports = router;