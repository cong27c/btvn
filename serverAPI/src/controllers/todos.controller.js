const { readDb, writeDb } = require("../../utils/files.util");
const RESOURCE = "todos";

exports.getAllTodos = async (req, res) => {
  const todos = await readDb(RESOURCE);
  res.status(200).json({
    status: "success",
    data: todos,
  });
};

exports.getTodoById = async (req, res) => {
  const id = Number(req.params.id);
  if (isNaN(id)) {
    return res.status(400).json({
      status: "error",
      message: "Id không hợp lệ",
    });
  }

  const todos = await readDb(RESOURCE);
  const todo = todos.find((item) => item.id === id);

  if (!todo) {
    return res.status(404).json({
      status: "error",
      message: "Không tìm thấy todo",
    });
  }

  res.status(200).json({ data: todo });
};

exports.createTodo = async (req, res) => {
  const todos = await readDb(RESOURCE);
  const newTodo = {
    id: (todos[todos.length - 1]?.id ?? 0) + 1,
    title: req.body.title,
    content: req.body.content,
  };

  todos.push(newTodo);
  await writeDb(RESOURCE, todos);

  res.status(201).json({
    status: "success",
    data: newTodo,
  });
};

exports.updateTodo = async (req, res) => {
  const id = Number(req.params.id);
  const todos = await readDb(RESOURCE);
  const todo = todos.find((item) => item.id === id);

  if (!todo) {
    return res.status(404).json({
      status: "error",
      message: "Không tìm thấy todo",
    });
  }

  todo.title = req.body.title;
  todo.content = req.body.content;

  await writeDb(RESOURCE, todos);

  res.status(200).json({
    status: "success",
    data: todo,
  });
};

exports.deleteTodo = async (req, res) => {
  const id = Number(req.params.id);
  const todos = await readDb(RESOURCE);
  const index = todos.findIndex((item) => item.id === id);

  if (index === -1) {
    return res.status(404).json({
      status: "error",
      message: "Không tìm thấy todo",
    });
  }

  todos.splice(index, 1);
  await writeDb(RESOURCE, todos);

  res.status(204).send();
};
