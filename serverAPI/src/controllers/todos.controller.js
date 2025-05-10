const { success } = require("../utils/response");
const todoServices = require("../services/todos.service");
const throwError = require("../utils/throwError");

exports.getAllTodos = async (req, res) => {
  const todos = await todoServices.getAllTodos();
  return success(res, 200, todos);
};

exports.getTodoById = async (req, res) => {
  const id = Number(req.params.id);
  if (isNaN(id)) throwError(404, "ID không hợp lệ");

  const todo = await todoServices.getTodoById(id);
  if (!todo) throwError(404, "Không tìm thấy công việc");

  return success(res, 200, todo);
};

exports.createTodo = async (req, res) => {
  const newTodo = await todoServices.createTodo(req.body);
  return success(res, 201, newTodo);
};

exports.updateTodo = async (req, res) => {
  const id = Number(req.params.id);
  if (isNaN(id)) throwError(404, "ID không hợp lệ");

  const updatedTodo = await todoServices.updateTodo(id, req.body);
  if (!updatedTodo) throwError(404, "Không tìm thấy công việc");

  return success(res, 200, updatedTodo);
};

exports.deleteTodo = async (req, res) => {
  const id = Number(req.params.id);
  if (isNaN(id)) throwError(404, "ID không hợp lệ");

  const deleted = await todoServices.deleteTodo(id);
  if (!deleted) throwError(404, "Không tìm thấy công việc");

  return res.status(204).send();
};
