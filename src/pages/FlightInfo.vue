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
					<q-card
						flat
						bordered
						dense>
						<q-card-actions>
							{{ $t('flightInfo.style.title') }}
							<q-space></q-space>
							<q-btn
								color="grey"
								round
								dense
								flat
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
												v-model="flightInfoStyleAltitudeFColor"
												filled
												dense
												:label="$t('flightInfo.style.altitude.filtered')"
											>
												<template v-slot:prepend>
													<div :style="'height: 25px; width: 25px; background-color: ' + flightInfoStyleAltitudeFColor">
													</div>
												</template>
												<template v-slot:append>
													<q-icon name="colorize" class="cursor-pointer">
														<q-popup-proxy cover transition-show="scale" transition-hide="scale">
															<q-color v-model="flightInfoStyleAltitudeFColor" />
														</q-popup-proxy>
													</q-icon>
												</template>
											</q-input>
										</div>
										<div class="col-lg-6 col-12">
											<q-input
												v-model="flightInfoStyleAltitudeColor"
												filled
												dense
												:label="$t('flightInfo.style.altitude.title')"
											>
												<template v-slot:prepend>
													<div :style="'height: 25px; width: 25px; background-color: ' + flightInfoStyleAltitudeColor">
													</div>
												</template>
												<template v-slot:append>
													<q-icon name="colorize" class="cursor-pointer">
														<q-popup-proxy cover transition-show="scale" transition-hide="scale">
															<q-color v-model="flightInfoStyleAltitudeColor" />
														</q-popup-proxy>
													</q-icon>
												</template>
											</q-input>
										</div>
									</div>
									<div class="row">
										<div class="col-lg-6 col-12">
											<q-input
												v-model="flightInfoStyleVelocityFColor"
												filled
												dense
												:label="$t('flightInfo.style.velocity.filtered')"
											>
												<template v-slot:prepend>
													<div :style="'height: 25px; width: 25px; background-color: ' + flightInfoStyleVelocityFColor">
													</div>
												</template>
												<template v-slot:append>
													<q-icon name="colorize" class="cursor-pointer">
														<q-popup-proxy cover transition-show="scale" transition-hide="scale">
															<q-color v-model="flightInfoStyleVelocityFColor" />
														</q-popup-proxy>
													</q-icon>
												</template>
											</q-input>
										</div>
										<div class="col-lg-6 col-12">
											<q-input
												v-model="flightInfoStyleVelocityColor"
												filled
												dense
												:label="$t('flightInfo.style.velocity.title')"
											>
												<template v-slot:prepend>
													<div :style="'height: 25px; width: 25px; background-color: ' + flightInfoStyleVelocityColor">
													</div>
												</template>
												<template v-slot:append>
													<q-icon name="colorize" class="cursor-pointer">
														<q-popup-proxy cover transition-show="scale" transition-hide="scale">
															<q-color v-model="flightInfoStyleVelocityColor" />
														</q-popup-proxy>
													</q-icon>
												</template>
											</q-input>
										</div>
									</div>
									<div class="row">
										<div class="col-lg-6 col-12">
											<q-input
												v-model="flightInfoStyleEventApogeeColor"
												filled
												dense
												:label="$t('flightInfo.style.event.apogee.title')"
											>
												<template v-slot:prepend>
													<div :style="'height: 25px; width: 25px; background-color: ' + flightInfoStyleEventApogeeColor">
													</div>
												</template>
												<template v-slot:append>
													<q-icon name="colorize" class="cursor-pointer">
														<q-popup-proxy cover transition-show="scale" transition-hide="scale">
															<q-color v-model="flightInfoStyleEventApogeeColor" />
														</q-popup-proxy>
													</q-icon>
												</template>
											</q-input>
										</div>
										<div class="col-lg-6 col-12">
											<q-input
												v-model="flightInfoStyleEventApogeeBorderColor"
												filled
												dense
												:label="$t('flightInfo.style.event.apogee.border')"
											>
												<template v-slot:prepend>
													<div :style="'height: 25px; width: 25px; background-color: ' + flightInfoStyleEventApogeeBorderColor">
													</div>
												</template>
												<template v-slot:append>
													<q-icon name="colorize" class="cursor-pointer">
														<q-popup-proxy cover transition-show="scale" transition-hide="scale">
															<q-color v-model="flightInfoStyleEventApogeeBorderColor" />
														</q-popup-proxy>
													</q-icon>
												</template>
											</q-input>
										</div>
									</div>
									<div class="row">
										<div class="col-lg-6 col-12">
											<q-input
												v-model="flightInfoStyleEventDrogueColor"
												filled
												dense
												:label="$t('flightInfo.style.event.drogue.title')"
											>
												<template v-slot:prepend>
													<div :style="'height: 25px; width: 25px; background-color: ' + flightInfoStyleEventDrogueColor">
													</div>
												</template>
												<template v-slot:append>
													<q-icon name="colorize" class="cursor-pointer">
														<q-popup-proxy cover transition-show="scale" transition-hide="scale">
															<q-color v-model="flightInfoStyleEventDrogueColor" />
														</q-popup-proxy>
													</q-icon>
												</template>
											</q-input>
										</div>
										<div class="col-lg-6 col-12">
											<q-input
												v-model="flightInfoStyleEventDrogueBorderColor"
												filled
												dense
												:label="$t('flightInfo.style.event.drogue.border')"
											>
												<template v-slot:prepend>
													<div :style="'height: 25px; width: 25px; background-color: ' + flightInfoStyleEventDrogueBorderColor">
													</div>
												</template>
												<template v-slot:append>
													<q-icon name="colorize" class="cursor-pointer">
														<q-popup-proxy cover transition-show="scale" transition-hide="scale">
															<q-color v-model="flightInfoStyleEventDrogueBorderColor" />
														</q-popup-proxy>
													</q-icon>
												</template>
											</q-input>
										</div>
									</div>
									<div class="row">
										<div class="col-lg-6 col-12">
											<q-input
												v-model="flightInfoStyleEventMainColor"
												filled
												dense
												:label="$t('flightInfo.style.event.main.title')"
											>
												<template v-slot:prepend>
													<div :style="'height: 25px; width: 25px; background-color: ' + flightInfoStyleEventMainColor">
													</div>
												</template>
												<template v-slot:append>
													<q-icon name="colorize" class="cursor-pointer">
														<q-popup-proxy cover transition-show="scale" transition-hide="scale">
															<q-color v-model="flightInfoStyleEventMainColor" />
														</q-popup-proxy>
													</q-icon>
												</template>
											</q-input>
										</div>
										<div class="col-lg-6 col-12">
											<q-input
												v-model="flightInfoStyleEventMainBorderColor"
												filled
												dense
												:label="$t('flightInfo.style.event.main.border')"
											>
												<template v-slot:prepend>
													<div :style="'height: 25px; width: 25px; background-color: ' + flightInfoStyleEventMainBorderColor">
													</div>
												</template>
												<template v-slot:append>
													<q-icon name="colorize" class="cursor-pointer">
														<q-popup-proxy cover transition-show="scale" transition-hide="scale">
															<q-color v-model="flightInfoStyleEventMainBorderColor" />
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
													class="q-mr-sm"
													dense
													color="primary"
													:label="$t('button.save')"
													:disable="!flightInfoProcessor"
													@click="flightInfoStyleSave"
												/>
												<q-btn
													dense
													color="primary"
													:label="$t('button.reset')"
													@click="flightInfoStyleReset"
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
					<q-btn
						class="q-mr-sm"
						dense
						color="primary"
						:label="$t('button.process')"
						:disabled="buttons.process.disabled"
						@click="flightInfoProcess"
						@focus="checkErrors"
					/>
					<q-btn-dropdown
						class="q-mr-sm"
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
						dense
						color="primary"
						:label="$t('button.reset')"
						@click="resetInput"
					/>
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
				<div>
					<table style="width: 100%;">
						<tr>
							<td style="white-space: nowrap;">
								<q-badge color="secondary">
									Resolution: {{ resolution }}
								</q-badge>
								<q-btn dense flat label="720" color="primary" @click="clickResolution(720)" />
								<q-btn dense flat label="1080" color="primary" @click="clickResolution(1080)" />
								<q-btn dense flat label="1440" color="primary" @click="clickResolution(1440)" />
								<q-btn dense flat label="1920" color="primary" @click="clickResolution(1920)" />
								<q-btn dense flat label="2048" color="primary" @click="clickResolution(2048)" />
							</td>
							<td style="width: 100%;">
								<table style="width: 100%;">
									<tr>
										<td style="width: 100%;">
											<q-slider v-model="resolution" dense :min="720" :max="2048" style="width: 100%;" />
										</td>
										<td style="white-space: nowrap;">
											<q-btn dense flat label="set" color="primary" @click="clickResolution(this.resolution)" />
										</td>
									</tr>
								</table>
							</td>
						</tr>
					</table>
				</div>
				<table
					id="flight-info"
					:style="'color: black; background-color: white; width: ' + resolution2 + 'px;'"
				>
					<tr>
						<td>
							<flightInfoChart
								ref="flightInfoChart"
								:chart-data="flightInfoChartData"
							/>
						</td>
						<td >
							<flightInfo
								id="flight-info"
								ref="flightInfo"
								:flight-info="flightInfo"
							/>
						</td>
					</tr>
				</table>
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
		flightInfoStyleAltitudeColor: null,
		flightInfoStyleAltitudeFColor: null,
		flightInfoStyleEventApogeeColor: null,
		flightInfoStyleEventApogeeBorderColor: null,
		flightInfoStyleEventDrogueColor: null,
		flightInfoStyleEventDrogueBorderColor: null,
		flightInfoStyleEventMainColor: null,
		flightInfoStyleEventMainBorderColor: null,
		flightInfoStyleVelocityColor: null,
		flightInfoStyleVelocityFColor: null,
		flightInfoTitle: null,
		processing: false,
		resolution: Constants.FlightInfo.Resolution,
		resolution2: Constants.FlightInfo.Resolution,
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

			this.flightInfoStyleLoad(value);
		}
	},
	created() {
		this.serviceFlightInfo = AppUtility.injector.getService(Constants.InjectorKeys.SERVICE_FLIGHT_INFO);

		this.flightInfoStyleReset(false);

		this.resolution = Constants.FlightInfo.Resolution;
		this.resolution2 = this.resolution;
	},
	mounted() {
		this.reset();
		this.flightInfoStyleReset(false);

		this.flightInfoProcessors = AppUtility.selectOptions(this.serviceFlightInfo.serviceProcessors, this.$t, 'flightInfo.processors', (l) => { return l.id; }, null, (l) => { return l.id; });
		this.flightInfoMeasurementUnitsOptions = AppUtility.selectOptions(AppUtility.measurementUnits(), this.$t, 'measurementUnits');
		this.flightInfoMeasurementUnits = AppUtility.$store.state.measurementUnits;

		this.resolution = AppUtility.$store.state.flightInfoResolution ?? Constants.FlightInfo.Resolution;
		this.resolution2 = this.resolution;
	},
	methods: {
		checkErrors() {
			this.$refs.flightInfoInput.validate();
			this.$refs.flightInfoMeasurementUnits.validate();
			this.$refs.flightInfoProcessor.validate();

			this.flightInfoDataTypeError = !(this.flightInfoDataTypeActual || this.flightInfoDataTypeFiltered);

			this.buttons.process.disabled = this.hasError();
		},
		clickResolution(resolution) {
			this.resolution = resolution;

			AppUtility.$store.dispatch('setFlightInfoResolution', resolution);

			if (this.processing)
				this.flightInfoProcess();
		},
		flightInfoStyleLoad() {
			if (String.isNullOrEmpty(this.flightInfoProcessor))
				return;

			const style = AppUtility.$store.getters.getFlightInfoStyle(this.flightInfoProcessor);
			if (!style)
				return;

			this.flightInfoStyleAltitudeColor = style.altitude.color;
			this.flightInfoStyleAltitudeFColor = style.altitudeF.color;
			this.flightInfoStyleEventApogeeColor = style.event.apogee.color;
			this.flightInfoStyleEventApogeeBorderColor = style.event.apogeeBorder.color;
			this.flightInfoStyleEventDrogueColor = style.event.drogue.color;
			this.flightInfoStyleEventDrogueBorderColor = style.event.drogueBorder.color;
			this.flightInfoStyleEventMainColor = style.event.main.color;
			this.flightInfoStyleEventMainBorderColor = style.event.mainBorder.color;
			this.flightInfoStyleVelocityColor = style.velocity.color;
			this.flightInfoStyleVelocityFColor = style.velocityF.color;
		},
		flightInfoStyleReset(notify) {
			this.flightInfoStyleAltitudeColor = this.serviceFlightInfo.styleDefault.altitude.color;
			this.flightInfoStyleAltitudeFColor = this.serviceFlightInfo.styleDefault.altitudeF.color;
			this.flightInfoStyleEventApogeeColor = this.serviceFlightInfo.styleDefault.event.apogee.color;
			this.flightInfoStyleEventApogeeBorderColor = this.serviceFlightInfo.styleDefault.event.apogeeBorder.color;
			this.flightInfoStyleEventDrogueColor = this.serviceFlightInfo.styleDefault.event.drogue.color;
			this.flightInfoStyleEventDrogueBorderColor = this.serviceFlightInfo.styleDefault.event.drogueBorder.color;
			this.flightInfoStyleEventMainColor = this.serviceFlightInfo.styleDefault.event.main.color;
			this.flightInfoStyleEventMainBorderColor = this.serviceFlightInfo.styleDefault.event.mainBorder.color;
			this.flightInfoStyleVelocityColor = this.serviceFlightInfo.styleDefault.velocity.color;
			this.flightInfoStyleVelocityFColor = this.serviceFlightInfo.styleDefault.velocityF.color;

			notify = (notify !== null && notify !== undefined) ? notify : true;
			if (notify)
				this.notify('messages.reset');
		},
		flightInfoStyleSave() {
			if (String.isNullOrEmpty(this.flightInfoProcessor))
				return;

			const style = {
				id: this.flightInfoProcessor,
				altitude: {
					color: this.flightInfoStyleAltitudeColor
				},
				altitudeF: {
					color: this.flightInfoStyleAltitudeFColor
				},
				event: {
					apogee: {
						color: this.flightInfoStyleEventApogeeColor
					},
					apogeeBorder: {
						color: this.flightInfoStyleEventApogeeBorderColor
					},
					drogue: {
						color: this.flightInfoStyleEventDrogueColor
					},
					drogueBorder: {
						color: this.flightInfoStyleEventDrogueBorderColor
					},
					main: {
						color: this.flightInfoStyleEventMainColor
					},
					mainBorder: {
						color: this.flightInfoStyleEventMainBorderColor
					}
				},
				velocity: {
					color: this.flightInfoStyleVelocityColor
				},
				velocityF: {
					color: this.flightInfoStyleVelocityFColor
				}
			};

			AppUtility.$store.dispatch('setFlightInfoStyle', style);

			this.notify('messages.saved');
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

			this.resolution2 = this.resolution;
			this.processing = true;

			setTimeout(() => {
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

				flightInfoResults.info.style.altitude = this.flightInfoStyleAltitudeColor;
				flightInfoResults.info.style.altitudeF = this.flightInfoStyleAltitudeFColor;
				flightInfoResults.info.style.event.apogee = this.flightInfoStyleEventApogeeColor;
				flightInfoResults.info.style.event.apogeeBorder = this.flightInfoStyleEventApogeeBorderColor;
				flightInfoResults.info.style.event.drogue = this.flightInfoStyleEventDrogueColor;
				flightInfoResults.info.style.event.drogueBorder = this.flightInfoStyleEventDrogueBorderColor;
				flightInfoResults.info.style.event.main = this.flightInfoStyleEventMainColor;
				flightInfoResults.info.style.event.mainBorder = this.flightInfoStyleEventMainBorderColor;
				flightInfoResults.info.style.velocity = this.flightInfoStyleVelocityColor;
				flightInfoResults.info.style.velocityF = this.flightInfoStyleVelocityFColor;

				this.flightInfoChartData = flightInfoResults.info;
				this.flightInfo = flightInfoResults.info;

				this.notify('messages.processed');

				this.buttons.export.disabled = false;
			}, 50);
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
			this.processing = false;
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

			this.notify('messages.reset');
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
