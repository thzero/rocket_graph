<template>
		<table class="measurements" style="width: 100%;">
			<tr>
				<th>Flight Time</th>
				<td><span>{{ flightInfo?.events?.ground?.time }}</span>{{ measurementTime }}</td>
			</tr>
			<tr>
				<th>Max. Altitude</th>
				<td><span>{{ convertAltitude(flightInfo?.altitude?.max) }}</span>{{ measurementAltitude }}</td>
			</tr>
			<tr>
				<th colspan="2"></th>
			</tr>
			<tr>
				<th colspan="2">Velocity</th>
			</tr>
			<tr>
				<th class="subTitleSep" colspan="2">Ascent</th>
			</tr>
			<tr>
				<th class="subSep">Max.</th>
				<td><span>{{ convertVelocity(flightInfo?.velocity?.max?.value) }}</span>{{ measurementVelocity }}&nbsp;@&nbsp;<span>{{ flightInfo?.velocity?.max?.time }}</span>{{ measurementTime }},&nbsp;<span>{{ convertAltitude(flightInfo?.velocity?.max?.altitude) }}</span>{{ measurementAltitude }}</td>
			</tr>
			<tr>
				<th class="subSep">Avg.</th>
				<td><span>{{ convertVelocity(flightInfo?.velocity?.avg?.value) }}</span>{{ measurementVelocity }}</td>
			</tr>
			<tr style="display: none;">
				<th class="subSep">Min.</th>
				<td><span>{{ convertVelocity(flightInfo?.velocity?.min?.value) }}</span>{{ measurementVelocity }}&nbsp;@&nbsp;<span>{{ flightInfo?.velocity?.min?.time }}</span>{{ measurementTime }},&nbsp;<span>{{ convertAltitude(flightInfo?.velocity?.min?.altitude) }}</span>{{ measurementAltitude }}</td>
			</tr>
			<tr>
				<th class="subTitleSep" colspan="2">Descent</th>
			</tr>
			<tr>
				<th class="subTitleSep2" colspan="2">Drogue</th>
			</tr>
			<tr>
				<th class="subSep3">Max.</th>
				<td><span>{{ convertVelocity(flightInfo?.velocity?.min?.drogue?.max?.value) }}</span>{{ measurementVelocity }}&nbsp;@&nbsp;<span>{{ flightInfo?.velocity?.min?.drogue?.max?.time }}</span>{{ measurementTime }},&nbsp;<span>{{ convertAltitude(flightInfo?.velocity?.min?.drogue?.max?.altitude) }}</span>{{ measurementAltitude }}</td>
			</tr>
			<tr>
				<th class="subSep3">Min.</th>
				<td><span>{{ convertVelocity(flightInfo?.velocity?.min?.drogue?.min?.value) }}</span>{{ measurementVelocity }}&nbsp;@&nbsp;<span>{{ flightInfo?.velocity?.min?.drogue?.min?.time }}</span>{{ measurementTime }},&nbsp;<span>{{ convertAltitude(flightInfo?.velocity?.min?.drogue?.min?.altitude) }}</span>{{ measurementAltitude }}</td>
			</tr>
			<tr>
				<th class="subSep3">Avg.</th>
				<td><span>{{ convertVelocity(flightInfo?.velocity?.min?.drogue?.avg?.value) }}</span>{{ measurementVelocity }}</td>
			</tr>
			<tr>
				<th class="subTitleSep2" colspan="2">Main</th>
			</tr>
			<tr>
				<th class="subSep3">Max.</th>
				<td><span>{{ convertVelocity(flightInfo?.velocity?.min?.main?.max?.value) }}</span>{{ measurementVelocity }}&nbsp;@&nbsp;<span>{{ flightInfo?.velocity?.min?.main?.max?.time }}</span>{{ measurementTime }},&nbsp;<span>{{ convertAltitude(flightInfo?.velocity?.min?.main?.max?.altitude) }}</span>{{ measurementAltitude }}</td>
			</tr>
			<tr>
				<th class="subSep3">Min.</th>
				<td><span>{{ convertVelocity(flightInfo?.velocity?.min?.main?.min?.value) }}</span>{{ measurementVelocity }}&nbsp;@&nbsp;<span>{{ flightInfo?.velocity?.min?.main?.min?.time }}</span>{{ measurementTime }},&nbsp;<span>{{ convertAltitude(flightInfo?.velocity?.min?.main?.min?.altitude) }}</span>{{ measurementAltitude }}</td>
			</tr>
			<tr>
				<th class="subSep3">Avg.</th>
				<td><span>{{ convertVelocity(flightInfo?.velocity?.min?.main?.avg?.value) }}</span>{{ measurementVelocity }}</td>
			</tr>
			<tr>
				<th colspan="2"></th>
			</tr>
			<tr>
				<th colspan="2">Acceleration</th>
			</tr>
			<tr>
				<th class="subTitleSep">Max.</th>
				<td><span>{{ convertAcceleration(flightInfo?.acceleration?.max?.value) }}</span>{{ measurementAcceleration }}&nbsp;@&nbsp;<span>{{ flightInfo?.acceleration?.max?.time }}</span>{{ measurementTime }},&nbsp;<span>{{ convertAltitude(flightInfo?.acceleration?.max?.altitude) }}</span>{{ measurementAltitude }}</td>
			</tr>
			<tr>
				<th class="subTitleSep">Min.</th>
				<td><span>{{ convertAcceleration(flightInfo?.acceleration?.min?.value) }}</span>{{ measurementAcceleration }}&nbsp;@&nbsp;<span>{{ flightInfo?.acceleration?.min?.time }}</span>{{ measurementTime }},&nbsp;<span>{{ convertAltitude(flightInfo?.acceleration?.min?.altitude) }}</span>{{ measurementAltitude }}</td>
			</tr>
			<tr>
				<th class="subTitleSep" colspan="2">Descent</th>
			</tr>
			<tr>
				<th class="subTitleSep2" colspan="2">Drogue</th>
			</tr>
			<tr>
				<th class="subSep3">Max.</th>
				<td><span>{{ convertAcceleration(flightInfo?.acceleration?.min?.drogue?.max?.value) }}</span>{{ measurementAcceleration }}&nbsp;@&nbsp;<span>{{ flightInfo?.acceleration?.min?.drogue?.max?.time }}</span>{{ measurementTime }},&nbsp;<span>{{ convertAltitude(flightInfo?.acceleration?.min?.drogue?.max?.altitude) }}</span>{{ measurementAltitude }}</td>
			</tr>
			<tr>
				<th class="subSep3">Min.</th>
				<td><span>{{ convertAcceleration(flightInfo?.acceleration?.min?.drogue?.min?.value) }}</span>{{ measurementAcceleration }}&nbsp;@&nbsp;<span>{{ flightInfo?.acceleration?.min?.drogue?.min?.time }}</span>{{ measurementTime }},&nbsp;<span>{{ convertAltitude(flightInfo?.acceleration?.min?.drogue?.min?.altitude) }}</span>{{ measurementAltitude }}</td>
			</tr>
			<tr>
				<th class="subSep3">Avg.</th>
				<td><span>{{ convertAcceleration(flightInfo?.acceleration?.min?.drogue?.avg?.value) }}</span>{{ measurementAcceleration }}</td>
			</tr>
			<tr>
				<th class="subTitleSep2" colspan="2">Main</th>
			</tr>
			<tr>
				<th class="subSep3">Max.</th>
				<td><span>{{ convertAcceleration(flightInfo?.acceleration?.min?.main?.max?.value) }}</span>{{ measurementAcceleration }}&nbsp;@&nbsp;<span>{{ flightInfo?.acceleration?.min?.main?.max?.time }}</span>{{ measurementTime }},&nbsp;<span>{{ convertAltitude(flightInfo?.acceleration?.min?.main?.max?.altitude) }}</span>{{ measurementAltitude }}</td>
			</tr>
			<tr>
				<th class="subSep3">Min.</th>
				<td><span>{{ convertAcceleration(flightInfo?.acceleration?.min?.main?.min?.value) }}</span>{{ measurementAcceleration }}&nbsp;@&nbsp;<span>{{ flightInfo?.acceleration?.min?.main?.min?.time }}</span>{{ measurementTime }},&nbsp;<span>{{ convertAltitude(flightInfo?.acceleration?.min?.main?.min?.altitude) }}</span>{{ measurementAltitude }}</td>
			</tr>
			<tr>
				<th class="subSep3">Avg.</th>
				<td><span>{{ convertAcceleration(flightInfo?.acceleration?.min?.main?.avg?.value) }}</span>{{ measurementAcceleration }}</td>
			</tr>
			<tr>
				<th colspan="2"></th>
			</tr>
			<tr>
				<th colspan="2">Events</th>
			</tr>
			<tr>
				<th>Apogee</th>
				<td><span>{{ convertAltitude(flightInfo?.events?.apogee?.altitude) }}</span>{{ measurementAltitude }}&nbsp;@&nbsp;<span>{{ flightInfo?.events?.apogee?.time }}</span>{{ measurementTime }}</td>
			</tr>
			<tr>
				<th>Nose Over</th>
				<td><span>{{ convertAltitude(flightInfo?.events?.noseOver?.altitude) }}</span>{{ measurementAltitude }}&nbsp;@&nbsp;<span>{{ flightInfo?.events?.noseOver?.time }}</span>{{ measurementTime }}</td>
			</tr>
			<tr>
				<th>Drogue</th>
				<td><span>{{ convertAltitude(flightInfo?.events?.drogue?.altitude) }}</span>{{ measurementAltitude }}&nbsp;@&nbsp;<span>{{ flightInfo?.events?.drogue?.time }}</span>{{ measurementTime }}</td>
			</tr>
			<tr>
				<th>Main</th>
				<td><span>{{ convertAltitude(flightInfo?.events?.main?.altitude) }}</span>{{ measurementAltitude }}&nbsp;@&nbsp;<span>{{ flightInfo?.events?.main?.time }}</span>{{ measurementTime }}</td>
			</tr>
		</table>
