// @flow

const ERROR_TEXT__INVALID_EXPIRY_DATE = 'Expiration date is invalid';
const ERROR_TEXT__MONTH_OUT_OF_RANGE = 'Expiration month must be between 01 and 12';
const ERROR_TEXT__YEAR_OUT_OF_RANGE = 'Expiration year cannot be in the past';

const EXPIRY_DATE_REGEX = /^(\d{2})\/(\d{4}|\d{2})$/;
const MONTH_REGEX = /(0[1-9]|1[0-2])/;

export default (expiryDate: string) => {
  const strippedDate = expiryDate && expiryDate.replace(/\s/g, '');
  const splitDate = strippedDate && strippedDate.split('/');
  if (!EXPIRY_DATE_REGEX.test(strippedDate)) {
    return ERROR_TEXT__INVALID_EXPIRY_DATE;
  }

  const expiryMonth = splitDate[0];
  if (!MONTH_REGEX.test(expiryMonth)) {
    return ERROR_TEXT__MONTH_OUT_OF_RANGE;
  }

  const expiryYear = splitDate[1];
  let currentYear = new Date().getFullYear();
  currentYear = parseInt(
    expiryYear.length === 4 ? currentYear : currentYear.toString().substr(-2),
    10
  );
  if (currentYear > parseInt(expiryYear, 10)) {
    return ERROR_TEXT__YEAR_OUT_OF_RANGE;
  }

  return false;
};
