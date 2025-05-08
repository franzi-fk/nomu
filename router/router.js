import { createRouter, createWebHistory } from "vue-router";

// Import your components
import HomeView from "../views/HomeView.vue";

const routes = [
  {
    path: "/",
    name: "Home",
    component: HomeView,
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL), // This enables HTML5 history mode
  routes,
});

export default router;
