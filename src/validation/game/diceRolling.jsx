import validator from "validator";

function validateDiceROlling(data, dice, setting) {
  const errors = {};
  if (validator.isEmpty(data.amount.trim()))
    errors.amount = "Please enter the amount.";
  if (parseInt(data.amount) < setting?.min)
    errors.amount = "Please enter the minimum amount.";
  if (parseInt(data.amount) > setting?.max)
    errors.amount = "Enter amount shouldn't exceed the maximum amount.";
  let selectedCoin = dice?.every((tab) => tab?.isActive === false);
  if (selectedCoin) {
    errors.dice = "Please select the dice.";
  }
  return { errors, isValid: Object.keys(errors).length <= 0 };
}

export default validateDiceROlling;
