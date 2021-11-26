import Constants from '../../constants';

import AppUtility from 'src/utility';

import Results from '../results';

import Service from '../index';

class FlightInfoService extends Service {
	constructor() {
		super();

		this._serviceProcessors = [];
	}

	init(injector) {
		// TODO: Convert to library
		const serviceFlightInfoProcessorEggtimer = injector.getService(Constants.InjectorKeys.SERVICE_FLIGHT_INFO_PROCESSOR_EGGTIMER);
		this.registerProcessor(serviceFlightInfoProcessorEggtimer);
	}

	get styleDefault() {
		return {
			altitude: {
				color: '#00FFFF'
			},
			altitudeF: {
				color: '#0000FF'
			},
			event: {
				apogee: {
					color: '#000000'
				},
				apogeeBorder: {
					color: '#000000'
				},
				drogue: {
					color: '#FF0000'
				},
				drogueBorder: {
					color: '#FF0000'
				},
				main: {
					color: '#FF8C00'
				},
				mainBorder: {
					color: '#FF8C00'
				}
			},
			velocity: {
				color: '#00FF00'
			},
			velocityF: {
				color: '#00AA00'
			}
		};
	}

	get serviceProcessors() {
		return this._serviceProcessors;
	}

	process(data, processorId, measurementUnits, dataTypes) {
		this._enforceNotNull('FlightInfoService', 'process', data, 'data');
		this._enforceNotEmpty('FlightInfoService', 'process', processorId, 'processorId');
		this._enforceNotEmpty('FlightInfoService', 'process', measurementUnits, 'measurementUnits');
		this._enforceNotEmpty('FlightInfoService', 'process', dataTypes, 'dataTypes');

		const results = new Results();

		if (AppUtility.isNull(data)) {
			results.errors.push('errors.process.noInput');
			return results;
		}

		if (String.isNullOrEmpty(processorId)) {
			results.setError('errors.process.noProcessor');
			return results;
		}

		const processor = this._determineProcessor(processorId);
		if (!processor) {
			results.setError('errors.process.noProcessor');
			return results;
		}

		results.info = this._initialize();
		results.info.dataTypes = dataTypes;
		processor.process(results, data, measurementUnits);
		console.log(results.info);

		return results;
	}

	processOutputJson(flightInfo) {
		this._enforceNotNull('FlightInfoService', 'processOutputJson', flightInfo, 'flightInfo');

		return JSON.stringify(flightInfo);
	}

	processOutputText(flightInfo) {
		this._enforceNotNull('FlightInfoService', 'processOutputJson', flightInfo, 'flightInfo');

		/*
			const output = `
Flight Time			${this.flightInfo?.events?.ground?.time}
Max. Altitude		${flightTime}
Velocity
	Ascent
		Max.		${flightTime}
		Avg.		${flightTime}
	Descent
		Drogue
			Max.	${flightTime}
			Avg.	${flightTime}
		Main
			Max.	${flightTime}
			Avg.	${flightTime}
Acceleration
	Max.			${flightTime}
	Min.			${flightTime}
	Descent
		Drogue
			Max.	${flightTime}
			Min.	${flightTime}
			Avg.	${flightTime}
		Main
			Max.	${flightTime}
			Min.	${flightTime}
			Avg.	${flightTime}
Events
	Apogee			${flightTime}
	Nose Over		${flightTime}
	Drogue			${flightTime}
	Main			${flightTime}
`;

			const name = this.flightInfoExportName('txt');
			const barRef = this.$refs.bar;
			barRef.start();

			this.serviceDownload.download(output,
				name,
				() => {
					console.log('completed');
					barRef.stop();
				},
				() => {
					console.log('cancelled');
					barRef.stop();
				},
				(arg) => {
					console.log('progress');
					console.log(arg);
				}
			);
*/
	}

	_determineProcessor(processorId) {
		this._enforceNotEmpty('FlightInfoService', '_determineProcessor', processorId, 'processorId');

		const processor = this._serviceProcessors.find(s => {
			return s.id.toLowerCase() === processorId.toLowerCase();
		});
		return processor;
	}

