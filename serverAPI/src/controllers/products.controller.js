const { success } = require("../utils/response");
const productServices = require("../services/products.service");
const throwError = require("../utils/throwError");

exports.getAllProducts = async (req, res) => {
  const products = await productServices.getAllProducts();
  return success(res, 200, products);
};

exports.getProductById = async (req, res) => {
  const id = Number(req.params.id);
  if (isNaN(id)) throwError(404, "ID không hợp lệ");

  const product = await productServices.getProductById(id);
  if (!product) throwError(404, "Không tìm thấy sản phẩm");

  return success(res, 200, product);
};

exports.createProduct = async (req, res) => {
  const newProduct = await productServices.createProduct(req.body);
  return success(res, 201, newProduct);
};

exports.updateProduct = async (req, res) => {
  const id = Number(req.params.id);
  if (isNaN(id)) throwError(404, "ID không hợp lệ");

  const updatedProduct = await productServices.updateProduct(id, req.body);
  if (!updatedProduct) throwError(404, "Không tìm thấy sản phẩm");

  return success(res, 200, updatedProduct);
};

exports.deleteProduct = async (req, res) => {
  const id = Number(req.params.id);
  if (isNaN(id)) throwError(404, "ID không hợp lệ");

  const deleted = await productServices.deleteProduct(id);
  if (!deleted) throwError(404, "Không tìm thấy sản phẩm");

  return res.status(204).send();
};
