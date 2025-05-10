const { readDb, writeDb } = require("../utils/files.util");

const RESOURCE = "categories";

const getAllCategories = async () => {
  const categories = await readDb(RESOURCE);
  return categories;
};

const getCategoryById = async (id) => {
  const categories = await readDb(RESOURCE);
  const category = categories.find((item) => item.id === id);
  return category;
};

const createCategory = async (data) => {
  const categories = await readDb(RESOURCE);
  const newCategory = {
    id: (categories[categories.length - 1]?.id ?? 0) + 1,
    title: data.title,
    content: data.content,
  };
  const newCategories = [...categories, newCategory];

  await writeDb(RESOURCE, newCategories);

  return newCategory;
};

const updateCategory = async (id, data) => {
  const categories = await readDb(RESOURCE);
  let categoryIndex = categories.findIndex((item) => item.id === id);
  if (categoryIndex === -1) return null;
  const updatedCategory = { ...categories[categoryIndex], ...data };
  const updatedCategories = [
    ...categories.slice(0, categoryIndex),
    updatedCategory,
    ...categories.slice(categoryIndex + 1),
  ];
  await writeDb(RESOURCE, updatedCategories);

  return updatedCategory;
};

const deleteCategory = async (id) => {
  const categories = await readDb(RESOURCE);
  const index = categories.findIndex((item) => item.id === id);

  if (index !== -1) {
    const newCategories = categories.filter((item) => item.id !== id);
    await writeDb(RESOURCE, newCategories);
  }

  return index >= 0;
};

module.exports = {
  getAllCategories,
  getCategoryById,
  createCategory,
  updateCategory,
  deleteCategory,
};
