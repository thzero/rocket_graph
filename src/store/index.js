import { store } from 'quasar/wrappers';
import { createStore } from 'vuex';

import AppUtility from '../utility';

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
	console.log(AppUtility.injector);
	console.log(AppUtility.injector);
	console.log(AppUtility.injector);
	console.log(AppUtility.injector);
	console.log(AppUtility.injector);
	console.log(AppUtility.injector);
	console.log(AppUtility.injector);

	const sdf = AppUtility.injector.getService('sdf');
	sdf();

	let initialState = {};
	window.rgAPI.getStore((data) => {
		// console.log('render.getStore');
		// console.log(data);
		initialState = data;
	});

	const electronStorePlugin = (store) => {
		store.replaceState(initialState);

		store.subscribe((mutation, state) => {
			// called after every mutation.
			// The mutation comes in the format of `{ type, payload }`.
			// persistentStore.set('state', JSON.stringify(state));
			window.rgAPI.setStore(JSON.stringify(state));
		});
	};

	const store = createStore({
		state () {
			return {
				measurementUnits: AppUtility.measurementUnitEnglish
			}
		},
		actions: {
			async setMeasurementUnits({ commit }, value) {
				commit('setMeasurementUnits', value);
			}
		},
		getters: {
			getMeasurementUnit: (state) => () => {
				return state.measurementUnits ?? AppUtility.measurementUnitEnglish
			}
		},
		mutations: {
			setMeasurementUnits (state, value) {
				state.measurementUnits = value;
			}
		},
		modules: {
			// example
		},

		plugins: [electronStorePlugin],

		// enable strict mode (adds overhead!)
		// for dev mode and --debug builds only
		strict: process.env.DEBUGGING
	});

	AppUtility.$store = store;

	return store;
})
