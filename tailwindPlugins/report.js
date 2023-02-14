const plugin = require("tailwindcss/plugin");

module.exports = plugin(({ addComponents, theme }) => {
  addComponents({
    ".report-section": {
      display: "flex",
      flexDirection: "column",
      borderBottom: `1px solid ${theme("colors.details-hairline")}`,
      padding: theme("padding.3"),
    },
    ".report-section:last-of-type": {
      borderBottomWidth: "0",
    },
    ".report-header": {
      marginLeft: "18px",
      display: "flex",
      flexDirection: "row",
      alignItems: "center",
    },
    ".report-row": {
      display: "flex",
      alignItems: "center",
      whiteSpace: "normal",
      margin: "10px 0 2px 18px",
    },
    ".report-title": {
      flex: 'auto',
      textOverflow: 'ellipsis',
      overflow: 'hidden',
      fontWeight: 'bold',
      color: theme('colors.fg.secondary'),
    }
  });
});
