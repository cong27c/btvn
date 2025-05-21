const express = require("express");
const registerController = require("../../controllers/admin/showRegisterForm.controller");
const router = express.Router();

router.get("/", registerController.getAll);

module.exports = router;
