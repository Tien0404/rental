const express = require("express");
const router = express.Router();
const googleController = require("../controllers/google.controller");

// Route để bắt đầu quá trình xác thực Google
router.get("/auth/google", googleController.googleAuth);

// Route callback từ Google sau khi xác thực
router.get("/auth/google/callback", googleController.googleCallback);

module.exports = router;
