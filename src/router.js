import { createWebHistory, createRouter } from "vue-router";

// import HomePage from "./components/HomePage.vue";
import App from "./App.vue";

const routes = [
    {
        path: "/",
        component: App,
    },
    {
        path: "/homepage",
        component: App,
    },
    // {
    //     path: "/quizz",
    //     component: Quizz,
    // },
    // {
    //     path: "/card",
    //     component: Card,
    // }
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;