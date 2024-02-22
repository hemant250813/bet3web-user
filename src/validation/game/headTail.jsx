import validator from "validator";

function validateHeadTail(data, coin) {
  const errors = {};
  if (validator.isEmpty(data.amount.trim()))
    errors.amount = "Please enter the amount.";
  let selectedCoin = coin?.every((tab) => tab?.isActive === false);
  if (selectedCoin) {
    errors.coin = "Please select the coin.";
  }
  return { errors, isValid: Object.keys(errors).length <= 0 };
}

export default validateHeadTail;
