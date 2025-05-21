const usersService = require("../../services/users.service");

exports.getAll = async (req, res) => {
  const users = await usersService.getAll();
  res.render("admin/auth/login", {
    title: "LOGIN PAGE",
    users,
    layout: "./admin/layouts/auth/index.ejs",
  });
};
