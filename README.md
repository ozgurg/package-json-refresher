![Version](https://img.shields.io/github/package-json/v/ozgurg/package-json-refresher)

# package.json Refresher
Easy to refresh your package.json. It does the following;
- Delete "node_modules" and "package-lock.json".
- Back up "package.json" in case something goes wrong.
- Deletes and reinstall "dependencies" and "devDependencies".

## Install

    npm i package-json-refresher -g

## Usage

    cd path/to/where/package.json/is
    refresh-package-json

## License
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
