<template>
	<router-view />
</template>

<script>
import d from 'debug';
const debug = d('app');
import { defineComponent } from 'vue';
import { useQuasar } from 'quasar';

import AppUtility from './utility';

export default defineComponent({
	name: 'App',
	setup () {
		const $q = useQuasar();
		// get status
		console.log('$q.dark.isActive');
		console.log('$q.dark.isActive');
		console.log('$q.dark.isActive');
		console.log($q.dark.isActive);
		debug($q.dark.isActive);
		debug($q.dark.isActive);
		debug($q.dark.isActive);
		debug($q.dark.isActive);
		console.log($q.dark.isActive);
		console.log('$q.dark.isActive');
		console.log('$q.dark.isActive');
		console.log('$q.dark.isActive'); / // true, false
		// get configured status
		debug($q.dark.mode); // "auto", true, false
		// set status
		$q.dark.set(true); // or false or "auto"
	},
	created() {
		AppUtility.$t = this.$t;
	}
});
</script>
