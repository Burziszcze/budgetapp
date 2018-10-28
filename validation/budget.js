const Validator = require("validator");
const isEmpty = require("./is-empty");

module.exports = function validateBudgetSchema(data) {
  let errors = {};

  data.name = !isEmpty(data.name) ? data.name : "";

  if (
    !Validator.isLength(data.name, {
      min: 3,
      max: 20
    })
  ) {
    errors.name = "Budget name needs to between 3 and 20 characters";
  }

  if (Validator.isEmpty(data.name)) {
    errors.name = "Budget name is required";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
