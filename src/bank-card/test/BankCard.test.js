import { css, html } from 'lit';
import { fixture, expect, elementUpdated } from '@open-wc/testing';
import { setViewport, sendMouse, resetMouse } from '@web/test-runner-commands';
import { visualDiff } from '@web/test-runner-visual-regression';

import {
  applyGlobalStyles,
  getMiddleOfElement,
} from '../../test/test-helpers.js';
import '../../bank-card.js';

applyGlobalStyles(
  // language=CSS
  css`
    .container {
      padding: 10px;
      display: inline-block;
    }
  `
);

const template = () => html`
  <div class="container">
    <bank-card
      id="bankCard"
      number="1234123412341234"
      owner="Luke Skywalker"
      expirationMonth="1"
      expirationYear="2026"
      verificationCode="123"
    ></bank-card>
  </div>
`;

describe('BankCard', () => {
  afterEach(() =>
    Promise.all([setViewport({ width: 640, height: 800 }), resetMouse()])
  );

  it(`masked should be accessible`, async () => {
    const el = await fixture(html`<bank-card
      owner="Luke Skywalker"
      number="1234567890123452"
      verificationCode="123"
      expirationMonth="1"
      expirationYear="2026"
    ></bank-card>`);

    await expect(el).to.be.accessible();
  });

  it(`unmasked should be accessible`, async () => {
    const el = await fixture(html`<bank-card
      owner="Luke Skywalker"
      number="1234567890123452"
      verificationCode="123"
      expirationMonth="1"
      expirationYear="2026"
    ></bank-card>`);

    el.masked = false;
    await elementUpdated(el);

    await expect(el).to.be.accessible();
  });

  it(`should disable the switcher if canUnmask is false`, async () => {
    const el = await fixture(html`<bank-card
      owner="Luke Skywalker"
      number="1234567890123452"
      verificationCode="123"
      expirationMonth="1"
      expirationYear="2026"
    ></bank-card>`);

    expect(el.switcher.hasAttribute('disabled')).to.be.false;

    el.canUnmask = false;
    await elementUpdated(el);

    expect(el.switcher.hasAttribute('disabled')).to.be.true;

    el.canUnmask = true;
    await elementUpdated(el);

    expect(el.switcher.hasAttribute('disabled')).to.be.false;
  });

  it(`should open or close the card when switcher is clicked`, async () => {
    const el = await fixture(html`<bank-card
      owner="Luke Skywalker"
      number="1234567890123452"
      verificationCode="123"
      expirationMonth="1"
      expirationYear="2026"
    ></bank-card>`);

    expect(el.hasAttribute('opened')).to.be.false;

    el.switcher.click();
    await elementUpdated(el);

    expect(el.hasAttribute('opened')).to.be.true;

    el.switcher.click();
    await elementUpdated(el);

    expect(el.hasAttribute('opened')).to.be.false;
  });

  it(`render masked`, async () => {
    const el = await fixture(template());

    await visualDiff(el, `BankCard/masked`);
  });

  it(`render with unmask disabled`, async () => {
    const container = await fixture(template());
    const bankCard = document.getElementById('bankCard');

    bankCard.canUnmask = false;
    await elementUpdated(bankCard);

    await visualDiff(container, `BankCard/unmask_disabled`);
  });

  it(`render switcher hover`, async () => {
    const container = await fixture(template());
    const bankCard = document.getElementById('bankCard');

    const { x, y } = getMiddleOfElement(bankCard.switcher);
    await sendMouse({ type: 'move', position: [x, y] });

    await visualDiff(container, `BankCard/switcher_hover`);
  });

  it(`render switcher focused`, async () => {
    const container = await fixture(template());
    const bankCard = document.getElementById('bankCard');

    bankCard.switcher.focus();

    await visualDiff(container, `BankCard/switcher_focused`);
  });

  [320, 720].forEach(width => {
    it(`render unmasked in ${width} screen`, async () => {
      await setViewport({ width, height: 800 });

      const container = await fixture(template());
      const bankCard = document.getElementById('bankCard');

      bankCard.switcher.click();
      await elementUpdated(bankCard);

      await visualDiff(container, `BankCard/unmasked-${width}`);
    });
  });
});
