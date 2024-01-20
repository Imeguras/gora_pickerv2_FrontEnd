import { createRouter, createWebHistory } from '@ionic/vue-router';
import { RouteRecordRaw } from 'vue-router';

import AuthPage from '../views/AuthPage.vue'
import Inventory from '../views/Inventory.vue'

import Scan from '../components/Scan.vue'
import InventoryList from '../components/InventoryList.vue'
import axios from 'axios';
const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    redirect: '/auth/login'
  },
  {
	name: 'auth',
	path: '/auth/',
	component: AuthPage,
	children: [
		{
			path: '',
			redirect: '/auth/login'
		},
		{
			path: 'login',
			component: () => import('@/components/Login.vue')
		}
	],
  },
  {
	name: 'inventory',
    path: '/inventory/',
	component: Inventory,
	children: [
		{
			path: '',
			redirect: '/inventory/list'
		},
		{
			path: 'list',
			component: InventoryList
		},
		{
			path: 'scan',
			component: Scan
		}
	]
  }, 
  {
	path: '/database/',
	component: () => import('@/views/DatabasePage.vue'),
	props: route => ({in_codes: route.query.in_codes}),
	children: [
		{
			path: '',
			redirect: '/database/list/'
		},

		{
			name: 'database',
			path: 'list/',
			component: () => import('@/components/DatabaseList.vue'),
			
		},
	
	]
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})
//before each route check if user is logged in
router.beforeEach(async (to, from, next) => {
  if (to.path !== '/auth/login' && !axios.defaults.headers.common['Authorization']) {
	next('/auth/login');

  } else {
	next();
  }
});

export default router
