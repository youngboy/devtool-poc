const plugin = require("tailwindcss/plugin");

module.exports = plugin(({ addComponents, theme }) => {
  addComponents({
    table: {
      "--table-row-height": "18px",
      "border-spacing": "0px",
      width: "100%",
      height: "100%",
      " border-collapse": "separate",
      "table-layout": "fixed",
    },
    "thead tr": {
      height: "27px",
      outline: "none",
      color: theme("colors.fg.primary"),
    },
    "tbody tr:not(.selected):not(.fill-bottom-row):nth-child(2n)": {
      backgroundColor: theme("colors.elevation.1"),
    },
    "tbody tr.selected": {
      backgroundColor: "var(--legacy-selection-inactive-bg-color)",
    },
    "tbody tr.selected:focus": {
      color: "var(--legacy-selection-fg-color)",
      backgroundColor: "var(--legacy-accent-color)",
    },
    "td, th": {
      padding: "1px 4px",
      "border-left": `1px solid ${theme("colors.details-hairline")}`,
      "line-height": "var(--table-row-height)",
      height: "var(--table-row-height)",
      "user-select": "text",
      "white-space": "nowrap",
      "text-overflow": "ellipsis",
      overflow: "hidden",
    },
    th: {
      "font-weight": "normal",
      "text-align": "left",
      "border-bottom": `1px solid ${theme("colors.details-hairline")}`,
      position: "sticky",
      top: "0px",
      "z-index": "2",
      "background-color": theme("colors.elevation.1"),
    },
    "td:first-of-type, th:first-of-type": {
      borderLeft: "none",
    },
  });
});
