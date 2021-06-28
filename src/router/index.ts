import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import HelloWorld from "../components/HelloWorld.vue";
import Home from "../views/home.vue";

const routes: Array<RouteRecordRaw> = [
  {
		path: "/",
		name: "Home",
		component: Home,
  }, {
		path: "/helloWorld",
		name: "HelloWorld",
		component: HelloWorld,
  }
];

const router = createRouter({
    // history: createWebHistory(process.env.BASE_URL),
    history: createWebHistory(import.meta.env.BASE_URL),
    routes,
});

export default router;
