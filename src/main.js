import { createApp } from "vue";
import App from "./App.vue";
import { createPinia } from "pinia";
import { useAppStore } from "@/stores/appStore";

const app = createApp(App);
const pinia = createPinia();
app.use(pinia);

// Load defaults or LS values
const appStore = useAppStore();
appStore.loadUserSettings();

app.mount("#app");
