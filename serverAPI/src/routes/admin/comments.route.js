const express = require("express");
const commentsController = require("../../controllers/admin/comments.controller");
const router = express.Router();

router.get("/", commentsController.getAll);

module.exports = router;
