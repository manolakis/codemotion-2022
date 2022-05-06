import { expect } from '@open-wc/testing';
import { preprocessCardNumber } from '../src/preprocessors.js';

const test = ({
                prevViewValue,
                value,
                currentCaretIndex,
                viewValue,
                caretIndex
              }) => {
  const result = preprocessCardNumber(value, { currentCaretIndex, prevViewValue });

  expect(result).to.be.eql({ viewValue, caretIndex });
};

describe('preprocessors', () => {
  context('preprocessCardNumber', () => {
    it(`should maintain the caret position adding a number at the beginning of a group`, async () => {
      test({
        prevViewValue: '',
        value: '1',
        currentCaretIndex: 1,
        viewValue: '1',
        caretIndex: 1
      });
    });

    it(`should maintain the caret position adding a number at the end of a group`, async () => {
      test({
        prevViewValue: '123',
        value: '1234',
        currentCaretIndex: 4,
        viewValue: '1234',
        caretIndex: 4
      });
    });

    it(`should remove the new character and move back the caret one position adding an invalid character at the end of a group`, async () => {
      test({
        prevViewValue: '1234',
        value: '1234D',
        currentCaretIndex: 5,
        viewValue: '1234',
        caretIndex: 4
      });
    });

    it(`should remove the new character and move back the caret one position adding an invalid character in the middle of a group`, async () => {
      test({
        prevViewValue: '123',
        value: '1D23',
        currentCaretIndex: 2,
        viewValue: '123',
        caretIndex: 1
      });
    });

    it(`should add an space after the fourth digit and move forward the caret adding a fifth digit at the end of a group`, async () => {
      test({
        prevViewValue: '1234',
        value: '12345',
        currentCaretIndex: 5,
        viewValue: '1234 5',
        caretIndex: 6
      });
    });

    it(`should regroup the digits adding a fifth digit at the end of the non final group, moving forward the caret`, async () => {
      test({
        prevViewValue: '1234 6',
        value: '12345 6',
        currentCaretIndex: 5,
        viewValue: '1234 56',
        caretIndex: 6
      });
    });

    it(`should remove the last space and move backward the caret removing the only digit of the last group`, async () => {
      test({
        prevViewValue: '1234 5',
        value: '1234 ',
        currentCaretIndex: 5,
        viewValue: '1234',
        caretIndex: 4
      });
    });

    it(`should regroup the digits and maintain the caret position removing a digit in the middle of the non last group`, async () => {
      test({
        prevViewValue: '1234 5',
        value: '134 5',
        currentCaretIndex: 2,
        viewValue: '1345',
        caretIndex: 2
      });
    });

    it(`should maintain the caret position removing the first digit of the last group`, async () => {
      test({
        prevViewValue: '1234 56',
        value: '1234 6',
        currentCaretIndex: 5,
        viewValue: '1234 6',
        caretIndex: 5
      });
    });

    it(`should move backwards the caret position and remove the last digit of the previous group removing the space that splits two groups`, async () => {
      test({
        prevViewValue: '1234 5',
        value: '12345',
        currentCaretIndex: 4,
        viewValue: '1235',
        caretIndex: 3
      });
    });

    it(`should regroup the digits and maintain the caret position adding a new digit at the beginning of a completed group`, async () => {
      test({
        prevViewValue: '1234 5678 1234',
        value: '1234 5678 91234',
        currentCaretIndex: 11,
        viewValue: '1234 5678 9123 4',
        caretIndex: 11
      });
    });

    it(`should regroup the digits and maintain the caret position removing the last digit of a completed group`, async () => {
      test({
        prevViewValue: '1234 5678 9012 3456',
        value: '1234 5678 901 3456',
        currentCaretIndex: 13,
        viewValue: '1234 5678 9013 456',
        caretIndex: 13
      });
    });
  });
});
