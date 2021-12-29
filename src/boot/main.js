import { boot } from 'quasar/wrappers';

import Constants from '../constants';

import AppUtility from '../utility';

// TODO: Convert to library dependencies
import FoamCalculatorService from '../services/calculators/foam';

import FlightInfoService from '../services/flightInfo';
import EggtimerFlightInfoProcessorService from '../services/flightInfo/processors/eggtimer';

import FlightPathService from '../services/flightPath';
import FeatherweightFlightPathProcessorService from '../services/flightPath/processors/featherweight';

// "async" is optional;
// more info on params: https://v2.quasar.dev/quasar-cli/boot-files
export default boot(async ({ app, router, store }) => {
	AppUtility.$router = router;
	AppUtility.$store = store;

	let DownloadService;
	let WindowService;
	if (process.env.MODE === 'electron') {
		const { default: ElectronDownloadService } = await import('../services/download/electron');
		if (ElectronDownloadService)
			DownloadService = ElectronDownloadService;
		const { default: ElectronWindowService } = await import('../services/window/electron');
		if (ElectronWindowService)
			WindowService = ElectronWindowService;
	}
	else
		throw Error('Not Implemented');

	if (!DownloadService)
		throw Error(Constants.InjectorKeys.SERVICE_DOWNLOAD + ' Not Implemented');
	if (!WindowService)
		throw Error(Constants.InjectorKeys.SERVICE_WINDOW + ' Not Implemented');

	AppUtility.injector.registerService(Constants.InjectorKeys.SERVICE_DOWNLOAD, new DownloadService());
	AppUtility.injector.registerService(Constants.InjectorKeys.SERVICE_WINDOW, new WindowService());

	// TODO: Convert to library dependencies

	const foamCalculatorService = new FoamCalculatorService();
	AppUtility.injector.registerService(Constants.InjectorKeys.SERVICE_CALCULATOR_FOAM, foamCalculatorService);
	foamCalculatorService.init(AppUtility.injector);

	const flightInfoService = new FlightInfoService();
	AppUtility.injector.registerService(Constants.InjectorKeys.SERVICE_FLIGHT_INFO, flightInfoService);
	AppUtility.injector.registerService(Constants.InjectorKeys.SERVICE_FLIGHT_INFO_PROCESSOR_EGGTIMER, new EggtimerFlightInfoProcessorService());
	flightInfoService.init(AppUtility.injector);

	const flightPathService = new FlightPathService();
	AppUtility.injector.registerService(Constants.InjectorKeys.SERVICE_FLIGHT_PATH, flightPathService);
	AppUtility.injector.registerService(Constants.InjectorKeys.SERVICE_FLIGHT_PATH_PROCESSOR_FEATHERWEIGHT, new FeatherweightFlightPathProcessorService());
	flightPathService.init(AppUtility.injector);
});
