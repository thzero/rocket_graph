import FlightPathProcessorService from '.';

class FeatherweightFlightPathProcessorService extends FlightPathProcessorService {
	get id() {
		return 'featherweight';
	}

	_processInput(input) {
		this._enforceNotNull('FeatherweightFlightPathProcessorService', '_processInput', input, 'input');

		const regex = /^[a-z]+$/i;
		const temp = input.data[0][4];
		if ((regex.exec(temp)) !== null)
			input.data.shift();

		let verticalV;
		for (const data of input.data) {
			verticalV = Number(data[8]);
			if (verticalV >= 0 && verticalV < 10)
				continue;
			if (verticalV > -10 && verticalV <= 0)
				continue;
			this._publish(
				// data[2], // time
				// data[5] - 595.67, // altitude
				// data[3], // latitude
				// data[4], // longitude
				// data[7], // verticalH
				// verticalV // verticalV
				data[1], // time
				data[2], // altitude
				data[3], // latitude
				data[4], // longitude
				data[7], // verticalH
				verticalV // verticalV
			);
		}
	}
}

export default FeatherweightFlightPathProcessorService;
