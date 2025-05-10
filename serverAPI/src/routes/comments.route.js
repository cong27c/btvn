const express = require("express");
const router = express.Router();
const commentsControllers = require("../controllers/comments.controller");
const commentsValidator = require("../validators/comments.validator");

router.get("/", commentsControllers.getAllComments);

router.get("/:id", commentsControllers.getCommentById);

router.post(
  "/",
  commentsValidator.createComment,
  commentsControllers.createComment
);

router.put(
  "/:id",
  commentsValidator.updateComment,
  commentsControllers.updateComment
);

router.patch(
  "/:id",
  commentsValidator.updateComment,
  commentsControllers.updateComment
);

router.put("/:postId/comments/:commentId", commentsControllers.updateComment);
router.patch("/:postId/comments/:commentId", commentsControllers.updateComment);

router.delete("/:postId/comments/:comments", commentsControllers.deleteComment);

module.exports = router;
