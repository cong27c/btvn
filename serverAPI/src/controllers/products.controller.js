const { readDb, writeDb } = require("../../utils/files.util");
const RESOURCE = "products";

exports.getAllProducts = async (req, res) => {
  const products = await readDb(RESOURCE);
  res.status(200).json({
    status: "success",
    data: products,
  });
};

exports.getProductById = async (req, res) => {
  const id = Number(req.params.id);
  if (isNaN(id)) {
    return res
      .status(400)
      .json({ status: "error", message: "Id không hợp lệ" });
  }

  const products = await readDb(RESOURCE);
  const product = products.find((item) => item.id === id);

  if (!product) {
    return res.status(404).json({
      status: "error",
      message: "Không tìm thấy sản phẩm",
    });
  }

  res.status(200).json({ data: product });
};

exports.createProduct = async (req, res) => {
  const products = await readDb(RESOURCE);
  const newProduct = {
    id: (products[products.length - 1]?.id ?? 0) + 1,
    title: req.body.title,
    content: req.body.content,
  };

  products.push(newProduct);
  await writeDb(RESOURCE, products);

  res.status(201).json({
    status: "success",
    data: newProduct,
  });
};

exports.updateProduct = async (req, res) => {
  const id = Number(req.params.id);
  const products = await readDb(RESOURCE);
  const product = products.find((item) => item.id === id);

  if (!product) {
    return res.status(404).json({
      status: "error",
      message: "Không tìm thấy sản phẩm",
    });
  }

  product.title = req.body.title;
  product.content = req.body.content;

  await writeDb(RESOURCE, products);

  res.status(200).json({
    status: "success",
    data: product,
  });
};

// DELETE /products/:id
exports.deleteProduct = async (req, res) => {
  const id = Number(req.params.id);
  const products = await readDb(RESOURCE);
  const index = products.findIndex((item) => item.id === id);

  if (index === -1) {
    return res.status(404).json({
      status: "error",
      message: "Không tìm thấy sản phẩm",
    });
  }

  products.splice(index, 1);
  await writeDb(RESOURCE, products);

  res.status(204).send();
};
