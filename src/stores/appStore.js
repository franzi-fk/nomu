import { defineStore } from "pinia";

export const useAppStore = defineStore("appStore", {
  state: () => ({
    selectedTheme: "light-rose",
    selectedSound: {
      name: "handpan",
      file: "snd-1.mp3",
    },
    selectedBackground: {
      name: "1",
      file: "bg-1.jpg",
    },
    sidebarVisible: false,
    sounds: [
      { name: "handpan", file: "snd-1.mp3" },
      { name: "chime", file: "snd-2.mp3" },
      { name: "droplet", file: "snd-3.mp3" },
      { name: "strings", file: "snd-4.mp3" },
    ],
    backgrounds: [
      {
        name: "no",
        file: null,
      },
      {
        name: "1",
        file: "bg-1.jpg",
        credits: {
          author: "Kristin Charleton",
          authorUrl:
            "https://unsplash.com/de/@kristincharleton?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash",
          photoUrl:
            "https://unsplash.com/de/fotos/ein-verschwommenes-foto-einer-welle-im-ozean-gTE8_d8mnLE?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash",
        },
      },
      {
        name: "2",
        file: "bg-2.jpg",
        credits: {
          author: "Steve Johnson",
          authorUrl:
            "https://unsplash.com/de/@steve_j?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash",
          photoUrl:
            "https://unsplash.com/de/fotos/ein-verschwommenes-bild-einer-rosa-weissen-vase-Ynv62BMTaWg?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash",
        },
      },
      {
        name: "3",
        file: "bg-3.jpg",
        credits: {
          author: "Dave Hoefler",
          authorUrl:
            "https://unsplash.com/@iamthedave?utm_source=unsplash&utm_medium=referral",
          photoUrl:
            "https://unsplash.com/photos/1CwHEUauuFA?utm_source=unsplash&utm_medium=referral",
        },
      },
      {
        name: "4",
        file: "bg-4.jpg",
        credits: {
          author: "Andrew Ruiz",
          authorUrl:
            "https://unsplash.com/de/@andrewruiz?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash",
          photoUrl:
            "https://unsplash.com/de/fotos/blauer-und-weisser-himmel-tagsuber-XqHOx_3vcTc?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash",
        },
      },
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
    // mapping the preview colors in the sidebar to the themes
    themeColors: {
      "light-neutral": "#A6A6A6",
      "light-rose": "#DAACB6",
      "light-blue": "#ACA9DB",
      "light-cyan": "#92BEC9",
      "light-orange": "#D39E88",
      "dark-neutral": "#636363",
      "dark-rose": "#84505C",
      "dark-blue": "#5D5A89",
      "dark-cyan": "#507C86",
      "dark-orange": "#AE7359",
    },
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
      // Helper to safely parse JSON
      const safeParse = (key, defaultValue) => {
        const value = localStorage.getItem(key);
        if (!value) return defaultValue;
        try {
          return JSON.parse(value);
        } catch (err) {
          console.warn(`Failed to parse localStorage key "${key}":`, err);
          return defaultValue;
        }
      };

      // Load selectedSound
      const defaultSound = this.sounds[0]; // first sound as default
      const storedSound = safeParse("selectedSound", defaultSound);
      this.selectedSound =
        storedSound?.name && storedSound?.file ? storedSound : defaultSound;

      // Load selectedBackground
      const defaultBackground = this.backgrounds.find((b) => b.name === "1");
      const storedBackground = safeParse(
        "selectedBackground",
        defaultBackground
      );
      const matchedBackground = this.backgrounds.find(
        (b) => b.name === storedBackground.name
      );
      this.selectedBackground = matchedBackground || defaultBackground;

      // Load theme
      const defaultTheme = "light-rose";
      const storedTheme = localStorage.getItem("selectedTheme");
      this.selectedTheme =
        storedTheme && this.themes.includes(storedTheme)
          ? storedTheme
          : defaultTheme;

      // Apply theme to DOM
      document.documentElement.setAttribute("data-theme", this.selectedTheme);
    },
    openSidebar() {
      this.sidebarVisible = true;
    },
    closeSidebar() {
      this.sidebarVisible = false;
    },
  },
});
