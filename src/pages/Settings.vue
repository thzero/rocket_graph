<template>
	<q-card>
		<q-card-section
			class="text-h4"
		>
			{{ $t('titles.settings') }}
		</q-card-section>
		<q-card-section>
			<div style="max-width: 400px; margin: 0px auto;">
				<q-form
					ref="settingsForm"
					@submit="onSubmit"
					@reset="onReset"
				>
					<div style="width: 100%;">
						<q-select
							ref="measurementUnits"
							filled
							v-model="measurementUnits"
							:options="measurementUnitsOptions"
							option-value="id"
							option-label="name"
							emit-value
							map-options
							:label="$t('forms.measurementUnits')"
							:rules="[val => !!val || $t('validation.required')]"
							@update:model-value="setDirty"
						/>
					</div>
					<div style="text-align: right; width: 100%;">
						<q-btn
							type="submit"
							color="primary"
							:label="$t('button.submit')"
							:disabled="disabled"
						/>
						<q-btn
							type="reset"
							color="primary"
							flat class="q-ml-sm"
							:label="$t('button.reset')"
							:disabled="disabled"
						/>
					</div>
				</q-form>
			</div>
		</q-card-section>
	</q-card>
</template>

<script>
import { useQuasar } from 'quasar';

import AppUtility from '../utility';

export default {
	name: 'Settings',
	data: () => ({
		dirty: false,
		disabled: true,
		measurementUnits: null,
		measurementUnitsOptions: []
	}),
	mounted() {
		this.onReset();
		this.measurementUnits = AppUtility.$store.state.measurementUnits;
		this.measurementUnitsOptions = AppUtility.selectOptions(AppUtility.measurementUnits(), this.$t, 'measurementUnits');
	},
	methods: {
		onReset() {
			this.dirty = false;
			this.$refs.settingsForm.resetValidation();
			this.disabled = false;
			this.measurementUnits = AppUtility.$store.state.measurementUnits;
		},
		onSubmit() {
			try {
				this.disabled = true;

				if (!this.dirty)
					return;

				this.$refs.settingsForm.validate();
				if (this.$refs.settingsForm.hasError)
					return;

				AppUtility.$store.dispatch('setMeasurementUnits', this.measurementUnits);

				this.notifySaved();
			}
			finally {
				this.disabled = false;
			}
		},
		setDirty() {
			this.dirty = true;
		}
	},
	setup () {
		const $q = useQuasar();

		return {
			notifySaved() {
				$q.notify({
					color: 'green-4',
					textColor: 'white',
					message: AppUtility.$t('messages.saved')
				});
			}
		}
	}
};
</script>

<style scoped>
</style>
