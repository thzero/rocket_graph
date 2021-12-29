<script>
import { defineComponent } from 'vue';
// import { useQuasar } from 'quasar';

import AppUtility from '../utility';

export default defineComponent({
	name: 'BaseComponent',
	data: () => ({
		errorMessage: null,
		errorTimer: null
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
	methods: {
		notify(message) {
			if (String.isNullOrEmpty(message))
				return;

			this.$q.notify({
				color: 'green-4',
				textColor: 'white',
				message: AppUtility.$t(message)
			});
		},
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
