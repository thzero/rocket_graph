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
								:mask="dateFormatMask"
								:label="$t('flightPath.date')"
							>
								<template v-slot:append>
									<q-icon name="event" class="cursor-pointer">
									<q-popup-proxy ref="qDateProxy" cover transition-show="scale" transition-hide="scale">
										<q-date
											v-model="flightPathDate"
											:mask="dateFormat"
										>
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
								ref="flightPathProcessor"
								v-model="flightPathProcessor"
								:options="flightPathProcessors"
								filled
								dense
								option-value="id"
								option-label="name"
								emit-value
								map-options
								hide-bottom-space
								:label="$t('flightPath.processors.title')"
								:rules="[val => !!val || $t('validation.required')]"
								@update:model-value="checkErrors"
							/>
						</div>
					</div>
					<div class="col-5">
						<div class="q-pb-md">
							<q-input
								v-model="flightPathStylePinLaunchColor"
								filled
								dense
								:label="$t('flightPath.style.launch.color')"
							>
								<template v-slot:prepend>
									<div :style="'height: 25px; width: 25px; background-color: ' + flightPathStylePinLaunchColor">
									</div>
								</template>
								<template v-slot:append>
									<q-icon name="colorize" class="cursor-pointer">
										<q-popup-proxy cover transition-show="scale" transition-hide="scale">
											<q-color v-model="flightPathStylePinLaunchColor" />
										</q-popup-proxy>
									</q-icon>
								</template>
							</q-input>
							<q-input
								v-model="flightPathStylePathFlightColor"
								filled
								dense
								:label="$t('flightPath.style.flight.color')"
							>
								<template v-slot:prepend>
									<div :style="'height: 25px; width: 25px; background-color: ' + flightPathStylePathFlightColor">
									</div>
								</template>
								<template v-slot:append>
									<q-icon name="colorize" class="cursor-pointer">
										<q-popup-proxy cover transition-show="scale" transition-hide="scale">
											<q-color v-model="flightPathStylePathFlightColor" />
										</q-popup-proxy>
									</q-icon>
								</template>
							</q-input>
							<q-input
								v-model="flightPathStylePathGroundColor"
								filled
								dense
								:label="$t('flightPath.style.ground.color')"
							>
								<template v-slot:prepend>
									<div :style="'height: 25px; width: 25px; background-color: ' + flightPathStylePathGroundColor">
									</div>
								</template>
								<template v-slot:append>
									<q-icon name="colorize" class="cursor-pointer">
										<q-popup-proxy cover transition-show="scale" transition-hide="scale">
											<q-color v-model="flightPathStylePathGroundColor" />
										</q-popup-proxy>
									</q-icon>
								</template>
							</q-input>
							<q-input
								v-model="flightPathStylePinTouchdownColor"
								filled
								dense
								:label="$t('flightPath.style.touchdown.color')"
							>
								<template v-slot:prepend>
									<div :style="'height: 25px; width: 25px; background-color: ' + flightPathStylePinTouchdownColor">
									</div>
								</template>
								<template v-slot:append>
									<q-icon name="colorize" class="cursor-pointer">
										<q-popup-proxy cover transition-show="scale" transition-hide="scale">
											<q-color v-model="flightPathStylePinTouchdownColor" />
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
									class="q-pa-sm"
									dense
									color="primary"
									:label="$t('process')"
									:disabled="buttons.process.disabled"
									@click="flightPathProcess"
									@focus="checkErrors"
								/>
								<q-btn
									class="q-pa-sm"
									dense
									color="primary"
									:label="$t('export')"
									:disabled="buttons.export.disabled"
									@click="flightPathExport"
								/>
								<q-btn
									class="q-pa-sm"
									dense
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

import basePage from './basePage.vue';

