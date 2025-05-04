const { readDb, writeDb } = require("../../utils/files.util");

const RESOURCE = "posts";

exports.getAllPosts = async (req, res) => {
  const posts = await readDb(RESOURCE);
  res.status(200).json({
    status: "success",
    data: posts,
  });
};

exports.getPostById = async (req, res) => {
  const id = Number(req.params.id);

  if (isNaN(id)) {
    return res.status(400).json({
      status: "error",
      message: "ID không hợp lệ",
    });
  }

  const posts = await readDb(RESOURCE);
  const post = posts.find((post) => post.id === id);

  if (!post) {
    res.status(404).json({
      status: "error",
      message: "Ko tìm thấy post",
    });
    return;
  }
  res.status(200).json({
    data: post,
  });
};

exports.createPost = async (req, res) => {
  const posts = await readDb(RESOURCE);

  const newPost = {
    id: (posts[posts.length - 1]?.id ?? 0) + 1,
    title: req.body.title,
    content: req.body.content,
  };

  posts.push(newPost);

  await writeDb(RESOURCE, posts);

  res.status(201).json({
    status: "success",
    data: newPost,
  });
};

exports.updatePost = async (req, res) => {
  const posts = await readDb(RESOURCE);

  const post = posts.find((item) => item.id === +req.params.id);

  if (!post) {
    res.json({
      status: "error",
      message: "Resource not found",
    });
    return;
  }

  post.title = req.body.title;
  post.content = req.body.content;
  await writeDb(RESOURCE, posts);

  res.status(200).json({
    status: "success",
    data: post,
  });
};

exports.deletePost = async (req, res) => {
  const posts = await readDb(RESOURCE);

  const index = posts.findIndex((item) => item.id === +req.params.id);

  if (index === -1) {
    res.json({
      status: "error",
      message: "Resource not found",
    });
    return;
  }

  posts.splice(index, 1);
  await writeDb(RESOURCE, posts);

  res.status(204).send();
};
