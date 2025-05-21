const usersService = require("../../services/users.service");

exports.getAll = async (req, res) => {
  const users = await usersService.getAll();

  res.render("admin/comments", {
    title: "COMMENTS PAGE",
    users,
  });
};
