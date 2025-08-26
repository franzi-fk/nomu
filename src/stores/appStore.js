import { defineStore } from "pinia";

export const useAppStore = defineStore("appStore", {
  state: () => ({
    sounds: [
      { name: "Sound 1", file: "snd-1.mp3" },
      { name: "Sound 2", file: "snd-2.mp3" },
      { name: "Sound 3", file: "snd-3.mp3" },
      { name: "Sound 4", file: "snd-4.mp3" },
    ],
    backgrounds: [
      { name: "no", file: null },
      { name: "1", file: "bg-1.jpg" },
      { name: "2", file: "bg-2.jpg" },
      { name: "3", file: "bg-3.jpg" },
      { name: "4", file: "bg-4.jpg" },
    ],
    themes: [
      "light-neutral",
      "light-rose",
      "light-blue",
      "light-cyan",
      "light-orange",
      "dark-neutral",
      "dark-rose",
      "dark-blue",
      "dark-cyan",
      "dark-orange",
    ],
    selectedTheme: "light-rose",
    selectedSound: {
      name: "Sound 1",
      file: "snd-1.mp3",
    },
    selectedBackground: {
      name: "Image 1",
      file: "bg-1.jpg",
    },
    sidebarVisible: false,
  }),
  getters: {
    isDarkTheme: (state) => state.selectedTheme.startsWith("dark-"),
  },
  actions: {
    setSound(soundObj) {
      this.selectedSound = soundObj;
      localStorage.setItem("selectedSound", JSON.stringify(this.selectedSound));
    },
    setBackground(bgObj) {
      this.selectedBackground = bgObj;
      localStorage.setItem(
        "selectedBackground",
        JSON.stringify(this.selectedBackground)
      );
    },
    setTheme(theme) {
      if (this.themes.includes(theme)) {
        this.selectedTheme = theme;
        document.documentElement.setAttribute("data-theme", theme);
        localStorage.setItem("selectedTheme", theme);
      }
    },
    loadUserSettings() {
      const storedSound = localStorage.getItem("selectedSound");
      const storedBackground = localStorage.getItem("selectedBackground");
      const storedTheme = localStorage.getItem("selectedTheme");
      if (storedSound) {
        this.selectedSound = JSON.parse(storedSound);
      }
      if (storedBackground) {
        this.selectedBackground = JSON.parse(storedBackground);
      }
      if (storedTheme) {
        this.selectedTheme = storedTheme;
      }
    },
    openSidebar() {
      this.sidebarVisible = true;
    },
    closeSidebar() {
      this.sidebarVisible = false;
    },
  },
});
