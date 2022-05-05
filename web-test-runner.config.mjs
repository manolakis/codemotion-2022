import { playwrightLauncher } from '@web/test-runner-playwright';

export default {
  /** test files to run */
  files: 'src/**/*.test.js',

  /** resolve bare imports */
  nodeResolve: true,

  /** browsers to run tests on */
  browsers: [
    playwrightLauncher({ product: 'chromium' }),
    playwrightLauncher({ product: 'firefox' }),
    playwrightLauncher({ product: 'webkit' }),
  ],
};
