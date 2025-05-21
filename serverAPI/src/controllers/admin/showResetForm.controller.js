const usersService = require("../../services/users.service");

exports.getAll = async (req, res) => {
  const users = await usersService.getAll();

  res.render("admin/auth/reset-password.ejs", {
    title: "LOGIN PAGE",
    users,
    layout: "./admin/layouts/auth/index.ejs",
  });
};
