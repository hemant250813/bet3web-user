import validator from "validator";

function validateForgotPassword(data) {
  console.log("data",data);
  const errors = {};
  if (validator.isEmpty(data.email.trim()))
    errors.email = "Please enter the valid email ID.";
  else if (!validator.isEmail(data.email))
    errors.email = "Please enter the email.";
  return { errors, isValid: Object.keys(errors).length <= 0 };
}

export default validateForgotPassword;
