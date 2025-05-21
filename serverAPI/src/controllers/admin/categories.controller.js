const usersService = require("../../services/users.service");

exports.getAll = async (req, res) => {
  const users = await usersService.getAll();

  res.render("admin/categories", {
    title: "CATEGORIES PAGE",
    users,
  });
};
