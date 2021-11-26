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
				{{ $t('titles.flightInfo') }}
			</div>
		</div>
		<div class="row">
			<div class="col-3">
				<div class="q-pb-md">
					<q-input
						v-model="flightInfoTitle"
						filled
						dense
						:label="$t('flightInfo.title')"
					/>
					<q-input
						v-model="flightInfoLocation"
						filled
						dense
						:label="$t('flightInfo.location')"
					/>
					<q-input
						v-model="flightInfoDate"
						filled
						dense
						:mask="dateFormatMask"
						:label="$t('flightInfo.date')"
					>
						<template v-slot:append>
							<q-icon name="event" class="cursor-pointer">
							<q-popup-proxy ref="qDateProxy" cover transition-show="scale" transition-hide="scale">
								<q-date
									v-model="flightInfoDate"
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
						ref="flightInfoMeasurementUnits"
						v-model="flightInfoMeasurementUnits"
						filled
						dense
						:options="flightInfoMeasurementUnitsOptions"
						option-value="id"
						option-label="name"
						emit-value
						map-options
						hide-bottom-space
						:label="$t('flightInfo.measurementUnits')"
						:rules="[val => !!val || $t('validation.required')]"
						@update:model-value="checkErrors"
					/>
					<q-select
						ref="flightInfoProcessor"
						v-model="flightInfoProcessor"
						:options="flightInfoProcessors"
						filled
						dense
						option-value="id"
						option-label="name"
						emit-value
						map-options
						hide-bottom-space
						:label="$t('flightInfo.processors.title')"
						:rules="[val => !!val || $t('validation.required')]"
						@update:model-value="checkErrors"
					/>
					<div class="row">
						<div class="q-pr-xl">
							<q-checkbox
								v-model="flightInfoDataTypeActual"
								label="Actual"
								@update:model-value="checkErrors"
							/>
							<q-checkbox
								v-model="flightInfoDataTypeFiltered"
								label="Filtered"
								@update:model-value="checkErrors"
							/>
						</div>
						<div>
							<span
								:class="!flightInfoDataTypeActual ? 'disabled' : ''"
							>
								Actual
							</span>
							<q-toggle
								v-model="flightInfoDataTypeUse"
								:disable="flightInfoDataTypeUseDisabled"
							/>
							<span
								:class="!flightInfoDataTypeFiltered ? 'disabled' : ''"
							>
								Filtered
							</span>
						</div>
					</div>
					<q-card flat bordered>
						<q-card-actions>
							{{ $t('flightInfo.color.title') }}
							<q-space></q-space>
							<q-btn
								color="grey"
								round
								flat
								dense
								:icon="expanded ? 'keyboard_arrow_up' : 'keyboard_arrow_down'"
								@click="expanded = !expanded"
							></q-btn>
						</q-card-actions>

						<q-slide-transition>
							<div v-show="expanded">
								<q-separator></q-separator>
								<q-card-section class="text-subitle2">
									<div class="row">
										<div class="col-lg-6 col-12">
											<q-input
												v-model="flightInfoColorAltitudeF"
												filled
												dense
												:label="$t('flightInfo.color.altitude.filtered')"
											>
												<template v-slot:prepend>
													<div :style="'height: 25px; width: 25px; background-color: ' + flightInfoColorAltitudeF">
													</div>
												</template>
												<template v-slot:append>
													<q-icon name="colorize" class="cursor-pointer">
														<q-popup-proxy cover transition-show="scale" transition-hide="scale">
															<q-color v-model="flightInfoColorAltitudeF" />
														</q-popup-proxy>
													</q-icon>
												</template>
											</q-input>
										</div>
										<div class="col-lg-6 col-12">
											<q-input
												v-model="flightInfoColorAltitude"
												filled
												dense
												:label="$t('flightInfo.color.altitude.title')"
											>
												<template v-slot:prepend>
													<div :style="'height: 25px; width: 25px; background-color: ' + flightInfoColorAltitude">
													</div>
												</template>
												<template v-slot:append>
													<q-icon name="colorize" class="cursor-pointer">
														<q-popup-proxy cover transition-show="scale" transition-hide="scale">
															<q-color v-model="flightInfoColorAltitude" />
														</q-popup-proxy>
													</q-icon>
												</template>
											</q-input>
										</div>
									</div>
									<div class="row">
										<div class="col-lg-6 col-12">
											<q-input
												v-model="flightInfoColorVelocityF"
												filled
												dense
												:label="$t('flightInfo.color.velocity.filtered')"
											>
												<template v-slot:prepend>
													<div :style="'height: 25px; width: 25px; background-color: ' + flightInfoColorVelocityF">
													</div>
												</template>
												<template v-slot:append>
													<q-icon name="colorize" class="cursor-pointer">
														<q-popup-proxy cover transition-show="scale" transition-hide="scale">
															<q-color v-model="flightInfoColorVelocityF" />
														</q-popup-proxy>
													</q-icon>
												</template>
											</q-input>
										</div>
										<div class="col-lg-6 col-12">
											<q-input
												v-model="flightInfoColorVelocity"
												filled
												dense
												:label="$t('flightInfo.color.velocity.title')"
											>
												<template v-slot:prepend>
													<div :style="'height: 25px; width: 25px; background-color: ' + flightInfoColorVelocity">
													</div>
												</template>
												<template v-slot:append>
													<q-icon name="colorize" class="cursor-pointer">
														<q-popup-proxy cover transition-show="scale" transition-hide="scale">
															<q-color v-model="flightInfoColorVelocity" />
														</q-popup-proxy>
													</q-icon>
												</template>
											</q-input>
										</div>
									</div>
									<div class="row">
										<div class="col-lg-6 col-12">
											<q-input
												v-model="flightInfoColorEventApogee"
												filled
												dense
												:label="$t('flightInfo.color.event.apogee.title')"
											>
												<template v-slot:prepend>
													<div :style="'height: 25px; width: 25px; background-color: ' + flightInfoColorEventApogee">
													</div>
												</template>
												<template v-slot:append>
													<q-icon name="colorize" class="cursor-pointer">
														<q-popup-proxy cover transition-show="scale" transition-hide="scale">
															<q-color v-model="flightInfoColorEventApogee" />
														</q-popup-proxy>
													</q-icon>
												</template>
											</q-input>
										</div>
										<div class="col-lg-6 col-12">
											<q-input
												v-model="flightInfoColorEventApogeeBorder"
												filled
												dense
												:label="$t('flightInfo.color.event.apogee.border')"
											>
												<template v-slot:prepend>
													<div :style="'height: 25px; width: 25px; background-color: ' + flightInfoColorEventApogeeBorder">
													</div>
												</template>
												<template v-slot:append>
													<q-icon name="colorize" class="cursor-pointer">
														<q-popup-proxy cover transition-show="scale" transition-hide="scale">
															<q-color v-model="flightInfoColorEventApogeeBorder" />
														</q-popup-proxy>
													</q-icon>
												</template>
											</q-input>
										</div>
									</div>
									<div class="row">
										<div class="col-lg-6 col-12">
											<q-input
												v-model="flightInfoColorEventDrogue"
												filled
												dense
												:label="$t('flightInfo.color.event.drogue.title')"
											>
												<template v-slot:prepend>
													<div :style="'height: 25px; width: 25px; background-color: ' + flightInfoColorEventDrogue">
													</div>
												</template>
												<template v-slot:append>
													<q-icon name="colorize" class="cursor-pointer">
														<q-popup-proxy cover transition-show="scale" transition-hide="scale">
															<q-color v-model="flightInfoColorEventDrogue" />
														</q-popup-proxy>
													</q-icon>
												</template>
											</q-input>
										</div>
										<div class="col-lg-6 col-12">
											<q-input
												v-model="flightInfoColorEventDrogueBorder"
												filled
												dense
												:label="$t('flightInfo.color.event.drogue.border')"
											>
												<template v-slot:prepend>
													<div :style="'height: 25px; width: 25px; background-color: ' + flightInfoColorEventDrogueBorder">
													</div>
												</template>
												<template v-slot:append>
													<q-icon name="colorize" class="cursor-pointer">
														<q-popup-proxy cover transition-show="scale" transition-hide="scale">
															<q-color v-model="flightInfoColorEventDrogueBorder" />
														</q-popup-proxy>
													</q-icon>
												</template>
											</q-input>
										</div>
									</div>
									<div class="row">
										<div class="col-lg-6 col-12">
											<q-input
												v-model="flightInfoColorEventMain"
												filled
												dense
												:label="$t('flightInfo.color.event.main.title')"
											>
												<template v-slot:prepend>
													<div :style="'height: 25px; width: 25px; background-color: ' + flightInfoColorEventMain">
													</div>
												</template>
												<template v-slot:append>
													<q-icon name="colorize" class="cursor-pointer">
														<q-popup-proxy cover transition-show="scale" transition-hide="scale">
															<q-color v-model="flightInfoColorEventMain" />
														</q-popup-proxy>
													</q-icon>
												</template>
											</q-input>
										</div>
										<div class="col-lg-6 col-12">
											<q-input
												v-model="flightInfoColorEventMainBorder"
												filled
												dense
												:label="$t('flightInfo.color.event.main.border')"
											>
												<template v-slot:prepend>
													<div :style="'height: 25px; width: 25px; background-color: ' + flightInfoColorEventMainBorder">
													</div>
												</template>
												<template v-slot:append>
													<q-icon name="colorize" class="cursor-pointer">
														<q-popup-proxy cover transition-show="scale" transition-hide="scale">
															<q-color v-model="flightInfoColorEventMainBorder" />
														</q-popup-proxy>
													</q-icon>
												</template>
											</q-input>
										</div>
									</div>
									<div class="row">
										<div class="col-12">
											<div class="float-right q-mt-sm">
												<q-btn
													class="q-pa-sm q-mr-sm"
													dense
													color="primary"
													:label="$t('button.save')"
													:disable="!flightInfoProcessor"
													@click="flightInfoColorSave"
												/>
												<q-btn
													class="q-pa-sm"
													dense
													color="primary"
													:label="$t('button.reset')"
													@click="flightInfoColorReset"
												/>
											</div>
										</div>
									</div>
								</q-card-section>
							</div>
						</q-slide-transition>
					</q-card>
				</div>
				<div class="q-pb-md float-right">
					<q-btn-group>
						<q-btn
							class="q-pa-sm"
							dense
							color="primary"
							:label="$t('button.process')"
							:disabled="buttons.process.disabled"
							@click="flightInfoProcess"
							@focus="checkErrors"
						/>
						<q-btn-dropdown
							class="q-pa-sm"
							dense
							color="primary"
							:label="$t('button.export')"
							:disabled="buttons.export.disabled"
						>
							<q-list>
								<q-item clickable v-close-popup @click="flightInfoExport">
									<q-item-section>
										<q-item-label>{{ $t('flightInfo.export.image') }}</q-item-label>
									</q-item-section>
								</q-item>
								<q-item clickable v-close-popup @click="flightInfoExportJson">
									<q-item-section>
										<q-item-label>{{ $t('flightInfo.export.json') }}</q-item-label>
									</q-item-section>
								</q-item>
								<!-- <q-item clickable v-close-popup @click="flightInfoExportText">
									<q-item-section>
										<q-item-label>{{ $t('flightInfo.export.text') }}</q-item-label>
									</q-item-section>
								</q-item> -->
							</q-list>
						</q-btn-dropdown>
						<q-btn
							class="q-pa-sm"
							dense
							color="primary"
							:label="$t('button.reset')"
							@click="resetInput"
						/>
					</q-btn-group>
				</div>
				<q-input
					ref="flightInfoInput"
					v-model="flightInfoInput"
					filled
					dense
					type="textarea"
					style="width: 100%"
					rows="15"
					:label="$t('flightInfo.csv')"
					:rules="[val => !!val || $t('validation.required')]"
					@update:model-value="checkErrors"
					@blur="checkErrors"
					@focus="checkErrors"
					@mouseup="checkErrors"
					@keyup="checkErrors"
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

