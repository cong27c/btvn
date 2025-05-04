const { readDb, writeDb } = require("../../utils/files.util");
const RESOURCE = "categories";

exports.getAllCategories = async (req, res) => {
  const categories = await readDb(RESOURCE);
  res.status(200).json({
    status: "success",
    data: categories,
  });
};

exports.getCategoryById = async (req, res) => {
  const id = Number(req.params.id);
  if (isNaN(id)) {
    return res.status(400).json({ status: "error", message: "Id ko hợp lệ" });
  }

  const categories = await readDb(RESOURCE);
  const category = categories.find((item) => item.id === id);

  if (!category) {
    return res
      .status(404)
      .json({ status: "error", message: "Ko tìm thấy category" });
  }

  res.status(200).json({ data: category });
};

exports.createCategory = async (req, res) => {
  const categories = await readDb(RESOURCE);
  const newCategory = {
    id: (categories[categories.length - 1]?.id ?? 0) + 1,
    title: req.body.title,
    content: req.body.content,
  };

  categories.push(newCategory);
  await writeDb(RESOURCE, categories);

  res.status(201).json({
    status: "success",
    data: newCategory,
  });
};

exports.updateCategory = async (req, res) => {
  const id = Number(req.params.id);
  const categories = await readDb(RESOURCE);
  const category = categories.find((item) => item.id === id);

  if (!category) {
    return res
      .status(404)
      .json({ status: "error", message: "Ko tìm thấy category" });
  }

  category.title = req.body.title;
  category.content = req.body.content;
  await writeDb(RESOURCE, categories);

  res.status(200).json({
    status: "success",
    data: category,
  });
};

exports.deleteCategory = async (req, res) => {
  const id = Number(req.params.id);
  const categories = await readDb(RESOURCE);
  const index = categories.findIndex((item) => item.id === id);

  if (index === -1) {
    return res
      .status(404)
      .json({ status: "error", message: "Ko tìm thấy category" });
  }

  categories.splice(index, 1);
  await writeDb(RESOURCE, categories);

  res.status(204).send();
};
