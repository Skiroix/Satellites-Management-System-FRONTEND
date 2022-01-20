import { RouteRecordRaw } from "vue-router";

const routes: Array<RouteRecordRaw> = [
	{
		path: "/",
		component: () => import("@/layouts/MainLayout.vue"),
		children: [
			{
				path: "",
				redirect: { name: "Satellites" },
			},
			{
				path: "satellites",
				name: "Satellites",
				component: () => import("@/views/Satellites.vue"),
				meta: { requireAuth: true },
			},
			{
				path: "register",
				name: "Register",
				meta: { onlyNoAuth: true },
				component: () => import("@/views/Register.vue"),
			},
			{
				path: "login",
				name: "Login",
				meta: { onlyNoAuth: true },
				component: () => import("@/views/Login.vue"),
			},
			{
				path: "404-not-found",
				name: "NotFound",
				component: () => import("@/views/NotFound.vue"),
			},
		],
	},
	{
		path: "/:catchAll(.*)*",
		redirect: { name: "NotFound" },
	},
];

export default routes;
