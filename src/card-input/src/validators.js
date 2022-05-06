import { Validator } from '@lion/form-core';
import { localize as lionLocalize } from '@lion/localize';

const NUMBER_REGEXP = /\d{16}/;

const isLuhn = value => Array.from(value)
    .reverse()
    .map((character, index) => {
      const number = parseInt(character, 10);

      if (index % 2 !== 0) {
        const doubled = number * 2;

        if (doubled >= 10) {
          return (doubled % 10) + 1;
        }

        return doubled;
      }

      return number;
    })
    .reduce((acc, number) => acc + number, 0)
  % 10 === 0;

export const getIsCardNumberCtor = ({
  localize = lionLocalize,
  importTranslation = lang => import(`../translations/${lang}.js`),
                            } = {}) => {
  let translationsLoaded = false;

  const loadTranslations = async () => {
    if (!translationsLoaded) {
      await localize.loadNamespace(
        {
          'card-input': locale => {
            switch (locale) {
              case 'es-ES':
                return importTranslation('es-ES');
              case 'es':
                return importTranslation('es');
              default:
                return importTranslation('en');
            }
          }
        },
        { locale: localize.locale },
      );

      translationsLoaded = true;
    }
  };

  return class IsCardNumberHost extends Validator {
    static get validatorName() {
      return 'IsCardNumber';
    }

    /**
     * Obtains the error message for the user.
     *
     * @param {object} [data]
     * @param {*} [data.modelValue]
     * @param {string} [data.fieldName]
     * @param {*} [data.params]
     * @param {string} [data.type]
     * @param {Object.<string,?>} [data.config]
     * @param {string} [data.name]
     * @returns {Promise<string|Element>}
     */
    static async getMessage(data) {
      await loadTranslations();

      return localize.msg('card-input:error', data);
    }

    /** @param {string} value */
    // eslint-disable-next-line class-methods-use-this
    execute(value) {
      return !NUMBER_REGEXP.test(value) || !isLuhn(value);
    }
  }
}

export const IsCardNumber = getIsCardNumberCtor();
