class DownloadService {
	download(image, name, funcCompleted, funcCancelled, funcProgress) {
		if (!image || image === undefined)
			return;
		if (!name || name === undefined || name === '')
			return;

		this._download(image, name, funcCompleted, funcCancelled, funcProgress);
	}

	_download(image, name, funcCompleted, funcCancelled, funcProgress) {
		throw Error('Not Implemented');
	}
}

export default DownloadService;
