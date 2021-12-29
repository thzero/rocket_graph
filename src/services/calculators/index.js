// import Decimal from 'decimal.js';

import { create, all } from 'mathjs';

import Service from '../index';

class CalculatorService extends Service {
	constructor() {
		super();

		const config = {
			number: 'BigNumber'
		};
		this.math = create(all, config);
	}

	init(injector) {
	}

	process(data) {
	}

	_decimal(value) {
		return this.math.bignumber(value);
	}

	_decimalUnit(value, unitAbbr) {
		return this.math.unit(value + ' ' + unitAbbr);
	}

	_decimalPi() {
		return this.math.bignumber(Math.PI);
	}

	_decimalPow(x, y) {
		return this.math.pow(x, y);
	}
}

export default CalculatorService;
