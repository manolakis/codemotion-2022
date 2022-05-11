import { LitElement, html, ScopedElementsMixin } from '@lion/core';

import { CardAPI } from '../../card-api/src/CardAPI.js';
import { BankCard } from '../../bank-card/src/BankCard.js';
import { CardLoader } from './CardLoader.js';

export const getCardFeatureCtor = ({ cardApi = new CardAPI() } = {}) =>
  class CardFeatureHost extends ScopedElementsMixin(LitElement) {
    static get scopedElements() {
      return {
        'bank-card': BankCard,
      };
    }

    static get properties() {
      return {
        cardId: { type: String, attribute: 'card-id' },
      };
    }

    constructor() {
      super();

      this.loader = new CardLoader(this, cardApi);
    }

    update(changedProperties) {
      super.update(changedProperties);

      if (changedProperties.has('cardId')) {
        this.loader.load(this.cardId);
      }
    }

    render() {
      const {
        loading = false,
        owner,
        number,
        expirationMonth,
        expirationYear,
        verificationCode,
      } = this.loader.card;

      return html`
        <bank-card
          .canUnmask="${!loading}"
          .owner="${owner}"
          .number="${number}"
          .expirationMonth="${expirationMonth}"
          .expirationYear="${expirationYear}"
          .verificationCode="${verificationCode}"
        ></bank-card>
      `;
    }
  };

export const CardFeature = getCardFeatureCtor();
