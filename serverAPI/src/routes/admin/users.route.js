const express = require("express");
const usersController = require("../../controllers/admin/users.controller");
const router = express.Router();

router.get("/", usersController.getAll);

module.exports = router;
