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
							:label="$t('button.save')"
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
import AppUtility from '../utility';

import basePage from './basePage.vue';

export default {
	name: 'Settings',
	extends: basePage,
	data: () => ({
		dirty: false,
		measurementUnits: null,
		measurementUnitsOptions: [],
		saving: false
	}),
	computed: {
		disabled() {
			return this.saving || !this.dirty;
		}
	},
	mounted() {
		this.onReset();
		this.measurementUnits = AppUtility.$store.state.measurementUnits;
		this.measurementUnitsOptions = AppUtility.selectOptions(AppUtility.measurementUnits(), this.$t, 'measurementUnits');
	},
	methods: {
		onReset() {
			this.$refs.settingsForm.resetValidation();
			this.dirty = false;
			this.measurementUnits = AppUtility.$store.state.measurementUnits;
			this.saving = false;
		},
		onSubmit() {
			try {
				this.saving = true;

				if (!this.dirty)
					return;

				this.$refs.settingsForm.validate();
				if (this.$refs.settingsForm.hasError)
					return;

				AppUtility.$store.dispatch('setMeasurementUnits', this.measurementUnits);

				this.notify('messages.saved');
			}
			finally {
				this.$refs.settingsForm.resetValidation();
				this.dirty = false;
				this.saving = false;
			}
		},
		setDirty() {
			this.dirty = true;
		}
	}
};
</script>

<style scoped>
</style>
