const express = require("express");
const postsController = require("../../controllers/admin/posts.controller");
const router = express.Router();

router.get("/", postsController.getAll);
router.get("/:id", postsController.getById);

module.exports = router;
