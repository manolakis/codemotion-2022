import {
  defineCE,
  elementUpdated,
  expect,
  fixture,
  html,
  unsafeStatic,
} from '@open-wc/testing';
import { emulateMedia } from '@web/test-runner-commands';
import { visualDiff } from '@web/test-runner-visual-regression';
import { css } from 'lit';
import { createSandbox } from 'sinon';
import { applyGlobalStyles, createMock } from '../../test/test-helpers.js';
import { getCardFeatureCtor } from '../src/CardFeature.js';

applyGlobalStyles(css`
  .container {
    padding: 10px;
    display: inline-block;
  }
`);

describe('CardFeature', () => {
  it(`should call to the API to retrieve the card details`, async () => {
    const sandbox = createSandbox();

    try {
      const cardApi = createMock({ sandbox });
      const tag = unsafeStatic(defineCE(getCardFeatureCtor({ cardApi })));
      const cardId = '123';

      await fixture(html`
        <${tag} card-id='${cardId}'></${tag}>
      `);

      expect(cardApi.getCardDetails.calledOnceWithExactly(cardId)).to.be.true;
    } finally {
      sandbox.restore();
    }
  });

  it(`should should show the loaded ard info`, async () => {
    const sandbox = createSandbox();

    try {
      const cardApi = createMock({ sandbox });
      const tag = unsafeStatic(defineCE(getCardFeatureCtor({ cardApi })));

      let promiseResolve;
      cardApi.getCardDetails.returns(
        new Promise(resolve => {
          promiseResolve = data => resolve(data);
        })
      );

      const cardFeature = await fixture(html`
        <div class='container'>
          <${tag} card-id='123'></${tag}>
        </div>
      `);

      promiseResolve({
        owner: 'Luke Skywalker',
        number: '1234567890123452',
        verificationCode: '123',
        expirationMonth: 1,
        expirationYear: 2026,
      });
      await elementUpdated(cardFeature);

      await visualDiff(cardFeature, 'CardFeature/loaded');
    } finally {
      sandbox.restore();
    }
  });

  it(`should show the user that is loading the card details`, async () => {
    await emulateMedia({ reducedMotion: 'reduce' });

    const sandbox = createSandbox();

    try {
      const cardApi = createMock({ sandbox });
      const tag = unsafeStatic(defineCE(getCardFeatureCtor({ cardApi })));

      cardApi.getCardDetails.returns(
        new Promise(resolve => setTimeout(resolve, 1000))
      );

      const el = await fixture(html`
        <div class='container'>
          <${tag} card-id='123'></${tag}>
        </div>
      `);

      await visualDiff(el, 'CardFeature/loading');
    } finally {
      sandbox.restore();
    }
  });
});
