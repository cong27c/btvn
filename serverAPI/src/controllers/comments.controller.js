const { success } = require("../utils/response");
const commentServices = require("../services/comments.service");
const throwError = require("../utils/throwError");

exports.getAllComments = async (req, res) => {
  const comments = await commentServices.getAllComments();
  return success(res, 200, comments);
};

exports.getCommentById = async (req, res) => {
  const id = Number(req.params.id);
  if (isNaN(id)) throwError(400, "ID không hợp lệ");

  const comment = await commentServices.getCommentById(id);
  if (!comment) throwError(404, "Không tìm thấy comment");

  return success(res, 200, comment);
};

exports.createComment = async (req, res) => {
  const newComment = await commentServices.createComment(req.body);
  return success(res, 201, newComment);
};

exports.updateComment = async (req, res) => {
  const id = Number(req.params.id);
  if (isNaN(id)) throwError(400, "ID không hợp lệ");

  const updatedComment = await commentServices.updateComment(id, req.body);
  if (!updatedComment) throwError(404, "Không tìm thấy comment");

  return success(res, 200, updatedComment);
};

exports.deleteComment = async (req, res) => {
  const id = Number(req.params.id);
  if (isNaN(id)) throwError(400, "ID không hợp lệ");

  const deleted = await commentServices.deleteComment(id);
  if (!deleted) throwError(404, "Không tìm thấy comment");

  return res.status(204).send();
};
