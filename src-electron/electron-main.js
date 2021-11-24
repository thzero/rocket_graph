import { app, BrowserWindow, nativeTheme, ipcMain } from 'electron';
import { initialize, enable } from '@electron/remote/main';
import path from 'path';
import os from 'os';

initialize();

import { download } from 'electron-dl';

import Store from './electron-store';

// needed in case process is undefined under Linux
const platform = process.platform || os.platform();

try {
	if (platform === 'win32' && nativeTheme.shouldUseDarkColors === true) {
		require('fs').unlinkSync(path.join(app.getPath('userData'), 'DevTools Extensions'));
	}
} catch (_) { }

let mainWindow;
let store = {};

function createWindow () {
	store = new Store();

	/**
	 * Initial window options
	 */
	mainWindow = new BrowserWindow({
		icon: path.resolve(__dirname, 'icons/icon.png'), // tray icon
		width: 1000,
		height: 600,
		useContentSize: true,
		frame: false,
		webPreferences: {
			contextIsolation: true,
			// More info: /quasar-cli/developing-electron-apps/electron-preload-script
			preload: path.resolve(__dirname, process.env.QUASAR_ELECTRON_PRELOAD)
		}
	});

	enable(mainWindow.webContents);

	mainWindow.loadURL(process.env.APP_URL);

	if (process.env.DEBUGGING) {
		// if on DEV or Production with debug enabled
		mainWindow.webContents.openDevTools()
	} else {
		// we're on production; no access to devtools pls
		mainWindow.webContents.on('devtools-opened', () => {
			mainWindow.webContents.closeDevTools()
		});
	}

	mainWindow.on('closed', () => {
		mainWindow = null
	});

	ipcMain.on('getStore', (event, arg) => {
		// console.log('main.getStore');
		event.returnValue = store.get();
	});

	ipcMain.on('setStore', (event, arg) => {
		// console.log('main.setStore');
		// console.log(arg);
		store.set(arg);
	});

	ipcMain.on('download-item', async (event, data) => {
		// console.log(data);
		const options = {
			openFolderWhenDone: true,
			onCanceld: () => {
				event.reply('download-cancelled');
			},
			onCompleted: () => {
				event.reply('download-completed');
			},
			onProgress: (args) => {
				event.reply('download-progress', args);
			}
		};
		if (data.name && data.name !== '')
			options.filename = data.name;

		await download(
			BrowserWindow.getFocusedWindow(),
			data.url,
			options
		);
	});
}

app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
	if (platform !== 'darwin') {
		app.quit();
	}
});

app.on('activate', () => {
	if (mainWindow === null) {
		createWindow();
	}
});
