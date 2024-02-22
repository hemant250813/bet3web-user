import validator from "validator";

function validateWithdraw(data) {
  const errors = {};
  if (data.amount === 0) errors.amount = "Please enter the amount.";
  if (validator.isEmpty(data.remark.trim()))
    errors.remark = "Please enter the remarks.";
  if (validator.isEmpty(data.password.trim()))
    errors.password = "Please enter the password.";
  return { errors, isValid: Object.keys(errors).length <= 0 };
}

export default validateWithdraw;
