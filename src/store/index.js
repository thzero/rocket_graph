import { store } from 'quasar/wrappers';
import { createStore } from 'vuex';

import Constants from '../constants';

import AppUtility from '../utility';

import boot from '../boot/boot';

// import example from './module-example'

/*
 * If not building with SSR mode, you can
 * directly export the Store instantiation;
 *
 * The function below can be async too; either use
 * async/await or return a Promise which resolves
 * with the Store instance.
 */

export default store(function () {
	// TODO:
	// This is dumb, the very first thing that is avaialble in the
	// .quasar/app.js from the @quasar/app template is the function
	// call to the store.  There is no other pre-bootstrap function.

	boot();

	let plugins = [];
	const serviceExternalStore = AppUtility.injector.getService(Constants.InjectorKeys.SERVICE_STORE_EXTERNAL);
	if (serviceExternalStore) {
		let initialState = {};
		serviceExternalStore.initializeState((data) => {
			console.log('render.initializeState.callback');
			console.log(data);
			initialState = data;
		});
		plugins = serviceExternalStore.intializePlugins(initialState);
	}

	const store = createStore({
		state () {
			return {
				flightInfoColors: [],
				flightPathStyle: [],
				measurementUnits: AppUtility.measurementUnitEnglish
			}
		},
		actions: {
			async setFlightInfoColors({ commit }, value) {
				commit('setFlightInfoColors', value);
			},
			async setFlightPathStyle({ commit }, value) {
				commit('setFlightPathStyle', value);
			},
			async setMeasurementUnits({ commit }, value) {
				commit('setMeasurementUnits', value);
			}
		},
		getters: {
			getFlightInfoColors: (state) => (id) => {
				if (!state.flightInfoColors)
					return null;
				return state.flightInfoColors.find(l => l.id);
			},
			getFlightPathStyle: (state) => (id) => {
				if (!state.flightPathStyle)
					return null;
				return state.flightPathStyle.find(l => l.id);
			},
			getMeasurementUnit: (state) => () => {
				return state.measurementUnits ?? AppUtility.measurementUnitEnglish
			}
		},
		mutations: {
			setFlightInfoColors (state, value) {
				if (String.isNullOrEmpty(value.id))
					return;
				if (!state.flightInfoColors)
					state.flightInfoColors = [];
				state.flightInfoColors = AppUtility.updateArrayByObject(state.flightInfoColors, value);
			},
			setFlightPathStyle (state, value) {
				if (String.isNullOrEmpty(value.id))
					return;
				if (!state.flightPathStyle)
					state.flightPathStyle = [];
				state.flightPathStyle = AppUtility.updateArrayByObject(state.flightPathStyle, value);
			},
			setMeasurementUnits (state, value) {
				state.measurementUnits = value;
			}
		},
		modules: {
			// example
		},

		plugins: plugins,

		// enable strict mode (adds overhead!)
		// for dev mode and --debug builds only
		strict: process.env.DEBUGGING
	});

	AppUtility.$store = store;

	return store;
})
