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
			<div class="col-3">
				<div class="q-pb-md">
					<q-input
						v-model="flightInfoTitle"
						filled
						:label="$t('flightInfo.title')"
					/>
					<q-input
						v-model="flightInfoLocation"
						filled
						:label="$t('flightInfo.location')"
					/>
					<q-input
						filled
						v-model="flightInfoDate"
						mask="date"
						:label="$t('flightInfo.date')"
					>
						<template v-slot:append>
							<q-icon name="event" class="cursor-pointer">
							<q-popup-proxy ref="qDateProxy" cover transition-show="scale" transition-hide="scale">
								<q-date v-model="flightInfoDate">
								<div class="row items-center justify-end">
									<q-btn v-close-popup label="Close" color="primary" flat />
								</div>
								</q-date>
							</q-popup-proxy>
							</q-icon>
						</template>
					</q-input>
					<q-select
						ref="flightInfoMeasurementUnits"
						filled
						v-model="flightInfoMeasurementUnits"
						:options="flightInfoMeasurementUnitsOptions"
						option-value="id"
						option-label="name"
						emit-value
						map-options
						:label="$t('flightInfo.measurementUnits')"
						:rules="[val => !!val || $t('validation.required')]"
						@update:model-value="checkErrors"
					/>
					<q-select
						ref="flightInfoDataType"
						filled
						v-model="flightInfoDataType"
						:options="flightInfoDataTypes"
						option-value="id"
						option-label="name"
						emit-value
						map-options
						:label="$t('flightInfo.dataTypes')"
						:rules="[val => !!val || $t('validation.required')]"
						@update:model-value="checkErrors"
					/>
				</div>
				<div class="q-pb-md float-right">
					<q-btn-group>
						<q-btn
							color="primary"
							:label="$t('process')"
							:disabled="buttons.process.disabled"
							@click="flightInfoProcess"
							@focus="checkErrors"
						/>
						<q-btn
							color="primary"
							:label="$t('export')"
							:disabled="buttons.export.disabled"
							@click="flightInfoExport"
						/>
						<q-btn
							color="primary"
							:label="$t('reset')"
							@click="resetInput"
						/>
					</q-btn-group>
				</div>
				<q-input
					ref="flightInfoInput"
					v-model="flightInfoInput"
					filled
					type="textarea"
					style="width: 100%"
					rows="15"
					:label="$t('flightInfo.csv')"
					:rules="[val => !!val || $t('validation.required')]"
					@update:model-value="checkErrors"
					@blur="checkErrors"
					@focus="checkErrors"
				/>
			</div>
			<div class="col-9 q-pl-md">
				<div
					id="flight-info"
					class="row" style="color: black; background-color: white"
				>
					<div class="col-9">
						<flightInfoChart
							ref="flightInfoChart"
							:chart-data="flightInfoChartData"
						/>
					</div>
					<div class="col-3 q-pa-sm">
						<flightInfo
							id="flight-info"
							ref="flightInfo"
							:flight-info="flightInfo"
						/>
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
import html2canvas from 'html2canvas';

import Constants from '../constants';

import AppUtility from '../utility';

import flightInfo from '../components/flightInfo';
import flightInfoChart from '../components/charts/flightInfo';

