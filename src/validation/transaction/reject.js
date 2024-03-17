import validator from "validator";

function validateReject(data) {
  const errors = {};
  if (validator.isEmpty(data.remark.trim()))
    errors.remark = "Please enter the remark.";
  return { errors, isValid: Object.keys(errors).length <= 0 };
}

export default validateReject;
