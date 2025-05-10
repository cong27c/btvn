const { success } = require("../utils/response");
const categoryServices = require("../services/categories.service");
const throwError = require("../utils/throwError");

exports.getAllCategories = async (req, res) => {
  const categories = await categoryServices.getAllCategories();
  return success(res, 200, categories);
};

exports.getCategoryById = async (req, res) => {
  const id = Number(req.params.id);
  if (isNaN(id)) throwError(400, "ID không hợp lệ");

  const category = await categoryServices.getCategoryById(id);
  if (!category) throwError(404, "Không tìm thấy category");

  return success(res, 200, category);
};

exports.createCategory = async (req, res) => {
  const newCategory = await categoryServices.createCategory(req.body);
  return success(res, 201, newCategory);
};

exports.updateCategory = async (req, res) => {
  const id = Number(req.params.id);
  if (isNaN(id)) throwError(400, "ID không hợp lệ");

  const updatedCategory = await categoryServices.updateCategory(id, req.body);
  if (!updatedCategory) throwError(404, "Không tìm thấy category");

  return success(res, 200, updatedCategory);
};

exports.deleteCategory = async (req, res) => {
  const id = Number(req.params.id);
  if (isNaN(id)) throwError(400, "ID không hợp lệ");

  const deleted = await categoryServices.deleteCategory(id);
  if (!deleted) throwError(404, "Không tìm thấy category");

  return res.status(204).send();
};
