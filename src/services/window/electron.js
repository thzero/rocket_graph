import WindowService from './index';

class ElectronWindowService extends WindowService {
	closeApp() {
		if (process.env.MODE !== 'electron')
			return;

		window.rgWindowApi.close();
	}

	minimize() {
		if (process.env.MODE !== 'electron')
			return;

		window.rgWindowApi.minimize();
	}

	toggleMaximize() {
		if (process.env.MODE !== 'electron')
			return;

		window.rgWindowApi.toggleMaximize();
	}
}

export default ElectronWindowService;
