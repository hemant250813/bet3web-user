import validator from "validator";

function validateRegistration(data) {
  const errors = {};
  if (validator.isEmpty(data.username.trim()))
    errors.username = "Please enter the username name.";
  if (validator.isEmpty(data.email.trim()))
    errors.email = "Please enter the valid email ID.";
  else if (!validator.isEmail(data.email))
    errors.email = "Please enter the email.";
  if (validator.isEmpty(data.country.trim()))
    errors.country = "Please enter the country name.";
  if (validator.isEmpty(data.mobile.trim()))
    errors.mobile = "Please enter the mobile number.";
  if (validator.isEmpty(data.password.trim()))
    errors.password = "Please enter the password.";
  if (validator.isEmpty(data.confirm_password.trim()))
    errors.confirm_password = "Please enter the confirm password.";
  return { errors, isValid: Object.keys(errors).length <= 0 };
}

export default validateRegistration;
