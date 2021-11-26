<template>
	<table class="measurements" style="width: 100%;">
		<tr>
			<th>{{ $t('charts.flightInfo.flightTime') }}</th>
			<td><span>{{ flightInfo?.events?.ground?.time }}</span>{{ measurementTime }}</td>
		</tr>
		<tr>
			<th>{{ $t('charts.flightInfo.altitude.max') }}</th>
			<td><span>{{ formatNumber(valueType(flightInfo?.altitude?.max, flightInfo?.altitude?.maxF)) }}</span>{{ measurementAltitude }}</td>
		</tr>
		<tr>
			<th colspan="2"></th>
		</tr>
		<tr>
			<th colspan="2">{{ $t('charts.flightInfo.events.title') }}</th>
		</tr>
		<tr>
			<th class="subTitleSep">{{ $t('charts.flightInfo.events.apogee') }}</th>
			<td><span>{{ formatNumber(valueType(flightInfo?.events?.apogee?.altitude, flightInfo?.events?.apogee?.altitudeF)) }}</span>{{ measurementAltitude }}&nbsp;@&nbsp;<span>{{ valueType(flightInfo?.events?.apogee?.time, flightInfo?.events?.apogee?.timeF) }}</span>{{ measurementTime }}</td>
		</tr>
		<tr>
			<th class="subTitleSep">{{ $t('charts.flightInfo.events.noseOver') }}</th>
			<td><span>{{ formatNumber(valueType(flightInfo?.events?.noseOver?.altitude, flightInfo?.events?.noseOver?.altitudeF)) }}</span>{{ measurementAltitude }}&nbsp;@&nbsp;<span>{{ valueType(flightInfo?.events?.noseOver?.time, flightInfo?.events?.noseOver?.timeF) }}</span>{{ measurementTime }}</td>
		</tr>
		<tr>
			<th class="subTitleSep">{{ $t('charts.flightInfo.events.drogue') }}</th>
			<td><span>{{ formatNumber(valueType(flightInfo?.events?.drogue?.altitude, flightInfo?.events?.drogue?.altitude)) }}</span>{{ measurementAltitude }}&nbsp;@&nbsp;<span>{{ valueType(flightInfo?.events?.drogue?.time, flightInfo?.events?.drogue?.timeF) }}</span>{{ measurementTime }}</td>
		</tr>
		<tr>
			<th class="subTitleSep">{{ $t('charts.flightInfo.events.main') }}</th>
			<td><span>{{ formatNumber(valueType(flightInfo?.events?.main?.altitude, flightInfo?.events?.main?.altitudeF)) }}</span>{{ measurementAltitude }}&nbsp;@&nbsp;<span>{{ valueType(flightInfo?.events?.main?.time, flightInfo?.events?.main?.time) }}</span>{{ measurementTime }}</td>
		</tr>
		<tr>
			<th colspan="2"></th>
		</tr>
		<tr>
			<th colspan="2">{{ $t('charts.flightInfo.velocity.title') }}</th>
		</tr>
		<tr>
			<th class="subTitleSep" colspan="2">{{ $t('charts.flightInfo.ascent') }}</th>
		</tr>
		<tr>
			<th class="subSep">{{ $t('charts.flightInfo.max.abbr') }}</th>
			<td><span>{{ formatNumber(valueType(flightInfo?.velocity?.max?.value, flightInfo?.velocity?.max?.valueF)) }}</span>{{ measurementVelocity }}&nbsp;@&nbsp;<span>{{ valueType(flightInfo?.velocity?.max?.time, flightInfo?.velocity?.max?.timeF) }}</span>{{ measurementTime }},&nbsp;<span>{{ formatNumber(valueType(flightInfo?.velocity?.max?.altitude, flightInfo?.velocity?.max?.altitudeF)) }}</span>{{ measurementAltitude }}</td>
		</tr>
		<tr>
			<th class="subSep">{{ $t('charts.flightInfo.avg.abbr') }}</th>
			<td><span>{{ formatNumber(valueType(flightInfo?.velocity?.avg?.value, flightInfo?.velocity?.avg?.valueF)) }}</span>{{ measurementVelocity }}</td>
		</tr>
		<tr style="display: none;">
			<th class="subSep">{{ $t('charts.flightInfo.min.abbr') }}</th>
			<td><span>{{ formatNumber(valueType(flightInfo?.velocity?.min?.value, flightInfo?.velocity?.min?.valueF)) }}</span>{{ measurementVelocity }}&nbsp;@&nbsp;<span>{{ valueType(flightInfo?.velocity?.min?.time, flightInfo?.velocity?.min?.timeF) }}</span>{{ measurementTime }},&nbsp;<span>{{ formatNumber(valueType(flightInfo?.velocity?.min?.altitude, flightInfo?.velocity?.min?.altitudeF)) }}</span>{{ measurementAltitude }}</td>
		</tr>
		<tr>
			<th class="subTitleSep" colspan="2">{{ $t('charts.flightInfo.descent') }}</th>
		</tr>
		<tr>
			<th class="subTitleSep2" colspan="2">{{ $t('charts.flightInfo.events.drogue') }}</th>
		</tr>
		<tr>
			<th class="subSep3">{{ $t('charts.flightInfo.max.abbr') }}</th>
			<td><span>{{ formatNumber(valueType(flightInfo?.velocity?.min?.drogue?.max?.value, flightInfo?.velocity?.min?.drogue?.max?.valueF)) }}</span>{{ measurementVelocity }}&nbsp;@&nbsp;<span>{{ valueType(flightInfo?.velocity?.min?.drogue?.max?.time, flightInfo?.velocity?.min?.drogue?.max?.timeF) }}</span>{{ measurementTime }},&nbsp;<span>{{ formatNumber(valueType(flightInfo?.velocity?.min?.drogue?.max?.altitude, flightInfo?.velocity?.min?.drogue?.max?.altitude)) }}</span>{{ measurementAltitude }}</td>
		</tr>
		<tr>
			<th class="subSep3">{{ $t('charts.flightInfo.min.abbr') }}</th>
			<td><span>{{ formatNumber(valueType(flightInfo?.velocity?.min?.drogue?.min?.value, flightInfo?.velocity?.min?.drogue?.min?.valueF)) }}</span>{{ measurementVelocity }}&nbsp;@&nbsp;<span>{{ valueType(flightInfo?.velocity?.min?.drogue?.min?.time, flightInfo?.velocity?.min?.drogue?.min?.timeF) }}</span>{{ measurementTime }},&nbsp;<span>{{ formatNumber(valueType(flightInfo?.velocity?.min?.drogue?.min?.altitude, flightInfo?.velocity?.min?.drogue?.min?.altitude)) }}</span>{{ measurementAltitude }}</td>
		</tr>
		<tr>
			<th class="subSep3">{{ $t('charts.flightInfo.avg.abbr') }}</th>
			<td><span>{{ formatNumber(valueType(flightInfo?.velocity?.min?.drogue?.avg?.value, flightInfo?.velocity?.min?.drogue?.avg?.valueF)) }}</span>{{ measurementVelocity }}</td>
		</tr>
		<tr>
			<th class="subTitleSep2" colspan="2">{{ $t('charts.flightInfo.events.main') }}</th>
		</tr>
		<tr>
			<th class="subSep3">{{ $t('charts.flightInfo.max.abbr') }}</th>
			<td><span>{{ formatNumber(valueType(flightInfo?.velocity?.min?.main?.max?.value, flightInfo?.velocity?.min?.main?.max?.valueF)) }}</span>{{ measurementVelocity }}&nbsp;@&nbsp;<span>{{ valueType(flightInfo?.velocity?.min?.main?.max?.time, flightInfo?.velocity?.min?.main?.max?.timeF) }}</span>{{ measurementTime }},&nbsp;<span>{{ formatNumber(valueType(flightInfo?.velocity?.min?.main?.max?.altitude, flightInfo?.velocity?.min?.main?.max?.altitude)) }}</span>{{ measurementAltitude }}</td>
		</tr>
		<tr>
			<th class="subSep3">{{ $t('charts.flightInfo.min.abbr') }}</th>
			<td><span>{{ formatNumber(valueType(flightInfo?.velocity?.min?.main?.min?.value, flightInfo?.velocity?.min?.main?.min?.valueF)) }}</span>{{ measurementVelocity }}&nbsp;@&nbsp;<span>{{ valueType(flightInfo?.velocity?.min?.main?.min?.time, flightInfo?.velocity?.min?.main?.min?.timeF) }}</span>{{ measurementTime }},&nbsp;<span>{{ formatNumber(valueType(flightInfo?.velocity?.min?.main?.min?.altitude, flightInfo?.velocity?.min?.main?.min?.altitude)) }}</span>{{ measurementAltitude }}</td>
		</tr>
		<tr>
			<th class="subSep3">{{ $t('charts.flightInfo.avg.abbr') }}</th>
			<td><span>{{ formatNumber(valueType(flightInfo?.velocity?.min?.main?.avg?.value, flightInfo?.velocity?.min?.main?.avg?.valueF)) }}</span>{{ measurementVelocity }}</td>
		</tr>
		<tr>
			<th colspan="2"></th>
		</tr>
		<tr>
			<th colspan="2">{{ $t('charts.flightInfo.acceleration') }}</th>
		</tr>
		<tr>
			<th class="subTitleSep">{{ $t('charts.flightInfo.max.abbr') }}</th>
			<td><span>{{ formatNumber(valueType(flightInfo?.acceleration?.max?.value, flightInfo?.acceleration?.max?.value)) }}</span>{{ measurementAcceleration }}&nbsp;@&nbsp;<span>{{ valueType(flightInfo?.acceleration?.max?.time, flightInfo?.acceleration?.max?.time) }}</span>{{ measurementTime }},&nbsp;<span>{{ formatNumber(valueType(flightInfo?.acceleration?.max?.altitude, flightInfo?.acceleration?.max?.altitudeF)) }}</span>{{ measurementAltitude }}</td>
		</tr>
		<tr>
			<th class="subTitleSep">{{ $t('charts.flightInfo.min.abbr') }}</th>
			<td><span>{{ formatNumber(valueType(flightInfo?.acceleration?.min?.value, flightInfo?.acceleration?.min?.value)) }}</span>{{ measurementAcceleration }}&nbsp;@&nbsp;<span>{{ valueType(flightInfo?.acceleration?.min?.time, flightInfo?.acceleration?.min?.timeF) }}</span>{{ measurementTime }},&nbsp;<span>{{ formatNumber(valueType(flightInfo?.acceleration?.min?.altitude, flightInfo?.acceleration?.min?.altitudeF)) }}</span>{{ measurementAltitude }}</td>
		</tr>
		<tr>
			<th class="subTitleSep" colspan="2">{{ $t('charts.flightInfo.descent') }}</th>
		</tr>
		<tr>
			<th class="subTitleSep2" colspan="2">{{ $t('charts.flightInfo.events.drogue') }}</th>
		</tr>
		<tr>
			<th class="subSep3">{{ $t('charts.flightInfo.max.abbr') }}</th>
			<td><span>{{ formatNumber(valueType(flightInfo?.acceleration?.min?.drogue?.max?.value, flightInfo?.acceleration?.min?.drogue?.max?.valueF)) }}</span>{{ measurementAcceleration }}&nbsp;@&nbsp;<span>{{ valueType(flightInfo?.acceleration?.min?.drogue?.max?.time, flightInfo?.acceleration?.min?.drogue?.max?.timeF) }}</span>{{ measurementTime }},&nbsp;<span>{{ formatNumber(valueType(flightInfo?.acceleration?.min?.drogue?.max?.altitude, flightInfo?.acceleration?.min?.drogue?.max?.altitudeF)) }}</span>{{ measurementAltitude }}</td>
		</tr>
		<tr>
			<th class="subSep3">{{ $t('charts.flightInfo.min.abbr') }}</th>
			<td><span>{{ formatNumber(valueType(flightInfo?.acceleration?.min?.drogue?.min?.value, flightInfo?.acceleration?.min?.drogue?.min?.valueF)) }}</span>{{ measurementAcceleration }}&nbsp;@&nbsp;<span>{{ valueType(flightInfo?.acceleration?.min?.drogue?.min?.time, flightInfo?.acceleration?.min?.drogue?.min?.timeF) }}</span>{{ measurementTime }},&nbsp;<span>{{ formatNumber(valueType(flightInfo?.acceleration?.min?.drogue?.min?.altitude, flightInfo?.acceleration?.min?.drogue?.min?.altitudeF)) }}</span>{{ measurementAltitude }}</td>
		</tr>
		<tr>
			<th class="subSep3">{{ $t('charts.flightInfo.avg.abbr') }}</th>
			<td><span>{{ formatNumber(valueType(flightInfo?.acceleration?.min?.drogue?.avg?.value, flightInfo?.acceleration?.min?.drogue?.avg?.valueF)) }}</span>{{ measurementAcceleration }}</td>
		</tr>
		<tr>
			<th class="subTitleSep2" colspan="2">{{ $t('charts.flightInfo.events.main') }}</th>
		</tr>
		<tr>
			<th class="subSep3">{{ $t('charts.flightInfo.max.abbr') }}</th>
			<td><span>{{ formatNumber(valueType(flightInfo?.acceleration?.min?.main?.max?.value, flightInfo?.acceleration?.min?.main?.max?.valueF)) }}</span>{{ measurementAcceleration }}&nbsp;@&nbsp;<span>{{ valueType(flightInfo?.acceleration?.min?.main?.max?.time, flightInfo?.acceleration?.min?.main?.max?.timeF) }}</span>{{ measurementTime }},&nbsp;<span>{{ formatNumber(valueType(flightInfo?.acceleration?.min?.main?.max?.altitude, flightInfo?.acceleration?.min?.main?.max?.altitudeF)) }}</span>{{ measurementAltitude }}</td>
		</tr>
		<tr>
			<th class="subSep3">{{ $t('charts.flightInfo.min.abbr') }}</th>
			<td><span>{{ formatNumber(valueType(flightInfo?.acceleration?.min?.main?.min?.value, flightInfo?.acceleration?.min?.main?.min?.valueF)) }}</span>{{ measurementAcceleration }}&nbsp;@&nbsp;<span>{{ valueType(flightInfo?.acceleration?.min?.main?.min?.time, flightInfo?.acceleration?.min?.main?.min?.timeF) }}</span>{{ measurementTime }},&nbsp;<span>{{ formatNumber(valueType(flightInfo?.acceleration?.min?.main?.min?.altitude, flightInfo?.acceleration?.min?.main?.min?.altitudeF)) }}</span>{{ measurementAltitude }}</td>
		</tr>
		<tr>
			<th class="subSep3">{{ $t('charts.flightInfo.avg.abbr') }}</th>
			<td><span>{{ formatNumber(valueType(flightInfo?.acceleration?.min?.main?.avg?.value, flightInfo?.acceleration?.min?.main?.avg?.valueF)) }}</span>{{ measurementAcceleration }}</td>
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
		measurementAcceleration() { return this.flightInfo ? this.$t('measurements.' + this.measurementUnits + '.acceleration.abbr') : ''; },
		measurementAltitude() { return this.flightInfo ? this.$t('measurements.' + this.measurementUnits + '.altitude.abbr') : ''; },
		measurementTime() { return this.flightInfo ? this.$t('measurements.' + this.measurementUnits + '.time.abbr') : ''; },
		measurementVelocity() { return this.flightInfo ? this.$t('measurements.' + this.measurementUnits + '.velocity.abbr') : ''; }
	},
	data: () => ({
	}),
	mounted() {
	},
	methods: {
		formatNumber(value) {
			return value?.toLocaleString();
		},
		valueType(value, valueF) {
			return valueF;
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
