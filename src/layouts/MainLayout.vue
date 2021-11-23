<template>
	<q-layout view="lHh Lpr lFf">
		<q-header elevated>
			<q-toolbar>
				<!-- <q-btn
					flat
					dense
					round
					icon="menu"
					aria-label="Menu"
					@click="toggleLeftDrawer"
				/> -->

				<q-toolbar-title>
					<router-link
						to="/"
						class="toolbar-title"
					>
						{{ $t('titles.application') }}
					</router-link>
				</q-toolbar-title>
				<q-btn flat round dense icon="more_vert">
					<q-menu auto-close>
						<q-list style="min-width: 150px">
							<q-item
								clickable
								@click="clickSettings"
							>
								<q-item-section>{{ $t('menu.settings.title') }}</q-item-section>
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
			v-model="leftDrawerOpen"
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

import AppUtility from '../utility';

export default defineComponent({
	name: 'MainLayout',
	// components: {
	// 	EssentialLink
	// },
	setup () {
		// const leftDrawerOpen = ref(false)

		const clickSettings = () => {
		};

		const version = AppUtility.version();

		return {
			clickSettings,
			version
			// essentialLinks: linksList,
			// leftDrawerOpen,
			// toggleLeftDrawer () {
			// 	leftDrawerOpen.value = !leftDrawerOpen.value
			// }
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
