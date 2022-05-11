import { visualRegressionPlugin } from '@web/test-runner-visual-regression/plugin';
import { playwrightLauncher } from '@web/test-runner-playwright';
import { testRunnerHtml } from './testRunnerHtml.mjs';

export default {
  /** test files to run */
  files: 'src/**/*.test.js',

  /** resolve bare imports */
  nodeResolve: true,

  /** browsers to run tests on */
  browsers: [
    playwrightLauncher({ product: 'chromium' }),
    playwrightLauncher({ product: 'firefox' }),
    playwrightLauncher({ product: 'webkit' })
  ],

  plugins: [
    visualRegressionPlugin({
      update: process.argv.includes('--update-visual-baseline'),
    }),
  ],

  testRunnerHtml
};
