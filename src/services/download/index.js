class DownloadService {
	download(value, name, funcCompleted, funcCancelled, funcProgress) {
		if (!value || value === undefined)
			return;
		if (!name || name === undefined || name === '')
			return;

		this._download(value, name, funcCompleted, funcCancelled, funcProgress);
	}

	_download(value, name, funcCompleted, funcCancelled, funcProgress) {
		throw Error('Not Implemented');
	}

	downloadUrl(url, name, funcCompleted, funcCancelled, funcProgress) {
		if (!url || url === undefined)
			return;
		if (!name || name === undefined || name === '')
			return;

		this._downloadUrl(url, name, funcCompleted, funcCancelled, funcProgress);
	}

	_downloadUrl(url, name, funcCompleted, funcCancelled, funcProgress) {
		throw Error('Not Implemented');
	}
}

export default DownloadService;
