import StoreService from './index';

class ElectronStoreService extends StoreService {
	intializePlugins(initialState) {
		return [(store) => {
			store.replaceState(initialState);

			store.subscribe((mutation, state) => {
				// called after every mutation.
				// The mutation comes in the format of `{ type, payload }`.
				// persistentStore.set('state', JSON.stringify(state));
				// console.debug('renderer.store.subscribe');
				// console.debug(mutation);
				// console.debug(state);
				window.rgStoreApi.setStore(JSON.stringify(state));
			});
		}];
	}

	initializeState(callback) {
		window.rgStoreApi.getStore((data) => {
			// console.debug('render.initializeState.getStore');
			// console.debug(data);
			callback(data);
		});
	}
}

export default ElectronStoreService;
