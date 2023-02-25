const plugin = require("tailwindcss/plugin");

const buttons = plugin(({ addComponents, theme }) => {
  addComponents({
    ".text-button": {
      margin: "2px",
      fontSize: "12px",
      fontWeight: theme("fontWeight.medium"),
      color: theme("colors.legacy.accentFg"),
      backgroundColor: theme("colors.bg"),
      border: "1px",
      borderStyle: "solid",
      borderColor: theme("colors.elevation.2"),
      borderRadius: theme("borderRadius.DEFAULT"),
      padding: `0 ${theme("padding.3")}`,
      whiteSpace: "nowrap",
    },
    ".text-button:disabled": {
      opacity: "38%",
    },
    [[
      ".text-button:not(:disabled):focus",
      ".text-button:not(:disabled):hover",
      ".text-button:not(:disabled):active",
    ]]: {
      backgroundColor: theme("colors.elevation.1"),
      boxShadow: "0 1px 2px var(--divider-line)",
    },
    ".text-button:not(:disabled):active": {
      backgroundColor: theme("colors.elevation.2"),
    },
    ".text-button:not(:disabled):focus": {
      boxShadow:
        "0 1px 2px var(--divider-line), 0 0 0 2px var(--color-primary-variant)",
    },
  });

  addComponents({
    ".toolbar": {
      background: "transparent",
      borderRadius: "2px",
      border: "none",
      height: "16px",
      width: "16px",
      overflow: "hidden",
      padding: "0px",
      whiteSpace: "nowrap",
    },
    ".toolbar > .icon": {
      width: "100%",
      height: "100%",
      backgroundColor: theme("colors.fg.secondary"),
      display: "block",
      "-webkit-mask-position": "center",
      "-webkit-mask-repeat": "no-repeat",
      "-webkit-mask-size": "99%",
    },
    ".toolbar:hover > .icon": {
      backgroundColor: theme("colors.fg.primary"),
    },
    ".toolbar.state-on > .icon": {
      backgroundColor: theme("colors.primary"),
    },
  });
});
module.exports = buttons;
