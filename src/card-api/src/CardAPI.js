/**
 * @class
 */
export class CardAPI {
  /**
   * Simulates a call to the backend.
   *
   * @returns {Promise<{
   *   owner: string,
   *   number: string,
   *   expirationMonth: number,
   *   expirationYear: number,
   *   verificationCode: string,
   * }>}
   */
  // eslint-disable-next-line class-methods-use-this
  getCardDetails() {
    return new Promise(resolve => {
      setTimeout(
        () =>
          resolve({
            owner: 'Luke Skywalker',
            number: '1234567890123452',
            verificationCode: '123',
            expirationMonth: 1,
            expirationYear: 2026,
          }),
        Math.floor(Math.random() * 10000) % 3000
      );
    });
  }
}
