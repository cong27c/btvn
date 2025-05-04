const express = require("express");
const fs = require("fs").promises;

const DB_FILE = "./db.json";
const RESOURCE = "comments";

async function readDb(resource) {
  try {
    const jsonDb = await fs.readFile(DB_FILE, "utf-8");
    return JSON.parse(jsonDb)[resource] ?? [];
  } catch (error) {
    return [];
  }
}
async function writeDb(resource, data) {
  let db = {};
  try {
    const jsonDb = await fs.readFile(DB_FILE, "utf-8");
    db = JSON.parse(jsonDb);
  } catch (error) {}

  db[resource] = data;
  await fs.writeFile(DB_FILE, JSON.stringify(db, null, 2));
}

exports.getAllComments = async (req, res) => {
  const comments = await readDb(RESOURCE);
  res.json({
    status: "success",
    data: comments,
  });
};

exports.getCommentById = async (req, res) => {
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
};

exports.createComment = async (req, res) => {
  const comments = await readDb(RESOURCE);

  const newComment = {
    id: (comments[comments.length - 1]?.id ?? 0) + 1,
    title: req.body.title,
    content: req.body.content,
  };

  comments.push(newComment);

  await writeDb(RESOURCE, comments);

  res.status(201).json({
    status: "success",
    data: newComment,
  });
};

exports.updateComment = async (req, res) => {
  const comments = await readDb(RESOURCE);

  const comment = comments.find((item) => item.id === +req.params.id);

  if (!comment) {
    res.status(404).json({
      status: "error",
      message: "Resource not found",
    });
    return;
  }

  comment.title = req.body.title;
  comment.content = req.body.content;
  await writeDb(RESOURCE, comments);
  res.status(200).json({
    status: "success",
    data: comment,
  });
};

exports.deleteComment = async (req, res) => {
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
};
