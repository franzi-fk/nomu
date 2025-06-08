module.exports = {
  content: ["./index.html", "./src/**/*.{vue,js,ts}"],
  safelist: [
    "bg-bg",
    "text-text",
    "bg-primary",
    "text-primary",
    "hover:bg-primary",
    "hover:text-primary",
  ],
  theme: {
    extend: {
      colors: {
        th: "var(--color-bg)",
        primary: "var(--color-primary)",
        text: "var(--color-text)",
      },
    },
  },
};
