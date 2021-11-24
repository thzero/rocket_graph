import Constants from '../constants';

import AppUtility from '../utility';

// TODO: Convert to library dependencies
import ElectronDownloadService from '../services/download/electron';
import ElectronStoreService from '../services/store/electron';
import ElectronWindowService from '../services/window/electron';

import EggtimerFlightInfoProcessorService from '../services/processors/eggtimer';
import FlightInfoService from '../services/flightInfo';

// TODO: Convert to library dependencies
class Injector {
	constructor() {
		this._services = new Map();
	}

	getService(name) {
		if (!name || name === undefined || name === '')
			return;

		return this._services.get(name);
	}

	registerService(name, service) {
		if (!name || name === undefined || name === '')
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

	// TODO: Convert to library dependencies
	const flightInfoService = new FlightInfoService();

	if (process.env.MODE === 'electron') {
		AppUtility.injector.registerService(Constants.InjectorKeys.SERVICE_STORE_EXTERNAL, new ElectronStoreService());
		AppUtility.injector.registerService(Constants.InjectorKeys.SERVICE_DOWNLOAD, new ElectronDownloadService());
		AppUtility.injector.registerService(Constants.InjectorKeys.SERVICE_WINDOW, new ElectronWindowService());
	}
	else
		throw Error('Not Implemented');

	AppUtility.injector.registerService(Constants.InjectorKeys.SERVICE_FLIGHT_INFO, flightInfoService);
	AppUtility.injector.registerService(Constants.InjectorKeys.SERVICE_FLIGHT_INFO_PROCESSOR_EGGTIMER, new EggtimerFlightInfoProcessorService());

	// TODO: Convert to library dependencies
	flightInfoService.init(AppUtility.injector);
};
