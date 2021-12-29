import Results from '../results';

import CalculatorConstants from './constants';

import CalculatorService from './';

class FoamCalculatorService extends CalculatorService {
	process(data) {
		this._enforceNotNull('FoamCalculatorService', 'process', data, 'data');
		this._enforceNotNull('FoamCalculatorService', 'process', data.fins.number, 'data.fins.number');
		this._enforceNotNull('FoamCalculatorService', 'process', data.fins.pocketLength.value, 'data.fins.pocketLength');
		this._enforceNotNull('FoamCalculatorService', 'process', data.fins.tabLength.value, 'data.fins.tabLength');
		this._enforceNotNull('FoamCalculatorService', 'process', data.fins.width.value, 'data.fins.width');
		this._enforceNotNull('FoamCalculatorService', 'process', data.tubes.bodyID.value, 'data.tubes.bodyID');
		this._enforceNotNull('FoamCalculatorService', 'process', data.tubes.motorID.value, 'data.tubes.motorID');
		this._enforceNotEmpty('FoamCalculatorService', 'process', data.units, 'data.units');

		data.fins.number = this._decimal(data.fins.number);
		data.fins.pocketLength.value = this._decimalUnit(data.fins.pocketLength.value, data.fins.pocketLength.unitType);
		data.fins.tabLength.value = this._decimalUnit(data.fins.tabLength.value, data.fins.tabLength.unitType);
		data.fins.width.value = this._decimalUnit(data.fins.width.value, data.fins.width.unitType);
		data.tubes.bodyID.value = this._decimalUnit(data.tubes.bodyID.value, data.tubes.bodyID.unitType);
		data.tubes.motorID.value = this._decimalUnit(data.tubes.motorID.value, data.tubes.motorID.unitType);

		const results = new Results();
		results.info = {
			volume: {
				fins: {
					value: 0,
					number: 0,
					unitType: null
				},
				total: {
					value: 0,
					number: 0,
					unitType: null,
					fluid: {
						value: 0,
						number: 0,
						unitType: null
					}
				},
				tubes: {
					body: {
						value: 0,
						number: 0,
						unitType: null
					},
					motor: {
						value: 0,
						number: 0,
						unitType: null
					},
					difference: {
						value: 0,
						number: 0,
						unitType: null
					}
				},
				foams: [
				]
			}
		};

		results.info.volume.tubes.body.value = this.math.multiply(this._decimalPi(), this._decimalPow(this.math.divide(data.tubes.bodyID.value, 2), 2), data.fins.pocketLength.value);
		results.info.volume.tubes.body.number = results.info.volume.tubes.body.value.toNumber();
		results.info.volume.tubes.motor.value = this.math.multiply(this._decimalPi(), this._decimalPow(this.math.divide(data.tubes.motorID.value, 2), 2), data.fins.pocketLength.value);
		results.info.volume.tubes.motor.number = results.info.volume.tubes.motor.value.toNumber();
		results.info.volume.tubes.difference.value = this.math.subtract(results.info.volume.tubes.body.value, results.info.volume.tubes.motor.value);
		results.info.volume.tubes.difference.number = results.info.volume.tubes.difference.value.toNumber();

		results.info.volume.fins.value = this.math.multiply(data.fins.tabLength.value, data.fins.width.value, this.math.subtract(data.tubes.bodyID.value, data.tubes.motorID.value));
		results.info.volume.fins.number = results.info.volume.fins.value.toNumber();

		results.info.volume.total.value = this.math.subtract(results.info.volume.tubes.body.value, this.math.add(results.info.volume.tubes.motor.value, results.info.volume.fins.value));
		results.info.volume.total.number = results.info.volume.total.value.toNumber();

		const unit = (data.units === CalculatorConstants.Units.English.id) ? CalculatorConstants.Units.English.fluid.ounce : CalculatorConstants.Units.Metrics.fluid.milliliter;
		results.info.volume.total.fluid.value = results.info.volume.total.value.to(unit);
		results.info.volume.total.fluid.number = results.info.volume.total.fluid.value.toNumber();

		results.info.foams = this._foams(results.info.volume.total.value, CalculatorConstants.Units.English.cubic.inch, CalculatorConstants.Units.English.weight.ounce);

		return results;
	}

	_foams(volume, unitTypeV, unitTypeW) {
		const foams = [
			{
				expansion: 10,
				volume: {
					value: 6,
					number: 0,
					converted: {
						value: 0,
						number: 0
					}
				},
				weight: {
					value: 0,
					number: 0
				},
				type: 'Public Missiles',
				unit: CalculatorConstants.Units.English.id,
				unitTypeV: CalculatorConstants.Units.English.cubic.foot,
				unitTypeW: CalculatorConstants.Units.English.weight.pound
			},
			{
				expansion: 15,
				volume: {
					value: 4,
					number: 0,
					converted: {
						value: 0,
						number: 0
					}
				},
				weight: {
					value: 0,
					number: 0
				},
				type: 'Public Missiles',
				unit: CalculatorConstants.Units.English.id,
				unitTypeV: CalculatorConstants.Units.English.cubic.foot,
				unitTypeW: CalculatorConstants.Units.English.weight.pound
			},
			{
				expansion: 20,
				volume: {
					value: 3,
					number: 0,
					converted: {
						value: 0,
						number: 0
					}
				},
				weight: {
					value: 0,
					number: 0
				},
				type: 'Public Missiles',
				unit: CalculatorConstants.Units.English.id,
				unitTypeV: CalculatorConstants.Units.English.cubic.foot,
				unitTypeW: CalculatorConstants.Units.English.weight.pound
			},
			{
				expansion: 10,
				volume: {
					value: 5,
					number: 0,
					converted: {
						value: 0,
						number: 0
					}
				},
				weight: {
					value: 0,
					number: 0
				},
				type: 'FOAM-iT!',
				unit: CalculatorConstants.Units.English.id,
				unitTypeV: CalculatorConstants.Units.English.cubic.foot,
				unitTypeW: CalculatorConstants.Units.English.weight.pound
			}
		];

		for (const foam of foams) {
			foam.volume.value = this._decimalUnit(foam.volume.value, foam.unitTypeW);
			foam.volume.number = foam.volume.value.toNumber();

			foam.volume.converted.value = foam.volume.value.to(unitTypeW);
			foam.volume.converted.number = foam.volume.converted.value.toNumber();

			const converted = this._decimalUnit(1, foam.unitTypeV).to(unitTypeV);
			foam.volume.converted.value2 = this.math.divide(foam.volume.converted.value, converted);
			foam.volume.converted.number2 = foam.volume.converted.value2.toNumber();

			foam.weight.value = this.math.multiply(foam.volume.converted.value2, volume);
			foam.weight.number = foam.weight.value.toNumber();
		}

		return foams;
	}
}

export default FoamCalculatorService;
