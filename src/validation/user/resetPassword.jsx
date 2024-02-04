import validator from "validator";

function validateResetPassword(data) {
  const errors = {};
  if (validator.isEmpty(data.password.trim()))
    errors.password = "Please enter the password.";
    if (validator.isEmpty(data.confirm_password.trim()))
    errors.confirm_password = "Please enter the confirm password.";
  return { errors, isValid: Object.keys(errors).length <= 0 };
}

export default validateResetPassword;
