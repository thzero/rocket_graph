import DownloadService from './';

class ElectronDownloadService extends DownloadService {
	_download(image, name, funcCompleted, funcCancelled, funcProgress) {
		if (!image || image === undefined)
			return;
		if (!name || name === undefined || name === '')
			return;

		window.rgDownloadApi.download(image,
			name,
			funcCompleted,
			funcCancelled,
			funcProgress
		);
	}
}

export default ElectronDownloadService;
