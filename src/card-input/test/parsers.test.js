import { expect } from '@open-wc/testing';
import { parseCardNumber } from '../src/parsers.js';

describe('parsers', () => {
  context('parseCardNumber', () => {
    [
      ['1234 5678 9012 3452', '1234567890123452'],
      ['1234-5678-9012-3452', '1234567890123452'],
      ['1234_5678-9012 - 3452', '1234567890123452'],
    ].forEach(([input, output]) => {
      it(`should parse the ${input} obtaining ${output}`, async () => {
        const parsedNumber = parseCardNumber(input);

        expect(parsedNumber).to.be.equal(output);
      });
    });
  });
});
