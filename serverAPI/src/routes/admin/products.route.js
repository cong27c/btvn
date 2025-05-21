const express = require("express");
const productsController = require("../../controllers/admin/products.controller");
const router = express.Router();

router.get("/", productsController.getAll);

module.exports = router;
