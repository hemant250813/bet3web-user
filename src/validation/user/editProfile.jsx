import validator from "validator";

function validateEditProfile(data) {
  const errors = {};
  if (validator.isEmpty(data.firstName.trim()))
    errors.firstName = "Please enter the first name.";
  if (validator.isEmpty(data.lastName.trim()))
    errors.lastName = "Please enter the last name.";
  return { errors, isValid: Object.keys(errors).length <= 0 };
}

export default validateEditProfile;
