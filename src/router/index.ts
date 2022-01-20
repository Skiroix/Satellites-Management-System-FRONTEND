import { useStore } from "@/store";
import { createRouter, createWebHistory } from "vue-router";

import routes from "./routes";

const router = createRouter({ routes, history: createWebHistory() });

router.beforeEach((to) => {
	const store = useStore();
	const isAuthenticated = store.getters.isActiveSession;
	if (to.meta.onlyNoAuth && isAuthenticated) return { name: "Satellites" };
	if (to.meta.requireAuth && !isAuthenticated) return { name: "Login" };
});

export default router;
