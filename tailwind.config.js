module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      gridTemplateRows: {
        16: "repeat(16, minmax(0, 1fr))",
        17: "repeat(17, minmax(0, 1fr))",
        18: "repeat(18, minmax(0, 1fr))",
        19: "repeat(19, minmax(0, 1fr))",
        20: "repeat(20, minmax(0, 1fr))",
        21: "repeat(21, minmax(0, 1fr))",
        22: "repeat(22, minmax(0, 1fr))",
        23: "repeat(23, minmax(0, 1fr))",
        24: "repeat(24, minmax(0, 1fr))",
        25: "repeat(25, minmax(0, 1fr))",
        26: "repeat(26, minmax(0, 1fr))",

        // Complex site-specific row configuration
        layout: "200px minmax(900px, 1fr) 100px",
        animation: {
          appear: "show 4s ease-in forwards",
        },
        keyframes: {
          show: {
            "0%": { opacity: "0", color: "green" },
            "70%": { color: "green" },
            "100%": { opacity: "1", color: "green" },
          },
        },
        transitionProperty: {
          height: "height",
          spacing: "margin, padding",
          visibility: "visibility",
        },
      },
    },
  },
  plugins: [],
};
