import validator from "validator";

function validateNumberSlot(data, number, setting) {
  console.log("number", number?.length);
  const errors = {};
  if (validator.isEmpty(data.amount.trim()))
    errors.amount = "Please enter the amount.";
  if (parseInt(data.amount) < setting?.min)
    errors.amount = "Please enter the minimum amount.";
  if (parseInt(data.amount) > setting?.max)
    errors.amount = "Enter amount shouldn't exceed the maximum amount.";
  if (validator.isEmpty(number.trim()))
    errors.number = "Please enter the 3 digit number.";
  if (number?.length !== 3) errors.number = "Please enter the 3 digit number.";
  return { errors, isValid: Object.keys(errors).length <= 0 };
}

export default validateNumberSlot;
