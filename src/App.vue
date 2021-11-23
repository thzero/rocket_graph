<template>
	<router-view />
</template>

<script>
import { defineComponent } from 'vue';
import { useQuasar } from 'quasar';

export default defineComponent({
	name: 'App',
	setup () {
		const $q = useQuasar();
		// get status
		console.log($q.dark.isActive); // true, false
		// get configured status
		console.log($q.dark.mode); // "auto", true, false
		// set status
		$q.dark.set(true); // or false or "auto"
	}
});
</script>
