const usersService = require("../../services/users.service");

exports.getAll = async (req, res) => {
  const users = await usersService.getAll();

  res.render("admin/dashboard", {
    title: "DASHBOARD PAGE",
    users,
  });
};
