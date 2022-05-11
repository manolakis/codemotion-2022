/** @typedef {import('lit').ReactiveElement} ReactiveElement */

/** @typedef {import('lit').ReactiveController} ReactiveController */

const LOADING_DATA = {
  loading: true,
  owner: 'Loading...',
  number: '0000000000000000',
  verificationNumber: '',
  expirationMonth: 0,
  expirationYear: 2000,
};

/**
 * @class
 */
export class CardLoader {
  /** @type {ReactiveElement} */
  #host;

  /** @type {CardAPI} */
  #api;

  #card;

  #noPreferenceOnReduceMotion = true;

  constructor(
    host,
    cardApi,
    {
      noPreferenceOnReduceMotion = matchMedia(
        '(prefers-reduced-motion: no-preference)'
      ).matches,
    } = {}
  ) {
    this.#host = host;
    this.#api = cardApi;
    this.#noPreferenceOnReduceMotion = noPreferenceOnReduceMotion;
  }

  get card() {
    if (this.#card) {
      return this.#card;
    }

    return this.#noPreferenceOnReduceMotion
      ? {
          ...LOADING_DATA,
          number: String(Math.floor(Math.random() * 10000000000000000)).padEnd(
            16,
            '0'
          ),
          expirationMonth: (Math.floor(Math.random() * 100) % 11) + 1,
          expirationYear: Math.floor(Math.random() * 1000) + 2000,
        }
      : LOADING_DATA;
  }

  #updateLoadingCard() {
    if (this.#noPreferenceOnReduceMotion) {
      requestAnimationFrame(() => {
        if (!this.#card) {
          this.#updateLoadingCard();
        }
      });
    }

    this.#host.requestUpdate();
  }

  async load(cardId) {
    this.#card = null;
    this.#updateLoadingCard();

    this.#card = await this.#api.getCardDetails(cardId);
    this.#host.requestUpdate();
  }
}
