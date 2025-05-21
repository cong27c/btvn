const usersService = require("../../services/users.service");

exports.getAll = async (req, res) => {
  const users = await usersService.getAll();
  res.render("admin/auth/register", {
    title: "REGISTER PAGE",
    users,
    layout: "./admin/layouts/auth/index.ejs",
  });
};
