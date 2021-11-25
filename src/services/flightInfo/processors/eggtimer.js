import FlightInfoProcessorService from '.';

class EggtimerFlightInfoProcessorService extends FlightInfoProcessorService {
	get id() {
		return 'eggtimer';
	}

	_processInput(input) {
		this._enforceNotNull('EggtimerFlightInfoProcessor', '_processInput', input, 'input');

		for (const data of input.data) {
			this._publish(
				data[0],
				data[1],
				data[3],
				data[2],
				data[4],
				data[7],
				data[8],
				data[9],
				data[10],
				data.length < 1
			);
		}
	}
}

export default EggtimerFlightInfoProcessorService;
