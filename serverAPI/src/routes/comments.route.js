const express = require("express");
const router = express.Router();
const commentsControllers = require("../controllers/comments.controller");
const commentsValidator = require("../validators/comments.validator");

router.get("/", commentsControllers.getAllComments);

router.get("/:id", commentsControllers.getCommentById);

router.post(
  "/",
  commentsValidator.createComments,
  commentsControllers.createComment
);

router.put(
  "/:id",
  commentsValidator.updateComments,
  commentsControllers.updateComment
);
router.patch(
  "/:id",
  commentsValidator.updateComments,
  commentsControllers.updateComment
);

router.delete("/:id", commentsControllers.deleteComment);

module.exports = router;
