import sinon from 'sinon';

/** @typedef {import('lit').CSSResult} CSSResult */

/**
 * Creates a mock object which returns a sinon stub for each invoked method.
 *
 * @param {Object} [options]
 * @param {Object} [options.target={}]
 * @param {SinonSandbox} [options.sandbox=sinon]
 * @return {{}}
 */
export const createMock = ({ target = {}, sandbox = sinon } = {}) =>
  new Proxy(target, {
    get: (proxyTarget, name) => {
      if (!(name in proxyTarget)) {
        // eslint-disable-next-line no-param-reassign
        proxyTarget[name] = sandbox.stub();
      }

      return proxyTarget[name];
    },
  });

/**
 * Applies styles over on the document header.
 *
 * @param {CSSResult} styles
 */
export const applyGlobalStyles = styles => {
  const styleTag = document.createElement('style');

  styleTag.textContent = styles.cssText;
  document.head.appendChild(styleTag);
};

/**
 * Obtains the middle point of an element.
 *
 * @param {HTMLElement} element
 * @returns {{x: number, y: number}}
 */
export const getMiddleOfElement = element => {
  const { x, y, width, height } = element.getBoundingClientRect();

  return {
    x: Math.floor(x + window.pageXOffset + width / 2),
    y: Math.floor(y + window.pageYOffset + height / 2),
  };
};
