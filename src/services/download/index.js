import Service from '../index';

class DownloadService extends Service {
	download(value, name, funcCompleted, funcCancelled, funcProgress) {
		if (!value || value === undefined)
			return;
		this._enforceNotEmpty('DownloadService', 'download', name);

		this._download(value, name, funcCompleted, funcCancelled, funcProgress);
	}

	_download(value, name, funcCompleted, funcCancelled, funcProgress) {
		throw Error('Not Implemented');
	}

	downloadUrl(url, name, funcCompleted, funcCancelled, funcProgress) {
		if (!url || url === undefined)
			return;
		this._enforceNotEmpty('DownloadService', 'downloadUrl', name);

		this._downloadUrl(url, name, funcCompleted, funcCancelled, funcProgress);
	}

	_downloadUrl(url, name, funcCompleted, funcCancelled, funcProgress) {
		throw Error('Not Implemented');
	}
}

export default DownloadService;
