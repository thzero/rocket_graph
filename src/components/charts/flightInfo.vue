<template>
	<div class="text-h6">
		<div
			class="row text-h6"
			v-if="date"
		>
			<div class="col-6 q-pl-sm text-left">
				{{ title }}
			</div>
			<div class="col-6 q-pr-sm text-right">
				{{ date }}
			</div>
		</div>
		<div
			class="text-center text-h6"
			v-if="!date"
		>
			{{ title }}
		</div>
		<div
			class="text-center text-subtitle1"
			v-if="location"
		>
			{{ location }}
		</div>
	</div>
	<div style="min-height: 800px;">
		<canvas id="flight-info-chart-int"></canvas>
	</div>
</template>

<script>
import { defineComponent } from 'vue';
import { Chart, registerables } from 'chart.js';

Chart.register(...registerables);

export default defineComponent({
	name: 'FlightInfoChart',
	props: {
		chartData: Object,
		optionsOverride: Object
	},
	data: () => ({
		date: '',
		location: '',
		options: {
			maintainAspectRatio: false,
			responsive: true,
			lineTension: 1,
			scales: {
				xAxis: {
					// afterTickToLabelConversion: function (data) {
					// 	const xLabels = data.ticks;
					// 	xLabels.forEach(function (labels, i) {
					// 		if (i % 2 == 1)
					// 			xLabels[i] = '';
					// 	});
					// },
					ticks: {
						autoSkip: true,
						autoSkipPadding: 6,
						maxRotation: 0,
						minRotation: 0
					}
				}
			}
			// plugins: {
			// 	title: {
			// 		display: true,
			// 		font: {
			// 			size: 16
			// 		},
			// 		text: ''
			// 	}
			// }
		},
		title: ''
	}),
	watch: {
		chartData: function (flightInfo) {
			// AppUtility.debug2(flightInfo);
			if (this.chart) {
				this.chart.destroy();
				this.chart = null;
			}

			if (flightInfo) {
				this.title = flightInfo.title ?? this.$t('charts.flightInfo.title');
				this.date = flightInfo.date ?? '';
				this.location = flightInfo.location ?? '';

				// this.options.plugins.title.text = title + '\nsdfsdf';

				const chart = {
					type: 'line',
					data: {
						labels: flightInfo.time,
						datasets: []
					},
					options: this.options
				};

				if (flightInfo.dataTypes.filtered) {
					chart.data.datasets.push({
						type: 'line',
						data: flightInfo.altitude.dataF,
						label: this.$t('charts.flightInfo.altitude.titleF'),
						borderColor: flightInfo.style.altitudeF,
						fill: false,
						pointRadius: 0
					});
				}
				if (flightInfo.dataTypes.actual) {
					chart.data.datasets.push({
						type: 'line',
						data: flightInfo.altitude.data,
						label: this.$t('charts.flightInfo.altitude.title'),
						borderColor: flightInfo.style.altitude,
						fill: false,
						pointRadius: 0
					});
				}

				if (flightInfo.dataTypes.filtered) {
					chart.data.datasets.push({
						type: 'line',
						data: flightInfo.velocity.dataF,
						label: this.$t('charts.flightInfo.velocity.titleF'),
						borderColor: flightInfo.style.velocityF,
						fill: false,
						pointRadius: 0
					});
				}
				if (flightInfo.dataTypes.actual) {
					chart.data.datasets.push({
						type: 'line',
						data: flightInfo.velocity.data,
						label: this.$t('charts.flightInfo.velocity.title'),
						borderColor: flightInfo.style.velocity,
						fill: false,
						pointRadius: 0
					});
				}

				chart.data.datasets.push({
					type: 'scatter',
					data: flightInfo.events.apogee.data,
					label: this.$t('charts.flightInfo.events.apogee'),
					borderColor: flightInfo.style.event.apogeeBorder,
					backgroundColor: flightInfo.style.event.apogee + '7F',
					borderWidth: 2,
					pointRadius: 10
				});
				// chart.data.datasets.push({
				// 	type: 'scatter',
				// 	data: flightInfo.events.noseOver.data,
				// 	label: this.$t('charts.flightInfo.events.noseOver'),
				// 	borderColor: '#FFFF00',
				// 	pointRadius: 10
				// });
				chart.data.datasets.push({
					type: 'scatter',
					data: flightInfo.events.drogue.data,
					label: this.$t('charts.flightInfo.events.drogue'),
					borderColor: flightInfo.style.event.drogueBorder,
					backgroundColor: flightInfo.style.event.drogue + '7F',
					pointRadius: 10
				});
				chart.data.datasets.push({
					type: 'scatter',
					data: flightInfo.events.main.data,
					label: this.$t('charts.flightInfo.events.main'),
					borderColor: flightInfo.style.event.mainBorder,
					backgroundColor: flightInfo.style.event.main + '7F',
					pointRadius: 10
				});

				this.chart = new Chart(this.ctx, chart);
			}
		}
	},
	mounted() {
		// this.options.plugins.title.text = this.$t('charts.flightInfo.title');
		this.ctx = document.getElementById('flight-info-chart-int');
		if (this.chartData)
			this.chart = new Chart(this.ctx, this.chartData);
	}
});
</script>
