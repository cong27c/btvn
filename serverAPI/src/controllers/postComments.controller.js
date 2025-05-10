const { success } = require("../utils/response");
const postCommentsServices = require("../services/postComments.service");

exports.getPostComments = async (req, res) => {
  const id = Number(req.params.id);

  const comments = await postCommentsServices.getPostComments(id);

  success(res, 200, comments);
};

exports.createPostComment = async (req, res) => {
  const id = Number(req.params.id);

  const newComment = await postCommentsServices.createPostComment(id, req.body);

  success(res, 201, newComment);
};

exports.updatePostComment = async (req, res) => {
  const commentId = Number(req.params.commentId);

  const updatedComment = await postCommentsServices.updatePostComment(
    commentId,
    req.body
  );

  success(res, 200, updatedComment);
};

exports.deletePostComment = async (req, res) => {
  const commentId = Number(req.params.commentId);

  await postCommentsServices.deletePostComment(commentId);

  return res.status(204).send();
};
