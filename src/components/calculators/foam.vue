<template>
	<div>
		<div class="q-pb-md q-gutter-sm"
			v-if="errors"
		>
			<q-banner rounded inline-actions dense class="bg-red text-white">
				<span v-html="errorMessage"></span>
			</q-banner>
		</div>
	</div>
	<div class="row">
		<div class="col-3 q-pb-md">
			<div class="row">
				<div class="col-12">
					<q-input
						v-model="tubes.bodyID.value"
						type="text"
						mask="#.###"
						fill-mask="0"
						filled
						dense
						hide-bottom-space
						:label="$t('flightInfo.title')"
						:rules="[
							val => !!val || $t('validation.required'),
							val => (val > 0 && val < 100) || 'Must be between 0 and 100'
						]"
						@update:model-value="checkErrors"
					/>
					<q-input
						v-model="tubes.motorID.value"
						type="text"
						mask="#.###"
						fill-mask="0"
						filled
						dense
						hide-bottom-space
						:label="$t('flightInfo.location')"
						:rules="[
							val => !!val || $t('validation.required'),
							val => (val > 0 && val < 100) || 'Must be between 0 and 100'
						]"
						@update:model-value="checkErrors"
					/>
					<q-input
						v-model="fins.pocketLength.value"
						type="text"
						mask="#.###"
						fill-mask="0"
						filled
						dense
						hide-bottom-space
						:label="$t('flightInfo.location')"
						:rules="[
							val => !!val || $t('validation.required'),
							val => (val > 0 && val < 100) || 'Must be between 0 and 100'
						]"
						@update:model-value="checkErrors"
					/>
					<q-input
						v-model="fins.tabLength.value"
						type="text"
						mask="#.###"
						fill-mask="0"
						filled
						dense
						hide-bottom-space
						:label="$t('flightInfo.title')"
						:rules="[
							val => !!val || $t('validation.required'),
							val => (val > 0 && val < 100) || 'Must be between 0 and 100'
						]"
						@update:model-value="checkErrors"
					/>
					<q-input
						v-model="fins.width.value"
						type="text"
						mask="#.###"
						fill-mask="0"
						filled
						dense
						hide-bottom-space
						:label="$t('flightInfo.title')"
						:rules="[
							val => !!val || $t('validation.required'),
							val => (val > 0 && val < 100) || 'Must be between 0 and 100'
						]"
						@update:model-value="checkErrors"
					/>
					<q-input
						v-model="fins.number"
						type="text"
						mask="#"
						fill-mask="0"
						filled
						dense
						hide-bottom-space
						:label="$t('flightInfo.title')"
						:rules="[
							val => !!val || $t('validation.required'),
							val => (val > 0 && val < 10) || 'Must be between 0 and 100'
						]"
						@update:model-value="checkErrors"
					/>
				</div>
			</div>
			<div class="row">
				<div class="col-12">
					<div class="float-right q-mt-sm">
						<q-btn
							class="q-mr-sm"
							dense
							color="primary"
							:label="$t('button.save')"
							:disable="processing"
							@click="submit"
						/>
					</div>
				</div>
			</div>
		</div>
		<div class="col-7 q-pl-md">
			<div
				class="row" style="color: black; background-color: white"
			>
				<div
					ref="output"
					class="col-12"
				>
					<pre>
{{ output }}
					</pre>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import { defineComponent } from 'vue';

import Constants from '../../constants';
import CalculatorConstants from '../../services/calculators/constants';

import AppUtility from '../../utility';

import baseComponent from '../baseComponent.vue';

export default defineComponent({
	name: 'FoamCalculators',
	extends: baseComponent,
	computed: {
	},
	data: () => ({
		fins: {
			number: 0,
			pocketLength: {
				value: 0,
				unitType: null
			},
			tabLength: {
				value: 0,
				unitType: null
			},
			width: {
				value: 0,
				unitType: null
			}
		},
		tubes: {
			bodyID: {
				value: 0,
				unitType: null
			},
			motorID: {
				value: 0,
				unitType: null
			}
		},
		calculations: {
			volume: {
				fins: {
					volume: 0,
					unitType: null
				},
				total: 0,
				tubes: {
					body: {
						value: 0,
						unitType: null
					},
					motor: {
						value: 0,
						unitType: null
					},
					difference: 0
				},
				foam: [
				]
			}
		},
		output: '',
		processing: false,
		serviceCalculatorFoam: null,
		units: {
			id: null,
			lengthDefault: null
		}
	}),
	created() {
		this.serviceCalculatorFoam = AppUtility.injector.getService(Constants.InjectorKeys.SERVICE_CALCULATOR_FOAM);
	},
	mounted() {
		this.units.id = CalculatorConstants.Units.English.id; // TODO
		this.units.lengthDefault = CalculatorConstants.Units.English.inch; // TODO

		this.fins.pocketLength.value = '8.25';
		this.fins.tabLength.value = '8.25';
		this.fins.width.value = '0.125';
		this.fins.number = '4';
		this.tubes.bodyID.value = '3.04';
		this.tubes.motorID.value = '2.26';

		this.fins.pocketLength.unitType = CalculatorConstants.Units.English.inch;
		this.fins.tabLength.unitType = CalculatorConstants.Units.English.inch;
		this.fins.width.unitType = CalculatorConstants.Units.English.inch;
		this.tubes.bodyID.unitType = CalculatorConstants.Units.English.inch;
		this.tubes.motorID.unitType = CalculatorConstants.Units.English.inch;

		this.reset();
	},
	methods: {
		checkErrors() {
			// this.$refs.flightInfoInput.validate();
			// this.$refs.flightInfoMeasurementUnits.validate();
			// this.$refs.flightInfoProcessor.validate();

			// this.flightInfoDataTypeError = !(this.flightInfoDataTypeActual || this.flightInfoDataTypeFiltered);

			// this.buttons.process.disabled = this.hasError();
		},
		submit() {
			// this.processing = true;
			// AppUtility.$store.dispatch('setFlightInfoStyle', style);

			const data = {
				fins: this.fins,
				tubes: this.tubes,
				units: this.units
			};

			const results = this.serviceCalculatorFoam.process(data);
			this.output = JSON.stringify(results, null, 2);

			// this.processing = false;

			this.notify('messages.saved');
		},
		hasError() {
			return (
				false
			);
		},
		reset() {
		},
		resetInput() {
			this.reset();

			this.notify('messages.reset');
		},
		setError(message) {
			// this.buttons.export.disabled = true;
			this.errorMessage = message;

			this.errorTimer = setTimeout(() => {
				this.errorMessage = null;
				clearTimeout(this.errorTimer);
			},
			3000);
		}
	}
});
</script>

<style scoped>
</style>
