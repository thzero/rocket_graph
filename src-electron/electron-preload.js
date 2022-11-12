/**
 * This file is used specifically for security reasons.
 * Here you can access Nodejs stuff and inject functionality into
 * the renderer thread (accessible there through the "window" object)
 *
 * WARNING!
 * If you import anything from node_modules, then make sure that the package is specified
 * in package.json > dependencies and NOT in devDependencies
 *
 * Example (injects window.myAPI.doAThing() into renderer thread):
 *
 *   import { contextBridge } from 'electron'
 *
 *   contextBridge.exposeInMainWorld('myAPI', {
 *     doAThing: () => {}
 *   })
 */

import { contextBridge, ipcRenderer } from 'electron';
// eslint-disable-next-line no-unused-vars

contextBridge.exposeInMainWorld('rgDownloadApi', {
	download: (value, name, funcCompleted, funcCancelled, funcProgress) => {
		if (!value)
			return;

		if (funcCompleted) {
			ipcRenderer.on('download-cancelled', (event) => {
				funcCancelled();
			});
		}
		if (funcCancelled) {
			ipcRenderer.on('download-completed', (event) => {
				funcCompleted();
			});
		}
		if (funcProgress) {
			ipcRenderer.on('download-progress', (event, arg) => {
				funcProgress(arg);
			});
		}

		// eslint-disable-next-line object-shorthand
		ipcRenderer.send('download-item', { value: value, name: name });
	},
	downloadUrl: (url, name, funcCompleted, funcCancelled, funcProgress) => {
		if (!url)
			return;

		if (funcCompleted) {
			ipcRenderer.on('download-cancelled', (event) => {
				funcCancelled();
			});
		}
		if (funcCancelled) {
			ipcRenderer.on('download-completed', (event) => {
				funcCompleted();
			});
		}
		if (funcProgress) {
			ipcRenderer.on('download-progress', (event, arg) => {
				funcProgress(arg);
			});
		}

		// eslint-disable-next-line object-shorthand
		ipcRenderer.send('download-item', { url: url, name: name });
	}
});

contextBridge.exposeInMainWorld('rgStoreApi', {
	getStore: (func) => {
		const data = ipcRenderer.sendSync('getStore');
		// console.debug('preload.getStore');
		// console.debug(data);
		func(data);
	},
	setStore: (state) => {
		// console.debug('preload.setStore');
		// console.debug(state);
		ipcRenderer.send('setStore', state);
	}
});

contextBridge.exposeInMainWorld('rgWindowApi', {
	close: () => {
		ipcRenderer.send('window.close');
	},
	minimize: () => {
		ipcRenderer.send('window.minimize');
	},
	toggleMaximize: () => {
		ipcRenderer.send('window.maximize');
	}
});
