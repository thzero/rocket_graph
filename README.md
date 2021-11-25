[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

An [ElectronJs](https://www.electronjs.org) application that turns altimeter outputs into flight info graphs for use in presentations, videos, etc.

![Main Screen Capture](/images/screencap.png)

## Altimeter Support

Currently the only supported altimeters are:

* Eggfinder Quantum

For support of other CSV output files from other manufacturers, send info to [development@thzero.com](mailto:development@thzero.com?subject=[Rocket%20Graph]%20Altimeter%20Support%2Example) with:

* Name of the altimeter manufacturer
* Name of the altimeter product
* What does the CSV file represent
    * Successful flight?
    * Multi-stage?
    * etc.

## GPS Tracker Support

Currently the only supported GPS Trackers are:

* Featherweight GPS Tracker

For support of other CSV output files from other manufacturers, send info to [development@thzero.com](mailto:development@thzero.com?subject=[Rocket%20Graph]%20GPS%20Tracker%20Support%2Example) with:

* Name of the GPS tracker manufacturer
* Name of the GPS tracker product
* What does the CSV file represent
    * Successful flight?
    * Multi-stage?
    * etc.

# Installation

Download the latest version from the Release section.
Unzip the file.
Run the correct executable.

# Instructions for Use

Launch the application!  The application supports creating both flight chart/flight info images as well as the flight path KML export for use with Google Earth Pro.

## Flight Info

![Main Screen Capture](/images/screencap.png)

On the main toolbar, select Flight Info and then complete the following information:

* Flight Title (optional)
* Flight Date (optional)
* Flight Measurement Units (overrides the preferred settings)
* Flight Data Type
* Paste in the flight data from the altimeter output

The actions are:

* Process - Generates the chart and flight info
* Export - Saves a screen shot of the chart and flight info and exporting it to the Downloads folder
    * Only available once data is processed.
* Reset - Resets the Flight Info information

### Flight Data

The data should be in CSV format.

#### Eggtimer

For the Eggtimer flight output, include the following columns:
* T, ALt, Veloc, FAlt, FVeloc, LDA, LowV, Apogee, N-O, Drogue, Main
* Include header and data rows

## Flight Path

![Main Screen Capture](/images/screencap2.png)

On the main toolbar, select Flight Path and then complete the following information:

* Flight Title (optional)
* Flight Date (optional)
* Altitude Measurement Units
    * Specify whether the GPS data is in feet or meters; Google Earth Pro expects altitude data in meters
* Flight Data Type
* Paste in the flight data from the GPS tracker output

The actions are:

* Process - Generates the KML file
* Export - Saves the KML file to and exporting it to the Downloads folder
    * Only available once data is processed.
* Reset - Resets the Flight Path information

### Flight Data

The data should be in CSV format.

#### Featherweight GPS Tracker

For the #### Featherweight GPS Tracker output, include the following columns:
* UTCTIME, UNIXTIME, ALT, LAT, LON, #SATS, FIX, HORZV, VERTV, HEAD, FLAGS, >40, >32, >24, RSSI, BATT
* Include header and data rows

The application will ignore any data with a verical velocity +/- 10.
* Data may need to be cleaned up by hand, removing any row that has unexpected jumps.
    * Cleanup data before upload.

### Google Earth

To use the KML export in Google Earth, you will need to download [Google Earth Pro](https://www.google.com/earth/versions).

In Google Earth Pro, import the KML file via the File->Open menu.
The flight path and ground path should now be loaded.

![Google Earth Pro Example](/images/googlearthexample.png)

## Settings
The settings page allows you to change your default measurement units between English and Metric.  Access the settings by right clicking the upper-left menu icon and use the 'Settings' to set your preferred option.

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
