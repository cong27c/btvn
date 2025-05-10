const postsServices = require("./posts.service");
const commentsServices = require("./comments.service");
const { throwError } = require("../utils/throwError");

const getPostComments = async (postId) => {
  const post = await postsServices.getPostById(postId);

  if (!post) throwError(404, "not Found!");

  const comments = await commentsServices.getCommentsByPostId(post.id);

  return comments;
};

const createPostComment = async (postId, data) => {
  const post = await postsServices.getPostById(postId);

  if (!post) throwError(404, "Not found.");

  const newComment = await commentsServices.createComment({
    postId: post.id,
    content: data.content,
    author: data.author,
  });

  return newComment;
};

const updatePostComment = async (commentId, data) => {
  const comment = await commentsServices.getCommentById(commentId);

  if (!comment) throwError(404, "Not found.");

  const updatedComment = await commentsServices.updateComment(commentId, data);
  return updatedComment;
};

const deletePostComment = async (commentId) => {
  const comment = await commentsServices.getCommentById(commentId);

  if (!comment) throwError(404, "Not found.");

  await commentsServices.deleteComment(commentId);
};

module.exports = {
  getPostComments,
  createPostComment,
  updatePostComment,
  deletePostComment,
};
