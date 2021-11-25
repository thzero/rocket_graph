import Constants from '../../constants';

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
		if (!data || data === undefined)
			return null;
		this._enforceNotEmpty('FlightInfoService', 'process', processorId);
		this._enforceNotEmpty('FlightInfoService', 'process', measurementUnits);

		const results = new Results();

		if (!data || data === undefined) {
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
		this._enforceNotEmpty('FlightInfoService', '_determineProcessor', processorId);

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
					value: 0,
					count: 0
				},
				max: {
					altitude: 0,
					time: 0,
					value: 0
				},
				min: {
					altitude: 0,
					drogue: {
						avg: {
							temp: 0,
							value: 0,
							count: 0
						},
						max: {
							altitude: 0,
							time: 0,
							value: 0
						},
						min: {
							altitude: 0,
							time: 0,
							value: -999999999
						}
					},
					main: {
						avg: {
							temp: 0,
							value: 0,
							count: 0
						},
						max: {
							altitude: 0,
							time: 0,
							value: 0
						},
						min: {
							altitude: 0,
							time: 0,
							value: -999999999
						}
					},
					time: 0,
					value: 0
				}
			},
			altitude: {
				data: [],
				dataF: [],
				max: 0
			},
			date: null,
			events: {
				apogee: {
					altitude: 0,
					data: [],
					time: 0
				},
				drogue: {
					altitude: 0,
					data: [],
					time: 0
				},
				ground: {
					time: 0
				},
				main: {
					altitude: 0,
					data: [],
					time: 0
				},
				noseOver: {
					altitude: 0,
					data: [],
					time: 0
				}
			},
			location: null,
			measurementUnits: null,
			time: [],
			title: null,
			velocity: {
				avg: {
					temp: 0,
					value: 0,
					count: 0
				},
				data: [],
				dataF: [],
				max: {
					altitude: 0,
					time: 0,
					value: 0
				},
				min: {
					altitude: 0,
					time: 0,
					value: 0,
					drogue: {
						avg: {
							temp: 0,
							value: 0,
							count: 0
						},
						max: {
							altitude: 0,
							time: 0,
							value: 0
						},
						min: {
							altitude: 0,
							time: 0,
							value: -999999999
						}
					},
					main: {
						avg: {
							temp: 0,
							value: 0,
							count: 0
						},
						max: {
							altitude: 0,
							time: 0,
							value: 0
						},
						min: {
							altitude: 0,
							time: 0,
							value: -999999999
						}
					}
				}
			}
		};
	}

	registerProcessor(service) {
		if (!service || service === undefined)
			return;

		this._serviceProcessors.push(service);
	}
}

export default FlightInfoService;
