import validator from "validator";

function validateDeposit(data) {
  const errors = {};
  if (validator.isEmpty(data.account_number.trim()))
    errors.account_number = "Please enter the amount.";
  if (validator.isEmpty(data.transaction_number.trim()))
    errors.transaction_number = "Please enter the transaction number.";
  if (validator.isEmpty(data.remark.trim()))
    errors.remark = "Please enter the remarks.";
  if (validator.isEmpty(data.imageUrl.trim()))
    errors.imageUrl = "Please select the image.";
  return { errors, isValid: Object.keys(errors).length <= 0 };
}

export default validateDeposit;
