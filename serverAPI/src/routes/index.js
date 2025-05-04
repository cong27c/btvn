const express = require("express");
const router = express.Router();

const commentsRouter = require("./comments.route");

router.use("/comments", commentsRouter);

const postsRouter = require("./posts.route");

router.use("/posts", postsRouter);

const categoriesRouter = require("./categories.route");

router.use("/categories", categoriesRouter);

const productsRouter = require("./products.route");

router.use("/products", productsRouter);

const todosRouter = require("./todos.route");

router.use("/todos", todosRouter);

module.exports = router;
