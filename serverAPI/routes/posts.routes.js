const express = require("express");
const { readDb, writeDb } = require("../utils/files.util");
const router = express.Router();

const RESOURCE = "posts";

router.get("/", async (req, res) => {
  const posts = await readDb(RESOURCE);
  res.status(200).json({
    status: "success",
    data: posts,
  });
});

router.get("/:id", async (req, res) => {
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
      message: "lỗi rồi :((",
    });
    return;
  }
  res.status(200).json({
    data: post,
  });
});

router.post("/", async (req, res) => {
  const posts = await readDb(RESOURCE);

  const newPost = {
    id: (posts[posts.length - 1]?.id ?? 0) + 1,
    post: req.body.post,
  };

  posts.push(newPost);

  await writeDb(RESOURCE, posts);

  res.status(201).json({
    status: "success",
    data: newPost,
  });
});

router.put("/:id", async (req, res) => {
  const posts = await readDb(RESOURCE);

  const post = posts.find((item) => item.id === +req.params.id);

  if (!post) {
    res.json({
      status: "error",
      message: "Resource not found",
    });
    return;
  }

  post.post = req.body.post;
  await writeDb(RESOURCE, posts);

  res.status(200).json({
    status: "success",
    data: post,
  });
});

router.delete("/:id", async (req, res) => {
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
});

module.exports = router;
