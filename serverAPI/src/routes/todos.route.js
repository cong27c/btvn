const express = require("express");
const router = express.Router();
const todosController = require("../controllers/todos.controller");
const todoValidator = require("../validators/todos.validator");

router.get("/", todosController.getAllTodos);

router.get("/:id", todosController.getTodoById);

router.post("/", todoValidator.createTodo, todosController.createTodo);

router.put("/:id", todoValidator.updateTodo, todosController.updateTodo);
router.patch("/:id", todoValidator.updateTodo, todosController.updateTodo);

router.delete("/:id", todosController.deleteTodo);

module.exports = router;
