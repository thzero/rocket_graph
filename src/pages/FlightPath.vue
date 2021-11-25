<template>
	<div>
		<div class="q-pb-md q-gutter-sm"
			v-if="errors"
		>
			<q-banner rounded inline-actions dense class="bg-red text-white">
				<span v-html="errorMessage"></span>
			</q-banner>
		</div>
		<div class="row">
			<div class="col-12 text-center text-h5 q-pb-sm">
				{{ $t('titles.flightPath') }}
			</div>
		</div>
		<div class="row">
			<div class="col-5">
				<div class="row">
					<div class="col-7">
						<div class="q-pb-md q-pr-md">
							<q-input
								v-model="flightPathTitle"
								filled
								dense
								:label="$t('flightPath.title')"
							/>
							<q-input
								v-model="flightPathLocation"
								filled
								dense
								:label="$t('flightPath.location')"
							/>
							<q-input
								v-model="flightPathDate"
								filled
								dense
								mask="date"
								:label="$t('flightPath.date')"
							>
								<template v-slot:append>
									<q-icon name="event" class="cursor-pointer">
									<q-popup-proxy ref="qDateProxy" cover transition-show="scale" transition-hide="scale">
										<q-date v-model="flightPathDate">
										<div class="row items-center justify-end">
											<q-btn v-close-popup label="Close" color="primary" flat />
										</div>
										</q-date>
									</q-popup-proxy>
									</q-icon>
								</template>
							</q-input>
							<q-select
								ref="flightPathMeasurementUnits"
								v-model="flightPathMeasurementUnits"
								:options="flightPathMeasurementUnitsOptions"
								filled
								dense
								option-value="id"
								option-label="name"
								emit-value
								map-options
								hide-bottom-space
								:label="$t('flightPath.measurementUnits')"
								:rules="[val => !!val || $t('validation.required')]"
								@update:model-value="checkErrors"
							/>
							<q-select
								ref="flightPathDataType"
								v-model="flightPathDataType"
								:options="flightPathDataTypes"
								filled
								dense
								option-value="id"
								option-label="name"
								emit-value
								map-options
								hide-bottom-space
								:label="$t('flightPath.dataTypes')"
								:rules="[val => !!val || $t('validation.required')]"
								@update:model-value="checkErrors"
							/>
						</div>
					</div>
					<div class="col-5">
						<div class="q-pb-md">
							<q-input
								v-model="flightPathColorLaunchPin"
								filled
								dense
								:label="$t('flightPath.color.launch')"
							>
								<template v-slot:append>
								<q-icon name="colorize" class="cursor-pointer">
									<q-popup-proxy cover transition-show="scale" transition-hide="scale">
									<q-color v-model="flightPathColorLaunchPin" />
									</q-popup-proxy>
								</q-icon>
								</template>
							</q-input>
							<q-input
								v-model="flightPathColorFlight"
								filled
								dense
								:label="$t('flightPath.color.flight')"
							>
								<template v-slot:append>
								<q-icon name="colorize" class="cursor-pointer">
									<q-popup-proxy cover transition-show="scale" transition-hide="scale">
									<q-color v-model="flightPathColorFlight" />
									</q-popup-proxy>
								</q-icon>
								</template>
							</q-input>
							<q-input
								v-model="flightPathColorGround"
								filled
								dense
								:label="$t('flightPath.color.ground')"
							>
								<template v-slot:append>
								<q-icon name="colorize" class="cursor-pointer">
									<q-popup-proxy cover transition-show="scale" transition-hide="scale">
									<q-color v-model="flightPathColorGround" />
									</q-popup-proxy>
								</q-icon>
								</template>
							</q-input>
							<q-input
								v-model="flightPathColorTouchdownPin"
								filled
								dense
								:label="$t('flightPath.color.touchdown')"
							>
								<template v-slot:append>
								<q-icon name="colorize" class="cursor-pointer">
									<q-popup-proxy cover transition-show="scale" transition-hide="scale">
									<q-color v-model="flightPathColorTouchdownPin" />
									</q-popup-proxy>
								</q-icon>
								</template>
							</q-input>
						</div>
					</div>
				</div>
				<div class="row">
					<div class="col-12">
						<div class="q-pb-md float-right">
							<q-btn-group>
								<q-btn
									color="primary"
									:label="$t('process')"
									:disabled="buttons.process.disabled"
									@click="flightPathProcess"
									@focus="checkErrors"
								/>
								<q-btn
									color="primary"
									:label="$t('export')"
									:disabled="buttons.export.disabled"
									@click="flightPathExport"
								/>
								<q-btn
									color="primary"
									:label="$t('reset')"
									@click="resetInput"
								/>
							</q-btn-group>
						</div>
					</div>
				</div>
				<q-input
					ref="flightPathInput"
					v-model="flightPathInput"
					filled
					type="textarea"
					style="width: 100%"
					rows="15"
					:label="$t('flightPath.csv')"
					:rules="[val => !!val || $t('validation.required')]"
					@update:model-value="checkErrors"
					@blur="checkErrors"
					@focus="checkErrors"
					@mouseup="checkErrors"
					@keyup="checkErrors"
				/>
			</div>
			<div class="col-7 q-pl-md">
				<div
					id="flight-path"
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
	</div>
	<q-ajax-bar
      ref="bar"
      position="bottom"
      color="accent"
      size="10px"
      skip-hijack
    />
</template>

<script>
import { defineComponent } from 'vue';

