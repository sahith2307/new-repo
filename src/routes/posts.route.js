const express = require("express");
const router = express.Router();
const postController = require("../controllers/posts.controller");
const auth = require("../middlewares/auth");
const { upload } = require("../middlewares/multerCloudnary");
const validate = require("../middlewares/validate");
const { createPost } = require("../validations/posts.validation");

router.use(auth());

router
  .route("/")
  .post(upload.single("image"), postController.uploadPost)
  .get(upload.single("image"), postController.getAllPosts);
module.exports = router;
