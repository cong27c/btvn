const express = require("express");
const router = express.Router();
const postCommentsController = require("../controllers/postComments.controller");
const postCommentsValidator = require("../validators/postComment.validator");

router.get("/:id/comments", postCommentsController.getPostComments);
router.post(
  "/:id/comments",
  postCommentsValidator.createPostComment,
  postCommentsController.createPostComment
);

router.put(
  "/:postId/comments/:commentId",
  postCommentsValidator.updatePostComment,
  postCommentsController.updatePostComment
);
router.patch(
  "/:postId/comments/:commentId",
  postCommentsValidator.updatePostComment,
  postCommentsController.updatePostComment
);

router.delete(
  "/:postId/comments/:commentId",
  postCommentsController.deletePostComment
);

module.exports = router;
