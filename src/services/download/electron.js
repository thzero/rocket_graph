import DownloadService from './';

class ElectronDownloadService extends DownloadService {
	_download(value, name, funcCompleted, funcCancelled, funcProgress) {
		if (!value || value === undefined)
			return;
		if (String.isNullOrEmpty(name))
			return;

		window.rgDownloadApi.download(value,
			name,
			funcCompleted,
			funcCancelled,
			funcProgress
		);
	}

	_downloadUrl(image, name, funcCompleted, funcCancelled, funcProgress) {
		if (!image || image === undefined)
			return;
		if (String.isNullOrEmpty(name))
			return;

		window.rgDownloadApi.downloadUrl(image,
			name,
			funcCompleted,
			funcCancelled,
			funcProgress
		);
	}
}

export default ElectronDownloadService;
