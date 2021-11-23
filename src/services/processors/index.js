import AppUtility from '../../utility';

class FlightInfoProcessor {
	get id() {
		throw Error('Not Implemented');
	}

	process(results, data) {
		return this._process(results, data);
	}

	_convertAcceleration(value, measurementUnits) {
		if (!value)
			return value;

		if (measurementUnits === AppUtility.measurementUnitEnglish)
			return value;

		value = this._round(value * 0.3048);
		return value;
	}

	_convertAltitude(value, measurementUnits) {
		if (!value)
			return value;

		if (measurementUnits === AppUtility.measurementUnitEnglish)
			return value;

		value = this._round(value * 0.3048);
		return value;
	}

	_convertVelocity(value, measurementUnits) {
		if (!value)
			return value;

		if (measurementUnits === AppUtility.measurementUnitEnglish)
			return value;

		value = this._round(value * 0.3048);
		return value;
	}

	_process(results, data) {
		throw Error('Not Implemented');
	}

	_round(value, places = 2) {
		return Number(value.toFixed(places));
	}
}

export default FlightInfoProcessor;
