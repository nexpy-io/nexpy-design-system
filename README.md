# Nexpy Design System

## Docs

You can visit the full documentation of available components and tools [here](https://nexpy-design-system.netlify.app/).

## Installation

<br />

### Package Manager

Use the package manager [yarn](https://yarnpkg.com/getting-started/install) to install the dependencies.

**Important:** Make sure you have the yarn installed globally as it is necessary for use the project's features.

Install yarn with the following command:

```sh
npm install -g yarn
```

<br />

### Install this Package From NPM

```sh
yarn add @nexpy/design-system
```

or

```sh
npm install @nexpy/design-system
```

<br />

### Dependencies

Install dependencies with the following command:

```sh
yarn
```

### Prepare

```sh
yarn prepare
```

This command will install the husky hooks in the git repository to control preprocessors for commits and pushes, such as code formatters and Eslint, and the required automatic project settings.

<br />

## Available scripts and usage

If you look at the scripts inside package.json you will see several methods, among them:

<br />

### Run development server

```sh
yarn dev
```

A server with a fast refresh for development. Do not use for production.

<br /><br />

### Reinstall dependencies

```sh
yarn reinstall
```

Asynchronously deletes all dependencies and reinstalls using yarn.

<br /><br />

### Commit your changes

```sh
yarn commit
```

Use the `yarn commit` command to start the [git-cz](https://www.npmjs.com/package/git-cz) cli. With
that we can make the commits in a standardized way.

<br /><br />

### Create production build

```sh
yarn build:dist
```

Creates an optimized distribution build of the design system.

<br /><br />

### Check typing

```sh
yarn type:check
```

Run a test using the TypeScript compiler to identify code typing failures.

<br /><br />

### Start debug server

```sh
yarn debug
```

Starts the development server with debug options. V8 inspector integration allows tools such as Chrome DevTools and IDEs to debug and profile Node.js instances.

<br /><br />

### Automatically format code

```sh
yarn prettier
```

Auto-formats code using Prettier. This command writes possible corrections to the project files.

<br /><br />

### Check code style

```sh
yarn prettier:check
```

Checks that all files follow the style pattern without changing them, reporting possible errors to the console.

<br /><br />

### Fix code integrity

```sh
yarn eslint
```

Looks for code integrity errors and fixes where possible. This command writes possible corrections to the project files.

<br /><br />

### Check code integrity

```sh
yarn eslint:check
```

Looks for code integrity errors in all files without changing them, reporting possible errors to the console.

<br /><br />

### Run development storybook server

```sh
yarn storybook
```

A server with a fast refresh for components documentation development. Do not use for production.

<br /><br />

### Buid storybook

```sh
yarn build:docs
```

Created a production build for storybook.