</template>

<script>
import { defineComponent } from 'vue';

import AppUtility from '../utility';

export default defineComponent({
	name: 'FlightInfo',
	props: {
		flightInfo: {
			type: Object,
			default: () => { return {}; }
		}
	},
	computed: {
		measurementUnits() { return this.flightInfo?.measurementUnits ?? AppUtility.measurementUnitEnglish; },
		measurementAcceleration() { return this.$t('measurements.' + this.measurementUnits + '.acceleration.abbr'); },
		measurementAltitude() { return this.$t('measurements.' + this.measurementUnits + '.altitude.abbr'); },
		measurementTime() { return this.$t('measurements.' + this.measurementUnits + '.time.abbr'); },
		measurementVelocity() { return this.$t('measurements.' + this.measurementUnits + '.velocity.abbr'); }
	},
	data: () => ({
	}),
	mounted() {
	},
	methods: {
		convertAcceleration(value) {
			// if (!value)
			// 	return value;

			// if (this.measurementUnits === AppUtility.measurementUnitEnglish)
			// 	return value;

			// value = this.round(value * 0.3048);
			return value;
		},
		convertAltitude(value) {
			// if (!value)
			// 	return value;

			// if (this.measurementUnits === AppUtility.measurementUnitEnglish)
			// 	return value;

			// value = this.round(value * 0.3048);
			return value;
		},
		convertVelocity(value) {
			// if (!value)
			// 	return value;

			// if (this.measurementUnits === AppUtility.measurementUnitEnglish)
			// 	return value;

			// value = this.round(value * 0.3048);
			return value;
		},
		round(value, places = 2) {
			return Number(value.toFixed(places));
		}
	}
});
</script>

<style scoped>
.measurements th {
	font-weight: bold;
	padding-right: 10px;
	text-align: left;
}

.subSep {
	padding-left: 16px;
}

.subSep2 {
	padding-left: 24px;
}

.subSep3 {
	padding-left: 32px;
}

.subTitleSep {
	padding-left: 8px;
}

.subTitleSep2 {
	padding-left: 16px;
}
</style>