import basePage from './basePage.vue';

export default defineComponent({
	name: 'PageIndex',
	extends: basePage,
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
		expanded: false,
		flightInfo: null,
		flightInfoChartData: null,
		flightInfoColorAltitude: '#0066FF',
		flightInfoColorAltitudeF: '#0000FF',
		flightInfoColorEventApogee: '#000000',
		flightInfoColorEventApogeeBorder: '#000000',
		flightInfoColorEventDrogue: '#FF0000',
		flightInfoColorEventDrogueBorder: '#FF0000',
		flightInfoColorEventMain: '#FF8C00',
		flightInfoColorEventMainBorder: '#FF8C00',
		flightInfoColorVelocity: '#00FFFF',
		flightInfoColorVelocityF: '#00AA00',
		flightInfoDataTypeActual: true,
		flightInfoDataTypeError: false,
		flightInfoDataTypeFiltered: true,
		flightInfoDataTypeUse: true,
		flightInfoDataTypeUseDisabled: false,
		flightInfoDate: null,
		flightInfoInput: null,
		flightInfoLocation: null,
		flightInfoMeasurementUnits: null,
		flightInfoMeasurementUnitsOptions: [],
		flightInfoProcessor: null,
		flightInfoProcessors: [],
		flightInfoTitle: null,
		serviceFlightInfo: null
	}),
	watch: {
		flightInfoDataTypeActual: function (value) {
			this.checkFlightInfoDataTypeUse();
		},
		flightInfoDataTypeFiltered: function (value) {
			this.checkFlightInfoDataTypeUse();
		},
		flightInfoProcessor: function (value) {
			if (!value)
				return;

			this.flightInfoColorLoad(value);
		}
	},
	created() {
		this.serviceFlightInfo = AppUtility.injector.getService(Constants.InjectorKeys.SERVICE_FLIGHT_INFO);
	},
	mounted() {
		this.reset();

		this.flightInfoProcessors = AppUtility.selectOptions(this.serviceFlightInfo.serviceProcessors, this.$t, 'flightInfo.processors', (l) => { return l.id; }, null, (l) => { return l.id; });
		this.flightInfoMeasurementUnitsOptions = AppUtility.selectOptions(AppUtility.measurementUnits(), this.$t, 'measurementUnits');
		this.flightInfoMeasurementUnits = AppUtility.$store.state.measurementUnits;
	},
	methods: {
		checkErrors() {
			this.$refs.flightInfoInput.validate();
			this.$refs.flightInfoMeasurementUnits.validate();
			this.$refs.flightInfoProcessor.validate();

			this.flightInfoDataTypeError = !(this.flightInfoDataTypeActual || this.flightInfoDataTypeFiltered);

			this.buttons.process.disabled = this.hasError();
		},
		flightInfoColorLoad() {
			if (String.isNullOrEmpty(this.flightInfoProcessor))
				return;

			const colors = AppUtility.$store.getters.getFlightInfoColors(this.flightInfoProcessor);
			if (!colors)
				return;

			this.flightInfoColorAltitude = colors.altitude;
			this.flightInfoColorAltitudeF = colors.altitudeF;
			this.flightInfoColorEventApogee = colors.event.apogee;
			this.flightInfoColorEventApogeeBorder = colors.event.apogeeBorder;
			this.flightInfoColorEventDrogue = colors.event.drogue;
			this.flightInfoColorEventDrogueBorder = colors.event.drogueBorder;
			this.flightInfoColorEventMain = colors.event.main;
			this.flightInfoColorEventMainBorder = colors.event.mainBorder;
			this.flightInfoColorVelocity = colors.velocity;
			this.flightInfoColorVelocityF = colors.velocityF;
		},
		flightInfoColorReset() {
			this.flightInfoColorAltitude = this.serviceFlightInfo.colorsDefault.altitude;
			this.flightInfoColorAltitudeF = this.serviceFlightInfo.colorsDefault.altitudeF;
			this.flightInfoColorEventApogee = this.serviceFlightInfo.colorsDefault.event.apogee;
			this.flightInfoColorEventApogeeBorder = this.serviceFlightInfo.colorsDefault.event.apogeeBorder;
			this.flightInfoColorEventDrogue = this.serviceFlightInfo.colorsDefault.event.drogue;
			this.flightInfoColorEventDrogueBorder = this.serviceFlightInfo.colorsDefault.event.drogueBorder;
			this.flightInfoColorEventMain = this.serviceFlightInfo.colorsDefault.event.main;
			this.flightInfoColorEventMainBorder = this.serviceFlightInfo.colorsDefault.event.mainBorder;
			this.flightInfoColorVelocity = this.serviceFlightInfo.colorsDefault.velocity;
			this.flightInfoColorVelocityF = this.serviceFlightInfo.colorsDefault.velocityF;
		},
		flightInfoColorSave() {
			if (String.isNullOrEmpty(this.flightInfoProcessor))
				return;

			const colors = {
				id: this.flightInfoProcessor,
				altitude: this.flightInfoColorAltitude,
				altitudeF: this.flightInfoColorAltitudeF,
				event: {
					apogee: this.flightInfoColorEventApogee,
					apogeeBorder: this.flightInfoColorEventApogeeBorder,
					drogue: this.flightInfoColorEventDrogue,
					drogueBorder: this.flightInfoColorEventDrogueBorder,
					main: this.flightInfoColorEventMain,
					mainBorder: this.flightInfoColorEventMainBorder
				},
				velocity: this.flightInfoColorVelocity,
				velocityF: this.flightInfoColorVelocityF
			};

			AppUtility.$store.dispatch('setFlightInfoColors', colors);
		},
		checkFlightInfoDataTypeUse() {
			this.flightInfoDataTypeUseDisabled = true;
			if (this.flightInfoDataTypeActual && this.flightInfoDataTypeFiltered)
				this.flightInfoDataTypeUseDisabled = false;
			else if (this.flightInfoDataTypeActual)
				this.flightInfoDataTypeUse = false;
			else if (this.flightInfoDataTypeFiltered)
				this.flightInfoDataTypeUse = true;
		},
		flightInfoExportName(extension) {
			extension = !String.isNullOrEmpty(extension) ? extension : 'png';

			const currentDate = this.flightInfoDate ? new Date(this.flightInfoDate) : new Date();
			const day = currentDate.getDate();
			const month = currentDate.getMonth() + 1;
			const year = currentDate.getFullYear();

			return 'flight-input-' + day + '-' + month + '-' + year + '.' + extension;
		},
		flightInfoExportDownload(output, extension) {
			const name = this.flightInfoExportName(extension);
			const barRef = this.$refs.bar;
			barRef.start();

			this.serviceDownload.download(output,
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
		flightInfoExportJson() {
			const output = this.serviceFlightInfo.processOutputJson(this.flightInfo);
			this.flightInfoExportDownload(output, 'json');
		},
		flightInfoExportText() {
			const output = this.serviceFlightInfo.processOutputText(this.flightInfo);
			this.flightInfoExportDownload(output, 'txt');
		},
		flightInfoExport() {
			const el = document.getElementById('flight-info');
			this.getScreenshotOfElement(el, ((data) => {
				const name = this.flightInfoExportName('png');
				const barRef = this.$refs.bar;
				barRef.start();

				this.serviceDownload.downloadUrl('data:image/png;base64,' + data,
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
			this.$refs.flightInfoMeasurementUnits.validate();
			this.$refs.flightInfoProcessor.validate();

			if (this.hasError()) {
				this.setError(this.$t('errors.process.required'));
				return;
			}

			if (String.isNullOrEmpty(this.flightInfoInput)) {
				this.setError(this.$t('errors.process.noInput'));
				return;
			}

			const data = Papa.parse(this.flightInfoInput.trim());
			if (data.errors && data.errors.length > 0) {
				this.setError(this.$t('errors.process.unableToConvert'));
				return;
			}

			const flightInfoDataTypes = {
				actual: this.flightInfoDataTypeActual,
				filtered: this.flightInfoDataTypeFiltered,
				use: this.flightInfoDataTypeUse
			};

			const flightInfoResults = this.serviceFlightInfo.process(data, this.flightInfoProcessor, this.flightInfoMeasurementUnits, flightInfoDataTypes);
			console.log(flightInfoResults);
			if (flightInfoResults.errors && data.errors.length > 0) {
				const errors = flightInfoResults.errors.map(e => this.$t(e) + '<br/>');
				this.setError(errors);
				return;
			}

			flightInfoResults.info.title = this.$t('charts.flightInfo.title');
			if (!String.isNullOrEmpty(this.flightInfoTitle && this.flightInfoTitle))
				flightInfoResults.info.title = this.flightInfoTitle;
			if (!String.isNullOrEmpty(this.flightInfoDate))
				flightInfoResults.info.date = this.flightInfoDate;
			if (!String.isNullOrEmpty(this.flightInfoLocation))
				flightInfoResults.info.location = this.flightInfoLocation;
			if (!String.isNullOrEmpty(this.flightInfoMeasurementUnit))
				flightInfoResults.info.measurementUnits = this.flightInfoMeasurementUnits;

			flightInfoResults.info.color.altitude = this.flightInfoColorAltitude;
			flightInfoResults.info.color.altitudeF = this.flightInfoColorAltitudeF;
			flightInfoResults.info.color.event.apogee = this.flightInfoColorEventApogee;
			flightInfoResults.info.color.event.apogeeBorder = this.flightInfoColorEventApogeeBorder;
			flightInfoResults.info.color.event.drogue = this.flightInfoColorEventDrogue;
			flightInfoResults.info.color.event.drogueBorder = this.flightInfoColorEventDrogueBorder;
			flightInfoResults.info.color.event.main = this.flightInfoColorEventMain;
			flightInfoResults.info.color.event.mainBorder = this.flightInfoColorEventMainBorder;
			flightInfoResults.info.color.velocity = this.flightInfoColorVelocity;
			flightInfoResults.info.color.velocityF = this.flightInfoColorVelocityF;

			this.flightInfoChartData = flightInfoResults.info;
			this.flightInfo = flightInfoResults.info;

			this.buttons.export.disabled = false;
		},
		hasError() {
			return (
				this.$refs.flightInfoInput.hasError ||
				this.$refs.flightInfoProcessor.hasError ||
				this.$refs.flightInfoMeasurementUnits.hasError ||
				this.flightInfoDataTypeError
			);
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
			this.flightInfoDataTypeActual = true;
			this.flightInfoDataTypeFiltered = true;
			this.flightInfoDataTypeUse = true;
			this.flightInfoDataTypeUseDisabled = false;
			this.flightInfoDate = null;
			this.flightInfoInput = null;
			this.flightInfoLocation = null;
			this.flightInfoProcessor = null;
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
