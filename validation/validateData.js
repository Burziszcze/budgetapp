const Validator = require("validator");
const isEmpty = require("./is-empty");

module.exports = function validateDataInput(data) {
  let errors = {};

  // data.total = !isEmpty(data.total) ? data.total : "";
  data.description = !isEmpty(data.description) ? data.description : "";
  data.value = !isEmpty(data.value) ? data.value : "";

  // if (Validator.isEmpty(data.total)) {
  //   errors.total = "Job total field is required";
  // }

  if (Validator.isEmpty(data.description)) {
    errors.description = "description field is required";
  }

  if (Validator.isEmpty(data.value)) {
    errors.value = "value field is required";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
