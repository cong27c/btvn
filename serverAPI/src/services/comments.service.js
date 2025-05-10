const { readDb, writeDb } = require("../utils/files.util");

const RESOURCE = "comments";

const getAllComments = async () => {
  const comments = await readDb(RESOURCE);
  return comments;
};

const getCommentById = async (id) => {
  const comments = await readDb(RESOURCE);
  const comment = comments.find((item) => item.id === id);
  return comment;
};

const createComment = async (data) => {
  const comments = await readDb(RESOURCE);
  const newComment = {
    ...data,
    id: (comments[comments.length - 1]?.id ?? 0) + 1,
  };
  const newComments = [...comments, newComment];

  await writeDb(RESOURCE, newComments);

  return newComment;
};

const updateComment = async (id, data) => {
  const comments = await readDb(RESOURCE);
  const commentIndex = comments.findIndex((item) => item.id === id);
  if (commentIndex === -1) return null;

  const updatedComment = { ...comments[commentIndex], ...data };
  const updatedComments = [
    ...comments.slice(0, commentIndex),
    updatedComment,
    ...comments.slice(commentIndex + 1),
  ];
  await writeDb(RESOURCE, updatedComments);

  return updatedComment;
};

const deleteComment = async (id) => {
  const comments = await readDb(RESOURCE);
  const index = comments.findIndex((item) => item.id === id);
  if (index === -1) return false;

  const newComments = comments.filter((item) => item.id !== id);
  await writeDb(RESOURCE, newComments);

  return true;
};

const getCommentsByPostId = async (postId) => {
  const comments = await readDb(RESOURCE);
  return comments.filter((comment) => comment.postId === postId);
};

module.exports = {
  getAllComments,
  getCommentById,
  createComment,
  updateComment,
  deleteComment,
  getCommentsByPostId,
};
