/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      flex: {
        pane: "0 0 27px",
      },
      lineHeight: {
        header: 1.6,
      },
    },
    colors: {
      black: "#000",
      white: "#fff",
      transparent: "transparent",
      body: "rgb(var(--color-body))",
      bg: "rgb(var(--color-bg))",
      primary: "rgb(var(--color-primary))",
      link: "rgb(var(--color-primary))",
      "details-hairline": "rgb(var(--color-details-hairline))",
      syntax: {
        1: "rgb(var(--color-syntax-1))",
        2: "rgb(var(--color-syntax-2))",
        3: "rgb(var(--color-syntax-3))",
      },
      token: {
        tag: "rgb(var(--color-token-tag))",
        attribute: "rgb(var(--color-token-attribute))",
      },
      elevation: {
        1: "rgb(var(--color-bg-elevation-1))",
        2: "rgb(var(--color-bg-elevation-2))",
      },
      fg: {
        primary: "rgb(var(--color-text-primary))",
        secondary: "rgb(var(--color-text-secondary))",
        disable: "rgb(var(--color-text-disable))",
      },
      tab: {
        selected: "rgb(var(--color-tab-selected))",
      },
      selection: {
        bg: "var(--color-selection-bg)",
      },
      legacy: {
        accent: "var(--legacy-accent-color)",
        accentFg: "var(--legacy-accent-fg-color)",
      },
    },
  },
  plugins: [
    require("./tailwindPlugins/button"),
    require("./tailwindPlugins/input"),
    require("./tailwindPlugins/heading"),
    require("./tailwindPlugins/icon"),
    require("./tailwindPlugins/tree"),
    require("./tailwindPlugins/report"),
    require("./tailwindPlugins/table"),
  ],
};
