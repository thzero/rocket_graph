const electron = require('electron');
const path = require('path');
const fs = require('fs');

class Store {
	constructor(opts) {
		// app.getPath('userData') will return a string of the user's app data directory path.
		const userDataPath = (electron.app || electron.remote.app).getPath('userData');
		// We'll use the `configName` property to set the file name and path.join to bring it all together as a string
		this.path = path.join(userDataPath, (opts?.configName || 'store') + '.json');

		this._data = parseDataFile(this.path, opts?.defaults || {});
		console.log('main.store');
		console.log(this._data);
	}

	get() {
		return this._data;
	}

	set(value) {
		this._data = JSON.parse(value);
		fs.writeFileSync(this.path, value);
	}
}

function parseDataFile(filePath, defaults) {
	try {
		return JSON.parse(fs.readFileSync(filePath));
	} catch (error) {
		return defaults;
	}
}

// expose the class
module.exports = Store;
