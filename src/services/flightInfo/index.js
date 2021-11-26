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

	get serviceProcessors() {
		return this._serviceProcessors;
	}

	process(data, processorId, measurementUnits) {
		this._enforceNotNull('FlightInfoService', 'process', data, 'data');
		this._enforceNotEmpty('FlightInfoService', 'process', processorId, 'processorId');
		this._enforceNotEmpty('FlightInfoService', 'process', measurementUnits, 'measurementUnits');

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
		processor.process(results, data, measurementUnits);
		console.log(results.info);

		return results;
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
			date: null,
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
