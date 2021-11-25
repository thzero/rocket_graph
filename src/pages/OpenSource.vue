<template>
	<q-card>
		<q-card-section
			class="text-h4"
		>
			{{ $t('titles.openSource') }}
		</q-card-section>
		<q-card-section class="pt-2">
			<div class="row">
				<div class="col">
					<q-markup-table
						dense
						flat
						:height="height"
					>
						<thead>
							<tr>
								<th class="text-left">
									<span class="text-h6">{{ $t('openSource.resource') }}</span>
								</th>
								<th class="text-left">
									<span class="text-h6">{{ $t('openSource.license') }}</span>
								</th>
							</tr>
						</thead>
						<tbody>
							<tr
								v-for="(item2, jndex) in dependenciesClient"
								:key="key(jndex, 'b')"
							>
								<td>
									<a
										v-if="item2.url"
										class="opensource-padding"
										:href="item2.url"
										target="_blank"
									>
										{{ item2.name }}
									</a>
									<span
										v-if="!item2.url"
										class="opensource-padding"
									>
										{{ item2.name }}
									</span>
								</td>
								<td>
									<a
										v-if="item2.licenseUrl"
										class="opensource-padding"
										:href="item2.licenseUrl"
										target="_blank"
									>
										{{ item2.licenseName }}
									</a>
									<span
										v-if="!item2.licenseUrl"
										class="opensource-padding"
									>
										{{ item2.licenseName }}
									</span>
								</td>
							</tr>
						</tbody>
					</q-markup-table>
				</div>
			</div>
		</q-card-section>
	</q-card>
</template>

<script>
export default {
	name: 'OpenSource',
	data: () => ({
		height: '800px',
		dependencies: [{
			category: 'client',
			dependencies: []
		},
		{
			category: 'server',
			dependencies: []
		}
		]
	}),
	computed: {
		dependenciesClient() {
			return this.initializeDependenciesClient();
		}
	},
	created() {
		const dependencies = this.dependencies.find(l => l.category === 'client');
		dependencies.dependencies = this.initializeDependenciesClient();
	},
	methods: {
		initializeDependenciesClient() {
			return [
				{
					category: 'client',
					name: '@electron/remote',
					url: 'https://github.com/electron/remote',
					licenseName: '??'
				},
				{
					category: 'client',
					name: '@thzero/library_cli',
					url: 'https://github.com/thzero/library_cli',
					licenseName: 'MIT',
					licenseUrl: 'https://github.com/thzero/library_cli/blob/master/license.md'
				},
				{
					category: 'client',
					name: 'chart.js',
					url: 'https://www.chartjs.org',
					licenseName: 'MIT',
					licenseUrl: 'https://github.com/chartjs/Chart.js/blob/master/LICENSE.md'
				},
				{
					category: 'client',
					name: 'electronJs',
					url: 'https://www.electronjs.org',
					licenseName: 'MIT',
					licenseUrl: 'https://github.com/electron/electron/blob/main/LICENSE'
				},
				{
					category: 'client',
					name: 'electron-dl',
					url: 'https://github.com/sindresorhus/electron-dl',
					licenseName: 'MIT',
					licenseUrl: 'https://github.com/sindresorhus/electron-dl/blob/main/license'
				},
				{
					category: 'client',
					name: 'html2canvas',
					url: 'https://html2canvas.hertzen.com/?ref=hackernoon.com',
					licenseName: 'MIT',
					licenseUrl: 'https://github.com/niklasvh/html2canvas/blob/master/LICENSE'
				},
				{
					category: 'client',
					name: 'papaparse',
					url: 'https://www.papaparse.com/',
					licenseName: 'MIT',
					licenseUrl: 'https://github.com/mholt/PapaParse/blob/master/LICENSE'
				},
				{
					category: 'client',
					name: 'quasar',
					url: 'https://github.com/quasarframework/quasar',
					licenseName: 'MIT',
					licenseUrl: 'https://github.com/quasarframework/quasar/blob/dev/LICENSE'
				},
				{
					category: 'client',
					name: 'vue',
					url: 'https://github.com/vuejs/vue',
					licenseName: 'MIT',
					licenseUrl: 'https://github.com/vuejs/vue/blob/dev/LICENSE'
				},
				{
					category: 'client',
					name: 'vue-i18n',
					url: 'https://github.com/kazupon/vue-i18n',
					licenseName: 'MIT',
					licenseUrl: 'https://github.com/kazupon/vue-i18n/blob/dev/LICENSE'
				},
				{
					category: 'client',
					name: 'veux',
					url: 'https://github.com/vuejs/vuex',
					licenseName: 'MIT',
					licenseUrl: 'https://github.com/vuejs/vuex/blob/dev/LICENSE'
				}
			];
		},
		key(index, prefix, secondary) {
			return prefix + '' + index + '' + secondary;
		}
	}
};
</script>

<style scoped>
	.opensource-padding {
		padding-left: 16px
	}

	td a {
		color: white;
	}

	td span {
		color: white;
	}
</style>
