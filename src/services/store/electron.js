import StoreService from './index';

class ElectronStoreService extends StoreService {
	intializePlugins(initialState) {
		return [(store) => {
			store.replaceState(initialState);

			store.subscribe((mutation, state) => {
				// called after every mutation.
				// The mutation comes in the format of `{ type, payload }`.
				// persistentStore.set('state', JSON.stringify(state));
				console.log('renderer.store.subscribe');
				console.log(mutation);
				console.log(state);
				window.rgAPI.setStore(JSON.stringify(state));
			});
		}];
	}

	initializeState(callback) {
		window.rgAPI.getStore((data) => {
			console.log('render.initializeState.getStore');
			console.log(data);
			callback(data);
		});
	}
}

export default ElectronStoreService;
