
const routes = [
	{
		path: '/',
		component: () => import('layouts/MainLayout.vue'),
		children: [
			{ path: '', component: () => import('src/pages/FlightInfo.vue') }
		]
	},
	{
		path: '/flightInfo',
		component: () => import('layouts/MainLayout.vue'),
		children: [
			{ path: '', component: () => import('src/pages/FlightInfo.vue') }
		]
	},
	{
		path: '/flightPath',
		component: () => import('layouts/MainLayout.vue'),
		children: [
			{ path: '', component: () => import('src/pages/FlightPath.vue') }
		]
	},
	{
		path: '/openSource',
		component: () => import('layouts/MainLayout.vue'),
		children: [
			{ path: '', component: () => import('pages/OpenSource.vue') }
		]
	},
	{
		path: '/settings',
		component: () => import('layouts/MainLayout.vue'),
		children: [
			{ path: '', component: () => import('pages/Settings.vue') }
		]
	},

	// Always leave this as last one,
	// but you can also remove it
	{
		path: '/:catchAll(.*)*',
		component: () => import('pages/Error404.vue')
	}
]

export default routes
