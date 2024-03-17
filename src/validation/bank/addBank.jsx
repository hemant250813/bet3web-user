import validator from "validator";

function validateAddBank(data) {
  const errors = {};
  if (validator.isEmpty(data.account_number.trim()))
    errors.account_number = "Please enter the account number.";
  if (validator.isEmpty(data.account_name.trim()))
    errors.account_name = "Please enter the account name.";
  if (validator.isEmpty(data.bank_name.trim()))
    errors.bank_name = "Please enter the bank name.";
  if (validator.isEmpty(data.ifsc_code.trim()))
    errors.ifsc_code = "Please select the IFSC code.";
    if (validator.isEmpty(data.account_type.trim()))
    errors.account_type = "Please select the account type.";
  return { errors, isValid: Object.keys(errors).length <= 0 };
}

export default validateAddBank;
