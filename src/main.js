// load theme from LS
const savedTheme = localStorage.getItem("selectedTheme");
if (savedTheme) {
  document.documentElement.setAttribute("data-theme", savedTheme);
}

import "./assets/main.css";

import { createApp } from "vue";
import App from "./App.vue";
import { createPinia } from "pinia";

const app = createApp(App);

app.use(createPinia());

app.mount("#app");
