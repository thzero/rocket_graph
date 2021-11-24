import packageJson from '../package.json';

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

class AppUtility {
	static measurementUnitEnglish = 'english';
	static measurementUnitMetric = 'metric';

	static injector = new Injector();

	static measurementUnits() {
		return [AppUtility.measurementUnitEnglish, AppUtility.measurementUnitMetric];
	}

	static selectOptions(options, trans, prefix, funcId, funcName, funcValue) {
		if (!options || !trans || !Array.isArray(options))
			return [];

		prefix = (prefix && prefix !== '') ? prefix + '.' : '';

		const output = options.map(l => {
			let id = l;
			if (funcId)
				id = funcId(l);

			let nameLookup = id;
			if (funcName)
				nameLookup = funcName(l);
			let name = trans(prefix + nameLookup);
			if (!name || name === undefined || name === '')
				name = trans(prefix + nameLookup + '.title');

			let value = l;
			if (funcValue)
				value = funcValue(l);

			return {
				id: id,
				name: name,
				value: value
			};
		});
		return output;
	}

	static version() {
		console.log(packageJson);
		return packageJson.version + ' ' + packageJson.version_date;
	}
}

export default AppUtility;
