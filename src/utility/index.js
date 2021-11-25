import packageJson from '../../package.json';

class AppUtility {
	static measurementUnitEnglish = 'english';
	static measurementUnitMetric = 'metric';

	static isNull(value) {
		return !value || value === undefined;
	}

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
			if (String.isNullOrEmpty(name))
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
