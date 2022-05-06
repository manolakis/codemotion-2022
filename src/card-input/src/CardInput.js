import { LionInput } from '@lion/input';
import { formatCardNumber } from './formatters.js';
import { parseCardNumber } from './parsers.js';
import { preprocessCardNumber } from './preprocessors.js';
import { IsCardNumber } from './validators.js';

/**
 * `CardInput` is a class for a Bank Card custom form element (`<card-input>`).
 * @customElement card-input
 */
export class CardInput extends LionInput {
  constructor() {
    super();
    this.formatter = formatCardNumber;
    this.parser = parseCardNumber;
    this.preprocessor = preprocessCardNumber;
    this.defaultValidators.push(new IsCardNumber());
  }

  connectedCallback() {
    super.connectedCallback?.();

    if (!this._inputNode.hasAttribute('maxlength')) {
      this._inputNode.setAttribute('maxlength', '19');
    }
  }
}
