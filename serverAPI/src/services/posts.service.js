const { readDb, writeDb } = require("../utils/files.util");
const { getCommentsByPostId } = require("./comments.service");

const RESOURCE = "posts";

const getAllPosts = async () => {
  const posts = await readDb(RESOURCE);

  if (!posts || posts.length === 0) throwError(404, "Không có bài viết nào!");

  return posts;
};

const getPostById = async (id) => {
  const posts = await readDb(RESOURCE);
  const post = posts.find((item) => item.id === id);
  return post;
};

const createPost = async (data) => {
  const posts = await readDb(RESOURCE);

  const newPost = {
    id: (posts[posts.length - 1]?.id ?? 0) + 1,
    title: data.title,
    content: data.content,
  };

  const updatePosts = [...posts, newPost];
  await writeDb(RESOURCE, updatePosts);

  return newPost;
};

const updatePost = async (id, data) => {
  const posts = await readDb(RESOURCE);
  const postIndex = posts.findIndex((item) => item.id === id);

  if (postIndex === -1) return null;

  const updatedPost = { ...posts[postIndex], ...data };
  const updatedPosts = [
    ...posts.slice(0, postIndex),
    updatedPost,
    ...posts.slice(postIndex + 1),
  ];

  await writeDb(RESOURCE, updatedPosts);

  return updatedPost;
};

const deletePost = async (id) => {
  const posts = await readDb(RESOURCE);

  const index = posts.findIndex((item) => item.id === +id);

  if (index !== -1) {
    posts.splice(index, 1);
    await writeDb(RESOURCE, posts);
  }

  return index >= 0;
};

module.exports = {
  getAllPosts,
  getPostById,
  createPost,
  updatePost,
  deletePost,
};
