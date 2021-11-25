import Results from '../results';

import Constants from '../../constants';

class FlightPathService {
	constructor() {
		this._serviceProcessors = [];
	}

	init(injector) {
		// TODO: Convert to library
		const serviceFlightPathProcessorFeatherweight = injector.getService(Constants.InjectorKeys.SERVICE_FLIGHT_PATH_PROCESSOR_FEATHERWEIGHT);
		this.registerProcessor(serviceFlightPathProcessorFeatherweight);
	}

	get serviceProcessors() {
		return this._serviceProcessors;
	}

	process(data, processorId, measurementUnits, flightInfo) {
		if (!data || data === undefined)
			return null;
		if (String.isNullOrEmpty(processorId))
			return null;
		if (String.isNullOrEmpty(measurementUnits))
			return null;
		if (!flightInfo || flightInfo === undefined)
			return null;

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

		results.info = this._initialize(flightInfo);
		processor.process(results, data, measurementUnits);
		console.log(results.info);

		return results;
	}

	_determineProcessor(processorId) {
		if (String.isNullOrEmpty(processorId))
			return null;

		const processor = this._serviceProcessors.find(s => {
			return s.id.toLowerCase() === processorId.toLowerCase();
		});
		return processor;
	}

	_initialize(flightInfo) {
		if (!flightInfo || flightInfo === undefined)
			return null;

		flightInfo.flightPath = [];
		return flightInfo;
	}

	registerProcessor(service) {
		if (!service || service === undefined)
			return;

		this._serviceProcessors.push(service);
	}
}

export default FlightPathService;
