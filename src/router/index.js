import { createRouter, createWebHistory } from "vue-router";

// Import your components
import HomeView from "../views/HomeView.vue";
import LegalView from "@/views/LegalView.vue";
import NotFoundView from "@/views/NotFoundView.vue";

const routes = [
  { path: "/:catchAll(.*)", component: NotFoundView },
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
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

export default router;
