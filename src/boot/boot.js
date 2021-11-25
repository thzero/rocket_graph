import Constants from '../constants';

require('../utility/string');
import AppUtility from '../utility';

// TODO: Convert to library dependencies
import ElectronDownloadService from '../services/download/electron';
import ElectronStoreService from '../services/store/electron';
import ElectronWindowService from '../services/window/electron';

import FlightInfoService from '../services/flightInfo';
import EggtimerFlightInfoProcessorService from '../services/flightInfo/processors/eggtimer';

import FlightPathService from '../services/flightPath';
import FeatherweightFlightPathProcessorService from '../services/flightPath/processors/featherweight';

// TODO: Convert to library dependencies
class Injector {
	constructor() {
		this._services = new Map();
	}

	getService(name) {
		if (String.isNullOrEmpty(name))
			return;

		return this._services.get(name);
	}

	registerService(name, service) {
		if (String.isNullOrEmpty(name))
			return;

		if (!service || service === undefined)
			return;

		if (this._services.has(name))
			return;

		this._services.set(name, service);
	}
}

export default function () {
	AppUtility.injector = new Injector();

	if (process.env.MODE === 'electron') {
		AppUtility.injector.registerService(Constants.InjectorKeys.SERVICE_STORE_EXTERNAL, new ElectronStoreService());
		AppUtility.injector.registerService(Constants.InjectorKeys.SERVICE_DOWNLOAD, new ElectronDownloadService());
		AppUtility.injector.registerService(Constants.InjectorKeys.SERVICE_WINDOW, new ElectronWindowService());
	}
	else
		throw Error('Not Implemented');

	// TODO: Convert to library dependencies
	const flightInfoService = new FlightInfoService();
	AppUtility.injector.registerService(Constants.InjectorKeys.SERVICE_FLIGHT_INFO, flightInfoService);
	AppUtility.injector.registerService(Constants.InjectorKeys.SERVICE_FLIGHT_INFO_PROCESSOR_EGGTIMER, new EggtimerFlightInfoProcessorService());
	// TODO: Convert to library dependencies
	flightInfoService.init(AppUtility.injector);

	// TODO: Convert to library dependencies
	const flightPathService = new FlightPathService();
	AppUtility.injector.registerService(Constants.InjectorKeys.SERVICE_FLIGHT_PATH, flightPathService);
	AppUtility.injector.registerService(Constants.InjectorKeys.SERVICE_FLIGHT_PATH_PROCESSOR_FEATHERWEIGHT, new FeatherweightFlightPathProcessorService());
	// TODO: Convert to library dependencies
	flightPathService.init(AppUtility.injector);
};
