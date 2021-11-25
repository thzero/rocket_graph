import Service from '../index';

class DownloadService extends Service {
	download(value, name, funcCompleted, funcCancelled, funcProgress) {
		this._enforceNotNull('DownloadService', 'download', value, 'value');
		this._enforceNotEmpty('DownloadService', 'download', name, 'name');

		this._download(value, name, funcCompleted, funcCancelled, funcProgress);
	}

	_download(value, name, funcCompleted, funcCancelled, funcProgress) {
		throw Error('Not Implemented');
	}

	downloadUrl(url, name, funcCompleted, funcCancelled, funcProgress) {
		this._enforceNotEmpty('DownloadService', 'downloadUrl', url, 'url');
		this._enforceNotEmpty('DownloadService', 'downloadUrl', name, 'name');

		this._downloadUrl(url, name, funcCompleted, funcCancelled, funcProgress);
	}

	_downloadUrl(url, name, funcCompleted, funcCancelled, funcProgress) {
		throw Error('Not Implemented');
	}
}

export default DownloadService;
