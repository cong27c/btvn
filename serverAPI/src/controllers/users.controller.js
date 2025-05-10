const usersModal = require("../models/users.model");
const { success } = require("../utils/response");

exports.getUsers = async (req, res) => {
  const users = await usersModal.getUsers();
  success(res, 200, users);
};
