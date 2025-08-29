import { defineConfig } from "cypress";

export default defineConfig({
  e2e: {
    baseUrl: "http://localhost:5173",
    setupNodeEvents(on, config) {
      // node event listeners
    },
    defaultCommandTimeout: 60000,
    pageLoadTimeout: 80000,
    requestTimeout: 20000,
    responseTimeout: 20000,
    retries: {
      runMode: 2,
      openMode: 0,
    },
  },
});
