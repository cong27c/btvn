const postsService = require("../../services/posts.service");

exports.getAll = async (req, res) => {
  const { page = 1, limit = 10 } = req.query;
  const data = await postsService.getPaginatedPosts(page, limit);

  res.render("admin/posts/index", {
    title: "POST LIST TITLE",
    posts: data,
  });
};

exports.getById = async (req, res) => {
  const id = Number(req.params.id);
  const data = await postsService.getById(id);
  res.render("admin/posts/show", {
    title: "POST DETAIL",
    post: data,
  });
};
