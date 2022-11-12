import { store } from 'quasar/wrappers';
import { createStore } from 'vuex';

import Constants from '../constants';

import AppUtility from '../utility';

import preload from '../boot/preload';

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
	// Submitted a pull request with the preload hook.

	preload();

	let plugins = [];
	const serviceExternalStore = AppUtility.injector.getService(Constants.InjectorKeys.SERVICE_STORE_EXTERNAL);
	if (serviceExternalStore) {
		let initialState = {};
		serviceExternalStore.initializeState((data) => {
			// console.debug('render.initializeState.callback');
			// console.debug(data);
			initialState = data;
		});
		plugins = serviceExternalStore.intializePlugins(initialState);
	}

	const store = createStore({
		state () {
			return {
				flightDate: '',
				flightInfoResolution: Constants.FlightInfo.Resolution,
				flightInfoStyle: [],
				flightLocation: '',
				flightPathStyle: [],
				flightTitle: '',
				measurementUnits: AppUtility.measurementUnitEnglish
			}
		},
		actions: {
			async setFlightDate({ commit }, value) {
				commit('setFlightDate', value);
			},
			async setFlightInfoResolution({ commit }, value) {
				commit('setFlightInfoResolution', value);
			},
			async setFlightInfoStyle({ commit }, value) {
				commit('setFlightInfoStyle', value);
			},
			async setFlightLocation({ commit }, value) {
				commit('setFlightLocation', value);
			},
			async setFlightPathStyle({ commit }, value) {
				commit('setFlightPathStyle', value);
			},
			async setFlightTitle({ commit }, value) {
				commit('setFlightTitle', value);
			},
			async setMeasurementUnits({ commit }, value) {
				commit('setMeasurementUnits', value);
			}
		},
		getters: {
			getFlightDate: (state) => () => {
				return state.flightDate;
			},
			getFlightInfoStyle: (state) => (id) => {
				if (!state.flightInfoStyle)
					return null;
				return state.flightInfoStyle.find(l => l.id);
			},
			getFlightLocation: (state) => () => {
				return state.flightLocation;
			},
			getFlightPathStyle: (state) => (id) => {
				if (!state.flightPathStyle)
					return null;
				return state.flightPathStyle.find(l => l.id);
			},
			getFlightTitle: (state) => () => {
				return state.flightTitle;
			},
			getMeasurementUnit: (state) => () => {
				return state.measurementUnits ?? AppUtility.measurementUnitEnglish
			}
		},
		mutations: {
			setFlightDate(state, value) {
				state.flightDate = value;
			},
			setFlightInfoResolution(state, value) {
				state.flightInfoResolution = value;
			},
			setFlightInfoStyle(state, value) {
				if (String.isNullOrEmpty(value.id))
					return;
				if (!state.flightInfoStyle)
					state.flightInfoStyle = [];
				state.flightInfoStyle = AppUtility.updateArrayByObject(state.flightInfoStyle, value);
			},
			setFlightLocation(state, value) {
				state.flightLocation = value;
			},
			setFlightPathStyle(state, value) {
				if (String.isNullOrEmpty(value.id))
					return;
				if (!state.flightPathStyle)
					state.flightPathStyle = [];
				state.flightPathStyle = AppUtility.updateArrayByObject(state.flightPathStyle, value);
			},
			setFlightTitle(state, value) {
				state.flightTitle = value;
			},
			setMeasurementUnits(state, value) {
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
