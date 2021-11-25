<script>
import { defineComponent } from 'vue';

import Constants from '../constants';

import AppUtility from '../utility';

export default defineComponent({
	name: 'BasePage',
	data: () => ({
		errorMessage: null,
		errorTimer: null,
		serviceDownload: null
	}),
	computed: {
		dateFormat() {
			return AppUtility.dateFormat();
		},
		dateFormatMask() {
			return AppUtility.dateFormat().replace(/[a-zA-Z0-9]/g, '#');
		},
		errors() {
			return this.errorMessage;
		}
	},
	created() {
		this.serviceDownload = AppUtility.injector.getService(Constants.InjectorKeys.SERVICE_DOWNLOAD);
	},
	methods: {
		setError(message) {
			this.buttons.export.disabled = true;
			this.errorMessage = message;

			this.errorTimer = setTimeout(() => {
				this.errorMessage = null;
				clearTimeout(this.errorTimer);
			},
			3000);
		}
	}
});
</script>
