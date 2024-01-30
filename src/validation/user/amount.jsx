import validator from "validator";

function validateAmount(data) {
  const errors = {};
  if (validator.isEmpty(data.amount.trim()))
    errors.amount = "Please enter the amount.";
  return { errors, isValid: Object.keys(errors).length <= 0 };
}

export default validateAmount;
