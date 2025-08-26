module.exports = {
  content: ["./index.html", "./src/**/*.{vue,js,ts}"],
  theme: {
    extend: {
      colors: {
        accent: "var(--color-accent)",
        text: "var(--color-text)",
        "inactive-l1": "var(--inactive-l1)",
        "bg-l1": "var(--color-bg-l1)",
        "text-muted-l1": "var(--color-text-muted-l1)",
        "inactive-l2": "var(--inactive-l2)",
        "bg-l2": "var(--color-bg-l2)",
        "text-muted-l2": "var(--color-text-muted-l2)",
      },
    },
  },
};
