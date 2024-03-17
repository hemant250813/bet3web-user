import validator from "validator";

function validateKeno(data, number, setting) {
  const errors = {};
  if (validator.isEmpty(data.amount.trim()))
    errors.amount = "Please enter the amount.";
  if (parseInt(data.amount) < setting?.min)
    errors.amount = "Please enter the minimum amount.";
  if (parseInt(data.amount) > setting?.max)
    errors.amount = "Enter amount shouldn't exceed the maximum amount.";
  if (number?.length < 10) {
    errors.number = "Please select 10 digit.";
  }
  return { errors, isValid: Object.keys(errors).length <= 0 };
}

export default validateKeno;
