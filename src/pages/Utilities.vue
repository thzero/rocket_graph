<template>
	<div>
		<div class="row">
			<div class="col-12 text-center text-h5 q-pb-sm">
				{{ $t('titles.utilities') }}
			</div>
		</div>
		<div class="row">
			<div class="col-12 q-pb-sm">
				<q-toolbar>
					<q-btn
						class="q-mr-sm"
						color="secondary"
						clickable
						:flat="calculator === 'foam'"
						:label="$t('menu.calculators.foam')"
						@click="showCalculator('foam')"
					/>
					<q-btn
						class="q-mr-sm"
						color="secondary"
						clickable
						:label="$t('menu.calculators.ejectionCharge')"
						@click="showCalculator('ejectionCharge')"
					/>
					<q-btn
						color="secondary"
						clickable
						:label="$t('menu.calculators.staticPorts')"
						@click="showCalculator('staticPorts')"
					/>
				</q-toolbar>
			</div>
			<div class="col-12">
				<calculatorFoam
					v-if="calculator === 'foam'"
				/>
				<calculatorEjectionCharge
					v-if="calculator === 'ejectionCharge'"
				/>
				<calculatorStaticPorts
					v-if="calculator === 'staticPorts'"
				/>
			</div>
		</div>
	</div>
</template>

<script>
import { defineComponent } from 'vue';

import basePage from './basePage.vue';

import calculatorFoam from '../components/calculators/foam.vue';
import calculatorEjectionCharge from '../components/calculators/ejectionCharge.vue';
import calculatorStaticPorts from '../components/calculators/staticPorts.vue';

export default defineComponent({
	name: 'PageIndex',
	extends: basePage,
	components: {
		calculatorFoam,
		calculatorEjectionCharge,
		calculatorStaticPorts
	},
	data: () => ({
		calculator: null
	}),
	methods: {
		showCalculator(hello) {
			this.calculator = hello;
		}
	}
});
</script>
