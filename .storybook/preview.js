import { localizeDecorator } from './localizeDecorator.js';

export const globalTypes = {
  locale: {
    name: 'Locale',
    description: 'Internationalization locale',
    defaultValue: 'es-ES',
    toolbar: {
      icon: 'globe',
      items: [
        { value: 'en-GB', right: '🇬🇧', title: 'English' },
        { value: 'es-ES', right: '🇪🇸', title: 'Español' },
      ],
    },
  },
};

export const decorators = [localizeDecorator];

const customViewports = {
  Mobile: {
    name: 'Mobile',
    styles: {
      width: '320px',
      height: '568px',
    },
  },
  BigMobile: {
    name: 'BigMobile',
    styles: {
      width: '600px',
      height: '1024px',
    },
  },
  Tablet: {
    name: 'Tablet',
    styles: {
      width: '720px',
      height: '1024px',
    },
  },
  BigTablet: {
    name: 'BigTablet',
    styles: {
      width: '840px',
      height: '1024px',
    },
  },
  Desktop: {
    name: 'Desktop',
    styles: {
      width: '1280px',
      height: '1024px',
    },
  },
};

export const parameters = {
  viewport: {
    viewports: customViewports,
  },
  options: {
    storySort: (a, b) =>
      a[1].kind === b[1].kind
        ? 0
        : a[1].id.localeCompare(b[1].id, undefined, { numeric: true }),
  },
};
