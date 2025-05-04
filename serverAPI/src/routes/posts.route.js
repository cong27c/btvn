const express = require("express");
const router = express.Router();
const postsControllers = require("../controllers/posts.controller");
const postValidator = require("../validators/posts.validator");

router.get("/", postsControllers.getAllPosts);

router.get("/:id", postsControllers.getPostById);

router.post("/", postValidator.createPost, postsControllers.createPost);

router.put("/:id", postValidator.updatePost, postsControllers.updatePost);
router.patch("/:id", postValidator.updatePost, postsControllers.updatePost);

router.delete("/:id", postsControllers.deletePost);

module.exports = router;
