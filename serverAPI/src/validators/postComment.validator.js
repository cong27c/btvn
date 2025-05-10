const { checkSchema } = require("express-validator");
const handleValidationErrors = require("./handleValidationErrors");

exports.createPostComment = [
  checkSchema({
    content: {
      errorMessage: "Trường nội dung không được để trống",
      notEmpty: true,
    },
    author: {
      errorMessage: "Trường tác giả không được để trống",
      notEmpty: true,
    },
  }),
  handleValidationErrors,
];

exports.updatePostComment = [
  checkSchema({
    content: {
      optional: true,
      notEmpty: true,
      errorMessage: "Trường nội dung không được để trống nếu được cập nhật",
    },
    author: {
      optional: true,
      notEmpty: true,
      errorMessage: "Trường tác giả không được để trống nếu được cập nhật",
    },
  }),
  handleValidationErrors,
];
