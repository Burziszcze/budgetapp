const Validator = require("validator");
const isEmpty = require("./is-empty");

module.exports = function validateBudgetSchema(data) {
  let errors = {};

  data.total = !isEmpty(data.total) ? data.total : "";
  data.title = !isEmpty(data.title) ? data.title : "";
  data.description = !isEmpty(data.description) ? data.description : "";
  data.price = !isEmpty(data.price) ? data.price : "";

  if (
    !Validator.isLength(data.title, {
      min: 3,
      max: 20
    })
  ) {
    errors.title = "title needs to between 3 and 20 characters";
  }

  if (
    Validator.isEmpty(data.description, {
      min: 4,
      max: 40
    })
  ) {
    errors.description = "description need to between 4 and 40 characters";
  }
  if (Validator.isEmpty(data.total)) {
    errors.total = "total field is required";
  }
  if (Validator.isEmpty(data.price)) {
    errors.price = "price field is required";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
