const { readDb, writeDb } = require("../utils/files.util");

const RESOURCE = "products";

const getAllProducts = async () => {
  const products = await readDb(RESOURCE);
  return products;
};

const getProductById = async (id) => {
  const products = await readDb(RESOURCE);
  const product = products.find((item) => item.id === id);
  return product;
};

const createProduct = async (data) => {
  const products = await readDb(RESOURCE);
  const newProduct = {
    id: (products[products.length - 1]?.id ?? 0) + 1,
    title: data.title,
    content: data.content,
  };
  const newProducts = [...products, newProduct];

  await writeDb(RESOURCE, newProducts);

  return newProduct;
};

const updateProduct = async (id, data) => {
  const products = await readDb(RESOURCE);
  const productIndex = products.findIndex((item) => item.id === id);
  if (productIndex === -1) return null;

  const updatedProduct = { ...products[productIndex], ...data };
  const updatedProducts = [
    ...products.slice(0, productIndex),
    updatedProduct,
    ...products.slice(productIndex + 1),
  ];

  await writeDb(RESOURCE, updatedProducts);

  return updatedProduct;
};

const deleteProduct = async (id) => {
  const products = await readDb(RESOURCE);
  const index = products.findIndex((item) => item.id === id);

  if (index !== -1) {
    const newProducts = products.filter((item) => item.id !== id);
    await writeDb(RESOURCE, newProducts);
  }

  return index >= 0;
};

module.exports = {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
};
