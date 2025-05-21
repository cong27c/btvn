const express = require("express");
const loginController = require("../../controllers/admin/showLoginForm.controller");
const router = express.Router();

router.get("/", loginController.getAll);

module.exports = router;
