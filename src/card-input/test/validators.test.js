import { expect } from '@open-wc/testing';
import { createSandbox } from 'sinon';

import { getIsCardNumberCtor } from '../src/validators.js';

describe('validators', () => {
  context('IsCardNumber', () => {
    context('validatorName', () => {
      it(`should return 'IsCardNumber'`, async () => {
        const IsCardNumber = getIsCardNumberCtor();

        expect(IsCardNumber.validatorName).to.be.equal('IsCardNumber');
      });
    });

    context('getMessage', () => {
      it(`should call 'localize.msg' to obtain a localized message`, async () => {
        const sandbox = createSandbox();

        try {
          const localize = {
            loadNamespace: sandbox.stub(),
            msg: sandbox.stub(),
          };
          const IsCardNumber = getIsCardNumberCtor({ localize });
          const data = {};
          await IsCardNumber.getMessage(data);

          expect(localize.msg.calledOnceWithExactly('card-input:error', data)).to.be.true;
        } finally {
          sandbox.restore();
        }
      });

      const testLoadMessages = async (locale, lang) => {
        const sandbox = createSandbox();

        try {
          const importTranslation = sandbox.stub();
          const localize = {
            loadNamespace: sandbox.stub(),
            msg: sandbox.stub(),
          };

          const IsCardNumber = getIsCardNumberCtor({ localize, importTranslation });
          await IsCardNumber.getMessage();

          const { 'card-input': loader } = localize.loadNamespace.firstCall.firstArg;
          loader(locale);

          expect(importTranslation.firstCall.firstArg).to.be.equal(lang);
        } finally {
          sandbox.restore();
        }
      }

      [
        ['es-ES', 'es-ES'],
        ['es', 'es'],
        ['en', 'en'],
      ].forEach(([locale, lang]) => {
        it(`should load localized messages for locale ${locale}`, async () => {
          await testLoadMessages(locale, lang);
        });
      });

      it(`should load localized messages for locale en by default`, async () => {
        await testLoadMessages('*', 'en');
      });
    });

    context('execute', () => {
      [
        ['1234', true],
        ['1234123412341234', true],
        ['asd', true],
        ['1234567890123452', false]
      ].forEach(([input, output]) => {
        it(`should validate ${input} and returns ${output}`, async () => {
          const IsCardNumber = getIsCardNumberCtor();
          const validator = new IsCardNumber();

          expect(validator.execute(input)).to.be.equal(output);
        });
      });
    });
  });
});
