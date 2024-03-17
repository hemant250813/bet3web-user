import validator from "validator";

function validateaddBankSlider(data) {
  const errors = {};
  if (validator.isEmpty(data.title.trim()))
    errors.title = "Please enter the title.";
  if (validator.isEmpty(data.imageUrl.trim()))
    errors.imageUrl = "Please select the image.";
  return { errors, isValid: Object.keys(errors).length <= 0 };
}

export default validateaddBankSlider;
