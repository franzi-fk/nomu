import { createRouter, createWebHistory } from "vue-router";

// Import your components
import HomeView from "../views/HomeView.vue";
import LegalView from "@/views/LegalView.vue";

const routes = [
  {
    path: "/",
    name: "Home",
    component: HomeView,
  },
  {
    path: "/legal",
    name: "Legal",
    component: LegalView,
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL), // This enables HTML5 history mode
  routes,
});

export default router;
