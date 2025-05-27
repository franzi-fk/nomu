import { defineStore } from "pinia";

export const useAppStore = defineStore("appStore", {
  state: () => ({
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
    loadUserSettings() {
      const storedSound = localStorage.getItem("selectedSound");
      const storedBackground = localStorage.getItem("selectedBackground");
      if (storedSound) {
        this.selectedSound = JSON.parse(storedSound);
      }
      if (storedBackground) {
        this.selectedBackground = JSON.parse(storedBackground);
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
