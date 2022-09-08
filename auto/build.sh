#!/bin/sh
# This script create dist build folder.

yarn rimraf dist

yarn rollup -c

yarn css-minify -f src/theme/css/preflight.css -o dist

cp src/theme/css/preflight.css dist/preflight.css
