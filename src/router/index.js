import { createRouter, createWebHistory } from "vue-router";
import Login from "../components/Login.vue";

const router = createRouter({
	history: createWebHistory(import.meta.env.BASE_URL),
	routes: [
		{
			path: "/",
			name: "home",
			component: Login,
		},
		{
			path: "/login",
			name: "login",
			component: Login,
		},
		{
			path: "/admin_login",
			name: "admin_login",
			component: () => import("../components/AdminLogin.vue"),
		},
		{
			path: "/signUp",
			name: "signUp",
			component: () => import("../components/SignUp.vue"),
		},
		{
			path: "/userList",
			name: "userList",
			component: () => import("../components/UserList.vue"),
		},
		{
			path: "/index",
			name: "index",
			component: () => import("../components/Index.vue"),
		},
		{
			path: "/index_admin",
			name: "index_admin",
			component: () => import("../components/Index_admin.vue"),
		},
		{
			path: "/errorUserName",
			name: "error",
			component: () => import("../components/ErrorUserName.vue"),
		},
		{
			path: "/resetPassword",
			name: "resetPassword",
			component: () => import("../components/resetPassword.vue"),
		},
		{
			path: "/article/:postid",
			name: "Article",
			component: () => import("../components/Article.vue"),
			props: true,
		},
		{
			path: "/createPoll",
			name: "createPoll",
			component: () => import("../components/CreatePoll.vue"),
		},
		{
			path: "/result/:postid",
			name: "result",
			component: () => import("../components/pollResult.vue"),
		},
	],
});

export default router;
