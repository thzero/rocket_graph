[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

An [ElectronJs](https://www.electronjs.org) application that turns altimeter outputs into flight info graphs for use in presentations, videos, etc.
Currently the only supported altimeter is the:

* Eggfinder Quantum

For support of other graphs, send info to [development@thzero.com](mailto:development@thzero.com?subject=[Rocket%20Graph]%20Graph Example) with:

* Name of the altimeter manufacturer
* Name of the altimeter product
* What does the graph represent
    * Successful flight?
    * Multi-stage?
    * etc

Generally the data for the graphs should be in CSV format.

# Installation

Download the latest version from the Release section.
Unzip the file.
Run the correct executable.

# Development

To build this Electron tool, follow these steps.

## Install the dependencies
```bash
npm install
```

### Start the app in development mode (hot-code reloading, error reporting, etc.)
```bash
npm run serve
```

### Build the app for production
```bash
npm run build
```
