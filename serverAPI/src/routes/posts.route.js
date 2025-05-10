const express = require("express");
const router = express.Router();
const postsController = require("../controllers/posts.controller");
const postValidator = require("../validators/posts.validator");
// Posts
router.get("/", postsController.getAllPosts);

router.get("/:id", postsController.getPostById);

router.post("/", postValidator.createPost, postsController.createPost);

router.put("/:id", postValidator.updatePost, postsController.updatePost);
router.patch("/:id", postValidator.updatePost, postsController.updatePost);

router.delete("/:id", postsController.deletePost);

module.exports = router;
