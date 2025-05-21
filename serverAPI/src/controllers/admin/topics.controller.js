const usersService = require("../../services/users.service");

exports.getAll = async (req, res) => {
  const users = await usersService.getAll();
  res.render("admin/topics", {
    title: "TOPICS PAGE",
    users,
  });
};