import Papa from 'papaparse';

import Constants from '../constants';

import AppUtility from '../utility';

export default defineComponent({
	name: 'PageIndex',
	data: () => ({
		buttons: {
			export: {
				disabled: true
			},
			process: {
				disabled: true
			}
		},
		errorMessage: null,
		errorTimer: null,
		flightPath: null,
		flightPathColorFlight: '#0000ff',
		flightPathColorFlightDefault: '#0000ff',
		flightPathColorGround: '#000000',
		flightPathColorGroundDefault: '#000000',
		flightPathColorLaunchPin: '#ff0000',
		flightPathColorLaunchPinDefault: '#ff0000',
		flightPathColorTouchdownPin: '#00ff00',
		flightPathColorTouchdownPinDefault: '#00ff00',
		flightPathData: null,
		flightPathDataType: null,
		flightPathDataTypes: [],
		flightPathDate: null,
		flightPathInput: null,
		flightPathLocation: null,
		flightPathMeasurementUnits: null,
		flightPathMeasurementUnitsOptions: [],
		flightPathTitle: null,
		output: null,
		serviceDownload: null,
		serviceFlightPath: null
	}),
	computed: {
		errors() {
			return this.errorMessage;
		}
	},
	created() {
		this.serviceDownload = AppUtility.injector.getService(Constants.InjectorKeys.SERVICE_DOWNLOAD);
		this.serviceFlightPath = AppUtility.injector.getService(Constants.InjectorKeys.SERVICE_FLIGHT_PATH);
	},
	mounted() {
		this.reset();

		this.flightPathDataTypes = AppUtility.selectOptions(this.serviceFlightPath.serviceProcessors, this.$t, 'flightPath.processors', (l) => { return l.id; }, null, (l) => { return l.id; });
		this.flightPathMeasurementUnitsOptions = AppUtility.selectOptions(AppUtility.measurementUnits(), this.$t, 'measurements', null, (l) => { return l + '.altitude.name'; });
		this.flightPathMeasurementUnits = AppUtility.measurementUnitEnglish;
	},
	methods: {
		checkErrors() {
			this.$refs.flightPathInput.validate();
			this.$refs.flightPathDataType.validate();
			this.$refs.flightPathMeasurementUnits.validate();
			this.buttons.process.disabled = this.hasError();
		},
		flightPathExport() {
			if (!this.flightPathData || this.flightPathData === undefined)
				return;

			const currentDate = this.flightInfoDate ? new Date(this.flightInfoDate) : new Date();
			const day = currentDate.getDate();
			const month = currentDate.getMonth() + 1;
			const year = currentDate.getFullYear();

			const name = 'flight-path-' + day + '-' + month + '-' + year + '.kml';
			const barRef = this.$refs.bar;
			barRef.start();

			// this.serviceDownload.downloadUrl('data:text/plain;base64' + window.btoa(this.flightPathData),
			this.serviceDownload.download(this.flightPathData,
				name,
				() => {
					console.log('completed');
					barRef.stop();
				},
				() => {
					console.log('cancelled');
					barRef.stop();
				},
				(arg) => {
					console.log('progress');
					console.log(arg);
				}
			);
		},
		flightPathProcess() {
			this.reset();
			this.output = '';

			this.$refs.flightPathInput.validate();
			this.$refs.flightPathDataType.validate();
			this.$refs.flightPathMeasurementUnits.validate();

			if (this.hasError()) {
				this.setError(this.$t('errors.process.required'));
				return;
			}

			if (!this.flightPathInput || this.flightPathInput === '') {
				this.setError(this.$t('errors.process.noInput'));
				return;
			}

			const data = Papa.parse(this.flightPathInput.trim());
			if (data.errors && data.errors.length > 0) {
				this.setError(this.$t('errors.process.unableToConvert'));
				return;
			}

			const flightInfo = {
				date: this.flightPathDate,
				flightPathColor: this.flightPathColorFlight ?? this.flightPathColorFlightDefault,
				groundPathColor: this.flightPathColorGround ?? this.flightPathColorGroundDefault,
				launchPinColor: this.flightPathColorLaunchPin ?? this.flightPathColorLaunchPinDefault,
				touchdownPinColor: this.flightPathColorTouchdownPin ?? this.flightPathColorTouchdownPinDefault,
				location: this.flightPathLocation,
				title: this.flightPathTitle
			}
			const flightPathResults = this.serviceFlightPath.process(data, this.flightPathDataType, this.flightPathMeasurementUnits, flightInfo);
			this.flightPathData = flightPathResults.info.flightPath;
			// this.output = JSON.stringify(flightPathResults, null, 2);
			this.output = flightPathResults.info.flightPath;

			this.buttons.export.disabled = false;
		},
		hasError() {
			return (this.$refs.flightPathInput.hasError || this.$refs.flightPathDataType.hasError || this.$refs.flightPathMeasurementUnits.hasError);
		},
		reset() {
			this.buttons.export.disabled = true;
			this.errorMessage = null;
			if (this.errorTimer)
				clearTimeout(this.errorTimer);
			this.flightPath = null;
			this.flightPathData = null;
		},
		resetInput() {
			this.reset();
			this.flightPathDataType = null;
			this.flightPathDate = null;
			this.flightPathInput = null;
			this.flightPathLocation = null;
			this.flightPathTitle = null;
			this.buttons.process.disabled = true;
		},
		setError(message) {
			this.buttons.export.disabled = true;
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
