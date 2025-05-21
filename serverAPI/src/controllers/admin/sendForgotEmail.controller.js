const usersService = require("../../services/users.service");

exports.getAll = async (req, res) => {
  const users = await usersService.getAll();
  res.render("admin/auth/forgot-password.ejs", {
    title: "FORGOT-PASSWORD PAGE",
    users,
    layout: "./admin/layouts/auth/index.ejs",
  });
};
