/**
 * Parses a card number trimming spaces and dashes.
 *
 * @param {string} viewValue value to be parsed
 * @returns {string} parsed value
 */
export const parseCardNumber = viewValue =>
  viewValue.replace(/[\s-_]/g, '');
