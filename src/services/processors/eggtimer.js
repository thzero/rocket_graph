import FlightInfoProcessor from '.';

class EggtimerFlightInfoProcessor extends FlightInfoProcessor {
	get id() {
		return 'eggtimer';
	}

	_process(results, input, measurementUnits) {
		if (!results || results === undefined)
			return;
		if (!input || input === undefined)
			return;
		if (!measurementUnits || measurementUnits === undefined || measurementUnits === '')
			return;

		let altitude;
		let altitudeF;
		let apogee;
		let apogeeAchieved = false;
		let drogue;
		let drogueFired = false;
		let main;
		let mainFired = false;
		let noseOver;
		let time;
		let velocity;
		let velocityF;
		let previousTime = 0;
		let previousVelocity = 0;
		// let previousVelocityF = 0;
		let deltaT;
		let deltaV;
		let acceleration;
		for (const data of rawData.data) {
			time = Number(data[0]);

			results.info.time.push(time);

			altitude = this._convertAltitude(Number(data[1]), measurementUnits);
			results.info.altitude.data.push(altitude);

			velocity = this._convertVelocity(Number(data[2]), measurementUnits);
			results.info.velocity.data.push(velocity);

			altitudeF = this._convertAltitude(Number(data[3]), measurementUnits);
			results.info.altitude.dataF.push(altitudeF);

			velocityF = this._convertVelocity(Number(data[4]), measurementUnits);
			results.info.velocity.dataF.push(velocityF);

			apogee = Number(data[7]);
			if (apogee > 0) {
				apogeeAchieved = true;
				apogee = this._convertAltitude(apogee, measurementUnits);
				results.info.altitude.max = apogee;
				results.info.events.apogee.altitude = apogee;
				results.info.events.apogee.time = time;
				results.info.events.apogee.data.push(apogee);
			}
			else
				results.info.events.apogee.data.push('N/A');

			noseOver = Number(data[8]);
			if (noseOver > 0) {
				noseOver = this._convertAltitude(noseOver, measurementUnits);
				results.info.events.noseOver.altitude = noseOver;
				results.info.events.noseOver.time = time;
				results.info.events.noseOver.data.push(noseOver);
			}
			else
				results.info.events.noseOver.data.push('N/A');

			drogue = Number(data[9]);
			if (drogue > 0) {
				drogueFired = true;
				drogue = this._convertAltitude(drogue, measurementUnits);
				results.info.events.drogue.altitude = drogue;
				results.info.events.drogue.time = time;
				results.info.events.drogue.data.push(drogue);
			}
			else
				results.info.events.drogue.data.push('N/A');

			main = Number(data[10]);
			if (main > 0) {
				mainFired = true;
				main = this._convertAltitude(main, measurementUnits);
				results.info.events.main.altitude = main;
				results.info.events.main.time = time;
				results.info.events.main.data.push(main);
			}
			else
				results.info.events.main.data.push('N/A');

			if (data.length > 1)
				results.info.events.ground.time = time;

			if (velocityF > results.info.velocity.max.value) {
				results.info.velocity.max.altitude = altitudeF;
				results.info.velocity.max.time = time;
				results.info.velocity.max.value = velocityF;
			}

			if (velocityF < results.info.velocity.min.value) {
				results.info.velocity.min.altitude = altitudeF;
				results.info.velocity.min.time = time;
				results.info.velocity.min.value = velocityF;
			}

			if (apogeeAchieved) {
				results.info.velocity.avg.temp += velocity;
				results.info.velocity.avg.count++;
			}

			if (drogueFired) {
				if (velocityF < results.info.velocity.min.drogue.max.value) {
					results.info.velocity.min.drogue.max.altitude = altitudeF;
					results.info.velocity.min.drogue.max.time = time;
					results.info.velocity.min.drogue.max.value = velocity;
				}

				if (velocityF > results.info.velocity.min.drogue.min.value) {
					results.info.velocity.min.drogue.min.altitude = altitudeF;
					results.info.velocity.min.drogue.min.time = time;
					results.info.velocity.min.drogue.min.value = velocity;
				}

				results.info.velocity.min.drogue.avg.temp += velocity;
				results.info.velocity.min.drogue.avg.count++;
			}

			if (mainFired) {
				if (velocityF < results.info.velocity.min.main.max.value) {
					results.info.velocity.min.main.max.altitude = altitudeF;
					results.info.velocity.min.main.max.time = time;
					results.info.velocity.min.main.max.value = velocity;
				}

				if (velocityF > results.info.velocity.min.main.min.value) {
					results.info.velocity.min.main.min.altitude = altitudeF;
					results.info.velocity.min.main.min.time = time;
					results.info.velocity.min.main.min.value = velocity;
				}

				results.info.velocity.min.main.avg.temp += velocity;
				results.info.velocity.min.main.avg.count++;
			}

			deltaT = time - previousTime;
			if (velocityF > 0) {
				if (velocityF > previousVelocity) {
					deltaV = velocityF - previousVelocity;
					acceleration = this._round(deltaT > 0 ? deltaV / deltaT : 0);
					results.info.acceleration.avg.temp = acceleration;
					results.info.acceleration.avg.count++;
				}
				else
					acceleration = 0;
				if (acceleration > results.info.acceleration.max.value) {
					results.info.acceleration.max.altitude = altitudeF;
					results.info.acceleration.max.time = time;
					results.info.acceleration.max.value = acceleration;
				}
			}

			if (velocityF < 0) {
				if (velocityF < previousVelocity) {
					deltaV = velocityF - previousVelocity;
					acceleration = this._round(deltaV / deltaT);
				}
				else
					acceleration = 0;

				if (acceleration < results.info.acceleration.min.value) {
					results.info.acceleration.min.altitude = altitudeF;
					results.info.acceleration.min.time = time;
					results.info.acceleration.min.value = acceleration;
				}

				if (drogueFired) {
					// if (acceleration < results.info.acceleration.min.drogue.value) {
					// 	results.info.acceleration.min.drogue.altitude = altitudeF;
					// 	results.info.acceleration.min.drogue.time = time;
					// 	results.info.acceleration.min.drogue.value = acceleration;
					// }

					if (acceleration < results.info.acceleration.min.drogue.max.value) {
						results.info.acceleration.min.drogue.max.altitude = altitudeF;
						results.info.acceleration.min.drogue.max.time = time;
						results.info.acceleration.min.drogue.max.value = acceleration;
					}

					if (velocityF > results.info.acceleration.min.drogue.min.value) {
						results.info.acceleration.min.drogue.min.altitude = altitudeF;
						results.info.acceleration.min.drogue.min.time = time;
						results.info.acceleration.min.drogue.min.value = acceleration;
					}

					results.info.acceleration.min.drogue.avg.temp += acceleration;
					results.info.acceleration.min.drogue.avg.count++;
				}

				if (mainFired) {
					// if (acceleration < results.info.acceleration.min.main.value) {
					// 	results.info.acceleration.min.main.altitude = altitudeF;
					// 	results.info.acceleration.min.main.time = time;
					// 	results.info.acceleration.min.main.value = acceleration;
					// }

					if (acceleration < results.info.acceleration.min.main.max.value) {
						results.info.acceleration.min.main.max.altitude = altitudeF;
						results.info.acceleration.min.main.max.time = time;
						results.info.acceleration.min.main.max.value = acceleration;
					}

					if (acceleration > results.info.acceleration.min.main.min.value) {
						results.info.acceleration.min.main.min.altitude = altitudeF;
						results.info.acceleration.min.main.min.time = time;
						results.info.acceleration.min.main.min.value = acceleration;
					}

					results.info.acceleration.min.main.avg.temp += acceleration;
					results.info.acceleration.min.main.avg.count++;
				}
			}

			previousTime = time;
			previousVelocity = velocity;
			// previousVelocityF = velocityF;
		}

		// results.info.acceleration.avg.value = this._round(results.info.acceleration.avg.temp / results.info.acceleration.avg.count);
		// results.info.acceleration.min.drogue.avg.value = this._round(results.info.acceleration.min.drogue.avg.temp / results.info.acceleration.min.drogue.avg.count);
		// results.info.acceleration.min.main.avg.value = this._round(results.info.acceleration.min.main.avg.temp / results.info.acceleration.min.main.avg.count);

		// results.info.velocity.avg.value = this._round(results.info.velocity.avg.temp / results.info.velocity.avg.count);
		// results.info.velocity.min.drogue.avg.value = this._round(results.info.velocity.min.drogue.avg.temp / results.info.velocity.min.drogue.avg.count);
		// results.info.velocity.min.main.avg.value = this._round(results.info.velocity.min.main.avg.temp / results.info.velocity.min.main.avg.count);

		return results;
	}
}

export default EggtimerFlightInfoProcessor;
