import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router';
import Layout from '@/layout/layoutTest.vue';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Home',
    component: Layout,
    redirect: '/home',
    children: [{
      path: 'home',
      name: 'home',
      component: () => import('@/views/home.vue'),
      meta: { title: 'home', icon: 'form' }
    }]
  },
  {
    path: '/',
    component: Layout,
    redirect: '/test',
    meta: { title: 'aaaa', icon: 'fullscreen' },
    children: [{
      path: 'test',
      name: 'Test',
      component: () => import('@/views/test.vue'),
      meta: { title: 'Test' }
    }, {
      path: 'apitest',
      name: 'apitest',
      component: () => import('@/views/apitest.vue'),
      meta: { title: 'apitest' }
    }]
  }
];

const router = createRouter({
  history: createWebHashHistory(),
  // history: createWebHistory(import.meta.env.BASE_URL),
  routes
});

export default router;