export default defineComponent({
	name: 'PageIndex',
	extends: basePage,
	data: () => ({
		buttons: {
			export: {
				disabled: true
			},
			process: {
				disabled: true
			}
		},
		flightPath: null,
		flightPathData: null,
		flightPathDate: null,
		flightPathInput: null,
		flightPathLocation: null,
		flightPathMeasurementUnits: null,
		flightPathMeasurementUnitsOptions: [],
		flightPathProcessor: null,
		flightPathProcessors: [],
		flightPathStylePathFlightColor: '#0000ff',
		flightPathStylePathGroundColor: '#000000',
		flightPathStylePinLaunchColor: '#ff0000',
		flightPathStylePinTouchdownColor: '#00ff00',
		flightPathTitle: null,
		output: null,
		serviceFlightPath: null
	}),
	created() {
		this.serviceFlightPath = AppUtility.injector.getService(Constants.InjectorKeys.SERVICE_FLIGHT_PATH);
	},
	mounted() {
		this.reset();

		this.flightPathProcessors = AppUtility.selectOptions(this.serviceFlightPath.serviceProcessors, this.$t, 'flightPath.processors', (l) => { return l.id; }, null, (l) => { return l.id; });
		this.flightPathMeasurementUnitsOptions = AppUtility.selectOptions(AppUtility.measurementUnits(), this.$t, 'measurements', null, (l) => { return l + '.altitude.name'; });
		this.flightPathMeasurementUnits = AppUtility.measurementUnitEnglish;
	},
	methods: {
		checkErrors() {
			this.$refs.flightPathInput.validate();
			this.$refs.flightPathProcessor.validate();
			this.$refs.flightPathMeasurementUnits.validate();
			this.buttons.process.disabled = this.hasError();
		},
		flightPathStyleLoad() {
			if (String.isNullOrEmpty(this.flightInfoProcessor))
				return;

			const style = AppUtility.$store.getters.flightPathStyle(this.flightInfoProcessor);
			if (!style)
				return;

			this.flightPathStyleFlightColor = style.path.flight.color;
			this.flightPathStylePathGroundColor = style.path.ground.color;
			this.flightPathStylePinLaunchColor = style.pin.launch.color;
			this.flightPathStylePinTouchdownColor = style.pin.touchdown.color;
		},
		flightPathStyleReset() {
			this.flightPathStylePathFlightColor = this.serviceFlightInfo.styleDefault.path.flight.color;
			this.flightPathStylePathGroundColor = this.serviceFlightInfo.styleDefault.path.ground.color;
			this.flightPathStylePinLaunchColor = this.serviceFlightInfo.styleDefault.event.pin.launch.color;
			this.flightPathStylePinTouchdownColor = this.serviceFlightInfo.styleDefault.event.pin.touchdown.color;
		},
		flightPathStyleSave() {
			if (String.isNullOrEmpty(this.flightInfoProcessor))
				return;

			const style = {
				id: this.flightPathProcessor,
				path: {
					flight: {
						color: this.flightPathStylePathFlightColor
					},
					ground: {
						color: this.flightPathStylePathGroundColor
					}
				},
				pin: {
					launch: {
						color: this.flightPathStylePinLaunchColor
					},
					touchdown: {
						color: this.flightPathStylePinTouchdownColor
					}
				}
			};

			AppUtility.$store.dispatch('setFlightPathStyle', style);
		},
		flightPathExport() {
			if (AppUtility.isNull(this.flightPathData))
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
			this.$refs.flightPathProcessor.validate();
			this.$refs.flightPathMeasurementUnits.validate();

			if (this.hasError()) {
				this.setError(this.$t('errors.process.required'));
				return;
			}

			if (String.isNullOrEmpty(this.flightPathInput)) {
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
				style: {
					path: {
						flight: {
							color: this.flightPathStylePathFlightColor ?? this.serviceFlightPath.styleDefault.path.flight.color
						},
						ground: {
							color: this.flightPathStylePathGroundColor ?? this.serviceFlightPath.styleDefault.path.ground.color
						}
					},
					pin: {
						launch: {
							color: this.flightPathColorLaunchPinColor ?? this.serviceFlightPath.styleDefault.pin.launch.color
						},
						touchdown: {
							color: this.flightPathColorTouchdownPinColor ?? this.serviceFlightPath.styleDefault.pin.touchdown.color
						}
					}
				},
				location: this.flightPathLocation,
				title: this.flightPathTitle
			}
			const flightPathResults = this.serviceFlightPath.process(data, this.flightPathProcessor, this.flightPathMeasurementUnits, flightInfo);
			this.flightPathData = flightPathResults.info.flightPath;
			// this.output = JSON.stringify(flightPathResults, null, 2);
			this.output = flightPathResults.info.flightPath;

			this.buttons.export.disabled = false;
		},
		hasError() {
			return (this.$refs.flightPathInput.hasError || this.$refs.flightPathProcessor.hasError || this.$refs.flightPathMeasurementUnits.hasError);
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
			this.flightPathProcessor = null;
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
