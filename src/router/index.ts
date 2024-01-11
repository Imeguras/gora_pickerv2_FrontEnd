import { createRouter, createWebHistory } from '@ionic/vue-router';
import { RouteRecordRaw } from 'vue-router';

import AuthPage from '../views/AuthPage.vue'
import Inventory from '../views/Inventory.vue'
import axios from 'axios';
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
    path: '/inventory/',
	component: Inventory,
	children: [
		{
			path: 'scan',
			component: () => import('@/components/Scan.vue')
		}
	]
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})
//before each route check if user is logged in
router.beforeEach((to, from, next) => {
	//console.log("done!!!"+axios.defaults.headers.common['Authorization']); 
  if (to.path !== '/auth/login' && !axios.defaults.headers.common['Authorization']) {
	next('/auth/login');

  } else {
	next();
  }
});

export default router
