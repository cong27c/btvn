const usersModal = require("../models/users.model");
const { success } = require("../utils/response");

exports.getUsers = async (req, res) => {
  const users = await usersModal.getUsers();
  success(res, 200, users);
};

exports.getUser = async (req, res) => {
  const userOrId = req.params.id;
  const user = await usersModal.getUser({ id: userOrId, username: userOrId });

  success(res, 200, user);
};
