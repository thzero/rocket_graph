import DownloadService from './';

class ElectronDownloadService extends DownloadService {
	_download(value, name, funcCompleted, funcCancelled, funcProgress) {
		this._enforceNotNull('ElectronDownloadService', '_download', value, 'value');
		this._enforceNotEmpty('ElectronDownloadService', '_download', name, 'name');

		window.rgDownloadApi.download(value,
			name,
			funcCompleted,
			funcCancelled,
			funcProgress
		);
	}

	_downloadUrl(url, name, funcCompleted, funcCancelled, funcProgress) {
		this._enforceNotEmpty('ElectronDownloadService', '_downloadUrl', url, 'url');
		this._enforceNotEmpty('ElectronDownloadService', '_downloadUrl', name, 'name');

		window.rgDownloadApi.downloadUrl(url,
			name,
			funcCompleted,
			funcCancelled,
			funcProgress
		);
	}
}

export default ElectronDownloadService;
