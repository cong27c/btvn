const express = require("express");
const { readDb, writeDb } = require("../utils/files.util");
const router = express.Router();

const RESOURCE = "comments";

router.get("/", async (req, res) => {
  const comments = await readDb(RESOURCE);
  res.json({
    status: "success",
    data: comments,
  });
});

module.exports = router;

router.get("/:id", async (req, res) => {
  const comments = await readDb(RESOURCE);
  const comment = comments.find((item) => item.id === +req.params.id);

  if (!comment) {
    res.status(404).json({
      status: "error",
      message: "Resource not found",
    });
    return;
  }

  res.status(200).json({
    data: comment,
  });
});

router.post("/", async (req, res) => {
  const comments = await readDb(RESOURCE);

  const newComment = {
    id: (comments[comments.length - 1]?.id ?? 0) + 1,
    comment: req.body.comment,
  };

  comments.push(newComment);

  await writeDb(RESOURCE, comments);

  res.status(201).json({
    status: "success",
    data: newComment,
  });
});

router.put("/:id", async (req, res) => {
  const comments = await readDb(RESOURCE);

  const comment = comments.find((item) => item.id === +req.params.id);

  if (!comment) {
    res.status(404).json({
      status: "error",
      message: "Resource not found",
    });
    return;
  }

  comment.comment = req.body.comment;

  res.status(200).json({
    status: "success",
    data: comment,
  });
});

router.delete("/:id", async (req, res) => {
  const comments = await readDb(RESOURCE);

  const index = comments.findIndex((item) => item.id === +req.params.id);

  if (index === -1) {
    res.json({
      status: "error",
      message: "Resource not found",
    });
    return;
  }

  comments.splice(index, 1);

  res.status(204).send();
});
