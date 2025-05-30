const express = require("express");
const router = express.Router();
const postController = require("../controllers/post.controller");
const {
  protect,
  authorize,
  authenticateToken,
} = require("../middlewares/auth.middleware");
const multer = require("multer");

const upload = multer({ dest: "uploads/" });
router.get("/checkToken", authenticateToken, (req, res) => {
  res.status(200).json({ message: "Token hợp lệ" });
});

// Các route cho bài đăng
router.get("/", postController.getAllPosts);
router.get("/search", postController.searchPosts);
router.post("/", protect, upload.array("images"), postController.createPost);
router.get("/:id", postController.getPostById);
router.put("/:id", protect, upload.array("images"), postController.updatePost);
router.delete("/:id", protect, postController.deletePost);
router.get("/user/:id", protect, postController.getUserPosts);

module.exports = router;
