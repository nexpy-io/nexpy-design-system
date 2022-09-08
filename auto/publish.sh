#!/bin/sh
# Verify code, build dist folder and start publish to npm.

raiseCommitError() {
  echo "Please commit your changes before publishing."

  exit 1
}

git status | grep "nothing to commit, working tree clean" || raiseCommitError

yarn type:check
yarn eslint:check
yarn prettier:check

yarn build:dist

yarn publish
