import AppUtility from '../../utility';

class FlightInfoProcessor {
	get id() {
		throw Error('Not Implemented');
	}

	process(results, input, measurementUnits) {
		results = this._process(results, input, measurementUnits);

		results.info.acceleration.avg.value = this._round(results.info.acceleration.avg.temp / results.info.acceleration.avg.count);
		results.info.acceleration.min.drogue.avg.value = this._round(results.info.acceleration.min.drogue.avg.temp / results.info.acceleration.min.drogue.avg.count);
		results.info.acceleration.min.main.avg.value = this._round(results.info.acceleration.min.main.avg.temp / results.info.acceleration.min.main.avg.count);

		results.info.velocity.avg.value = this._round(results.info.velocity.avg.temp / results.info.velocity.avg.count);
		results.info.velocity.min.drogue.avg.value = this._round(results.info.velocity.min.drogue.avg.temp / results.info.velocity.min.drogue.avg.count);
		results.info.velocity.min.main.avg.value = this._round(results.info.velocity.min.main.avg.temp / results.info.velocity.min.main.avg.count);

		return results;
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

	_process(results, input, measurementUnits) {
		throw Error('Not Implemented');
	}

	_round(value, places = 2) {
		return Number(value.toFixed(places));
	}
}

export default FlightInfoProcessor;
