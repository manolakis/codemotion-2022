/**
 * Takes an unformatted card number and returns a formatted one.
 *
 * @param {string} modelValue value to be formatted
 * @returns {string} formatted value
 */
export const formatCardNumber = (modelValue) => {
  if (!modelValue) {
    return '';
  }

  const formattedValue = Array.from(modelValue);

  for (let i = 0; i < formattedValue.length; i += 5) {
    formattedValue.splice(i, 0, ' ');
  }

  return formattedValue.join('').trim();
}
