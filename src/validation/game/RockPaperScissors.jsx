import validator from "validator";

function validateRockPaperScissors(data, hand, setting) {
  const errors = {};
  if (validator.isEmpty(data.amount.trim()))
    errors.amount = "Please enter the amount.";
  if (parseInt(data.amount) < setting?.min)
    errors.amount = "Please enter the minimum amount.";
  if (parseInt(data.amount) > setting?.max)
    errors.amount = "Enter amount shouldn't exceed the maximum amount.";
  let selectedHand = hand?.every((tab) => tab?.isActive === false);
  if (selectedHand) {
    errors.hand = "Please select any one.";
  }
  return { errors, isValid: Object.keys(errors).length <= 0 };
}

export default validateRockPaperScissors;
