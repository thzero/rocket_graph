// This is just an example,
// so you can safely delete all default props below

export default {
	button: {
		title: 'Button',
		export: 'Export',
		process: 'Process',
		reset: 'Reset',
		save: 'Save',
		submit: 'Submit'
	},
	charts: {
		flightInfo: {
			title: 'Flight Info',
			acceleration: 'Acceleration',
			altitude: {
				title: 'Altitude',
				titleF: 'Altitude (F)',
				max: 'Max. Altitude',
				min: 'Min. Altitude'
			},
			ascent: 'Ascent',
			avg: {
				title: 'Average',
				abbr: 'Avg.'
			},
			descent: 'Descent',
			events: {
				title: 'Events',
				apogee: 'Apogee',
				drogue: 'Drogue/Freefall',
				notDetected: 'Event not detected',
				noseOver: 'Nose Over',
				main: 'Main'
			},
			flightTime: 'Flight Time',
			max: {
				title: 'Maximum',
				abbr: 'Max.'
			},
			min: {
				title: 'Minimum',
				abbr: 'Min.'
			},
			velocity: {
				title: 'Velocity',
				titleF: 'Velocity (F)'
			}
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
		dataTypes: {
			showActual: 'Show Actual'
		},
		date: 'Flight Date',
		export: {
			image: 'image',
			json: 'json',
			text: 'text'
		},
		location: 'Flight Location',
		measurementUnits: 'Flight Measurement Units',
		processors: {
			title: 'Flight Data Type',
			eggtimer: 'Eggtimer'
		},
		style: {
			title: 'Chart Styles',
			altitude: {
				title: 'Altitude',
				filtered: 'Altitude (Filtered)'
			},
			event: {
				apogee: {
					title: 'Apogee',
					border: 'Apogee Border'
				},
				drogue: {
					title: 'Drogue/Freefall',
					border: 'Drogue/Freefall Border'
				},
				main: {
					title: 'Main',
					border: 'Main Border'
				}
			},
			velocity: {
				title: 'Velocity',
				filtered: 'Velocity (Filtered)'
			}
		},
		resolution: 'Resolution'
	},
	flightPath: {
		title: 'Flight Title',
		style: {
			title: 'Flight Path Styles',
			flight: {
				color: 'Flight Path Color'
			},
			ground: {
				color: 'Ground Path Color'
			},
			launch: {
				color: 'Launch Pin Color'
			},
			touchdown: {
				color: 'Touchdown Pin Color'
			}
		},
		csv: 'CSV GPS Flight Data',
		date: 'Flight Date',
		flightPath: 'Flight Path',
		groundPath: 'Ground Path',
		launch: 'Launch',
		location: 'Flight Location',
		measurementUnits: 'Altitude Measurement Units',
		processors: {
			title: 'Flight Data Type',
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
		processed: 'Processed',
		reset: 'Reset',
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
		help: 'Help',
		home: 'Home',
		issues: 'Issues',
		settings: 'Settings',
		openSource: 'Open Source'
	},
	validation: {
		required: 'Field is required.'
	},
	version: 'Version'
}
