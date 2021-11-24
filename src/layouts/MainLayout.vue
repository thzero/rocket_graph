<template>
	<q-layout view="lHh Lpr lFf">
		<q-header elevated>
			<q-bar class="q-electron-drag">
				<q-icon name="laptop_chromebook" />
				<div>{{ $t('titles.application') }}</div>

				<q-space />

				<q-btn dense flat icon="minimize" @click="minimize" />
				<q-btn dense flat icon="crop_square" @click="toggleMaximize" />
				<q-btn dense flat icon="close" @click="closeApp" />
			</q-bar>
			<q-toolbar>
				<!-- <q-btn
					flat
					dense
					round
					icon="menu"
					aria-label="Menu"
					@click="toggleDrawerLeft"
				/> -->

				<q-toolbar-title>
					<router-link
						to="/"
						class="toolbar-title"
					>
						{{ $t('titles.home') }}
					</router-link>
				</q-toolbar-title>
				<q-btn flat round dense icon="more_vert">
					<q-menu auto-close>
						<q-list style="min-width: 150px">
							<q-item
								clickable
								to="/settings"
							>
								<q-item-section>{{ $t('titles.settings') }}</q-item-section>
							</q-item>
							<q-separator />
							<q-item
								clickable
								to="/openSource"
							>
								<q-item-section>{{ $t('titles.openSource') }}</q-item-section>
							</q-item>
						</q-list>
					</q-menu>
				</q-btn>
			</q-toolbar>
		</q-header>

		<!-- <q-drawer
			v-model="drawerOpenLeft"
			show-if-above
			bordered
		>
			<q-list>
				<q-item-label
					header
				>
					Essential Links
				</q-item-label>

				<EssentialLink
					v-for="link in essentialLinks"
					:key="link.title"
					v-bind="link"
				/>
			</q-list>
		</q-drawer> -->

		<q-footer elevated>
			<div class="q-pr-md q-pa-sm float-right">
			{{ $t('version') + ' ' + version }}
			</div>
		</q-footer>

		<q-page-container>
			<q-page class="q-pa-md">
				<router-view />
			</q-page>
		</q-page-container>
	</q-layout>
</template>

<script>
// import EssentialLink from 'components/EssentialLink.vue';

// const linksList = [
// 	{
// 		title: 'Docs',
// 		caption: 'quasar.dev',
// 		icon: 'school',
// 		link: 'https://quasar.dev'
// 	}
// ];

// import { defineComponent, ref } from 'vue';
import { defineComponent } from 'vue';

import Constants from '../constants';

import AppUtility from '../utility';

export default defineComponent({
	name: 'MainLayout',
	// components: {
	// 	EssentialLink
	// },
	setup () {
		// const drawerOpenLeft = ref(false)

		const version = AppUtility.version();

		const serviceWindow = AppUtility.injector.getService(Constants.InjectorKeys.SERVICE_WINDOW);
		function closeApp() {
			if (serviceWindow)
				serviceWindow.closeApp();
		}
		function minimize() {
			if (serviceWindow)
				serviceWindow.minimize();
		}
		function toggleMaximize() {
			if (serviceWindow)
				serviceWindow.toggleMaximize();
		}

		return {
			closeApp,
			// drawerOpenLeft,
			// essentialLinks: linksList,
			minimize,
			// toggleDrawerLeft () {
			// 	drawerOpenLeft.value = !drawerOpenLeft.value
			// },
			toggleMaximize,
			version
		}
	}
})
</script>

<style scoped>
.toolbar-title {
	color: white;
	text-decoration: none;
}
</style>
