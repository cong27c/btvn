const express = require("express");
const router = express.Router();
const productsController = require("../controllers/products.controller");
const productValidator = require("../validators/products.validator");

router.get("/", productsController.getAllProducts);

router.get("/:id", productsController.getProductById);

router.post(
  "/",
  productValidator.createProduct,
  productsController.createProduct
);

router.put(
  "/:id",
  productValidator.updateProduct,
  productsController.updateProduct
);
router.put(
  "/:id",
  productValidator.updateProduct,
  productsController.updateProduct
);

router.delete("/:id", productsController.deleteProduct);

module.exports = router;
