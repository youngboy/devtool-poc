const plugin = require("tailwindcss/plugin");

const inputs = plugin(({ addComponents, theme }) => {
  addComponents({
    ".text-input": {
      height: "32px",
      width: "100%",
      padding: "8px 11px",
      lineHeight: "1.16",
      letterSpacing: "0.015em",
      border: "1px solid var(--color-input-outline)",
      color: theme("colors.fg.primary"),
      borderRadius: "3px",
      backgroundColor: theme("colors.bg"),
    },
    ".text-input:focus-visible": {
      border: "1px solid transparent",
      outline: "none",
      boxShadow: "0 0 0 2px var(--color-input-outline-active)",
    },
    ".text-input.error": {
      boxShadow: "0 0 0 2px var(--color-input-outline-error)",
    },
    ".text-input::placeholder": {
      color: "var(--color-input-text-disabled)",
    },
  });
});
module.exports = inputs;
