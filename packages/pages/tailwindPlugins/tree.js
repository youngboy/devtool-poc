const plugin = require("tailwindcss/plugin");

const tree = plugin(({ addComponents, theme }) => {
  addComponents({
    ".tree-outline": {
      color: theme("colors.fg.primary"),
      display: "flex",
      flexDirection: "column",
      position: "relative",
    },
    ".tree-outline li": {
      display: "flex",
      alignItems: "center",
      position: "relative",
      minHeight: "var(--tree-row-mh, 16px)",
      userSelect: "var(--tree-select, text)",
      textOverflow: "ellipsis",
      whiteSpace: "nowrap",
    },
    ".tree-outline li .leading-icons": {
      marginRight: "4px",
      display: "flex",
      alignItems: "center",
      justifyContent: "center,",
    },
    ".tree-outline li .icon-mask": {
      width: "16px",
      height: "16px",
    },
    ".tree-outline li .selection": {
      display: "none",
      zIndex: "-1",
      position: "absolute",
      marginLeft: "-10000px",
      left: 0,
      top: 0,
      right: 0,
      bottom: 0,
    },
    ".tree-outline li.selected .selection": {
      display: "block",
      backgroundColor: "var(--legacy-selection-inactive-bg-color)",
    },
    ".tree-outline li.selected": {
      color: "var(--legacy-selection-inactive-fg-color)",
    },
    ".tree-outline li.selected:focus": {
      color: "var(--legacy-selection-fg-color)",
    },
    ".tree-outline li.selected:focus .icon-mask": {
      "--override-icon-mask-background-color":
        "var(--legacy-selection-fg-color)",
    },
    ".tree-outline li.selected:focus .selection": {
      backgroundColor: "var(--legacy-accent-color)",
    },
    ".tree-outline li:not(.not-expand-icon)::before": {
      userSelect: "none",
      "-webkit-mask-image": "var(--image-file-treeoutlineTriangles)",
      "-webkit-mask-size": "32px 24px",
      "-webkit-mask-position": "0 0",
      backgroundColor: theme("colors.fg.secondary"),
      content: "' '",
      textShadow: "none",
      marginRight: "-2px",
      height: "12px",
      width: "13px",
    },
    ".tree-outline li.parent.expanded::before": {
      "-webkit-mask-position": "-16px 0",
    },
    ".tree-outline li:not(.parent)::before": {
      backgroundColor: "transparent",
    },
    ".tree-outline ol": {
      paddingLeft: "12px",
    },
  });
});

module.exports = tree;
