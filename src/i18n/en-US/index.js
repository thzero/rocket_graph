// This is just an example,
// so you can safely delete all default props below

export default {
	button: {
		title: 'Button',
		export: 'Export',
		process: 'Process',
		reset: 'Reset',
		submit: 'Submit'
	},
	charts: {
		flightInfo: {
			title: 'Flight Info',
			altitude: 'Altitude',
			events: {
				apogee: 'Apogee',
				drogue: 'Drogue',
				noseOver: 'Nose Over',
				main: 'Main'
			},
			velocity: 'Velocity'
		}
	},
	errors: {
		process: {
			noInput: 'No CSV provided for processor.',
			noProcessor: 'No processor available.',
			required: 'Required fields missing.',
			unableToConvert: 'Unable to convert the CSV data.'
		}
	},
	failed: 'Action failed',
	file: {
		title: 'File',
		csv: 'CSV'
	},
	flightInfo: {
		title: 'Flight Title',
		csv: 'CSV Flight Data',
		dataTypes: 'Flight Data Type',
		date: 'Flight Date',
		location: 'Flight Location',
		measurementUnits: 'Flight Measurement Units',
		processors: {
			eggtimer: 'Eggtimer'
		}
	},
	flightPath: {
		title: 'Flight Title',
		color: {
			flight: 'Flight Path Color',
			ground: 'Ground Path Color',
			launch: 'Launch Pin Color',
			touchdown: 'Touchdown Pin Color'
		},
		csv: 'CSV GPS Flight Data',
		dataTypes: 'Flight Data Type',
		date: 'Flight Date',
		flightPath: 'Flight Path',
		groundPath: 'Ground Path',
		launch: 'Launch',
		location: 'Flight Location',
		measurementUnits: 'Altitude Measurement Units',
		processors: {
			eggtimer: 'Eggtimer',
			featherweight: 'Featherweight'
		},
		touchdown: 'Touchdown'
	},
	forms: {
		name: 'Form',
		namePlural: 'Forms',
		measurementUnits: 'Measurement Units'
	},
	measurements: {
		english: {
			acceleration: {
				abbr: 'ft/s^s'
			},
			altitude: {
				abbr: 'ft',
				name: 'Feet'
			},
			time: {
				abbr: 's'
			},
			velocity: {
				abbr: 'ft/s'
			}
		},
		metric: {
			acceleration: {
				abbr: 'm/s^s'
			},
			altitude: {
				abbr: 'm',
				name: 'Meters'
			},
			time: {
				abbr: 's'
			},
			velocity: {
				abbr: 'm/s'
			}
		}
	},
	measurementUnits: {
		english: 'English',
		metric: 'Metrics'
	},
	menu: {
		flightInfo: 'Flight Info',
		flightPath: 'Flight Path',
		settings: {
			title: 'Settings'
		}
	},
	messages: {
		saved: 'Saved'
	},
	openSource: {
		license: 'License',
		resource: 'Resource'
	},
	success: 'Action was successful',
	titles: {
		application: 'Rocket Graph',
		flightInfo: 'Flight Info',
		flightPath: 'Flight Path',
		home: 'Home',
		settings: 'Settings',
		openSource: 'Open Source'
	},
	validation: {
		required: 'Field is required.'
	},
	version: 'Version'
}
