import { createRouter, createWebHistory } from '@ionic/vue-router';
import { RouteRecordRaw } from 'vue-router';

import AuthPage from '../views/AuthPage.vue'
import Inventory from '../views/Inventory.vue'
const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    redirect: '/auth/login'
  },
  {
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
    path: '/inventory',
	component: Inventory
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

export default router
