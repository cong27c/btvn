const postsService = require("../../services/posts.service");

exports.getAll = async (req, res) => {
  const { page = 1, limit = 10 } = req.query;
  const data = await postsService.getPaginatedPosts(page, limit);

  res.render("admin/dashboard/index", {
    title: "POST LIST TITLE",
    posts: data,
  });
};
