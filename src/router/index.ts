import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";

const routes: Array<RouteRecordRaw> = [
  {
		path: "/",
		name: "Home",
		component: () => import("../views/home.vue"),
  }, {
		path: "/helloWorld",
		name: "HelloWorld",
		component: () => import("../views/helloworld.vue"),
  }
];

const router = createRouter({
    // history: createWebHistory(process.env.BASE_URL),
    history: createWebHistory(import.meta.env.BASE_URL),
    routes,
});

export default router;
