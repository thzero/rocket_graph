<template>
	<router-view />
</template>

<script>
import { defineComponent } from 'vue';
import { useQuasar } from 'quasar';

import Constants from './constants';

import AppUtility from './utility';

// TODO: Convert to library dependencies
import ElectronDownloadService from './services/download/electron';
import EggtimerFlightInfoProcessorService from './services/processors/eggtimer';
import FlightInfoService from './services/flightInfo';

// TODO: Convert to library dependencies
class Injector {
	constructor() {
		this._services = new Map();
	}

	getService(name) {
		if (!name || name === undefined || name === '')
			return;

		return this._services.get(name);
	}

	registerService(name, service) {
		if (!name || name === undefined || name === '')
			return;

		if (!service || service === undefined)
			return;

		if (this._services.has(name))
			return;

		this._services.set(name, service);
	}
}

AppUtility.injector = new Injector();

// TODO: Convert to library dependencies
const flightInfoService = new FlightInfoService();
AppUtility.injector.registerService(Constants.InjectorKeys.SERVICE_DOWNLOAD, new ElectronDownloadService());
AppUtility.injector.registerService(Constants.InjectorKeys.SERVICE_FLIGHT_INFO, flightInfoService);
AppUtility.injector.registerService(Constants.InjectorKeys.SERVICE_FLIGHT_INFO_PROCESSOR_EGGTIMER, new EggtimerFlightInfoProcessorService());

// TODO: Convert to library dependencies
flightInfoService.init(AppUtility.injector);

export default defineComponent({
	name: 'App',
	setup () {
		const $q = useQuasar();
		// get status
		console.log($q.dark.isActive); // true, false
		// get configured status
		console.log($q.dark.mode); // "auto", true, false
		// set status
		$q.dark.set(true); // or false or "auto"
	},
	created() {
		AppUtility.$t = this.$t;
	}
});
</script>
