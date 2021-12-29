const Constants = {
	Units: {
		English: {
			id: 'english',
			foot: 'ft',
			inch: 'in',
			cubic: {
				foot: 'cuft',
				inch: 'cuin'
			},
			fluid: {
				ounce: 'floz'
			},
			weight: {
				pound: 'lb',
				ounce: 'oz'
			}
		},
		Metrics: {
			id: 'metrics',
			millimeter: 'mm',
			centimeter: 'cm',
			meter: 'm',
			cubic: {
				meter: 'm3'
			},
			fluid: {
				milliliter: 'ml'
			},
			weight: {
				gram: 'g'
			}
		},
		Values: ['english', 'metrics']
	}
}

export default Constants;
