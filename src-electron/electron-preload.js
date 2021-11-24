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
import { BrowserWindow } from '@electron/remote';

contextBridge.exposeInMainWorld('rgDownloadApi', {
	download: (url, name, funcCompleted, funcCancelled, funcProgress) => {
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

		ipcRenderer.send('download-item', { url: url, name: name });
	}
});

contextBridge.exposeInMainWorld('rgStoreApi', {
	getStore: (func) => {
		const data = ipcRenderer.sendSync('getStore');
		// console.log('preload.getStore');
		// console.log(data);
		func(data);
	},
	setStore: (state) => {
		// console.log('preload.setStore');
		// console.log(state);
		ipcRenderer.send('setStore', state);
	}
});

contextBridge.exposeInMainWorld('rgWindowApi', {
	close: () => {
		BrowserWindow.getFocusedWindow().close()
	},
	minimize: () => {
		BrowserWindow.getFocusedWindow().minimize()
	},
	toggleMaximize: () => {
		const win = BrowserWindow.getFocusedWindow()
		if (win.isMaximized()) {
			win.unmaximize();
			return;
		}

		win.maximize();
	}
});