	_initialize() {
		return {
			acceleration: {
				avg: {
					temp: 0,
					tempF: 0,
					value: 0,
					valueF: 0,
					count: 0,
					countF: 0
				},
				max: {
					altitude: 0,
					altitudeF: 0,
					time: 0,
					timeF: 0,
					value: 0,
					valueF: 0
				},
				min: {
					altitude: 0,
					altitudeF: 0,
					drogue: {
						avg: {
							temp: 0,
							tempF: 0,
							value: 0,
							valueF: 0,
							count: 0,
							countF: 0
						},
						max: {
							altitude: 0,
							altitudeF: 0,
							time: 0,
							timeF: 0,
							value: 0,
							valueF: 0
						},
						min: {
							altitude: 0,
							altitudeF: 0,
							time: 0,
							timeF: 0,
							value: -999999999,
							valueF: -999999999
						}
					},
					main: {
						avg: {
							temp: 0,
							tempF: 0,
							value: 0,
							valueF: 0,
							count: 0,
							countF: 0
						},
						max: {
							altitude: 0,
							altitudeF: 0,
							time: 0,
							timeF: 0,
							value: 0,
							valueF: 0
						},
						min: {
							altitude: 0,
							altitudeF: 0,
							time: 0,
							timeF: 0,
							value: -999999999,
							valueF: -999999999
						}
					},
					time: 0,
					value: 0
				}
			},
			altitude: {
				data: [],
				dataF: [],
				max: 0,
				maxF: 0
			},
			style: {
				altitude: {
					color: this.styleDefault.altitude.color
				},
				altitudeF: {
					color: this.styleDefault.altitudeF.color
				},
				event: {
					apogee: {
						color: this.styleDefault.event.apogee.color
					},
					apogeeBorder: {
						color: this.styleDefault.event.apogeeBorder.color
					},
					drogue: {
						color: this.styleDefault.event.drogue.color
					},
					drogueBorder: {
						color: this.styleDefault.event.drogueBorder.color
					},
					main: {
						color: this.styleDefault.event.main.color
					},
					mainBorder: {
						color: this.styleDefault.event.mainBorder.color
					}
				},
				velocity: {
					color: this.styleDefault.velocity.color
				},
				velocityF: {
					color: this.styleDefault.velocityF.color
				}
			},
			date: null,
			dataTypes: {
				actual: false,
				actualShow: false,
				filtered: true
			},
			events: {
				apogee: {
					altitude: 0,
					altitudeF: 0,
					data: [],
					dataF: [],
					time: 0,
					timeF: 0
				},
				drogue: {
					altitude: 0,
					altitudeF: 0,
					data: [],
					dataF: [],
					time: 0,
					timeF: 0
				},
				ground: {
					time: 0
				},
				main: {
					altitude: 0,
					altitudeF: 0,
					data: [],
					dataF: [],
					time: 0,
					timeF: 0
				},
				noseOver: {
					altitude: 0,
					altitudeF: 0,
					data: [],
					dataF: [],
					time: 0,
					timeF: 0
				}
			},
			location: null,
			measurementUnits: null,
			time: [],
			title: null,
			velocity: {
				avg: {
					temp: 0,
					tempF: 0,
					value: 0,
					valueF: 0,
					count: 0,
					countF: 0
				},
				data: [],
				dataF: [],
				max: {
					altitude: 0,
					altitudeF: 0,
					time: 0,
					timeF: 0,
					value: 0,
					valueF: 0
				},
				min: {
					altitude: 0,
					altitudeF: 0,
					time: 0,
					timeF: 0,
					value: 0,
					valueF: 0,
					drogue: {
						avg: {
							temp: 0,
							tempF: 0,
							value: 0,
							valueF: 0,
							count: 0,
							countF: 0
						},
						data: [],
						dataF: [],
						max: {
							altitude: 0,
							altitudeF: 0,
							time: 0,
							timeF: 0,
							value: 0,
							valueF: 0
						},
						min: {
							altitude: 0,
							altitudeF: 0,
							time: 0,
							timeF: 0,
							value: -999999999,
							valueF: -999999999
						}
					},
					main: {
						avg: {
							temp: 0,
							tempF: 0,
							value: 0,
							valueF: 0,
							count: 0,
							countF: 0
						},
						data: [],
						dataF: [],
						max: {
							altitude: 0,
							altitudeF: 0,
							time: 0,
							timeF: 0,
							value: 0,
							valueF: 0
						},
						min: {
							altitude: 0,
							altitudeF: 0,
							time: 0,
							timeF: 0,
							value: -999999999,
							valueF: -999999999
						}
					}
				}
			}
		};
	}

	registerProcessor(service) {
		this._enforceNotNull('FlightInfoService', 'service', service, 'service');

		this._serviceProcessors.push(service);
	}
}

export default FlightInfoService;