export default defineComponent({
	name: 'PageIndex',
	components: {
		flightInfo,
		flightInfoChart
	},
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
		flightInfo: null,
		flightInfoChartData: null,
		flightInfoDataType: null,
		flightInfoDataTypes: [],
		flightInfoDate: null,
		flightInfoInput: null,
		flightInfoLocation: null,
		flightInfoMeasurementUnits: null,
		flightInfoMeasurementUnitsOptions: [],
		flightInfoTitle: null,
		serviceDownload: null,
		serviceFlightInfo: null
	}),
	computed: {
		errors() {
			return this.errorMessage;
		}
	},
	created() {
		this.serviceDownload = AppUtility.injector.getService(Constants.InjectorKeys.SERVICE_DOWNLOAD);
		this.serviceFlightInfo = AppUtility.injector.getService(Constants.InjectorKeys.SERVICE_FLIGHT_INFO);
	},
	mounted() {
		this.reset();

		this.flightInfoDataTypes = AppUtility.selectOptions(this.serviceFlightInfo.serviceProcessors, this.$t, 'flightInfo.processors', (l) => { return l.id; }, null, (l) => { return l.id; });
		this.flightInfoMeasurementUnitsOptions = AppUtility.selectOptions(AppUtility.measurementUnits(), this.$t, 'measurementUnits');
		this.flightInfoMeasurementUnits = AppUtility.$store.state.measurementUnits;
	},
	methods: {
		checkErrors() {
			this.$refs.flightInfoInput.validate();
			this.$refs.flightInfoDataType.validate();
			this.$refs.flightInfoMeasurementUnits.validate();
			this.buttons.process.disabled = this.hasError();
		},
		flightInfoExport() {
			const el = document.getElementById('flight-info');
			this.getScreenshotOfElement(el, ((data) => {
				const currentDate = this.flightInfoDate ? new Date(this.flightInfoDate) : new Date();
				const day = currentDate.getDate();
				const month = currentDate.getMonth() + 1;
				const year = currentDate.getFullYear();

				const name = 'flight-input-' + day + '-' + month + '-' + year + '.png';
				const barRef = this.$refs.bar;
				barRef.start();

				this.serviceDownload.download('data:image/png;base64,' + data,
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
			// eslint-disable-next-line
			}).bind(this));
		},
		flightInfoProcess() {
			this.reset();

			this.$refs.flightInfoInput.validate();
			this.$refs.flightInfoDataType.validate();
			this.$refs.flightInfoMeasurementUnits.validate();

			if (this.hasError()) {
				this.setError(this.$t('errors.process.required'));
				return;
			}

			if (!this.flightInfoInput || this.flightInfoInput === '') {
				this.setError(this.$t('errors.process.noInput'));
				return;
			}

			const data = Papa.parse(this.flightInfoInput.trim());
			if (data.errors && data.errors.length > 0) {
				this.setError(this.$t('errors.process.unableToConvert'));
				return;
			}

			const flightInfoResults = this.serviceFlightInfo.process(data, this.flightInfoDataType, this.flightInfoMeasurementUnits);
			console.log(flightInfoResults);
			if (flightInfoResults.errors && data.errors.length > 0) {
				const errors = flightInfoResults.errors.map(e => this.$t(e) + '<br/>');
				this.setError(errors);
				return;
			}

			if (this.flightInfoTitle && this.flightInfoTitle !== '')
				flightInfoResults.info.title = this.flightInfoTitle;
			if (this.flightInfoDate && this.flightInfoDate !== '')
				flightInfoResults.info.date = this.flightInfoDate;
			if (this.flightInfoLocation && this.flightInfoLocation !== '')
				flightInfoResults.info.location = this.flightInfoLocation;
			if (this.flightInfoMeasurementUnits && this.flightInfoMeasurementUnits !== '')
				flightInfoResults.info.measurementUnits = this.flightInfoMeasurementUnits;

			this.flightInfoChartData = flightInfoResults.info;
			this.flightInfo = flightInfoResults.info;

			AppUtility.$store.dispatch('setMeasurementUnits', this.flightInfoMeasurementUnits);

			this.buttons.export.disabled = false;
		},
		hasError() {
			return (this.$refs.flightInfoInput.hasError || this.$refs.flightInfoDataType.hasError || this.$refs.flightInfoMeasurementUnits.hasError);
		},
		reset() {
			this.buttons.export.disabled = true;
			this.errorMessage = null;
			if (this.errorTimer)
				clearTimeout(this.errorTimer);
			this.flightInfo = null;
			this.flightInfoChartData = null;
		},
		resetInput() {
			this.reset();
			this.flightInfoDataType = null;
			this.flightInfoDate = null;
			this.flightInfoInput = null;
			this.flightInfoLocation = null;
			this.flightInfoTitle = null;
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
		},
		getScreenshotOfElement(element, callback, posX, posY, width, height) {
			html2canvas(element).then(canvas => {
				// document.body.appendChild(canvas);
				posX = posX ?? 0;
				posY = posY ?? 0;
				width = width ?? canvas.width;
				height = height ?? canvas.height;
				const imageData = canvas.getContext('2d').getImageData(posX, posY, width, height).data;
				const outputCanvas = document.createElement('canvas');
				const outputContext = outputCanvas.getContext('2d');
				outputCanvas.width = width;
				outputCanvas.height = height;

				const idata = outputContext.createImageData(width, height);
				idata.data.set(imageData);
				outputContext.putImageData(idata, 0, 0);
				callback(outputCanvas.toDataURL().replace('data:image/png;base64,', ''));
			});
		}
	}
});
</script>
