import { boot } from 'quasar/wrappers';

import AppUtility from '../utility';

// "async" is optional;
// more info on params: https://v2.quasar.dev/quasar-cli/boot-files
export default boot(async ({ app, router, store }) => {
	AppUtility.$router = router;
	AppUtility.$store = store;
	console.log(app);
	console.log(app);
	console.log(app);
	console.log(app);
	console.log(app);
	console.log(app);
});
