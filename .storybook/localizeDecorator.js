import { localize } from '@lion/localize';

export const localizeDecorator = (storyFn, { globals: { locale } }) => {
  localize.locale = locale;

  return storyFn();
};
