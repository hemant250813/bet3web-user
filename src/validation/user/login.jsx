import validator from "validator";

function validateLogin(data) {
  const errors = {};
  if (validator.isEmpty(data.user.trim()))
    errors.user = "Please enter the user.";
  if (validator.isEmpty(data.password.trim()))
    errors.password = "Please enter the password.";
  return { errors, isValid: Object.keys(errors).length <= 0 };
}

export default validateLogin;
