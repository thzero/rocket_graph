import Constants from '../constants';

require('../utility/string');
import AppUtility from '../utility';

// TODO: Convert to library dependencies
class Injector {
	constructor() {
		this._services = new Map();
	}

	getService(name) {
		if (String.isNullOrEmpty(name))
			throw Error('Invalid service name.');

		return this._services.get(name);
	}

	registerService(name, service) {
		if (String.isNullOrEmpty(name))
			throw Error('Invalid service name.');

		if (AppUtility.isNull(service))
			throw Error('Invalid service instance.');

		if (this._services.has(name))
			return;

		this._services.set(name, service);
	}
}

export default async () => {
	AppUtility.isDebug = process.env.NODE_ENV === 'development';
	AppUtility.injector = new Injector();

	let StoreService;
	if (process.env.MODE === 'electron') {
		const { default: ElectronStoreService } = await import('../services/store/electron');
		if (ElectronStoreService)
			StoreService = ElectronStoreService;
	}
	else
		throw Error('Not Implemented');

	if (!StoreService)
		throw Error(Constants.InjectorKeys.SERVICE_STORE_EXTERNAL + ' Not Implemented');

	AppUtility.injector.registerService(Constants.InjectorKeys.SERVICE_STORE_EXTERNAL, new StoreService());
};
