import validator from "validator";

function validateNumberPool(data, color, setting) {
  const errors = {};
  if (validator.isEmpty(data.amount.trim()))
    errors.amount = "Please enter the amount.";
  if (parseInt(data.amount) < setting?.min)
    errors.amount = "Please enter the minimum amount.";
  if (parseInt(data.amount) > setting?.max)
    errors.amount = "Enter amount shouldn't exceed the maximum amount.";
  let selectedColor = color?.every((tab) => tab?.isActive === false);
  if (selectedColor) {
    errors.ball = "Please select any one ball.";
  }
  return { errors, isValid: Object.keys(errors).length <= 0 };
}

export default validateNumberPool;
