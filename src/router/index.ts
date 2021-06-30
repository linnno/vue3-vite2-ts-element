import { createRouter, createWebHistory,createWebHashHistory, RouteRecordRaw } from "vue-router";

const routes: Array<RouteRecordRaw> = [
  {
		path: "/",
		name: "Home",
		component: () => import("../views/home.vue"),
  }, {
		path: "/helloWorld",
		name: "HelloWorld",
		component: () => import("../views/helloworld.vue"),
  }, {
		path: "/test",
		name: "Test",
		component: () => import("../views/test.vue"),
  }
];

const router = createRouter({
    history: createWebHashHistory(),
    // history: createWebHistory(import.meta.env.BASE_URL),
    routes,
});

export default router;
