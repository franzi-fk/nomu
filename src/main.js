import { createApp } from "vue";
import App from "./App.vue";
import { createPinia } from "pinia";
import { useAppStore } from "@/stores/appStore";
import router from "./router";

const app = createApp(App);
const pinia = createPinia();
app.use(pinia);

// Load defaults or LS values
const appStore = useAppStore();
appStore.loadUserSettings();

app.use(router);
app.mount("#app");
