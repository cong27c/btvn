const express = require("express");
const router = express.Router();

const commentsRouter = require("./comments.routes");

router.use("/comments", commentsRouter);

const postsRouter = require("./posts.routes");

router.use("/posts", postsRouter);

module.exports = router;
