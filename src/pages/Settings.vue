<template>
	<q-card>
		<q-card-section
			class="text-h4"
		>
			{{ $t('titles.settings') }}
		</q-card-section>
		<q-card-section style="max-width: 400px">
			<q-form
				ref="form"
				@submit="onSubmit"
				@reset="onReset"
				class="q-gutter-md"
				>
				<div>
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
					/>
				</div>
				<div class="float-right">
					<q-btn
						type="submit"
						color="primary"
						:label="$t('buttons.submit')"
					/>
					<q-btn
						type="reset"
						color="primary"
						flat class="q-ml-sm"
						:label="$t('buttons.reset')"
					/>
				</div>
			</q-form>
		</q-card-section>
	</q-card>
</template>

<script>
import { useQuasar } from 'quasar';
import { ref } from 'vue';

import AppUtility from '../utility';

export default {
	name: 'Settings',
	setup () {
		const $q = useQuasar();

		const form = ref(null);

		const disabled = false;

		const measurementUnits = ref(AppUtility.$store.state.measurementUnits);
		const measurementUnitsOptions = ref(AppUtility.selectOptions(AppUtility.measurementUnits(), $q.lang, 'measurementUnits'));

		return {
			disabled,
			measurementUnits,
			measurementUnitsOptions,

			onSubmit () {
				try {
					disabled.value = true;

					form.value.validate();
					if (form.value.hasError())
						return;

					AppUtility.$store.dispatch('setMeasurementUnits', measurementUnits.value);

					$q.notify({
						color: 'green-4',
						textColor: 'white',
						message: $q.lang('messages.saved')
					});
				}
				finally {
					disabled.value = false;
				}
			},

			onReset () {
				form.value.resetValidation();
				disabled.value = false;
				measurementUnits.value = AppUtility.$store.state.measurementUnits;
			}
		}
	}
};
</script>

<style scoped>
</style>
