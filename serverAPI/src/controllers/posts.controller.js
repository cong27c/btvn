const { success } = require("../utils/response");
const postsServices = require("../services/posts.service");
const throwError = require("../utils/throwError");

exports.getAllPosts = async (req, res) => {
  const posts = await postsServices.getAllPosts();
  return success(res, 200, posts);
};

exports.getPostById = async (req, res) => {
  const id = Number(req.params.id);
  if (isNaN(id)) throwError(404, "ID không hợp lệ");

  const post = await postsServices.getPostById(id);
  if (!post) throwError(404, "Not found.");

  return success(res, 200, post);
};

exports.createPost = async (req, res) => {
  const newPost = await postsServices.createPost(req.body);
  return success(res, 201, newPost);
};

exports.updatePost = async (req, res) => {
  const id = Number(req.params.id);
  if (isNaN(id)) throwError(404, "ID không hợp lệ");

  const updatedPost = await postsServices.updatePost(id, req.body);
  if (!updatedPost) throwError(404, "Not found.");

  return success(res, 200, updatedPost);
};

exports.deletePost = async (req, res) => {
  const id = Number(req.params.id);
  if (isNaN(id)) throwError(404, "ID không hợp lệ");

  const deleted = await postsServices.deletePost(id);
  if (!deleted) throwError(404, "Not found.");

  return res.status(204).send();
};
