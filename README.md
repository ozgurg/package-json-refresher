![Version](https://img.shields.io/github/package-json/v/ozgurg/package-json-refresher)

<p align="center">
  <img src="../assets/banner.jpg?raw=true" />
</p>

Sometimes you may need to reset everything and reinstall all dependencies. package.json Refresher makes this process easier.
It does the following;
- Delete "node_modules" and "package-lock.json".
- Back up "package.json" in case something goes wrong.
- Deletes and reinstall "dependencies" and "devDependencies".

## Install

    npm i @ozgurg/package-json-refresher -g

## Usage

    cd path/to/where/package.json/is
    refresh-package-json

## License
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

## TODO
- [ ] Tests will be written.
- [ ] Confirm prompt will be added, and will be bypassed with an argument.