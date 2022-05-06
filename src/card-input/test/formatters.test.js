import { expect } from '@open-wc/testing';
import { formatCardNumber } from '../src/formatters.js';

describe('formatters', () => {
  context('formatCardNumber', () => {
    [null, undefined].forEach(modelValue => {
      it(`should return an empty string if ${modelValue} modelValue is provided`, async () => {
        const formattedNumber = formatCardNumber(modelValue);

        expect(formattedNumber).to.be.equal('');
      });
    });

    it('should show the card numbers in groups of 4 digits', async () => {
      const formattedNumber = formatCardNumber('1234567890123452');

      expect(formattedNumber).to.be.equal('1234 5678 9012 3452');
    });
  });
});
