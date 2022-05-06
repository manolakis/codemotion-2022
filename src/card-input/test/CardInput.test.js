import { expect, fixture } from '@open-wc/testing';

import { formatCardNumber } from '../src/formatters.js';
import '../../card-input.js';
import { parseCardNumber } from '../src/parsers.js';
import { preprocessCardNumber } from '../src/preprocessors.js';

describe('CardInput', () => {
  it(`should use formatCardNumber for formatting`, async () => {
    const el = await fixture(`<card-input></card-input>`);

    expect(el.formatter).to.equal(formatCardNumber);
  });

  it(`should use parseCardNumber for parsing`, async () => {
    const el = await fixture(`<card-input></card-input>`);

    expect(el.parser).to.equal(parseCardNumber);
  });

  it(`should use preprocessCardNumber to preprocess the input`, async () => {
    const el = await fixture(`<card-input></card-input>`);

    expect(el.preprocessor).to.equal(preprocessCardNumber);
  });

  it(`should have a text type`, async () => {
    const el = await fixture(`<card-input></card-input>`);

    const input = el._inputNode;

    expect(input.type).to.equal('text');
  });

  it(`should have a maxlength of 19`, async () => {
    const el = await fixture(`<card-input></card-input>`);

    const input = el._inputNode;

    expect(input.getAttribute('maxlength')).to.equal('19');
  });

  it(`should have the IsCardNumber validator applied by default`, async () => {
    const el = await fixture(`<card-input></card-input>`);

    el.modelValue = '1234123412341234';

    expect(el.hasFeedbackFor).to.include('error');
    expect(el.validationStates).to.have.property('error');
    expect(el.validationStates.error).to.have.property('IsCardNumber');

    el.modelValue = '1234567890123452';

    expect(el.hasFeedbackFor).not.to.include('error');
    expect(el.validationStates).to.have.property('error');
    expect(el.validationStates.error).not.to.have.property('IsCardNumber');
  });

  it(`should be accessible`, async () => {
    const el = await fixture(`<card-input label='card number'></card-input>`);

    await expect(el).to.be.accessible();
  });

  it(`should be accessible when readonly`, async () => {
    const el = await fixture(`<card-input label='card number' readonly></card-input>`);

    await expect(el).to.be.accessible();
  });

  it(`should be accessible when disabled`, async () => {
    const el = await fixture(`<card-input label='card number' disabled></card-input>`);

    await expect(el).to.be.accessible();
  });
});
