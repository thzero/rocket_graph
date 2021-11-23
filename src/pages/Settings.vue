<template>
	<q-card>
		<q-card-section
			class="text-h4"
		>
			{{ $t('titles.settings') }}
		</q-card-section>
		<q-card-section class="pt-2" style="max-width: 400px">
			<q-form
				@submit="onSubmit"
				@reset="onReset"
				class="q-gutter-md"
				>
				<q-select
					ref="measurementUnits"
					filled
					v-model="measurementUnits"
					:options="measurementUnitsOptions"
					option-value="id"
					option-label="name"
					emit-value
					map-options
					:label="$t('flightInfo.measurementUnits')"
					:rules="[val => !!val || $t('validation.required')]"
				/>

				<div>
					<q-btn label="Submit" type="submit" color="primary"/>
					<q-btn label="Reset" type="reset" color="primary" flat class="q-ml-sm" />
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
	name: 'BaseOpenSource',
	setup () {
		const $q = useQuasar()

		const name = ref(null)
		const age = ref(null)
		const accept = ref(false)

		const measurementUnits = ref(AppUtility.measurementUnitEnglish);
		const measurementUnitsOptions = ref(AppUtility.selectOptions(AppUtility.measurementUnits(), this.$t, 'measurementUnits'));

		return {
			name,
			age,
			accept,
			measurementUnits,
			measurementUnitsOptions,

			onSubmit () {
				measurementUnits.value.validate();
				if (measurementUnits.value.hasError())
					return;

				$q.notify({
					color: 'green-4',
					textColor: 'white',
					icon: 'cloud_done',
					message: 'Submitted'
				})
			},

			onReset () {
				name.value = null
				age.value = null
				accept.value = false
			}
		}
	}
};
</script>

<style scoped>
</style>
