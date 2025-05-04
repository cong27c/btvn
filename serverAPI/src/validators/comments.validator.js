const { checkSchema } = require("express-validator");
const handleValidationErrors = require("./handleValidationErrors");

exports.createComments = [
  checkSchema({
    title: {
      errorMessage: "Trường này ko được để trống",
      notEmpty: true,
    },
    content: {
      errorMessage: "Trường này ko được để trống",
      notEmpty: true,
    },
  }),
  handleValidationErrors,
];

exports.updateComments = [
  checkSchema({
    title: {
      optional: true,
      notEmpty: true,
      errorMessage: "Trường này ko được để trống",
    },
    content: {
      optional: true,
      notEmpty: true,
      errorMessage: "Trường này ko được để trống",
    },
  }),
  handleValidationErrors,
];
