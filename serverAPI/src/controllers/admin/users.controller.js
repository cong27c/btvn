const usersService = require("../../services/users.service");

exports.getAll = async (req, res) => {
  const users = await usersService.getAll();

  res.render("admin/users", {
    title: "USERS PAGE",
    users,
  });
};
