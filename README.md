# CodeMotion 2022

This repository contains some examples about different ways to test web components using [Web Test Runner](https://modern-web.dev/guides/test-runner/getting-started/) from [Modern Web](https://modern-web.dev/). 


## Usage

Look at the different source code examples at `src` folder.

## Testing with Web Test Runner

To execute a single test run:

```bash
npm run test
```

To run the tests in interactive watch mode run:

```bash
npm run test:watch
```

## Demoing with Storybook

To run a local instance of Storybook for your component, run

```bash
npm run storybook
```

To build a production version of Storybook, run

```bash
npm run storybook:build
```

## Tooling configs

For most of the tools, the configuration is in the `package.json` to minimize the amount of files in your project.

If you customize the configuration a lot, you can consider moving them to individual files.
