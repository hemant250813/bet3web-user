import validator from "validator";

function validateWithdrawal(data) {
  const errors = {};
  if (validator.isEmpty(data.amount.trim()))
    errors.amount = "Please enter the amount.";
  if (validator.isEmpty(data.account_type.trim()))
    errors.account_type = "Please select the bank.";
  return { errors, isValid: Object.keys(errors).length <= 0 };
}

export default validateWithdrawal;
