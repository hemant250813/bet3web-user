import validator from "validator";

function validateLogin(data) {
  const errors = {};
  if (validator.isEmpty(data.email.trim()))
    errors.email = "Please enter the valid email ID.";
  else if (!validator.isEmail(data.email))
    errors.email = "Please enter the email.";
  if (validator.isEmpty(data.password.trim()))
    errors.password = "Please enter the password.";
  return { errors, isValid: Object.keys(errors).length <= 0 };
}

export default validateLogin;
