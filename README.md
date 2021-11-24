[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

An [ElectronJs](https://www.electronjs.org) application that turns altimeter outputs into flight info graphs for use in presentations, videos, etc.

![Main Screen Capture](/images/screencap.png)

## Altimeter Support

Currently the only supported altimeters are:

* Eggfinder Quantum

For support of other graphs, send info to [development@thzero.com](mailto:development@thzero.com?subject=[Rocket%20Graph]%20Graph%2Example) with:

* Name of the altimeter manufacturer
* Name of the altimeter product
* What does the graph represent
    * Successful flight?
    * Multi-stage?
    * etc.

# Installation

Download the latest version from the Release section.
Unzip the file.
Run the correct executable.

# Instructions for Use

Launch the application!

If you want to change the measurement units from English, right click the upper-left menu icon and use the 'Settings' to set your preferred option.

In the main window, complete the following information:

* Flight Title (optional)
* Flight Date (optional)
* Flight Date (optional)
* Flight Data Type (only Eggtimer is currently supported)
* Paste in the flight data from the altimeter output

The actions are:

* Process - Generates the chart and flight info
* Export - Saves a screen shot of the chart and flight info
    * Only available once data is processed.
* Reset - Resets the flight info

## Flight Data

Generally the data for the graphs should be in CSV format.

### Eggtimer

For the Eggtimer flight output, include the following columns:
    * T, ALt, Veloc, FAlt, FVeloc, LDA, LowV, Apogee, N-O, Drogue, Main
Note: do not include the headers

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
