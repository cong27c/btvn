const { checkSchema } = require("express-validator");
const handleValidationErrors = require("./handleValidationErrors");

exports.createProduct = [
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

exports.updateProduct = [
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
