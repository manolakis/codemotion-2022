import { LitElement, html, ScopedElementsMixin } from '@lion/core';
import { LocalizeMixin } from '@lion/localize';
import { LionIcon } from '@lion/icon';
import { LionButton } from '@lion/button';

import { formatCardNumber } from '../../card-input/src/formatters.js';
import { style } from './BankCard.style.js';
import eyeOffIcon from '../assets/eye-off.svg.js';
import eyeIcon from '../assets/eye.svg.js';

export class BankCard extends ScopedElementsMixin(LocalizeMixin(LitElement)) {
  #_masked = true;

  static get styles() {
    return style;
  }

  static get scopedElements() {
    return {
      'lion-icon': LionIcon,
      'lion-button': LionButton,
    };
  }

  static get properties() {
    return {
      owner: { type: String },
      number: { type: String },
      expirationMonth: { type: Number },
      expirationYear: { type: Number },
      verificationCode: { type: String },
      /** Indicates if user is allowed to unmask the card */
      canUnmask: { type: Boolean, attribute: false },
    };
  }

  static get localizeNamespaces() {
    return [
      {
        'card-details': locale => {
          switch (locale) {
            case 'es-ES':
              return import('../translations/es-ES.js');
            case 'es':
              return import('../translations/es.js');
            default:
              return import('../translations/en.js');
          }
        },
      },
    ];
  }

  get #masked() {
    return this.#_masked;
  }

  set #masked(value) {
    const masked = !this.canUnmask || value;

    if (this.#_masked !== masked) {
      this.#_masked = masked;

      if (this.#_masked) {
        this.removeAttribute('opened');
      } else {
        this.setAttribute('opened', '');
      }

      this.requestUpdate('masked');
    }
  }

  get switcher() {
    return this.shadowRoot.querySelector('.switch-button');
  }

  constructor() {
    super();

    this.canUnmask = true;
    this.masked = true;
    this.expirationMonth = 0;
    this.expirationYear = 2000;
  }

  update(changedProperties) {
    super.update(changedProperties);

    if (!changedProperties.has('masked')) {
      this.#masked = true;
    }
  }

  #switch() {
    this.#masked = !this.#masked;
  }

  #renderNumber() {
    return html`<span class="card-number">
      <span class="screen-reader-only"
        >${this.msgLit('card-details:reader.cardNumber')}:</span
      >
      ${formatCardNumber(
        this.#masked
          ? `${this.number.slice(0, 6)}******${this.number.slice(-4)}`
          : this.number
      )}
    </span>`;
  }

  #renderExpiration() {
    return html`
      <div class="expiration">
        <span aria-hidden="true"
          >${this.msgLit('card-details:expiration')}</span
        >
        <span class="screen-reader-only"
          >${this.msgLit('card-details:reader.expiration')}:</span
        >
        <span
          >${String(this.expirationMonth).padStart(2, '0')}/${String(
            this.expirationYear
          ).slice(-2)}</span
        >
      </div>
    `;
  }

  #renderOwner() {
    return html`<span>
      <span class="screen-reader-only"
        >${this.msgLit('card-details:reader.owner')}:</span
      >
      ${this.owner}
    </span>`;
  }

  #renderSwitcher() {
    return html`
      <lion-button
        class="switch-button"
        @click="${this.#switch}"
        ?disabled="${!this.canUnmask}"
      >
        <lion-icon .svg="${this.#masked ? eyeOffIcon : eyeIcon}"></lion-icon>
        <span class="screen-reader-only"
          >${this.msgLit('card-details:reader.switchButton', {
            MASKED: String(this.#masked),
          })}</span
        >
      </lion-button>
    `;
  }

  #renderFrontSide() {
    return html`
      <div class="front-side">
        <div class="logo" aria-hidden="true"></div>
        <div class="header">${this.#renderSwitcher()}</div>
        <div class="body">
          ${this.#renderNumber()} ${this.#renderExpiration()}
          ${this.#renderOwner()}
        </div>
      </div>
    `;
  }

  #renderVerificationCode() {
    return html`
      <div class="verification-code">
        <span aria-hidden="true"
          >${this.msgLit('card-details:verificationCode')}</span
        >
        <span class="screen-reader-only"
          >${this.msgLit('card-details:reader.verificationCode')}:</span
        >
        <span>${this.#masked ? '***' : this.verificationCode}</span>
      </div>
    `;
  }

  #renderBackSide() {
    return html`
      <div class="back-side">
        ${this.#renderVerificationCode()}
        <div class="signature" aria-hidden="true"></div>
      </div>
    `;
  }

  render() {
    return html` ${this.#renderFrontSide()} ${this.#renderBackSide()} `;
  }
}
