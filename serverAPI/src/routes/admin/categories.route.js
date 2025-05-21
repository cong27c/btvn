const express = require("express");
const categoriesController = require("../../controllers/admin/categories.controller");
const router = express.Router();

router.get("/", categoriesController.getAll);

module.exports = router;
