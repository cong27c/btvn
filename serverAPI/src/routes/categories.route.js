const express = require("express");
const router = express.Router();
const categoriesController = require("../controllers/categories.controller");
const categoryValidator = require("../validators/categories.validator");

router.get("/", categoriesController.getAllCategories);

router.get("/:id", categoriesController.getCategoryById);

router.post(
  "/",
  categoryValidator.createCategory,
  categoriesController.createCategory
);

router.put(
  "/:id",
  categoryValidator.updateCategory,
  categoriesController.updateCategory
);

router.patch(
  "/:id",
  categoryValidator.updateCategory,
  categoriesController.updateCategory
);

router.delete("/:id", categoriesController.deleteCategory);

module.exports = router;
