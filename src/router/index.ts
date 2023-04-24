import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
	history: createWebHistory(import.meta.env.BASE_URL),
	routes: [
		{
			path: "/",
			name: "Board",
			// route level code-splitting
			// this generates a separate chunk (About.[hash].js) for this route
			// which is lazy-loaded when the route is visited.
			component: () => import("./../views/Board.vue"),
			children: [
				{
					path: "card/:cardId",
					name: "UpdateCard",
					component: () => import("@/components/UpdateCard.vue"),
				},
			],
		},
	],
});

export default router;
